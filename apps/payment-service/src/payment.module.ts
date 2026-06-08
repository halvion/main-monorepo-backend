import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggingModule } from '@app/logging';
import { RabbitMQModule, QUEUES } from '@app/rabbitmq';
import { PrismaService } from './prisma/prisma.service';
import { InvoicesModule } from './invoices/invoices.module';
import { TransactionsModule } from './transactions/transactions.module';
import { RefundsModule } from './refunds/refunds.module';
import { PaymentSagaService } from './saga/payment-saga.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggingModule.forRoot({
      serviceName: 'payment-service',
      enableGlobal: true,
    }),
    RabbitMQModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('RABBITMQ_URL', 'amqp://localhost:5672'),
        queue: QUEUES.PAYMENT_SERVICE,
      }),
      inject: [ConfigService],
    }),
    InvoicesModule,
    TransactionsModule,
    RefundsModule,
  ],
  providers: [PrismaService, PaymentSagaService],
  exports: [PrismaService],
})
export class PaymentModule {}
