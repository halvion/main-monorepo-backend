import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { HashingService } from '@app/common';
import { ApiResponse, type JwtPayload } from '@app/common';
import { LoginDto } from './dto/login.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { roles: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials test');
    }

    const isPasswordValid = await this.hashingService.compare(
      dto.password,
      user.password || '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials test 2');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.roles[0]?.name || 'USER',
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Valid for 7 days

    await this.prisma.userSession.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
      },
    });

    return ApiResponse.success(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.roles[0]?.name || 'USER',
        },
        accessToken,
        refreshToken,
      },
      'Login successful',
    );
  }

  async refreshToken(token: string) {
    const session = await this.prisma.userSession.findUnique({
      where: { refreshToken: token },
      include: { user: { include: { roles: true } } },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const payload: JwtPayload = {
      sub: session.user.id,
      email: session.user.email,
      role: session.user.roles[0]?.name || 'USER',
    };
    const accessToken = this.jwtService.sign(payload);

    return ApiResponse.success({ accessToken }, 'Token refreshed');
  }

  async logout(refreshToken: string) {
    await this.prisma.userSession.deleteMany({
      where: { refreshToken },
    });

    return ApiResponse.success(null, 'Logged out successfully');
  }
}
