import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { PaginationDto, Roles, CurrentUser } from '@app/common';
import type { JwtPayload } from '@app/common';

import { RolesGuard } from '@app/common';
import { LogAction } from '@app/logging';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Get()
  @LogAction('LIST_FACILITIES')
  async findAll(@Query() pagination: PaginationDto) {
    return this.facilitiesService.findAll(pagination);
  }

  @Get(':id')
  @LogAction('GET_FACILITY')
  async findOne(@Param('id') id: string) {
    return this.facilitiesService.findById(id);
  }

  @Post()
  @Roles('OWNER', 'ADMIN')
  @UseGuards(RolesGuard)
  @LogAction('CREATE_FACILITY')
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() data: any, // TODO: Create proper DTO
  ) {
    return this.facilitiesService.create(user.sub, data);
  }
}
