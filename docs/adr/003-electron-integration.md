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
