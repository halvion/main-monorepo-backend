import { Module, DynamicModule, Global } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
      LoggingInterceptor,
    ];

    if (options.prismaClient) {
      providers.push({
        provide: 'LOGGING_PRISMA_CLIENT',
        useValue: options.prismaClient,
      });
    }

    // Register as global interceptor if enabled
    if (options.enableGlobal !== false) {
      providers.push({
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      });
    }

    return {
      module: LoggingModule,
      providers,
      exports: [LoggingInterceptor, 'SERVICE_NAME'],
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
    ];

    if (options.enableGlobal !== false) {
      providers.push({
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      });
    }

    return {
      module: LoggingModule,
      providers,
      exports: [LoggingInterceptor, 'SERVICE_NAME'],
    };
  }
}
