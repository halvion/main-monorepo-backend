import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoreModule } from './core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('CoreService');
  try {
    const app = await NestFactory.create(CoreModule);

    //#region Swagger
    const config = new DocumentBuilder()
      .setTitle('Core Service API')
      .setDescription('Core Service API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const documentFactory = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory, {
      jsonDocumentUrl: 'swagger/json',
    });
    //#endregion

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // CORS configuration
    const configService = app.get(ConfigService);
    const allowedOrigins = configService
      .get<string>('ALLOWED_ORIGINS')
      ?.split(',') || ['http://localhost:3000'];

    app.enableCors({
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    const port =
      configService.get<number>('PORT') ||
      configService.get<number>('CORE_PORT', 3001);

    await app.listen(port, '0.0.0.0');
    logger.log(`Core Service is running on port ${port}`);
    logger.log(`Swagger documentation available at http://localhost:${port}/api`);
  } catch (error) {
    logger.error('Failed to start Core Service', (error as Error).stack);
    process.exit(1);
  }
}

bootstrap();
