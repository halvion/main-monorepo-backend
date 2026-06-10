import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'prisma/config';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default defineConfig({
  schema: 'prisma/booking.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_BOOKING_URL'],
  },
});
