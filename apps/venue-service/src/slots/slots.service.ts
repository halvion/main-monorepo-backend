import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '@app/common';

@Injectable()
export class SlotsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find available slots for a facility on a specific date.
   * If no slots are found, auto-seed them for the facility.
   */
  async findAvailableSlots(facilityId: string, dateStr: string) {
    const facility = await this.prisma.facility.findUnique({
      where: { id: facilityId },
      include: { metadata: true },
    });

    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    // Try fetching existing slots
    let slots = await this.prisma.operatingSlot.findMany({
      where: {
        facilityId,
        slotDate: date,
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    // If no slots exist for this date, trigger seeding for this date and next 30 days
    if (slots.length === 0 && facility.metadata) {
      const openTime = facility.metadata.openTime || '08:00';
      const closeTime = facility.metadata.closeTime || '22:00';
      await this.seedSlotsForFacility(facilityId, openTime, closeTime, 30, date);
      
      // Fetch again after seeding
      slots = await this.prisma.operatingSlot.findMany({
        where: {
          facilityId,
          slotDate: date,
        },
        orderBy: {
          startTime: 'asc',
        },
      });
    }

    return ApiResponse.success(slots);
  }

  /**
   * Seed hourly slots for a facility starting from a specific start date.
   */
  async seedSlotsForFacility(
    facilityId: string,
    openTime: string,
    closeTime: string,
    daysAhead = 30,
    startDate: Date = new Date()
  ) {
    const openHour = parseInt(openTime.split(':')[0], 10);
    const closeHour = parseInt(closeTime.split(':')[0], 10);

    if (isNaN(openHour) || isNaN(closeHour) || openHour >= closeHour) {
      return;
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const slotData: Array<{
      facilityId: string;
      slotDate: Date;
      startTime: string;
      endTime: string;
      isAvailable: boolean;
    }> = [];

    for (let day = 0; day < daysAhead; day++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + day);

      for (let hour = openHour; hour < closeHour; hour++) {
        const startStr = `${hour.toString().padStart(2, '0')}:00`;
        const endStr = `${(hour + 1).toString().padStart(2, '0')}:00`;

        slotData.push({
          facilityId,
          slotDate: currentDate,
          startTime: startStr,
          endTime: endStr,
          isAvailable: true,
        });
      }
    }

    if (slotData.length > 0) {
      await this.prisma.operatingSlot.createMany({
        data: slotData,
        skipDuplicates: true,
      });
    }
  }
}
