-- CreateTable
CREATE TABLE "request_logs" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "statusCode" INTEGER,
    "userId" TEXT,
    "action" TEXT,
    "requestBody" JSONB,
    "responseTime" INTEGER,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "request_logs_pkey" PRIMARY KEY ("id")
);
