import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { PaginationDto, CurrentUser, JwtPayload } from '@app/common';
import { LogAction } from '@app/logging';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @LogAction('LIST_BOOKINGS')
  async findAll(
    @CurrentUser() user: JwtPayload,
    @Query() pagination: PaginationDto,
  ) {
    return this.bookingsService.findByUser(user.sub, pagination);
  }

  @Get(':id')
  @LogAction('GET_BOOKING')
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }

  @Post()
  @LogAction('CREATE_BOOKING')
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() data: any, // TODO: Create proper DTO
  ) {
    return this.bookingsService.create(user.sub, data);
  }

  @Post(':id/cancel')
  @LogAction('CANCEL_BOOKING')
  async cancel(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
  ) {
    return this.bookingsService.cancel(id, user.sub);
  }
}
