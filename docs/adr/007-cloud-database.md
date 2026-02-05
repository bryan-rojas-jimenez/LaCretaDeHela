# ADR 007: Migration to PostgreSQL for PWA Support

## Status
Accepted

## Context
The project initially used SQLite for a standalone, local-only desktop experience. However, the requirement to support a **Progressive Web App (PWA)** with mobile scanning capabilities necessitates a centralized, cloud-accessible database.

## Decision
We are migrating the data layer from **SQLite** to **PostgreSQL**.

## Consequences
- **Pros:**
    - Enables multi-user collaboration (Office + Warehouse simultaneously).
    - Allows PWA access from mobile devices.
    - Supports real-time notifications (via future WebSockets/SSE).
- **Cons:**
    - Requires an internet connection for the app to function (initially).
    - Introduces a dependency on a cloud provider (Neon/Supabase).

## Migration Strategy
1.  Update Prisma Schema provider.
2.  Set up `DATABASE_URL` environment variable.
3.  Run `npx prisma db push` to synchronize the schema with the cloud.
