import { Controller, Get, Query } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { QuerySlotsDto } from './dto/query-slots.dto';
import { LogAction } from '@app/logging';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  @LogAction('GET_AVAILABLE_SLOTS')
  async getSlots(@Query() query: QuerySlotsDto) {
    return this.slotsService.findAvailableSlots(query.facilityId, query.date);
  }
}
