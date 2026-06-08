import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingModule } from '@app/logging';
import { PrismaService } from './prisma/prisma.service';
import { FacilitiesModule } from './facilities/facilities.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { SlotsModule } from './slots/slots.module';
import { RabbitMQModule, QUEUES } from '@app/rabbitmq';
import { VenueSagaService } from './saga/venue-saga.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggingModule.forRoot({
      serviceName: 'venue-service',
      enableGlobal: true,
    }),
    RabbitMQModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('RABBITMQ_URL', 'amqp://guest:guest@localhost:5672'),
        queue: QUEUES.VENUE_SERVICE,
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    FacilitiesModule,
    MaintenanceModule,
    SlotsModule,
  ],
  providers: [PrismaService, VenueSagaService, JwtStrategy],
  exports: [PrismaService],
})
export class VenueModule {}
