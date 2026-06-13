import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService, BOOKING_EVENTS } from '@app/rabbitmq';

@Injectable()
export class BookingSagaService implements OnModuleInit {
  private readonly logger = new Logger(BookingSagaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitMQ: RabbitMQService,
  ) {}

  async onModuleInit() {
    // Subscribe to SLOT_LOCKED
    await this.rabbitMQ.subscribe(
      BOOKING_EVENTS.SLOT_LOCKED,
      async (data: any) => {
        this.logger.log(`Saga: Received SLOT_LOCKED event for booking ${data.bookingId}`);
        await this.handleSlotLocked(data.bookingId);
      },
    );

    // Subscribe to SLOT_LOCK_FAILED
    await this.rabbitMQ.subscribe(
      BOOKING_EVENTS.SLOT_LOCK_FAILED,
      async (data: any) => {
        this.logger.log(`Saga: Received SLOT_LOCK_FAILED event for booking ${data.bookingId}`);
        await this.handleSlotLockFailed(data.bookingId, data.reason);
      },
    );

    // Subscribe to PAYMENT_SUCCESS
    await this.rabbitMQ.subscribe(
      BOOKING_EVENTS.PAYMENT_SUCCESS,
      async (data: any) => {
        this.logger.log(`Saga: Received PAYMENT_SUCCESS event for booking ${data.bookingId}`);
        await this.handlePaymentSuccess(data.bookingId);
      },
    );

    // Subscribe to PAYMENT_FAILED
    await this.rabbitMQ.subscribe(
      BOOKING_EVENTS.PAYMENT_FAILED,
      async (data: any) => {
        this.logger.log(`Saga: Received PAYMENT_FAILED event for booking ${data.bookingId}`);
        await this.handlePaymentFailed(data.bookingId);
      },
    );

    // Subscribe to REFUND_PROCESSED
    await this.rabbitMQ.subscribe(
      BOOKING_EVENTS.REFUND_PROCESSED,
      async (data: any) => {
        this.logger.log(`Saga: Received REFUND_PROCESSED event for booking ${data.bookingId}`);
        await this.handleRefundProcessed(data.bookingId);
      },
    );
  }

