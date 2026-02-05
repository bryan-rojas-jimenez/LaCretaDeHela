"use server";

import db from "@/lib/db";

/**
 * FORECASTING ENGINE
 * Analyzes transaction history to predict stock depletion.
 * Logic:
 * 1. Fetch transactions for the last 30 days.
 * 2. Calculate "Burn Rate" (Average daily OUT volume).
 * 3. Divide current stock by burn rate to get "Days Remaining".
 */
export async function getStockForecast() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [items, transactions] = await Promise.all([
      db.inventoryItem.findMany(),
      db.transaction.findMany({
        where: {
          type: "OUT",
          date: { gte: thirtyDaysAgo }
        }
      })
    ]);

    const forecast = items.map(item => {
      // Find all "OUT" transactions for this specific item in the last 30 days
      const itemOuts = transactions.filter(t => t.itemId === item.id);
      const totalOut = itemOuts.reduce((sum, t) => sum + t.amount, 0);
      
      // Calculate daily burn rate (Total out / 30 days)
      const burnRate = totalOut / 30;
      
      // Calculate days remaining (Current qty / daily burn rate)
      // If burnRate is 0, we set a high number or infinity
      const daysRemaining = burnRate > 0 ? Math.floor(item.quantity / burnRate) : 999;

      return {
        id: item.id,
        name: item.name,
        sku: item.sku,
        currentStock: item.quantity,
        burnRate: burnRate.toFixed(2),
        daysRemaining: daysRemaining,
        priority: daysRemaining < 7 ? 'URGENT' : daysRemaining < 14 ? 'MEDIUM' : 'LOW'
      };
    });

    // Sort by most urgent (fewest days remaining)
    return forecast.sort((a, b) => a.daysRemaining - b.daysRemaining);
  } catch (error) {
    console.error("Forecasting Engine Error:", error);
    return [];
  }
}
