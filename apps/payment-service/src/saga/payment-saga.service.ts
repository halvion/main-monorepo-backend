import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService, BOOKING_EVENTS } from '@app/rabbitmq';

@Injectable()
export class PaymentSagaService implements OnModuleInit {
  private readonly logger = new Logger(PaymentSagaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitMQ: RabbitMQService,
  ) {}

  async onModuleInit() {
    // Subscribe to BOOKING_CREATED
    await this.rabbitMQ.subscribe(
      BOOKING_EVENTS.BOOKING_CREATED,
      async (data: any) => {
        this.logger.log(`Received BOOKING_CREATED: ${JSON.stringify(data)}`);
        await this.handleBookingCreated(data);
      },
    );

    // Subscribe to BOOKING_CANCELLED (to process refunds if paid)
    await this.rabbitMQ.subscribe(
      BOOKING_EVENTS.BOOKING_CANCELLED,
      async (data: any) => {
        this.logger.log(`Received BOOKING_CANCELLED: ${JSON.stringify(data)}`);
        await this.handleBookingCancelled(data);
      },
    );
  }

  private async handleBookingCreated(data: {
    bookingId: string;
    userId: string;
    amount: number;
    dueDate: string;
  }) {
    const { bookingId, userId, amount, dueDate } = data;

    try {
      // Create Invoice
      const invoice = await this.prisma.invoice.create({
        data: {
          bookingId,
          userId,
          amount,
          status: 'UNPAID',
          dueDate: new Date(dueDate),
        },
      });

      this.logger.log(`Invoice ${invoice.id} created for booking ${bookingId}`);

      // Ensure mock gateway exists
      let gateway = await this.prisma.paymentGateway.findFirst({
        where: { name: 'Mock Gateway' },
      });

      if (!gateway) {
        gateway = await this.prisma.paymentGateway.create({
          data: {
            name: 'Mock Gateway',
            isActive: true,
          },
        });
      }

      // Simulate payment processing (50/50 chance of success)
      const isSuccess = Math.random() < 0.50;
      this.logger.log(`Simulating payment for booking ${bookingId}: Success = ${isSuccess}`);

      const transaction = await this.prisma.transaction.create({
        data: {
          invoiceId: invoice.id,
          gatewayId: gateway.id,
          amount,
          method: 'mock_wallet',
          status: isSuccess ? 'SUCCESS' : 'FAILED',
          externalRef: `MOCK-TX-${Math.random().toString(36).substring(7).toUpperCase()}`,
        },
      });

      if (isSuccess) {
        // Update Invoice status
        await this.prisma.invoice.update({
          where: { id: invoice.id },
          data: {
            status: 'PAID',
            paidAt: new Date(),
          },
        });

        // Publish PAYMENT_SUCCESS
        await this.rabbitMQ.publish(BOOKING_EVENTS.PAYMENT_SUCCESS, { bookingId });
        this.logger.log(`Payment success published for booking ${bookingId}`);
      } else {
        // Publish PAYMENT_FAILED
        await this.rabbitMQ.publish(BOOKING_EVENTS.PAYMENT_FAILED, { bookingId });
        this.logger.log(`Payment failure published for booking ${bookingId}`);
      }
    } catch (error) {
      this.logger.error(`Failed to handle booking created event for ${bookingId}: ${error.message}`, error);
    }
  }

  private async handleBookingCancelled(data: { bookingId: string; userId: string }) {
    const { bookingId } = data;

    try {
      const invoice = await this.prisma.invoice.findFirst({
        where: { bookingId },
      });

      if (!invoice) {
        this.logger.warn(`Invoice not found for booking ${bookingId}`);
        return;
      }

      // If the invoice was already paid, process a refund
      if (invoice.status === 'PAID') {
        this.logger.log(`Invoice ${invoice.id} is PAID. Processing refund...`);

        await this.prisma.$transaction(async (tx) => {
          await tx.refund.create({
            data: {
              invoiceId: invoice.id,
              amount: invoice.amount,
              reason: 'Customer booking cancellation',
              status: 'PROCESSED',
              processedAt: new Date(),
            },
          });

          await tx.invoice.update({
            where: { id: invoice.id },
            data: {
              status: 'REFUNDED',
            },
          });
        });

        this.logger.log(`Refund processed for invoice ${invoice.id}`);
        await this.rabbitMQ.publish(BOOKING_EVENTS.REFUND_PROCESSED, { bookingId });
      } else {
        // If not paid, just mark the invoice as expired/canceled
        await this.prisma.invoice.update({
          where: { id: invoice.id },
          data: {
            status: 'EXPIRED',
          },
        });
        this.logger.log(`Invoice ${invoice.id} marked as EXPIRED.`);
      }
    } catch (error) {
      this.logger.error(`Failed to handle booking cancellation for ${bookingId}: ${error.message}`, error);
    }
  }
}
