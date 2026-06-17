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
      configService.get<string>('LOGGING_DATABASE_URL')!;
    const pool = new Pool({ connectionString });
    const schema =
      new URL(connectionString).searchParams.get('schema') || undefined;
    const adapter = schema
      ? new PrismaPg(pool, { schema })
      : new PrismaPg(pool);
    super({ adapter });
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
