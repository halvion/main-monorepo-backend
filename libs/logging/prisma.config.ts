import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/logging.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['LOGGING_DATABASE_URL'],
  },
});
