"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Receipt, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  History
} from "lucide-react";

export function Customer360({ customer }: { customer: any }) {
  // Combine all activities into a single timeline
  const activities = [
    ...customer.projects.map((p: any) => ({
      type: 'PROJECT',
      title: `Project: ${p.name}`,
      date: p.createdAt,
      icon: CheckCircle2,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    })),
    ...customer.invoices.map((i: any) => ({
      type: 'INVOICE',
      title: `Invoice #${i.number} - $${i.total}`,
      date: i.createdAt,
      icon: Receipt,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100'
    })),
    ...customer.deals.map((d: any) => ({
      type: 'DEAL',
      title: `Deal: ${d.title} ($${d.value})`,
      date: d.createdAt,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    })),
    ...customer.files.map((f: any) => ({
      type: 'FILE',
      title: `File Uploaded: ${f.name}`,
      date: f.createdAt,
      icon: FileText,
      color: 'text-slate-600',
      bg: 'bg-slate-100'
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <History className="h-5 w-5 text-slate-500" />
        Activity Timeline (360° View)
      </h2>
      
      <div className="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {activities.map((activity, idx) => (
          <div key={idx} className="relative flex items-center justify-between gap-4 pl-12 group">
            <div className={`absolute left-0 grid place-items-center w-10 h-10 rounded-full border-4 border-white shadow-sm z-10 transition-transform group-hover:scale-110 ${activity.bg} ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            
            <div className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all group-hover:border-blue-200">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-slate-800">{activity.title}</span>
                <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-slate-400">Interaction recorded in {activity.type.toLowerCase()} module.</p>
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-10 text-slate-400 italic bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-100">
            No activities recorded for this customer yet.
          </div>
        )}
      </div>
    </div>
  );
}
