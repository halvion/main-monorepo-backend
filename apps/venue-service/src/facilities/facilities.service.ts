import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto, ApiResponse, createPaginationMeta } from '@app/common';
import { SlotsService } from '../slots/slots.service';
import { FindAllFacilitiesDto } from './dto/find-all-facilities.dto';

@Injectable()
export class FacilitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slotsService: SlotsService,
  ) {}

  async findAll(query: FindAllFacilitiesDto) {
    const where: any = {
      isActive: true,
    };

    if (query.type) {
      where.metadata = {
        type: query.type,
      };
    }

    if (query.isIndoor !== undefined) {
      if (!where.metadata) {
        where.metadata = {};
      }
      where.metadata.isIndoor = query.isIndoor;
    }

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      where.OR = [
        { name: { contains: searchLower, mode: 'insensitive' } },
        { description: { contains: searchLower, mode: 'insensitive' } },
        { address: { contains: searchLower, mode: 'insensitive' } },
      ];
    }

    const orderBy: any = {};
    if (query.sortByPrice) {
      orderBy.metadata = {
        pricePerHour: query.sortByPrice,
      };
    } else {
      orderBy.createdAt = 'desc';
    }

    const [facilities, total] = await Promise.all([
      this.prisma.facility.findMany({
        skip: query.skip,
        take: query.take,
        where,
        include: {
          metadata: true,
          images: { where: { isPrimary: true }, take: 1 },
        },
        orderBy,
      }),
      this.prisma.facility.count({ where }),
    ]);

    return ApiResponse.success(
      facilities,
      undefined,
      createPaginationMeta(query.page ?? 1, query.limit ?? 10, total),
    );
  }

  async findById(id: string) {
    const facility = await this.prisma.facility.findUnique({
      where: { id },
      include: {
        metadata: true,
        images: true,
        maintenance: {
          where: { endDate: { gte: new Date() } },
          orderBy: { startDate: 'asc' },
        },
      },
    });

    if (!facility) {
      throw new NotFoundException('Facility not found');
    }

    return ApiResponse.success(facility);
  }

  async create(ownerId: string, data: any) {
    const facility = await this.prisma.facility.create({
      data: {
        ownerId,
        name: data.name,
        description: data.description,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        metadata: data.metadata ? { create: data.metadata } : undefined,
      },
      include: { metadata: true },
    });

    if (facility.metadata) {
      const openTime = facility.metadata.openTime || '08:00';
      const closeTime = facility.metadata.closeTime || '22:00';
      this.slotsService.seedSlotsForFacility(facility.id, openTime, closeTime, 30).catch(() => {});
    }

    return ApiResponse.success(facility, 'Facility created successfully');
  }
}
