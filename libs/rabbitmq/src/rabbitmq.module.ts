import { Module, DynamicModule, Global } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

export interface RabbitMQModuleOptions {
  url: string;
  queue: string;
  exchange?: string;
}

@Global()
@Module({})
export class RabbitMQModule {
  static forRoot(options: RabbitMQModuleOptions): DynamicModule {
    return {
      module: RabbitMQModule,
      providers: [
        {
          provide: 'RABBITMQ_OPTIONS',
          useValue: options,
        },
        RabbitMQService,
      ],
      exports: [RabbitMQService, 'RABBITMQ_OPTIONS'],
    };
  }

  static forRootAsync(options: {
    useFactory: (
      ...args: any[]
    ) => Promise<RabbitMQModuleOptions> | RabbitMQModuleOptions;
    inject?: any[];
  }): DynamicModule {
    return {
      module: RabbitMQModule,
      providers: [
        {
          provide: 'RABBITMQ_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        RabbitMQService,
      ],
      exports: [RabbitMQService, 'RABBITMQ_OPTIONS'],
    };
  }
}
