# Halvion - Development Rules & Architecture Guide

This document outlines the architecture, rules, patterns, and guidelines for developing and maintaining the Halvion High-Concurrency Sports Venue Reservation System. Use this guide to create new services, debug existing issues, and write consistent code.

---

## 1. Monorepo Architecture Overview

This project is a NestJS monorepo utilizing NestJS workspaces:
*   **`apps/`**: Contains the individual microservices.
    *   [core-service](file:///D:/Projects/main-monorepo-backend/apps/core-service) (Port 3001): Authentication, user registration, profiles, roles, and permissions.
    *   [booking-service](file:///D:/Projects/main-monorepo-backend/apps/booking-service) (Port 3002): Handles reservation creation, slot management, Sagas, and audit trails.
    *   [venue-service](file:///D:/Projects/main-monorepo-backend/apps/venue-service) (Port 3003): Handles sports facilities, locations, and maintenance schedules.
    *   [payment-service](file:///D:/Projects/main-monorepo-backend/apps/payment-service) (Port 3004): Handles payment processing, invoicing, and refunds.
*   **`libs/`**: Contains shared libraries packaged as NestJS libraries and exported via paths (e.g., `@app/common`).
    *   [common](file:///D:/Projects/main-monorepo-backend/libs/common): Shared DTOs, response structures, decorators, guards, and JWT strategies.
    *   [database](file:///D:/Projects/main-monorepo-backend/libs/database): Base Prisma configurations and abstract base service.
    *   [rabbitmq](file:///D:/Projects/main-monorepo-backend/libs/rabbitmq): Shared RabbitMQ module and service wrapping `amqplib`.
    *   [logging](file:///D:/Projects/main-monorepo-backend/libs/logging): Shared database-driven logging module, exception filters, and request interceptors.

---

## 2. Database and Prisma Configuration

Halvion uses a database-per-service pattern with PostgreSQL schemas.

### Rules for Database Modifications:
1.  **Isolated Schema**: Every service has its own Prisma schema:
    *   `apps/<service-name>/prisma/<service-name>.prisma`
    *   `libs/logging/prisma/logging.prisma` (logs are kept in a separate `LOGGING` database).
2.  **Prisma Config**: Each schema uses a `prisma.config.ts` configuration file located in the service's/library's root directory, leveraging Prisma's configuration system.
3.  **Generated Clients**: Prisma clients must be generated in the service-specific output folder using service-specific generated scopes to prevent name collision:
    ```prisma
    generator client {
      provider = "prisma-client" // or prisma-client-js
      output   = "../generated/<service-name>-prisma"
    }
    ```
4.  **CLI Scripts**: Use the root `package.json` script commands to run migrations and generate clients:
    *   Generate a service client: `npm run prisma:generate:<service>`
    *   Generate all clients: `npm run prisma:generate:all`
    *   Create a migration: `npm run prisma:migrate:<service>`

---

## 3. Custom Exception Filters and Logging Service

Halvion implements a structured request/exception logging mechanism managed by the `libs/logging` library.

### How it Works:
1.  **`LoggingModule`**: The library exports a dynamic `LoggingModule`. It must be registered in each service's root module:
    ```typescript
    LoggingModule.forRoot({
      serviceName: 'booking-service',
      enableGlobal: true, // Automatically registers interceptor and exception filter
    })
    ```
2.  **`LoggingInterceptor`**: Intercepts successful API requests and logs them (excluding sensitive data like passwords/tokens) to the logging database (`LOGGING` database).
3.  **`LoggingExceptionFilter`**: Catches unhandled exceptions, logs them to the console with stack traces, and records the error details in the logging database.
4.  **Action Decorator**: Controllers can annotate handlers with `@LogAction('ACTION_NAME')` (from `@app/logging`) to audit specific business events.

> [!IMPORTANT]
> **Exception Filter Conflict Warning:**
> If you register an exception filter in `main.ts` using `app.useGlobalFilters(new HttpExceptionFilter())` (or similar), **it will bypass `LoggingExceptionFilter`**. Consequently, exceptions will not be logged to the database.
>
> **Action Required:**
> *   Do not use `app.useGlobalFilters()` in `main.ts` if database-level error auditing is required.
> *   If custom formatting is needed, modify `LoggingExceptionFilter` directly in `libs/logging/src/logging-exception.filter.ts`.
> *   Note: The current placeholder `app.useGlobalFilters(new HttpExceptionFilter())` in `booking`, `venue`, and `payment` services imports a non-existent `HttpExceptionFilter` class from `@app/common`, causing compile errors. Remove this registration line from those services' `main.ts` files to fix compilation and restore database logging.

---

## 4. Message Queuing (RabbitMQ) and Saga Orchestration

RabbitMQ is used for Saga choreography across services.

### Rules for Message Queuing:
1.  **Publishing Events**: Inject `RabbitMQService` and publish using defined event routing keys:
    ```typescript
    import { RabbitMQService, BOOKING_EVENTS } from '@app/rabbitmq';
    
    await this.rabbitMQ.publish(BOOKING_EVENTS.BOOKING_CREATED, { bookingId: '...' });
    ```
2.  **Subscribing to Events**: In your service modules, subscribe to patterns using the `subscribe` method:
    ```typescript
    await this.rabbitMQ.subscribe(BOOKING_EVENTS.SLOT_LOCK_REQUEST, async (data, msg) => {
      // Handle event...
    });
    ```
3.  **Event Constants**: All event keys and queue names must be declared in [events.constant.ts](file:///D:/Projects/main-monorepo-backend/libs/rabbitmq/src/constants/events.constant.ts). Do not hardcode event routing keys or queue names.

---

## 5. Redis Concurrency Control (Distributed Locking)

To prevent double-bookings, Redis-based locking (using `ioredis` and `redlock`) is utilized.

### Rules for Concurrency Locks:
1.  **Mutex Keys**: Lock keys should follow a strict prefix and naming convention:
    *   Format: `lock:slot:<facilityId>:<slotDate>:<startTime>`
2.  **Execution Window**: Keep the duration of locks minimal (e.g., 5-10 seconds) during the creation of bookings.
3.  **Resource Cleanup**: Always release the lock inside a `finally` block or let the TTL handle expiry if a crash occurs.
4.  **Database Sync**: Verify the slot availability in the `SlotInventory` database table *after* acquiring the Redis lock to ensure the status hasn't changed.

---

## 6. How to Create a New Microservice

Follow these steps to add a new service to the monorepo:

1.  **Generate Service**:
    Run the Nest CLI generator from the root directory:
    ```bash
    npx nest g app <new-service-name>
    ```
2.  **Configure Paths and Ports**:
    *   Verify the new entry in `nest-cli.json` and `tsconfig.json`.
    *   Allocate a new unique port (e.g., `3005`). Update `DEPLOYMENT.md` and the environment files.
3.  **Setup Environments**:
    *   Create `apps/<new-service-name>/.env.example` and `.env` files.
    *   Define `PORT`, `DATABASE_URL`, `LOGGING_DATABASE_URL`, `RABBITMQ_URL`, and `REDIS_URL`.
4.  **Setup Prisma Schema**:
    *   Create the schema file: `apps/<new-service-name>/prisma/<new-service-name>.prisma`.
    *   Create `prisma.config.ts` in `apps/<new-service-name>/` referencing the new schema and `DATABASE_URL`.
    *   Add generate and migrate scripts for the new service in the root `package.json`.
    *   Run `npm run prisma:generate:<new-service-name>`.
5.  **Configure App/Service Module**:
    *   Import `ConfigModule.forRoot` pointed to the service `.env` file.
    *   Import `LoggingModule.forRoot` with the correct `serviceName`.
    *   If using message queues, import `RabbitMQModule.forRootAsync` referencing the service's queue name (defined in `libs/rabbitmq/src/constants/events.constant.ts`).
6.  **Fix Exception Filters**:
    *   Remove any manual `app.useGlobalFilters(new HttpExceptionFilter())` in the new service's `main.ts` to allow `LoggingExceptionFilter` to operate.
