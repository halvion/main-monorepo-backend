import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  Optional,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '../generated/logging-prisma';

// Extended request interface to carry logging data
export interface LoggingRequest extends Request {
  __loggingStartTime?: number;
  __loggingAction?: string;
}

@Injectable()
@Catch()
export class LoggingExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(LoggingExceptionFilter.name);

  constructor(
    @Optional()
    @Inject('LOGGING_PRISMA_CLIENT')
    private readonly prisma?: PrismaClient,
    @Optional()
    @Inject('SERVICE_NAME')
    private readonly serviceName?: string,
  ) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<LoggingRequest>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | undefined =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    let stack =
      exception instanceof Error ? exception.stack : String(exception);
    stack =
      exception instanceof Prisma.PrismaClientKnownRequestError
        ? exception.stack
        : stack;

    const startTime = request.__loggingStartTime || Date.now();
    const responseTime = Date.now() - startTime;
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Bad Request';
    }

    // Log to console
    this.logger.error(
      `${request.method} ${request.url} ${status} - ${responseTime}ms - ${message}`,
      stack,
    );

    // Save to database
    if (this.prisma) {
      try {
        await this.prisma.requestLogHeader.create({
          data: {
            service: this.serviceName || 'unknown',
            method: request.method,
            path: request.url,
            statusCode: status,
            userId:
              (request as any).user?.sub || (request as any).user?.id || null,
            action: request.__loggingAction || null,
            responseTime,
            userAgent: request.get('user-agent') || null,
            ipAddress: request.ip || request.socket?.remoteAddress || null,
            detail: {
              create: {
                requestBody: this.sanitizeBody(request.body),
                exceptionMessage: message,
                stackTrace: stack || null,
              },
            },
          },
        });
      } catch (dbError) {
        this.logger.error('Failed to save exception log to DB', dbError);
      }
    }

    // Send the response
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private sanitizeBody(body: any): any {
    if (!body || typeof body !== 'object') return null;
    const sanitized = { ...body };
    const sensitiveFields = ['password', 'token', 'refreshToken', 'secret'];
    for (const field of sensitiveFields) {
      if (field in sanitized) sanitized[field] = '[REDACTED]';
    }
    return sanitized;
  }
}
