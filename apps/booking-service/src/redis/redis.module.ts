import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import Redlock from 'redlock';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL', 'redis://localhost:6379');
        return new Redis(redisUrl);
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDLOCK',
      useFactory: (redisClient: Redis) => {
        return new Redlock([redisClient], {
          driftFactor: 0.01,
          // Retry logic configuration
          retryCount: 10,
          retryDelay: 200,
          retryJitter: 200,
        });
      },
      inject: ['REDIS_CLIENT'],
    },
  ],
  exports: ['REDIS_CLIENT', 'REDLOCK'],
})
export class RedisModule {}
