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
  console.log("Starting createSupplier action with data:", data);
  try {
    const supplier = await db.supplier.create({ data });
    console.log("Supplier created successfully:", supplier.id);
    
    await logAction("CREATE_SUPPLIER", `Added new supplier: ${data.name}`);
    console.log("Log action recorded.");
    
    revalidatePath("/suppliers");
    console.log("Path revalidated.");
    
    return { success: true, supplier };
  } catch (error: any) {
    console.error("CRITICAL ERROR in createSupplier:", error);
    return { success: false, error: error.message || "Failed to create supplier" };
  }
}

export async function addSupplierFile(supplierId: number, fileName: string, fileData: string) {
  try {
    const file = await db.supplierFile.create({
      data: {
        name: fileName,
        path: fileData, // In a real app, upload to S3/Blob and store URL. Here we store Base64.
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
      _count: { select: { projects: true, invoices: true, files: true, deals: true } },
      projects: true,
      invoices: true,
      deals: true,
      files: true
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
  console.log("Starting createCustomer action with data:", data);
  try {
    const customer = await db.customer.create({ data });
    console.log("Customer created successfully:", customer.id);
    
    await logAction("CREATE_CUSTOMER", `Added customer: ${data.firstName} ${data.lastName}`);
    console.log("Log action recorded.");
    
    revalidatePath("/crm");
    console.log("Path revalidated.");
    
    return { success: true, customer };
  } catch (error: any) {
    console.error("CRITICAL ERROR in createCustomer:", error);
    if (error.code === 'P2002') return { success: false, error: "Account Number already exists" };
    return { success: false, error: error.message || "Failed to create customer" };
  }
}

export async function addCustomerFile(customerId: number, fileName: string, fileData: string) {
  try {
    const file = await db.customerFile.create({
      data: {
        name: fileName,
        path: fileData,
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