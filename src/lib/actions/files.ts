"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { logAction } from "./audit";

export async function addProjectFile(projectId: number, fileName: string) {
  try {
    const file = await db.projectFile.create({
      data: {
        name: fileName,
        path: `/uploads/projects/${projectId}/${fileName}`,
        projectId: projectId,
      }
    });

    await logAction("UPLOAD_FILE", `Uploaded file: ${fileName} to Project ID: ${projectId}`);
    revalidatePath(`/projects/${projectId}`);
    return { success: true, file };
  } catch (error) {
    return { success: false, error: "Failed to link file" };
  }
}

export async function getProjectFiles(projectId: number) {
  return await db.projectFile.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" }
  });
}
