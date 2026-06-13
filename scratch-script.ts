import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from './apps/venue-service/generated/venue-prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_VENUE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  const item = {
    facilityId: 'bf077de1-7be5-4560-97f5-2a548a7aa3d7',
    slotDate: '2026-07-20',
    startTime: '14:00',
    endTime: '15:00',
  };

  const slotDate = new Date(item.slotDate);
  slotDate.setHours(0, 0, 0, 0);

  console.log('Processed Date Object:', slotDate);
  console.log('ISO String:', slotDate.toISOString());

  try {
    const slot = await prisma.operatingSlot.findUnique({
      where: {
        facilityId_slotDate_startTime: {
          facilityId: item.facilityId,
          slotDate,
          startTime: item.startTime,
        },
      },
    });

    console.log('Prisma slot query result:', slot);
  } catch (err) {
    console.error('Error running Prisma query:', err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

run();
