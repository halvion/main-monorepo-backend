import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'prisma/config';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default defineConfig({
  schema: 'prisma/logging.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['LOGGING_DATABASE_URL'],
  },
});
