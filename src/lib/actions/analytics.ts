"use server";

import db from "@/lib/db";

export async function getDashboardStats() {
  try {
    const [items, customers, invoices] = await Promise.all([
      db.inventoryItem.findMany(),
      db.customer.findMany(),
      db.invoice.findMany()
    ]);
    
    const totalItems = items.length;
    const totalStockValue = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    const lowStockItems = items.filter(item => item.quantity < 5).length;

    const totalCustomers = customers.length;
    const totalInvoiced = invoices.reduce((acc, inv) => acc + inv.total, 0);
    const pendingInvoices = invoices.filter(inv => inv.status === "UNPAID").length;

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
      totalCustomers,
      totalInvoiced,
      pendingInvoices,
      categoryData
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      totalItems: 0,
      totalStockValue: 0,
      lowStockItems: 0,
      totalCustomers: 0,
      totalInvoiced: 0,
      pendingInvoices: 0,
      categoryData: []
    };
  }
}
