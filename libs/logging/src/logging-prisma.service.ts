import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, Prisma } from '../generated/logging-prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class LoggingPrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(LoggingPrismaService.name);

  constructor(configService: ConfigService) {
    const connectionString =
      configService.get<string>('LOGGING_DATABASE_URL') ||
      configService.get<string>('DATABASE_URL');

    if (!connectionString) {
      const msg = 'LOGGING_DATABASE_URL or DATABASE_URL environment variable is not defined.';
      Logger.error(msg, '', 'LoggingPrismaService');
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
      const msg = `Failed to initialize Logging PrismaPg adapter: ${(error as Error).message}`;
      Logger.error(msg, (error as Error).stack, 'LoggingPrismaService');
      throw error;
    }
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();

    this.logger.log('Logging database connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Logging database disconnected');
  }
}
