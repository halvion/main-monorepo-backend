import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingModule } from '@app/logging';
import { RabbitMQModule, QUEUES } from '@app/rabbitmq';
import { PrismaService } from './prisma/prisma.service';
import { BookingsModule } from './bookings/bookings.module';
import { SlotsModule } from './slots/slots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/booking-service/.env',
    }),
    LoggingModule.forRoot({
      serviceName: 'booking-service',
      enableGlobal: true,
    }),
    RabbitMQModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
        queue: QUEUES.BOOKING_SERVICE,
      }),
      inject: [ConfigService],
    }),
    BookingsModule,
    SlotsModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class BookingModule {}
