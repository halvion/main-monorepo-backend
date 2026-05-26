import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VenueModule } from './venue.module';


async function bootstrap() {
  const logger = new Logger('VenueService');
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
  const port = configService.get<number>('PORT', 3002);

  await app.listen(port);
  logger.log(`Venue Service is running on port ${port}`);
}

bootstrap();
