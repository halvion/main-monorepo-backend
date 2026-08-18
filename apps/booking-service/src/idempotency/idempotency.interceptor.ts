import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  Logger,
  BadRequestException,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { createHash } from 'crypto';
import Redis from 'ioredis';

const IDEMPOTENCY_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type IdempotencyRecord = {
  state: 'IN_PROGRESS' | 'COMPLETED';
  fingerprint: string;
  body?: unknown;
};

/**
 * Request-scoped idempotency via a client-supplied UUID `Idempotency-Key` header.
 *
 * Distinct from the Redlock slot mutex: that lock is keyed by the *resource*
 * (facility/date/time) and is released once the transaction commits, so it only
 * serialises concurrent contenders. This interceptor is keyed by the *request*
 * and outlives it, so a retry of an already-processed submission replays the
 * original response instead of colliding with its own side effects.
 */
@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  private readonly logger = new Logger(IdempotencyInterceptor.name);

  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const rawKey = request.headers['idempotency-key'];

    // No key supplied: behave exactly as before.
    if (!rawKey) {
      return next.handle();
    }

    if (!UUID_REGEX.test(rawKey)) {
      throw new BadRequestException('Idempotency-Key must be a valid UUID.');
    }

    // Scope by user so one caller can never replay another caller's key.
    const userId = request.user?.sub ?? 'anonymous';
    const storeKey = `idempotency:${userId}:${rawKey}`;
    const fingerprint = createHash('sha256')
      .update(
        `${request.method}:${request.route?.path ?? request.url}:${JSON.stringify(
          request.body ?? {},
        )}`,
      )
      .digest('hex');

    // Atomically claim the key. SET NX is the whole concurrency story here.
    const claimed = await this.redis.set(
      storeKey,
      JSON.stringify({ state: 'IN_PROGRESS', fingerprint }),
      'EX',
      IDEMPOTENCY_TTL_SECONDS,
      'NX',
    );

    if (!claimed) {
      return this.replay(context, storeKey, fingerprint, next);
    }

    return next.handle().pipe(
      switchMap((body) =>
        from(
          this.redis.set(
            storeKey,
            JSON.stringify({
              state: 'COMPLETED',
              fingerprint,
              body,
            } satisfies IdempotencyRecord),
            'EX',
            IDEMPOTENCY_TTL_SECONDS,
          ),
        ).pipe(map(() => body)),
      ),
      catchError((err) =>
        // Release the claim so a genuinely failed request stays retryable.
        from(this.redis.del(storeKey)).pipe(
          switchMap(() => throwError(() => err)),
        ),
      ),
    );
  }

  private async replay(
    context: ExecutionContext,
    storeKey: string,
    fingerprint: string,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const raw = await this.redis.get(storeKey);

    // Expired between our SET NX and this GET: treat as a fresh request.
    if (!raw) {
      return next.handle();
    }

    const record: IdempotencyRecord = JSON.parse(raw);

    if (record.fingerprint !== fingerprint) {
      throw new UnprocessableEntityException(
        'This Idempotency-Key was already used with a different request payload.',
      );
    }

    if (record.state === 'IN_PROGRESS') {
      throw new ConflictException(
        'A request with this Idempotency-Key is still being processed.',
      );
    }

    this.logger.log(`Replaying stored response for ${storeKey}`);
    context.switchToHttp().getResponse().setHeader('Idempotent-Replay', 'true');
    return of(record.body);
  }
}
