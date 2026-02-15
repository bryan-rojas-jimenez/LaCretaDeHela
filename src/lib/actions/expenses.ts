"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logAction } from "./audit";

/**
 * EXPENSE ACTIONS
 * Handles overhead cost management.
 */

export async function getExpenses() {
  try {
    return await db.expense.findMany({
      include: { _count: { select: { files: true } } },
      orderBy: { date: "desc" }
    });
  } catch (error) {
    console.error("Fetch Expenses Error:", error);
    return [];
  }
}

export async function createExpense(data: {
  category: string;
  amount: number;
  description?: string;
  date: Date;
}) {
  try {
    const expense = await db.expense.create({ data });
    logAction("CREATE_EXPENSE", `Recorded ${data.category} expense: $${data.amount}`);
    
    revalidatePath("/expenses");
    revalidatePath("/dashboard");
    revalidatePath("/bi-studio");
    return { success: true, expense };
  } catch (error: any) {
    console.error("Expense Creation Error:", error);
    return { success: false, error: "Failed to record expense" };
  }
}

export async function addExpenseFile(expenseId: number, fileName: string, fileData: string) {
  try {
    const file = await db.expenseFile.create({
      data: {
        name: fileName,
        path: fileData, // Stores Base64
        expenseId
      }
    });
    logAction("UPLOAD_EXPENSE_FILE", `Uploaded receipt: ${fileName} for expense ID: ${expenseId}`);
    revalidatePath("/expenses");
    return { success: true, file };
  } catch (error) {
    return { success: false };
  }
}
