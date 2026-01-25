import { Controller, Get, Post, Body, Param, Query, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import type { JwtPayload } from '@app/common';
import { PaginationDto, Roles, CurrentUser, RolesGuard } from '@app/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { LogAction } from '@app/logging';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @LogAction('USER_REGISTER')
  async register(@Body() dto: RegisterDto) {
    return this.usersService.register(dto);
  }

  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @LogAction('CREATE_USER')
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all users (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of users returned' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @LogAction('LIST_USERS')
  async findAll(@Query() pagination: PaginationDto) {
    return this.usersService.findAll(pagination);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile returned' })
  @LogAction('GET_PROFILE')
  async getProfile(@CurrentUser() user: JwtPayload) {
    if (!user) {
      throw new UnauthorizedException('Please log in to view your profile');
    }
    return this.usersService.findById(user.sub);
  }

  @Get(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get user by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'User data returned' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @LogAction('GET_USER')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
