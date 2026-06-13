import { Controller, Post, Param, Body, HttpStatus, HttpCode, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { MidtransService } from './midtrans.service';

@Controller('payments')
export class MidtransController {
  constructor(private readonly midtransService: MidtransService) {}

  @Post(':id/pay')
  @HttpCode(HttpStatus.OK)
  async payBooking(@Param('id') id: string) {
    try {
      const token = await this.midtransService.generateSnapToken(id);
      return { data: { token } };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('midtrans-webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() payload: any) {
    try {
      await this.midtransService.handleWebhook(payload);
      return 'OK';
    } catch (error) {
      throw new InternalServerErrorException('Webhook Error');
    }
  }
}
