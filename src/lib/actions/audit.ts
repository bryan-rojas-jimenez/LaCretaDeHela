"use server";

import db from "@/lib/db";

export async function logAction(action: string, details?: string, userId?: number) {
  try {
    await db.auditLog.create({
      data: {
        action,
        details,
        userId,
      },
    });
  } catch (error) {
    console.error("Logging Error:", error);
  }
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
