-- CreateEnum
CREATE TYPE "BookingMode" AS ENUM ('TRADITIONAL', 'REDLOCK');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "bookingMode" "BookingMode" NOT NULL DEFAULT 'TRADITIONAL';
