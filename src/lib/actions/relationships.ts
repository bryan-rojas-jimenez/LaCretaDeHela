"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logAction } from "./audit";

// SUPPLIERS
export async function getSuppliers() {
  return await db.supplier.findMany({ 
    include: { 
      _count: { select: { items: true, files: true } } 
    } 
  });
}

export async function createSupplier(data: { 
  name: string; 
  email?: string; 
  contact?: string;
  address?: string;
  taxId?: string;
}) {
  try {
    const supplier = await db.supplier.create({ data });
    await logAction("CREATE_SUPPLIER", `Added new supplier: ${data.name}`);
    revalidatePath("/suppliers");
    return { success: true, supplier };
  } catch (error) {
    return { success: false, error: "Failed to create supplier" };
  }
}

export async function addSupplierFile(supplierId: number, fileName: string) {
  try {
    const file = await db.supplierFile.create({
      data: {
        name: fileName,
        path: `/uploads/suppliers/${supplierId}/${fileName}`,
        supplierId
      }
    });
    await logAction("UPLOAD_SUPPLIER_FILE", `Uploaded ${fileName} for supplier ID: ${supplierId}`);
    revalidatePath("/suppliers");
    return { success: true, file };
  } catch (error) {
    return { success: false };
  }
}

// CUSTOMERS
export async function getCustomers() {
  return await db.customer.findMany({ 
    include: { 
      _count: { select: { projects: true, invoices: true, files: true } } 
    } 
  });
}

export async function createCustomer(data: { 
  firstName: string; 
  lastName: string;
  email?: string; 
  phone?: string;
  address?: string;
  accountNumber?: string;
}) {
  try {
    const customer = await db.customer.create({ data });
    await logAction("CREATE_CUSTOMER", `Added customer: ${data.firstName} ${data.lastName}`);
    revalidatePath("/crm");
    return { success: true, customer };
  } catch (error: any) {
    if (error.code === 'P2002') return { success: false, error: "Account Number already exists" };
    return { success: false, error: "Failed to create customer" };
  }
}

export async function addCustomerFile(customerId: number, fileName: string) {
  try {
    const file = await db.customerFile.create({
      data: {
        name: fileName,
        path: `/uploads/customers/${customerId}/${fileName}`,
        customerId
      }
    });
    await logAction("UPLOAD_CUSTOMER_FILE", `Uploaded ${fileName} for customer ID: ${customerId}`);
    revalidatePath("/crm");
    return { success: true, file };
  } catch (error) {
    return { success: false };
  }
}