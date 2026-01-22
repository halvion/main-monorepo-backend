import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from '@app/logging';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/core-service/.env',
    }),
    LoggingModule.forRoot({
      serviceName: 'core-service',
      enableGlobal: true,
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}
