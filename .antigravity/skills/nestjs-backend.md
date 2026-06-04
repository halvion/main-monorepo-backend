# NestJS Backend Engineer Skill
This protocol dictates how to handle modifications to the NestJS mono-repo.

## Architecture Constraints
- **Framework:** NestJS with TypeScript in a NestJS monorepo workspace.
- **Microservices & Ports:**
  - `core-service` (Port 3001): Authentication, user profiles, roles, and permissions.
  - `booking-service` (Port 3002): Bookings, slot management, Saga orchestration, audit trail.
  - `venue-service` (Port 3003): Facilities, locations, and maintenance schedules.
  - `payment-service` (Port 3004): Payment processing, invoicing, and refunds.
- **Shared Libraries (via `@app/` path mapping):**
  - `libs/common` (`@app/common`): Shared DTOs, guards, decorators, strategies.
  - `libs/database` (`@app/database`): Base Prisma configurations and abstract base service.
  - `libs/rabbitmq` (`@app/rabbitmq`): Shared RabbitMQ publisher/subscriber client wrapping `amqplib`.
  - `libs/logging` (`@app/logging`): Structured request auditing and unhandled error logger.
- **Database & Prisma:**
  - Database-per-service pattern using PostgreSQL with separate schemas (`CORE`, `VENUE`, `BOOKING`, `PAYMENT`, `LOGGING`).
  - Prisma schema locations:
    - `apps/core-service/prisma/core-service.prisma`
    - `apps/booking-service/prisma/booking-service.prisma`
    - `apps/venue-service/prisma/venue-service.prisma`
    - `apps/payment-service/prisma/payment-service.prisma`
    - `libs/logging/prisma/logging.prisma`
  - Generated clients output folder must use service-specific scopes (e.g. `../generated/booking-service-prisma`) to prevent collisions.
- **Messaging (RabbitMQ):**
  - RabbitMQ handles asynchronous events and Saga choreography.
  - Event keys and queue names must be declared in [events.constant.ts](file:///d:/Projects/main-monorepo-backend/libs/rabbitmq/src/constants/events.constant.ts). Do not use hardcoded strings for event routing keys or queues.
- **Concurrency Control (Redis):**
  - Redis (via `ioredis` and `redlock`) is strictly reserved for distributed locking mechanisms (e.g., handling booking slots concurrency race conditions).
  - Mutex key format: `lock:slot:<facilityId>:<slotDate>:<startTime>`.
- **Environment:**
  - Do not run PostgreSQL, Redis, or RabbitMQ raw on the host. Always use the running Docker containers (configured via `docker-compose.yml`).

## Execution Rules
1. **Docker Pre-Flight check:** Analyze the Docker environment (`docker ps`) before applying migrations or service layer changes.
2. **Prisma Schema modifications:** 
   - After updating any `.prisma` file, run `npm run prisma:generate:<service>` (or `npm run prisma:generate:all` if multiple are modified).
   - Use `npm run prisma:migrate:<service>` to create and apply migrations.
3. **Structured Request & Exception Logging:**
   - Error auditing is managed globally by `LoggingExceptionFilter` in `libs/logging/src/logging-exception.filter.ts`.
   - **CRITICAL WARNING:** Do not use manual global filter registration in any service `main.ts` (e.g. `app.useGlobalFilters(...)`) as this overrides `LoggingExceptionFilter` and breaks DB auditing.
   - Decorate audit-critical controller handlers with `@LogAction('ACTION_NAME')` from `@app/logging`.
4. **RabbitMQ Topologies:**
   - Register any new RabbitMQ exchanges/queues in the `RabbitMQModule` registration wrapper. Publish using `RabbitMQService.publish(EVENT, payload)` and subscribe using `RabbitMQService.subscribe(EVENT, callback)`.
5. **High-Concurrency Booking Pattern:**
   - High-concurrency booking mutations must invoke the Redis distributed lock before database writes.
   - Always verify the slot availability in the `SlotInventory` database table *after* successfully acquiring the Redis lock.
   - Clean up locking resources inside a `finally` block to prevent deadlocks.
6. **Lint & Build Verification:**
   - After making changes, run `npm run lint` and `npm run build` (or build the specific service, e.g. `npx nest build booking-service`) to verify compilation and type-safety.
