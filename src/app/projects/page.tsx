import { getProjects } from "@/lib/actions/projects";
import { CreateProjectForm } from "@/components/projects/CreateProjectForm";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Folder, ArrowRight } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await getProjects();

  const colors = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-600",
  ];

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Projects</h1>
          <p className="text-muted-foreground text-lg">Your team's mission control center.</p>
        </div>
        <CreateProjectForm />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Link href={`/projects/${project.id}`} key={project.id} className="group">
            <Card className="relative h-full overflow-hidden border-none shadow-md transition-all group-hover:shadow-xl group-hover:-translate-y-1">
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-linear-to-r ${colors[index % colors.length]}`} />
              <CardHeader className="pt-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-linear-to-br ${colors[index % colors.length]} text-white`}>
                    <Folder className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-base pt-2">
                  {project.description || "Track your progress and collaborate with your team."}
                </CardDescription>
                
                <div className="pt-6 flex items-center gap-2">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-linear-to-r ${colors[index % colors.length]}`} 
                      style={{ width: project._count.tasks > 0 ? '65%' : '0%' }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-600 min-w-[60px]">
                    {project._count.tasks} Tasks
                  </span>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-32 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
            <Folder className="h-16 w-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 text-xl font-medium">No projects found. Launch your first mission today.</p>
          </div>
        )}
      </div>
    </div>
  );
}