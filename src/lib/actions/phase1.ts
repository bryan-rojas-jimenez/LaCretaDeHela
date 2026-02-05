"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logAction } from "./audit";

/**
 * PHASE 1 ACTIONS (DEALS & PROCUREMENT)
 * All actions are wrapped in error boundaries to prevent UI hanging.
 */

// DEALS
export async function getDeals() {
  try {
    return await db.deal.findMany({
      include: {
        customer: { select: { firstName: true, lastName: true } },
        _count: { select: { files: true } }
      },
      orderBy: { updatedAt: "desc" }
    });
  } catch (error) {
    console.error("Fetch Deals Error:", error);
    return [];
  }
}

export async function createDeal(data: { title: string; value: number; customerId: number; status: string }) {
  console.log("Creating Deal:", data);
  try {
    const deal = await db.deal.create({ data });
    logAction("CREATE_DEAL", `Started new deal: ${data.title} for $${data.value}`);
    
    revalidatePath("/deals");
    return { success: true, deal };
  } catch (error: any) {
    console.error("Deal Creation Error:", error);
    return { success: false, error: error.message || "Failed to create deal" };
  }
}

export async function updateDealStatus(id: number, status: string) {
  try {
    const deal = await db.deal.update({
      where: { id },
      data: { status }
    });
    logAction("UPDATE_DEAL_STATUS", `Deal #${id} moved to ${status}`);
    
    revalidatePath("/deals");
    return { success: true };
  } catch (error) {
    console.error("Update Deal Error:", error);
    return { success: false, error: "Failed to update deal status" };
  }
}

// PURCHASE ORDERS
export async function getPurchaseOrders() {
  try {
    return await db.purchaseOrder.findMany({
      include: {
        supplier: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Fetch POs Error:", error);
    return [];
  }
}

export async function createPurchaseOrder(data: { orderNumber: string; supplierId: number; total: number }) {
  console.log("Creating PO:", data);
  try {
    const po = await db.purchaseOrder.create({ data });
    logAction("CREATE_PO", `Generated PO #${data.orderNumber} for $${data.total}`);
    
    revalidatePath("/procurement");
    return { success: true, po };
  } catch (error: any) {
    console.error("PO Creation Error:", error);
    return { success: false, error: error.message || "Failed to create PO" };
  }
}