import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '@app/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { roles: { select: { name: true } } },
    });

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return ApiResponse.success({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.roles,
      },
      accessToken: 'dummy_token', // TODO: Implement actual JWT
    }, 'Login successful');
  }

  async refreshToken(token: string) {
    throw new UnauthorizedException('Not implemented');
  }
}
