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
