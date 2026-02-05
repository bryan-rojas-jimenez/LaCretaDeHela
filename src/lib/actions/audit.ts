"use server";

import db from "@/lib/db";

export async function logAction(action: string, details?: string, userId?: number) {
  // We fire and forget the log to prevent it from blocking the main UI response
  // but still catch internal errors.
  db.auditLog.create({
    data: {
      action,
      details,
      userId,
    },
  }).catch(error => {
    console.error("ASYNC LOGGING ERROR:", error);
  });
}

export async function getAuditLogs() {
  return await db.auditLog.findMany({
    orderBy: { timestamp: "desc" },
    take: 50,
    include: {
      user: {
        select: { email: true }
      }
    }
  });
}
