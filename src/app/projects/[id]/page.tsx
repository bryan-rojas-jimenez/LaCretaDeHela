import { getTasks } from "@/lib/actions/projects";
import { getProjectFiles } from "@/lib/actions/files";
import db from "@/lib/db";
import { ProjectBoard } from "@/components/projects/ProjectBoard";
import { AddTaskForm } from "@/components/projects/AddTaskForm";
import { ProjectFiles } from "@/components/projects/ProjectFiles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = parseInt(id);
  
  const project = await db.project.findUnique({
    where: { id: projectId }
  });

  if (!project) notFound();

  const tasks = await getTasks(projectId);
  const files = await getProjectFiles(projectId);

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex flex-col gap-4">
        <Link href="/projects" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to Projects
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{project.name}</h1>
            <p className="text-muted-foreground">{project.description || "Project board for tracking tasks."}</p>
          </div>
          <AddTaskForm projectId={projectId} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <ProjectBoard tasks={tasks} projectId={projectId} />
        </div>
        <div className="lg:col-span-1">
          <ProjectFiles projectId={projectId} initialFiles={files} />
        </div>
      </div>
    </div>
  );
}
