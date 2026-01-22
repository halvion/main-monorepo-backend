import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService],
  // TODO: Add InvoicesController and InvoicesService
})
export class InvoicesModule {}
