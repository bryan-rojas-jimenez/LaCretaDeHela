"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logAction } from "./audit";

/**
 * INVOICE ACTIONS
 * All actions are wrapped in error boundaries to prevent UI hanging.
 */

export async function getInvoices() {
  try {
    return await db.invoice.findMany({
      include: {
        customer: { select: { firstName: true, lastName: true, email: true } }
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Fetch Invoices Error:", error);
    return [];
  }
}

export async function createInvoice(data: {
  number: string;
  total: number;
  customerId: number;
  dueDate: Date;
}) {
  console.log("Invoicing Action - Create:", data);
  try {
    const invoice = await db.invoice.create({
      data: {
        number: data.number,
        total: data.total,
        customerId: data.customerId,
        dueDate: data.dueDate,
        status: "UNPAID"
      }
    });

    logAction("CREATE_INVOICE", `Generated invoice #${data.number} for total $${data.total}`);
    
    revalidatePath("/invoices");
    revalidatePath("/dashboard");
    return { success: true, invoice };
  } catch (error: any) {
    console.error("Invoice Error:", error);
    return { success: false, error: "Invoice number already exists or data is invalid" };
  }
}

export async function updateInvoiceStatus(id: number, status: string) {
  try {
    const invoice = await db.invoice.update({
      where: { id },
      data: { status }
    });
    logAction("UPDATE_INVOICE", `Invoice #${invoice.number} marked as ${status}`);
    
    revalidatePath("/invoices");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Update Invoice Error:", error);
    return { success: false, error: "Failed to update invoice status" };
  }
}