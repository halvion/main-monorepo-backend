/*
  Warnings:

  - You are about to drop the `request_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "request_logs";

-- CreateTable
CREATE TABLE "request_logs_h" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "statusCode" INTEGER,
    "userId" TEXT,
    "action" TEXT,
    "responseTime" INTEGER,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "request_logs_h_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_logs_d" (
    "id" TEXT NOT NULL,
    "headerId" TEXT NOT NULL,
    "requestBody" JSONB,
    "responseBody" JSONB,
    "exceptionMessage" TEXT,
    "stackTrace" TEXT,

    CONSTRAINT "request_logs_d_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "request_logs_d_headerId_key" ON "request_logs_d"("headerId");

-- AddForeignKey
ALTER TABLE "request_logs_d" ADD CONSTRAINT "request_logs_d_headerId_fkey" FOREIGN KEY ("headerId") REFERENCES "request_logs_h"("id") ON DELETE CASCADE ON UPDATE CASCADE;
