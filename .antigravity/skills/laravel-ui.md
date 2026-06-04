# Laravel Frontend Surface Skill
This protocol dictates changes to the client-facing UI built on Laravel.

## Constraints
- This layer acts strictly as a **frontend surface**. It must not handle core business data mutations directly via Eloquent or interact directly with the core services' PostgreSQL databases.
- All dynamic data must be fetched or mutated by communicating with the NestJS backend APIs.
- API Endpoints map to:
  - Core Service: `http://localhost:3001` (Auth, profiles, permissions)
  - Booking Service: `http://localhost:3002` (Bookings, slot reservations)
  - Venue Service: `http://localhost:3003` (Facilities, schedule views)
  - Payment Service: `http://localhost:3004` (Invoices, payment gateway integrations)

## Execution Rules
1. **API Communications:**
   - Always route data queries and mutations through Laravel's HTTP Client (e.g., `Http::` wrapper) targeting the specific NestJS backend microservice.
   - Inject the bearer token or authentication header in downstream requests if authenticating on behalf of a user.
2. **Database Restrictions:**
   - Never write database migrations in the Laravel app that modify the core business schemas (`CORE`, `VENUE`, `BOOKING`, `PAYMENT`, `LOGGING`).
   - If frontend session caching is needed, use Redis or local session variables rather than persistent database tables.
3. **Error Handling:**
   - Gracefully parse and handle the standard JSON error responses sent by the NestJS backend.
   - Do not display raw NestJS stack traces or microservice database errors to end-users. Translate them into descriptive, localized UI warning states.
