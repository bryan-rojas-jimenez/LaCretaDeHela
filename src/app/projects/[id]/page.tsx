import { getTasks } from "@/lib/actions/projects";
import db from "@/lib/db";
import { ProjectBoard } from "@/components/projects/ProjectBoard";
import { AddTaskForm } from "@/components/projects/AddTaskForm";
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

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col gap-4">
        <Link href="/projects" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" /> Back to Projects
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground">{project.description || "Project board for tracking tasks."}</p>
          </div>
          <AddTaskForm projectId={projectId} />
        </div>
      </div>

      <ProjectBoard tasks={tasks} projectId={projectId} />
    </div>
  );
}
