import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService, BOOKING_EVENTS } from '@app/rabbitmq';
import * as midtransClient from 'midtrans-client';

@Injectable()
export class MidtransService {
  private readonly logger = new Logger(MidtransService.name);
  private snap: any;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private rabbitMQ: RabbitMQService,
  ) {
    this.snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: this.configService.get<string>('MIDTRANS_SERVER_KEY', 'Mid-server-rXosCMQX02mZROWU5lmN7STH'),
      clientKey: this.configService.get<string>('MIDTRANS_CLIENT_KEY', 'Mid-client-DhPwwFbrW4wMwBcP'),
    });
  }

  async generateSnapToken(bookingId: string): Promise<string> {
    const invoice = await this.prisma.invoice.findFirst({
      where: { bookingId },
    });

    if (!invoice) {
      throw new Error(`Invoice not found for booking: ${bookingId}`);
    }

    if (invoice.status === 'PAID') {
      throw new Error('Invoice is already paid');
    }

    const parameter = {
      transaction_details: {
        order_id: invoice.id,
        gross_amount: Math.round(Number(invoice.amount)),
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "Halvion",
        last_name: "Customer",
        email: "customer@halvion.com",
      },
    };

    const transaction = await this.snap.createTransaction(parameter);
    return transaction.token;
  }

  async handleWebhook(payload: any): Promise<void> {
    this.logger.log(`Received Midtrans Webhook: ${JSON.stringify(payload)}`);
    const { order_id, transaction_status, fraud_status } = payload;
    
    const invoice = await this.prisma.invoice.findUnique({ where: { id: order_id } });
    if (!invoice) {
      this.logger.error(`Invoice not found for order_id: ${order_id}`);
      return;
    }

    let isPaid = false;
    let isFailed = false;

    if (transaction_status == 'capture') {
      if (fraud_status == 'accept') {
        isPaid = true;
      }
    } else if (transaction_status == 'settlement') {
      isPaid = true;
    } else if (
      transaction_status == 'cancel' ||
      transaction_status == 'deny' ||
      transaction_status == 'expire'
    ) {
      isFailed = true;
    }

    if (isPaid && invoice.status !== 'PAID') {
      await this.prisma.invoice.update({
        where: { id: invoice.id },
        data: { status: 'PAID', paidAt: new Date() },
      });
      // publish Payment Success Saga Event
      await this.rabbitMQ.publish(BOOKING_EVENTS.PAYMENT_SUCCESS, { bookingId: invoice.bookingId });
      this.logger.log(`Invoice ${invoice.id} marked as PAID.`);
    } else if (isFailed && invoice.status !== 'EXPIRED') {
      await this.prisma.invoice.update({
        where: { id: invoice.id },
        data: { status: 'EXPIRED' },
      });
      // publish Payment Failed Saga Event
      await this.rabbitMQ.publish(BOOKING_EVENTS.PAYMENT_FAILED, { bookingId: invoice.bookingId });
      this.logger.log(`Invoice ${invoice.id} marked as EXPIRED.`);
    }
  }
}
