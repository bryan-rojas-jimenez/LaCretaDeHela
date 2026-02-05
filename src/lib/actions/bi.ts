"use server";

import db from "@/lib/db";
import { getStockForecast } from "./forecasting";

export async function getBIRawData() {
  try {
    const [inventory, transactions, projects, tasks, forecast] = await Promise.all([
      db.inventoryItem.findMany(),
      db.transaction.findMany(),
      db.project.findMany({ include: { _count: { select: { tasks: true } } } }),
      db.task.findMany(),
      getStockForecast()
    ]);

    return {
      inventory,
      transactions,
      projects,
      tasks,
      forecast,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("BI Engine Error:", error);
    return null;
  }
}
