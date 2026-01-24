import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '@app/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(register: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: register.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.prisma.user.create({
      data: {
        email: register.email,
        password: register.password, // TODO: Hash password
        name: register.name,
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

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return ApiResponse.success({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
      accessToken: 'dummy_token', // TODO: Implement actual JWT
    }, 'Login successful');
  }

  async refreshToken(token: string) {
    throw new UnauthorizedException('Not implemented');
  }
}
