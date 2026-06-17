import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const logger = new Logger('PaymentService');
  try {
    const app = await NestFactory.create(PaymentModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    app.enableCors();

    const configService = app.get(ConfigService);
    const port =
      configService.get<number>('PORT') ||
      configService.get<number>('PAYMENT_PORT', 3004);

    await app.listen(port, '0.0.0.0');
    logger.log(`Payment Service is running on port ${port}`);
  } catch (error) {
    logger.error('Failed to start Payment Service', (error as Error).stack);
    process.exit(1);
  }
}

bootstrap();
