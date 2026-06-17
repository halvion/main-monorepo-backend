import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VenueModule } from './venue.module';

async function bootstrap() {
  const logger = new Logger('VenueService');
  try {
    const app = await NestFactory.create(VenueModule);

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
      configService.get<number>('VENUE_PORT', 3003);

    await app.listen(port, '0.0.0.0');
    logger.log(`Venue Service is running on port ${port}`);
  } catch (error) {
    logger.error('Failed to start Venue Service', (error as Error).stack);
    process.exit(1);
  }
}

bootstrap();
