-- CreateTable
CREATE TABLE "operating_slots" (
    "id" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "slotDate" DATE NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operating_slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "operating_slots_facilityId_slotDate_startTime_key" ON "operating_slots"("facilityId", "slotDate", "startTime");

-- AddForeignKey
ALTER TABLE "operating_slots" ADD CONSTRAINT "operating_slots_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
