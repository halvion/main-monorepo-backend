import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import * as amqplib from 'amqplib';
import type { RabbitMQModuleOptions } from './rabbitmq.module';
import { EXCHANGE_NAME } from './constants/events.constant';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: amqplib.ChannelModel | null = null;
  private channel: amqplib.Channel | null = null;

  constructor(
    @Inject('RABBITMQ_OPTIONS')
    private readonly options: RabbitMQModuleOptions,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.disconnect();
  }

  private async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(this.options.url);
      this.channel = await this.connection.createChannel();

      const exchangeName = this.options.exchange || EXCHANGE_NAME;
      await this.channel.assertExchange(exchangeName, 'topic', {
        durable: true,
      });
      await this.channel.assertQueue(this.options.queue, { durable: true });

      this.logger.log(`Connected to RabbitMQ: ${this.options.queue}`);
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      throw error;
    }
  }

  private async disconnect(): Promise<void> {
    try {
      await this.channel?.close();
      await this.connection?.close();
      this.logger.log('Disconnected from RabbitMQ');
    } catch (error) {
      this.logger.error('Error disconnecting from RabbitMQ', error);
    }
  }

  async publish<T>(event: string, data: T): Promise<void> {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    const exchangeName = this.options.exchange || EXCHANGE_NAME;
    const message = JSON.stringify(data);

    this.channel.publish(exchangeName, event, Buffer.from(message), {
      persistent: true,
      timestamp: Date.now(),
    });

    this.logger.debug(`Published event: ${event}`);
  }

  async subscribe(
    pattern: string,
    handler: (data: unknown, msg: amqplib.ConsumeMessage) => Promise<void>,
  ): Promise<void> {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    const exchangeName = this.options.exchange || EXCHANGE_NAME;
    await this.channel.bindQueue(this.options.queue, exchangeName, pattern);

    await this.channel.consume(this.options.queue, async (msg) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());
        await handler(data, msg);
        this.channel?.ack(msg);
      } catch (error) {
        this.logger.error(`Error processing message: ${pattern}`, error);
        this.channel?.nack(msg, false, false);
      }
    });

    this.logger.log(`Subscribed to pattern: ${pattern}`);
  }
}
