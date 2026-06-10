import { Controller, Post, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import type { Response } from 'express';

@Controller('payments')
export class MidtransController {
  constructor(private readonly midtransService: MidtransService) {}

  @Post(':id/pay')
  async payBooking(@Param('id') id: string, @Res() res: Response) {
    try {
      const token = await this.midtransService.generateSnapToken(id);
      return res.status(HttpStatus.OK).json({ data: { token } });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('midtrans-webhook')
  async handleWebhook(@Body() payload: any, @Res() res: Response) {
    try {
      await this.midtransService.handleWebhook(payload);
      return res.status(HttpStatus.OK).send('OK');
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Webhook Error');
    }
  }
}
