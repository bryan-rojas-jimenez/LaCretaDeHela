"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logAction } from "./audit";

export async function getInvoices() {
  return await db.invoice.findMany({
    include: {
      customer: { select: { name: true, email: true } }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function createInvoice(data: {
  number: string;
  total: number;
  customerId: number;
  dueDate: Date;
}) {
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

    await logAction("CREATE_INVOICE", `Generated invoice #${data.number} for total $${data.total}`);
    revalidatePath("/invoices");
    return { success: true, invoice };
  } catch (error) {
    console.error("Invoice Error:", error);
    return { success: false, error: "Failed to generate invoice" };
  }
}

export async function updateInvoiceStatus(id: number, status: string) {
  try {
    const invoice = await db.invoice.update({
      where: { id },
      data: { status }
    });
    await logAction("UPDATE_INVOICE", `Invoice #${invoice.number} marked as ${status}`);
    revalidatePath("/invoices");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
