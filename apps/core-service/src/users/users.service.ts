import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto, ApiResponse, createPaginationMeta } from '@app/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password, // TODO: Hash password
        name: dto.name,
        role: {
          connect: { name: dto.roleName || 'USER' },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: { select: { name: true } },
        createdAt: true,
      },
    });

    return ApiResponse.success(user, 'User created successfully');
  }

  async findAll(pagination: PaginationDto) {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip: pagination.skip,
        take: pagination.take,
        select: {
          id: true,
          email: true,
          name: true,
          role: { select: { name: true } },
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return ApiResponse.success(
      users,
      undefined,
      createPaginationMeta(pagination.page ?? 1, pagination.limit ?? 10, total),
    );
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: { 
          select: { 
            name: true,
            permissions: {
              select: {
                permission: { select: { name: true } },
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return ApiResponse.success(user);
  }
}
