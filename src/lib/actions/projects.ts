"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  try {
    return await db.project.findMany({
      include: {
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function createProject(data: { name: string; description?: string; color?: string }) {
  try {
    const project = await db.project.create({ data });
    revalidatePath("/projects");
    return { success: true, project };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function getTasks(projectId: number) {
  try {
    return await db.task.findMany({
      where: { projectId },
      orderBy: { updatedAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

export async function createTask(data: {
  title: string;
  description?: string;
  status: string;
  priority: string;
  projectId: number;
  dueDate?: Date;
}) {
  try {
    const task = await db.task.create({ data });
    revalidatePath(`/projects/${data.projectId}`);
    revalidatePath("/projects");
    return { success: true, task };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { success: false, error: "Failed to create task" };
  }
}

export async function updateTaskStatus(id: number, status: string) {
  try {
    const task = await db.task.update({
      where: { id },
      data: { status }
    });
    revalidatePath(`/projects/${task.projectId}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update task status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
