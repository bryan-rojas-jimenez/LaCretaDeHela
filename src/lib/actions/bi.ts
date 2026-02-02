"use server";

import db from "@/lib/db";

export async function getBIRawData() {
  try {
    const [inventory, transactions, projects, tasks] = await Promise.all([
      db.inventoryItem.findMany(),
      db.transaction.findMany(),
      db.project.findMany({ include: { _count: { select: { tasks: true } } } }),
      db.task.findMany()
    ]);

    return {
      inventory,
      transactions,
      projects,
      tasks,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("BI Engine Error:", error);
    return null;
  }
}
