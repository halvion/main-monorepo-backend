import { Module, DynamicModule, Global } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { LoggingPrismaService } from './logging-prisma.service';
import { LoggingExceptionFilter } from './logging-exception.filter';

export interface LoggingModuleOptions {
  serviceName: string;
  prismaClient?: any;
  enableGlobal?: boolean;
}

@Global()
@Module({})
export class LoggingModule {
  static forRoot(options: LoggingModuleOptions): DynamicModule {
    const providers: any[] = [
      {
        provide: 'SERVICE_NAME',
        useValue: options.serviceName,
      },
      LoggingPrismaService,
      LoggingInterceptor,
      LoggingExceptionFilter,
    ];

    if (options.prismaClient) {
      providers.push({
        provide: 'LOGGING_PRISMA_CLIENT',
        useValue: options.prismaClient,
      });
    } else {
      providers.push({
        provide: 'LOGGING_PRISMA_CLIENT',
        useExisting: LoggingPrismaService,
      });
    }

    // Register as global interceptor and filter if enabled
    if (options.enableGlobal !== false) {
      providers.push({
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      });
      providers.push({
        provide: APP_FILTER,
        useClass: LoggingExceptionFilter,
      });
    }

    return {
      module: LoggingModule,
      providers,
      exports: [LoggingInterceptor, LoggingExceptionFilter, LoggingPrismaService, 'SERVICE_NAME'],
    };
  }

  static forRootAsync(options: {
    serviceName: string;
    enableGlobal?: boolean;
    useFactory: (...args: any[]) => Promise<any> | any;
    inject?: any[];
  }): DynamicModule {
    const providers: any[] = [
      {
        provide: 'SERVICE_NAME',
        useValue: options.serviceName,
      },
      {
        provide: 'LOGGING_PRISMA_CLIENT',
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
      LoggingInterceptor,
      LoggingExceptionFilter,
    ];

    if (options.enableGlobal !== false) {
      providers.push({
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      });
      providers.push({
        provide: APP_FILTER,
        useClass: LoggingExceptionFilter,
      });
    }

    return {
      module: LoggingModule,
      providers,
      exports: [LoggingInterceptor, LoggingExceptionFilter, 'SERVICE_NAME'],
    };
  }
}
