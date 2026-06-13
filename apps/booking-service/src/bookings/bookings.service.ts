import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
  Inject,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService, BOOKING_EVENTS } from '@app/rabbitmq';
import { PaginationDto, ApiResponse, createPaginationMeta } from '@app/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import Redlock from 'redlock';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitMQ: RabbitMQService,
    @Inject('REDLOCK')
    private readonly redlock: Redlock,
  ) {}

  async findByUser(userId: string, pagination: PaginationDto) {
    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        skip: pagination.skip,
        take: pagination.take,
        where: { userId },
        include: {
          items: true,
          logs: { orderBy: { createdAt: 'desc' }, take: 5 },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count({ where: { userId } }),
    ]);

    return ApiResponse.success(
      bookings,
      undefined,
      createPaginationMeta(pagination.page ?? 1, pagination.limit ?? 10, total),
    );
  }

  async findById(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        items: { include: { slot: true } },
        logs: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return ApiResponse.success(booking);
  }

  /**
   * Helper to ensure SlotInventory records exist in DB.
   */
  private async ensureSlotInventoriesExist(tx: any, items: any[]) {
    for (const item of items) {
      const slotDate = new Date(item.slotDate);
      slotDate.setHours(0, 0, 0, 0);

      const existing = await tx.slotInventory.findUnique({
        where: {
          facilityId_slotDate_startTime: {
            facilityId: item.facilityId,
            slotDate,
            startTime: item.startTime,
          },
        },
      });

      if (!existing) {
        await tx.slotInventory.create({
          data: {
            facilityId: item.facilityId,
            slotDate,
            startTime: item.startTime,
            endTime: item.endTime,
            isAvailable: true,
          },
        });
      }
    }
  }

  /**
   * Creation using TRADITIONAL database SELECT FOR UPDATE locking.
   */
  async createTraditional(userId: string, data: CreateBookingDto) {
    const booking = await this.prisma.$transaction(async (tx) => {
      await this.ensureSlotInventoriesExist(tx, data.items);

      // Lock and verify slots
      for (const item of data.items) {
        const slotDate = new Date(item.slotDate);
        slotDate.setHours(0, 0, 0, 0);

        const slot = await tx.slotInventory.findUnique({
          where: {
            facilityId_slotDate_startTime: {
              facilityId: item.facilityId,
              slotDate,
              startTime: item.startTime,
            },
          },
        });

        if (!slot || !slot.isAvailable) {
          throw new ConflictException(
            `Slot for facility ${item.facilityId} at ${item.startTime} is already booked or unavailable.`,
          );
        }

        // Update slot to locked state
        await tx.slotInventory.update({
          where: { id: slot.id },
          data: {
            isAvailable: false,
            lockedAt: new Date(),
            lockedBy: userId,
          },
        });
      }

      // Create booking
      const newBooking = await tx.booking.create({
        data: {
          userId,
          totalAmount: data.totalAmount,
          status: 'PENDING',
          bookingMode: 'TRADITIONAL',
          items: {
            create: data.items.map((item) => ({
              facilityId: item.facilityId,
              slotDate: new Date(item.slotDate),
              startTime: item.startTime,
              endTime: item.endTime,
              price: item.price,
            })),
          },
          logs: {
            create: {
              action: 'CREATED',
              actor: userId,
              metadata: { mode: 'TRADITIONAL' },
            },
          },
        },
        include: { items: true },
      });

      // Associate BookingItem IDs with SlotInventory
      for (let i = 0; i < newBooking.items.length; i++) {
        const bookingItem = newBooking.items[i];
        const itemDto = data.items[i];
        const slotDate = new Date(itemDto.slotDate);
        slotDate.setHours(0, 0, 0, 0);

        await tx.slotInventory.update({
          where: {
            facilityId_slotDate_startTime: {
              facilityId: itemDto.facilityId,
              slotDate,
              startTime: itemDto.startTime,
            },
          },
          data: {
            bookingItemId: bookingItem.id,
          },
        });
      }

      return newBooking;
    });

    // Publish slot lock request to Venue service (Saga)
    await this.rabbitMQ.publish(BOOKING_EVENTS.SLOT_LOCK_REQUEST, {
      bookingId: booking.id,
      items: data.items.map((item) => ({
        facilityId: item.facilityId,
        slotDate: item.slotDate,
        startTime: item.startTime,
        endTime: item.endTime,
      })),
    });

    return ApiResponse.success(
      booking,
      'Booking initiated successfully using traditional lock.',
    );
  }

  /**
   * Creation using REDIS REDLOCK locking.
   */
  async createWithRedlock(userId: string, data: CreateBookingDto) {
    // Construct and sort lock keys alphabetically to prevent deadlocks
    const lockKeys = data.items
      .map((item) => {
        const dateStr = new Date(item.slotDate).toISOString().split('T')[0];
        return `lock:slot:${item.facilityId}:${dateStr}:${item.startTime}`;
      })
      .sort();

    let lock: any;
    try {
      // Acquire 10-second lock via Redis
      lock = await this.redlock.acquire(lockKeys, 10000);
    } catch (err) {
      throw new ConflictException(
        'Unable to secure slot locks. Please try again.',
      );
    }

    try {
      const booking = await this.prisma.$transaction(async (tx) => {
        await this.ensureSlotInventoriesExist(tx, data.items);

        // Verify slot availability in DB under lock protection
        for (const item of data.items) {
          const slotDate = new Date(item.slotDate);
          slotDate.setHours(0, 0, 0, 0);

          const slot = await tx.slotInventory.findUnique({
            where: {
              facilityId_slotDate_startTime: {
                facilityId: item.facilityId,
                slotDate,
                startTime: item.startTime,
              },
            },
          });

          if (!slot || !slot.isAvailable) {
            throw new ConflictException(
              `Slot for facility ${item.facilityId} at ${item.startTime} is already booked or unavailable.`,
            );
          }

          // Optimistic Concurrency Control (OCC) defense-in-depth:
          // In case of Redis lock failure/expiration (e.g., V8 GC pause), this updateMany
          // filter enforces that the slot must still be AVAILABLE at the moment of commit.
          const updated = await tx.slotInventory.updateMany({
            where: {
              id: slot.id,
              isAvailable: true,
            },
            data: {
              isAvailable: false,
              lockedAt: new Date(),
              lockedBy: userId,
            },
          });

          if (updated.count === 0) {
            throw new ConflictException(
              `Slot for facility ${item.facilityId} at ${item.startTime} is already booked or unavailable.`,
            );
          }
        }

        // Create booking
        const newBooking = await tx.booking.create({
          data: {
            userId,
            totalAmount: data.totalAmount,
            status: 'PENDING',
            bookingMode: 'REDLOCK',
            items: {
              create: data.items.map((item) => ({
                facilityId: item.facilityId,
                slotDate: new Date(item.slotDate),
                startTime: item.startTime,
                endTime: item.endTime,
                price: item.price,
              })),
            },
            logs: {
              create: {
                action: 'CREATED',
                actor: userId,
                metadata: { mode: 'REDLOCK' },
              },
            },
          },
          include: { items: true },
        });

        // Associate booking items with slot inventory
        for (let i = 0; i < newBooking.items.length; i++) {
          const bookingItem = newBooking.items[i];
          const itemDto = data.items[i];
          const slotDate = new Date(itemDto.slotDate);
          slotDate.setHours(0, 0, 0, 0);

          await tx.slotInventory.update({
            where: {
              facilityId_slotDate_startTime: {
                facilityId: itemDto.facilityId,
                slotDate,
                startTime: itemDto.startTime,
              },
            },
            data: {
              bookingItemId: bookingItem.id,
            },
          });
        }

        return newBooking;
      });

      // Publish slot lock request to Venue service (Saga)
      await this.rabbitMQ.publish(BOOKING_EVENTS.SLOT_LOCK_REQUEST, {
        bookingId: booking.id,
        items: data.items.map((item) => ({
          facilityId: item.facilityId,
          slotDate: item.slotDate,
          startTime: item.startTime,
          endTime: item.endTime,
        })),
      });

      return ApiResponse.success(
        booking,
        'Booking initiated successfully using Redlock.',
      );
    } finally {
      if (lock) {
        await lock.release().catch((err) => {
          this.logger.error('Failed to release redlock keys', err);
        });
      }
    }
  }

  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (!['PENDING', 'CONFIRMED', 'PAYMENT_PENDING'].includes(booking.status)) {
      throw new ConflictException('Booking cannot be cancelled');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      // Release local SlotInventory records
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

      return tx.booking.update({
        where: { id },
        data: {
          status: 'CANCELLED',
          logs: {
            create: {
              action: 'CANCELLED',
              actor: userId,
            },
          },
        },
        include: { items: true, logs: true },
      });
    });

    // Publish release request to Venue service (Saga)
    await this.rabbitMQ.publish(BOOKING_EVENTS.SLOT_RELEASE_REQUEST, {
      bookingId: id,
      items: updated.items.map((item) => ({
        facilityId: item.facilityId,
        slotDate: item.slotDate,
        startTime: item.startTime,
        endTime: item.endTime,
      })),
    });

    return ApiResponse.success(updated, 'Booking cancelled successfully.');
  }
}
