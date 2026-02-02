// Prisma Client Singleton
// This pattern prevents multiple instances of Prisma Client being created during
// Next.js hot-reloading in development.

import { PrismaClient } from "@prisma/client";
import path from "path";

const prismaClientSingleton = () => {
  // Check if the code is running within an Electron environment
  const isElectron = typeof process !== 'undefined' && !!process.versions.electron;
  
  let dbUrl = process.env.DATABASE_URL;

  // CRITICAL LOGIC: Portable Database Path
  // When running as a packaged Electron app, we move the SQLite database to the 
  // user's application data folder. This ensures the database is writable and 
  // persistent, as the app installation folder is often read-only.
  if (isElectron && process.env.NODE_ENV === "production") {
    const { app } = require('electron');
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'dev.db');
    dbUrl = `file:${dbPath}`;
  }

  // Fallback for build-time or non-Electron web environments
  if (!dbUrl) {
    dbUrl = `file:${path.join(process.cwd(), 'prisma/dev.db')}`;
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
