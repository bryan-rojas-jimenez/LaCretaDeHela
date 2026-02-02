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
