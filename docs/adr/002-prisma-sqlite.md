# ADR 002: Data Management with Prisma and SQLite

## Status
Accepted

## Context
The application requires a relational database to manage complex entities (Inventory, CRM, Projects). It must be easy to run locally for an MVP but scalable for future cloud deployment.

## Decision
We selected **Prisma ORM** with **SQLite** as the initial data source.

## Consequences
- **Pros:** Zero-configuration setup for local use; Prisma makes migrating to PostgreSQL (ADR 003 path) as simple as changing a connection string.
- **Cons:** SQLite is not suitable for high-concurrency cloud environments (though perfect for this desktop-focused MVP).
