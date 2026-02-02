"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logAction } from "./audit";

// DEALS
export async function getDeals() {
  return await db.deal.findMany({
    include: {
      customer: { select: { firstName: true, lastName: true } },
      _count: { select: { files: true } }
    },
    orderBy: { updatedAt: "desc" }
  });
}

export async function createDeal(data: { title: string; value: number; customerId: number; status: string }) {
  try {
    const deal = await db.deal.create({ data });
    await logAction("CREATE_DEAL", `Started new deal: ${data.title} for $${data.value}`);
    revalidatePath("/deals");
    return { success: true, deal };
  } catch (error) {
    console.error("Deal Creation Error:", error);
    return { success: false, error: "Failed to create deal" };
  }
}

export async function updateDealStatus(id: number, status: string) {
  try {
    const deal = await db.deal.update({
      where: { id },
      data: { status }
    });
    await logAction("UPDATE_DEAL_STATUS", `Deal #${id} moved to ${status}`);
    revalidatePath("/deals");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function addDealFile(dealId: number, fileName: string) {
  try {
    const file = await db.dealFile.create({
      data: {
        name: fileName,
        path: `/uploads/deals/${dealId}/${fileName}`,
        dealId
      }
    });
    await logAction("UPLOAD_DEAL_FILE", `Uploaded ${fileName} for deal ID: ${dealId}`);
    revalidatePath("/deals");
    return { success: true, file };
  } catch (error) {
    return { success: false };
  }
}

// PURCHASE ORDERS
export async function getPurchaseOrders() {
  return await db.purchaseOrder.findMany({
    include: {
      supplier: { select: { name: true } }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function createPurchaseOrder(data: { orderNumber: string; supplierId: number; total: number }) {
  try {
    const po = await db.purchaseOrder.create({ data });
    await logAction("CREATE_PO", `Generated Purchase Order #${data.orderNumber} for $${data.total}`);
    revalidatePath("/procurement");
    return { success: true, po };
  } catch (error) {
    return { success: false, error: "Failed to create Purchase Order" };
  }
}

export async function updatePOStatus(id: number, status: string) {
  try {
    const po = await db.purchaseOrder.update({
      where: { id },
      data: { status }
    });
    await logAction("UPDATE_PO_STATUS", `Purchase Order #${po.orderNumber} marked as ${status}`);
    revalidatePath("/procurement");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
