import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../../generated/core-prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');
    if (!connectionString) {
      const msg = 'DATABASE_URL environment variable is not defined.';
      Logger.error(msg, '', 'PrismaService');
      throw new Error(msg);
    }

    try {
      const pool = new Pool({ connectionString });
      const schema =
        new URL(connectionString).searchParams.get('schema') || undefined;
      const adapter = schema
        ? new PrismaPg(pool, { schema })
        : new PrismaPg(pool);
      super({ adapter });
    } catch (error) {
      const msg = `Failed to initialize Core PrismaPg adapter: ${(error as Error).message}`;
      Logger.error(msg, (error as Error).stack, 'PrismaService');
      throw error;
    }
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }
}
