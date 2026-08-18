import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { PaginationDto, CurrentUser, JwtAuthGuard } from '@app/common';
import type { JwtPayload } from '@app/common';
import { LogAction } from '@app/logging';
import { CreateBookingDto } from './dto/create-booking.dto';
import { IdempotencyInterceptor } from '../idempotency/idempotency.interceptor';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
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

  @Post('traditional')
  @UseInterceptors(IdempotencyInterceptor)
  @LogAction('CREATE_BOOKING_TRADITIONAL')
  async createTraditional(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingsService.createTraditional(user.sub, dto);
  }

  @Post('redlock')
  @UseInterceptors(IdempotencyInterceptor)
  @LogAction('CREATE_BOOKING_REDLOCK')
  async createRedlock(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingsService.createWithRedlock(user.sub, dto);
  }

  @Post(':id/cancel')
  @UseInterceptors(IdempotencyInterceptor)
  @LogAction('CANCEL_BOOKING')
  async cancel(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.bookingsService.cancel(id, user.sub);
  }
}
