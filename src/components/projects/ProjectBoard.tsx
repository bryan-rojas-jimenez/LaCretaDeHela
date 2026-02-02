"use client";

import { useState } from "react";
import { updateTaskStatus } from "@/lib/actions/projects";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Clock } from "lucide-react";

const COLUMNS = [
  { id: "TODO", title: "To Do", color: "bg-slate-100 text-slate-700 border-slate-200" },
  { id: "IN_PROGRESS", title: "In Progress", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "DONE", title: "Completed", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

export function ProjectBoard({ tasks, projectId }: { tasks: any[]; projectId: number }) {
  async function handleStatusChange(id: number, currentStatus: string) {
    const statuses = ["TODO", "IN_PROGRESS", "DONE"];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    await updateTaskStatus(id, nextStatus);
  }

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "URGENT": return "bg-rose-100 text-rose-700 border-rose-200";
      case "HIGH": return "bg-orange-100 text-orange-700 border-orange-200";
      case "MEDIUM": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {COLUMNS.map((column) => (
        <div key={column.id} className="flex flex-col gap-6">
          <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${column.color} shadow-xs`}>
            <h3 className="font-bold text-sm flex items-center gap-2">
              {column.title}
              <span className="opacity-60 text-xs font-normal">
                ({tasks.filter((t) => t.status === column.id).length})
              </span>
            </h3>
          </div>
          
          <div className="flex flex-col gap-4 min-h-[600px] rounded-2xl p-3 bg-slate-50/50 border border-slate-100">
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <Card 
                  key={task.id} 
                  className="group cursor-pointer border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-white overflow-hidden" 
                  onClick={() => handleStatusChange(task.id, task.status)}
                >
                  <CardHeader className="p-4 space-y-0">
                    <CardTitle className="text-sm font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
                      {task.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="outline" className={`text-[10px] font-bold px-2 py-0 border-2 ${getPriorityStyle(task.priority)}`}>
                        {task.priority}
                      </Badge>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <Clock className="h-3 w-3" />
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            
            {tasks.filter((t) => t.status === column.id).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-300 border-2 border-dashed border-slate-100 rounded-xl">
                <p className="text-xs font-medium italic">Empty column</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}