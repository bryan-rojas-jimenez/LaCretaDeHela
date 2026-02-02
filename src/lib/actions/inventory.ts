"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getInventoryItems() {
  try {
    const items = await db.inventoryItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return items;
  } catch (error) {
    console.error("Failed to fetch inventory items:", error);
    return [];
  }
}

export async function createInventoryItem(formData: {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: string;
}) {
  try {
    const item = await db.inventoryItem.create({
      data: {
        name: formData.name,
        sku: formData.sku,
        quantity: formData.quantity,
        price: formData.price,
        category: formData.category,
      },
    });

    // Create an initial transaction
    await db.transaction.create({
      data: {
        type: "IN",
        amount: formData.quantity,
        itemId: item.id,
      },
    });

    revalidatePath("/inventory");
    revalidatePath("/dashboard");
    return { success: true, item };
  } catch (error) {
    console.error("Failed to create inventory item:", error);
    return { success: false, error: "SKU must be unique or data is invalid" };
  }
}

export async function updateStock(id: number, amount: number, type: "IN" | "OUT") {
  try {
    const item = await db.inventoryItem.findUnique({ where: { id } });
    if (!item) throw new Error("Item not found");

    const newQuantity = type === "IN" ? item.quantity + amount : item.quantity - amount;
    
    if (newQuantity < 0) throw new Error("Insufficient stock");

    await db.$transaction([
      db.inventoryItem.update({
        where: { id },
        data: { quantity: newQuantity },
      }),
      db.transaction.create({
        data: {
          type,
          amount,
          itemId: id,
        },
      }),
    ]);

    revalidatePath("/inventory");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update stock:", error);
    return { success: false, error: error.message };
  }
}
