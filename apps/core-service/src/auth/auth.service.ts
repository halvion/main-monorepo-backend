import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { HashingService } from '@app/common';
import { ApiResponse, type JwtPayload } from '@app/common';
import { LoginDto } from './dto/login.dto';

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
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashingService.compare(
      dto.password,
      user.password || '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.roles[0]?.name || 'USER',
    };

    const accessToken = this.jwtService.sign(payload);

    return ApiResponse.success(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.roles[0]?.name || 'USER',
        },
        accessToken,
      },
      'Login successful',
    );
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const newPayload: JwtPayload = {
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      };
      const accessToken = this.jwtService.sign(newPayload);
      return ApiResponse.success({ accessToken }, 'Token refreshed');
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}

