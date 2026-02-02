# ADR 001: Choice of Next.js with App Router

## Status
Accepted

## Context
We needed a modern, full-stack framework that supports rapid development, excellent SEO (for the landing page), and robust server-side logic for the ERP modules.

## Decision
We chose **Next.js 14+ with the App Router** and TypeScript.

## Consequences
- **Pros:** Unified codebase for frontend and backend, built-in routing, and high performance through Server Components.
- **Cons:** Learning curve for the new App Router paradigms (e.g., Server Actions vs. API Routes).
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
# ADR 003: Desktop Application via Electron

## Status
Accepted

## Context
The user requested the ability to run the application as a standalone executable on different devices without requiring the user to install a web server manually.

## Decision
We integrated **Electron** to wrap the Next.js application into a native desktop window.

## Consequences
- **Pros:** Native "double-click" experience, access to local file systems, and bundling of the Node.js runtime.
- **Cons:** Increased bundle size (~100MB+) due to the inclusion of the Chromium engine.
# ADR 004: UI Components and Styling

## Status
Accepted

## Context
The application requires a professional, dynamic, and colorful interface that is easy to maintain and expand.

## Decision
We chose **Tailwind CSS** for utility-first styling and **shadcn/ui** (based on Radix UI) for accessible, customizable components.

## Consequences
- **Pros:** Rapid UI development, consistent design language across all ERP modules, and high accessibility standards.
- **Cons:** Requires a build step to generate the final CSS.
