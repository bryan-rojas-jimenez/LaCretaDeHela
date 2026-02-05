// Prisma Client Singleton
// This pattern prevents multiple instances of Prisma Client being created during
// Next.js hot-reloading in development.

import { PrismaClient } from "@prisma/client";
import path from "path";

const prismaClientSingleton = () => {
  // Check if the code is running within an Electron environment
  const isElectron = typeof process !== 'undefined' && !!process.versions.electron;
  
  let dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.warn("⚠️ DATABASE_URL is missing. Please set it in your .env file.");
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
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
