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

export interface LoggingPrismaClient {
  requestLog: {
    create: (args: { data: any }) => Promise<any>;
  };
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(
    private readonly reflector: Reflector,
    @Optional()
    @Inject('LOGGING_PRISMA_CLIENT')
    private readonly prisma?: LoggingPrismaClient,
    @Optional()
    @Inject('SERVICE_NAME')
    private readonly serviceName?: string,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const startTime = Date.now();

    const action = this.reflector.get<string>(
      LOG_ACTION_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      tap(async () => {
        const responseTime = Date.now() - startTime;
        const statusCode = response.statusCode;

        const logData = {
          service: this.serviceName || 'unknown',
          method: request.method,
          path: request.url,
          statusCode,
          userId: request.user?.sub || null,
          action: action || null,
          requestBody: this.sanitizeBody(request.body),
          responseTime,
          userAgent: request.headers['user-agent'] || null,
          ipAddress: request.ip || request.connection?.remoteAddress || null,
        };

        // Log to console
        this.logger.log(
          `${request.method} ${request.url} ${statusCode} - ${responseTime}ms`,
        );

        // Save to database if prisma client is available
        if (this.prisma) {
          try {
            await this.prisma.requestLog.create({ data: logData });
          } catch (error) {
            this.logger.error('Failed to save request log', error);
          }
        }
      }),
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return null;
    
    // Remove sensitive fields
    const sanitized = { ...body };
    const sensitiveFields = ['password', 'token', 'refreshToken', 'secret'];
    
    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }
    
    return sanitized;
  }
}
