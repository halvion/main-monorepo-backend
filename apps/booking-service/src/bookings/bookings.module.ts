import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { PrismaService } from '../prisma/prisma.service';
import { IdempotencyInterceptor } from '../idempotency/idempotency.interceptor';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService, IdempotencyInterceptor],
  exports: [BookingsService],
})
export class BookingsModule {}
