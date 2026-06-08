import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService, BOOKING_EVENTS } from '@app/rabbitmq';

@Injectable()
export class VenueSagaService implements OnModuleInit {
  private readonly logger = new Logger(VenueSagaService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitMQ: RabbitMQService,
  ) {}

  async onModuleInit() {
    // Subscribe to SLOT_LOCK_REQUEST
    await this.rabbitMQ.subscribe(
      BOOKING_EVENTS.SLOT_LOCK_REQUEST,
      async (data: any) => {
        this.logger.log(`Received slot lock request: ${JSON.stringify(data)}`);
        await this.handleSlotLockRequest(data);
      },
    );

    // Subscribe to SLOT_RELEASE_REQUEST
    await this.rabbitMQ.subscribe(
      BOOKING_EVENTS.SLOT_RELEASE_REQUEST,
      async (data: any) => {
        this.logger.log(`Received slot release request: ${JSON.stringify(data)}`);
        await this.handleSlotReleaseRequest(data);
      },
    );
  }

  private async handleSlotLockRequest(data: { bookingId: string; items: any[] }) {
    const { bookingId, items } = data;
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const item of items) {
          const slotDate = new Date(item.slotDate);
          slotDate.setHours(0, 0, 0, 0);

          const slot = await tx.operatingSlot.findUnique({
            where: {
              facilityId_slotDate_startTime: {
                facilityId: item.facilityId,
                slotDate,
                startTime: item.startTime,
              },
            },
          });

          if (!slot || !slot.isAvailable) {
            throw new Error(`Slot not available for facility ${item.facilityId} at ${item.startTime}`);
          }

          await tx.operatingSlot.update({
            where: { id: slot.id },
            data: { isAvailable: false },
          });
        }
      });

      this.logger.log(`Successfully locked slots for booking ${bookingId}`);
      await this.rabbitMQ.publish(BOOKING_EVENTS.SLOT_LOCKED, { bookingId });
    } catch (error) {
      this.logger.warn(`Failed to lock slots for booking ${bookingId}: ${error.message}`);
      await this.rabbitMQ.publish(BOOKING_EVENTS.SLOT_LOCK_FAILED, {
        bookingId,
        reason: error.message,
      });
    }
  }

  private async handleSlotReleaseRequest(data: { bookingId: string; items: any[] }) {
    const { bookingId, items } = data;
    try {
      await this.prisma.$transaction(async (tx) => {
        for (const item of items) {
          const slotDate = new Date(item.slotDate);
          slotDate.setHours(0, 0, 0, 0);

          const slot = await tx.operatingSlot.findUnique({
            where: {
              facilityId_slotDate_startTime: {
                facilityId: item.facilityId,
                slotDate,
                startTime: item.startTime,
              },
            },
          });

          if (slot) {
            await tx.operatingSlot.update({
              where: { id: slot.id },
              data: { isAvailable: true },
            });
          }
        }
      });

      this.logger.log(`Successfully released slots for booking ${bookingId}`);
      await this.rabbitMQ.publish(BOOKING_EVENTS.SLOT_RELEASED, { bookingId });
    } catch (error) {
      this.logger.error(`Failed to release slots for booking ${bookingId}: ${error.message}`);
    }
  }
}
