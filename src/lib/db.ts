// Prisma Client Singleton
// This pattern prevents multiple instances of Prisma Client being created during
// Next.js hot-reloading in development.

import { PrismaClient } from "@prisma/client";
import path from "path";

const prismaClientSingleton = () => {
  // Check if the code is running within an Electron environment
  const isElectron = typeof process !== 'undefined' && !!process.versions.electron;
  
  let dbUrl = process.env.DATABASE_URL;

  // Fallback for build time if DATABASE_URL is missing
  if (!dbUrl && process.env.NODE_ENV === "production") {
    dbUrl = "postgresql://dummy:dummy@localhost:5432/dummy";
  }

  const options: any = {
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  };

  if (dbUrl) {
    options.datasources = {
      db: {
        url: dbUrl,
      },
    };
  }

  return new PrismaClient(options);
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
