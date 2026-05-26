import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';

@Injectable()
export abstract class PrismaBaseService<T extends { $connect: () => Promise<void>; $disconnect: () => Promise<void> }>
  implements OnModuleInit, OnModuleDestroy
{
  protected abstract client: T;
  private readonly logger = new Logger(this.constructor.name);

  async onModuleInit(): Promise<void> {
    await this.client.$connect();
    this.logger.log('Database connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
    this.logger.log('Database disconnected');
  }

  // Expose the client for direct Prisma operations
  get prisma(): T {
    return this.client;
  }
}

