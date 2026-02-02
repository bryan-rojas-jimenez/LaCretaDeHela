"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logAction } from "./audit";

export async function getSuppliers() {
  return await db.supplier.findMany({ include: { _count: { select: { items: true } } } });
}

export async function createSupplier(data: { name: string; email?: string; contact?: string }) {
  try {
    const supplier = await db.supplier.create({ data });
    await logAction("CREATE_SUPPLIER", `Added new supplier: ${data.name}`);
    revalidatePath("/suppliers");
    return { success: true, supplier };
  } catch (error) {
    return { success: false, error: "Failed to create supplier" };
  }
}

export async function getCustomers() {
  return await db.customer.findMany({ 
    include: { 
      _count: { select: { projects: true, invoices: true } } 
    } 
  });
}

export async function createCustomer(data: { name: string; email?: string; phone?: string }) {
  try {
    const customer = await db.customer.create({ data });
    await logAction("CREATE_CUSTOMER", `Added new customer: ${data.name}`);
    revalidatePath("/crm");
    return { success: true, customer };
  } catch (error) {
    return { success: false, error: "Failed to create customer" };
  }
}
