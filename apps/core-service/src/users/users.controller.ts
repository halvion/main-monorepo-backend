import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import type { JwtPayload } from '@app/common';
import { PaginationDto, Roles, CurrentUser, RolesGuard } from '@app/common';
import { LogAction } from '@app/logging';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @LogAction('LIST_USERS')
  async findAll(@Query() pagination: PaginationDto) {
    return this.usersService.findAll(pagination);
  }

  @Get('me')
  @LogAction('GET_PROFILE')
  async getProfile(@CurrentUser() user: JwtPayload) {
    return this.usersService.findById(user.sub);
  }

  @Get(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @LogAction('GET_USER')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
