import { Module } from '@nestjs/common';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { PrismaService } from '../prisma/prisma.service';
import { SlotsModule } from '../slots/slots.module';

@Module({
  imports: [SlotsModule],
  controllers: [FacilitiesController],
  providers: [FacilitiesService, PrismaService],
  exports: [FacilitiesService],
})
export class FacilitiesModule {}
