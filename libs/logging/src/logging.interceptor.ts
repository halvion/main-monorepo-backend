import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  Inject,
  Optional,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { LOG_ACTION_KEY } from './log-action.decorator';
import { PrismaClient } from '../generated/logging-prisma';
import { type LoggingRequest } from './logging-exception.filter';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(
    private readonly reflector: Reflector,
    @Optional()
    @Inject('LOGGING_PRISMA_CLIENT')
    private readonly prisma?: PrismaClient,
    @Optional()
    @Inject('SERVICE_NAME')
    private readonly serviceName?: string,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<LoggingRequest>();
    const response = context.switchToHttp().getResponse();
    const startTime = Date.now();

    // Attach start time and action to request for the exception filter to use
    const action = this.reflector.get<string>(
      LOG_ACTION_KEY,
      context.getHandler(),
    );
    request.__loggingStartTime = startTime;
    request.__loggingAction = action;

    this.logger.debug(`Intercepting ${request.method} ${request.url}`);

    // Only handle successful responses here - errors are handled by the exception filter
    return next.handle().pipe(
      tap(async (responseBody) => {
        const responseTime = Date.now() - startTime;
        const statusCode = response.statusCode;

        // Log to console
        this.logger.log(
          `${request.method} ${request.url} ${statusCode} - ${responseTime}ms`,
        );

        // Save to database
        if (this.prisma) {
          try {
            await this.prisma.requestLogHeader.create({
              data: {
                service: this.serviceName || 'unknown',
                method: request.method,
                path: request.url,
                statusCode,
                userId:
                  (request as any).user?.sub ||
                  (request as any).user?.id ||
                  null,
                action: action || null,
                responseTime,
                userAgent: request.get('user-agent') || null,
                ipAddress: request.ip || request.socket?.remoteAddress || null,
                detail: {
                  create: {
                    requestBody: this.sanitizeBody(request.body),
                    responseBody: this.sanitizeBody(responseBody),
                    exceptionMessage: null,
                    stackTrace: null,
                  },
                },
              },
            });
          } catch (dbError) {
            this.logger.error('Failed to save request log to DB', dbError);
          }
        }
      }),
    );
  }

  private sanitizeBody(body: any): any {
    if (!body || typeof body !== 'object') return null;

    // Avoid serializing Node/Express streams or request/response objects
    if (
      typeof body.writeHead === 'function' ||
      typeof body.pipe === 'function' ||
      body.constructor?.name === 'ServerResponse' ||
      body.constructor?.name === 'IncomingMessage' ||
      body.socket
    ) {
      return { _type: 'NonSerializableStream', constructor: body.constructor?.name || 'Response' };
    }

    try {
      const sensitiveFields = [
        'password',
        'token',
        'refreshToken',
        'secret',
        'accessToken',
      ];
      
      const seen = new WeakSet();
      const stringified = JSON.stringify(body, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return '[Circular]';
          }
          seen.add(value);
        }
        if (sensitiveFields.includes(key)) {
          return '[REDACTED]';
        }
        return value;
      });

      return JSON.parse(stringified);
    } catch (err) {
      return { _error: 'Failed to serialize log body', message: err.message };
    }
  }
}
