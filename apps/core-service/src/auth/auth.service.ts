import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '@app/common';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: { email: string; password: string; name: string }) {
    // TODO: Implement password hashing with bcrypt
    // TODO: Implement JWT token generation
    
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password, // TODO: Hash password
        name: data.name,
        role: {
          connect: { name: 'USER' },
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

    return ApiResponse.success(user, 'User registered successfully');
  }

  async login(data: { email: string; password: string }) {
    // TODO: Implement password verification with bcrypt
    // TODO: Implement JWT token generation
    
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: { role: true },
    });

    if (!user || user.password !== data.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return ApiResponse.success({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
    }, 'Login successful');
  }

  async refreshToken(refreshToken: string) {
    throw new UnauthorizedException('Not implemented');
  }
}
