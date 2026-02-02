"use client";

import { useState, useMemo } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, CartesianGrid 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Database, TrendingUp, PieChartIcon } from "lucide-react";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b", "#10b981"];

export function ReportStudio({ data }: { data: any }) {
  const { inventory, projects, tasks } = data;

  // BI Logic: Category Value Distribution
  const categoryValueData = useMemo(() => {
    const map = inventory.reduce((acc: any, item: any) => {
      acc[item.category] = (acc[item.category] || 0) + (item.price * item.quantity);
      return acc;
    }, {});
    return Object.keys(map).map(key => ({ name: key, value: map[key] }));
  }, [inventory]);

  // BI Logic: Task Priority across all projects
  const taskPriorityData = useMemo(() => {
    const map = tasks.reduce((acc: any, task: any) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(map).map(key => ({ name: key, value: map[key] }));
  }, [tasks]);

  // BI Logic: Project Progress Intelligence (Tasks Done vs Total)
  const projectHealthData = useMemo(() => {
    return projects.map((p: any) => {
      const projectTasks = tasks.filter((t: any) => t.projectId === p.id);
      const done = projectTasks.filter((t: any) => t.status === "DONE").length;
      return {
        name: p.name,
        completion: projectTasks.length > 0 ? (done / projectTasks.length) * 100 : 0,
        taskCount: projectTasks.length
      };
    });
  }, [projects, tasks]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-6 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 text-white shadow-2xl">
        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
          <Brain className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Intelligence Studio</h2>
          <p className="text-slate-400">Advanced cross-functional business analysis engine.</p>
        </div>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="inventory" className="rounded-lg">Inventory Intelligence</TabsTrigger>
          <TabsTrigger value="workflow" className="rounded-lg">Workflow Analytics</TabsTrigger>
          <TabsTrigger value="strategy" className="rounded-lg">Strategic Health</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  Asset Value by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryValueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                      <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={v => `$${v}`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any) => [`$${value.toFixed(2)}`, "Total Value"]} 
                      />
                      <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-purple-600" />
                  Value Distribution (%)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryValueData}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryValueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6">
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle>Global Task Priority Density</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={taskPriorityData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectHealthData.map((project: { name: string; completion: number; taskCount: number }, idx: number) => (
              <Card key={idx} className="shadow-md border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Completion</span>
                      <span className="text-blue-600">{Math.round(project.completion)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-1000" 
                        style={{ width: `${project.completion}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{project.taskCount} Total Tasks</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