  private async handleSlotLocked(bookingId: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
        include: { items: true },
      });

      if (!booking) {
        this.logger.error(`Booking ${bookingId} not found during SLOT_LOCKED`);
        return;
      }

      if (booking.status !== 'PENDING') {
        this.logger.warn(`Booking ${bookingId} is in state ${booking.status}, skipping PAYMENT_PENDING transition`);
        return;
      }

      await this.prisma.$transaction(async (tx) => {
        await tx.booking.update({
          where: { id: bookingId },
          data: {
            status: 'PAYMENT_PENDING',
            logs: {
              create: {
                action: 'SLOT_LOCKED',
                actor: 'SYSTEM',
              },
            },
          },
        });
      });

      this.logger.log(`Booking ${bookingId} transitioned to PAYMENT_PENDING. Publishing BOOKING_CREATED for payment.`);

      // Trigger payment service
      await this.rabbitMQ.publish(BOOKING_EVENTS.BOOKING_CREATED, {
        bookingId: booking.id,
        userId: booking.userId,
        amount: booking.totalAmount,
        dueDate: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes to pay
      });
    } catch (error) {
      this.logger.error(`Error in handleSlotLocked for booking ${bookingId}`, error);
    }
  }

  private async handleSlotLockFailed(bookingId: string, reason: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
        include: { items: true },
      });

      if (!booking) return;

      await this.prisma.$transaction(async (tx) => {
        // Release local slot inventories
        for (const item of booking.items) {
          await tx.slotInventory.updateMany({
            where: { bookingItemId: item.id },
            data: {
              isAvailable: true,
              bookingItemId: null,
              lockedAt: null,
              lockedBy: null,
            },
          });
        }

        await tx.booking.update({
          where: { id: bookingId },
          data: {
            status: 'CANCELLED',
            logs: {
              create: {
                action: 'SLOT_LOCK_FAILED',
                actor: 'SYSTEM',
                metadata: { reason },
              },
            },
          },
        });
      });

      this.logger.log(`Booking ${bookingId} cancelled due to slot lock failure.`);
    } catch (error) {
      this.logger.error(`Error in handleSlotLockFailed for booking ${bookingId}`, error);
    }
  }

  private async handlePaymentSuccess(bookingId: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId }
      });

      if (!booking) {
        this.logger.error(`Booking ${bookingId} not found during handlePaymentSuccess`);
        return;
      }

      // Idempotency check: Skip if already processed
      if (booking.status === 'PAID') {
        this.logger.log(`Booking ${bookingId} is already PAID. Skipping.`);
        return;
      }

      await this.prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: 'PAID',
          logs: {
            create: {
              action: 'PAID',
              actor: 'SYSTEM',
            },
          },
        },
      });
      this.logger.log(`Booking ${bookingId} successfully updated to PAID status.`);
    } catch (error) {
      this.logger.error(`Error in handlePaymentSuccess for booking ${bookingId}`, error);
    }
  }

  private async handlePaymentFailed(bookingId: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
        include: { items: true },
      });

      if (!booking) return;

      // Idempotency check: Skip if already cancelled
      if (booking.status === 'CANCELLED') {
        this.logger.log(`Booking ${bookingId} is already CANCELLED. Skipping.`);
        return;
      }

      await this.prisma.$transaction(async (tx) => {
        // Release local slot inventories
        for (const item of booking.items) {
          await tx.slotInventory.updateMany({
            where: { bookingItemId: item.id },
            data: {
              isAvailable: true,
              bookingItemId: null,
              lockedAt: null,
              lockedBy: null,
            },
          });
        }

        await tx.booking.update({
          where: { id: bookingId },
          data: {
            status: 'CANCELLED',
            logs: {
              create: {
                action: 'PAYMENT_FAILED',
                actor: 'SYSTEM',
              },
            },
          },
        });
      });

      this.logger.log(`Booking ${bookingId} cancelled due to payment failure. Publishing release request.`);

      // Compensate / release slots in Venue service
      await this.rabbitMQ.publish(BOOKING_EVENTS.SLOT_RELEASE_REQUEST, {
        bookingId,
        items: booking.items.map((item) => ({
          facilityId: item.facilityId,
          slotDate: item.slotDate,
          startTime: item.startTime,
          endTime: item.endTime,
        })),
      });
    } catch (error) {
      this.logger.error(`Error in handlePaymentFailed for booking ${bookingId}`, error);
    }
  }

  private async handleRefundProcessed(bookingId: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
        include: { items: true },
      });

      if (!booking) return;

      await this.prisma.$transaction(async (tx) => {
        // Release local slot inventories
        for (const item of booking.items) {
          await tx.slotInventory.updateMany({
            where: { bookingItemId: item.id },
            data: {
              isAvailable: true,
              bookingItemId: null,
              lockedAt: null,
              lockedBy: null,
            },
          });
        }

        await tx.booking.update({
          where: { id: bookingId },
          data: {
            status: 'REFUNDED',
            logs: {
              create: {
                action: 'REFUNDED',
                actor: 'SYSTEM',
              },
            },
          },
        });
      });

      this.logger.log(`Booking ${bookingId} refunded. Publishing slot release request.`);

      // Release slots in Venue service
      await this.rabbitMQ.publish(BOOKING_EVENTS.SLOT_RELEASE_REQUEST, {
        bookingId,
        items: booking.items.map((item) => ({
          facilityId: item.facilityId,
          slotDate: item.slotDate,
          startTime: item.startTime,
          endTime: item.endTime,
        })),
      });
    } catch (error) {
      this.logger.error(`Error in handleRefundProcessed for booking ${bookingId}`, error);
    }
  }
}
