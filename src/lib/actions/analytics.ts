"use server";

import db from "@/lib/db";

export async function getDashboardStats() {
  try {
    const items = await db.inventoryItem.findMany();
    
    const totalItems = items.length;
    const totalStockValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const lowStockItems = items.filter(item => item.quantity < 5).length;

    // Aggregate by category for the chart
    const categoryDataMap = items.reduce((acc: any, item) => {
      if (!acc[item.category]) {
        acc[item.category] = 0;
      }
      acc[item.category] += item.quantity;
      return acc;
    }, {});

    const categoryData = Object.keys(categoryDataMap).map(category => ({
      name: category,
      value: categoryDataMap[category]
    }));

    return {
      totalItems,
      totalStockValue,
      lowStockItems,
      categoryData
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      totalItems: 0,
      totalStockValue: 0,
      lowStockItems: 0,
      categoryData: []
    };
  }
}
