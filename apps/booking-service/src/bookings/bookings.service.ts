import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RabbitMQService, BOOKING_EVENTS } from '@app/rabbitmq';
import { PaginationDto, ApiResponse, createPaginationMeta } from '@app/common';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbitMQ: RabbitMQService,
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

  async create(userId: string, data: any) {
    const booking = await this.prisma.booking.create({
      data: {
        userId,
        totalAmount: data.totalAmount || 0,
        status: 'PENDING',
        items: {
          create: data.items?.map((item: any) => ({
            facilityId: item.facilityId,
            slotDate: new Date(item.slotDate),
            startTime: item.startTime,
            endTime: item.endTime,
            price: item.price || 0,
          })) || [],
        },
        logs: {
          create: {
            action: 'CREATED',
            actor: userId,
            metadata: { source: 'api' },
          },
        },
      },
      include: { items: true, logs: true },
    });

    await this.rabbitMQ.publish(BOOKING_EVENTS.BOOKING_CREATED, {
      bookingId: booking.id,
      userId,
      items: booking.items,
      totalAmount: booking.totalAmount,
    });

    return ApiResponse.success(booking, 'Booking created successfully');
  }

  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (!['PENDING', 'CONFIRMED', 'PAYMENT_PENDING'].includes(booking.status)) {
      throw new ConflictException('Booking cannot be cancelled');
    }

    const updated = await this.prisma.booking.update({
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

    await this.rabbitMQ.publish(BOOKING_EVENTS.BOOKING_CANCELLED, {
      bookingId: id,
      userId,
    });

    return ApiResponse.success(updated, 'Booking cancelled');
  }
}
