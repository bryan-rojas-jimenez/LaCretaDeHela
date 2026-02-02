import { PrismaClient } from "@prisma/client";
import path from "path";

const prismaClientSingleton = () => {
  // Check if we are in Electron and production
  const isElectron = typeof process !== 'undefined' && !!process.versions.electron;
  
  let dbUrl = process.env.DATABASE_URL;

  if (isElectron && process.env.NODE_ENV === "production") {
    // In production Electron, we want to store the DB in the user data folder
    const { app } = require('electron');
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'dev.db');
    dbUrl = `file:${dbPath}`;
  }

  // Fallback for build time or non-electron environments
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
