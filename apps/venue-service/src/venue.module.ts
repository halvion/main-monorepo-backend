import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from '@app/logging';
import { PrismaService } from './prisma/prisma.service';
import { FacilitiesModule } from './facilities/facilities.module';
import { MaintenanceModule } from './maintenance/maintenance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/venue-service/.env',
    }),
    LoggingModule.forRoot({
      serviceName: 'venue-service',
      enableGlobal: true,
    }),
    FacilitiesModule,
    MaintenanceModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class VenueModule {}
