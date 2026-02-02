"use client";

import { updateDealStatus } from "@/lib/actions/phase1";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, User, ArrowRight } from "lucide-react";

const STAGES = [
  { id: "LEAD", title: "Leads", color: "bg-slate-100 text-slate-700 border-slate-200" },
  { id: "PROPOSAL", title: "Proposal", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { id: "NEGOTIATION", title: "Negotiation", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { id: "CLOSED_WON", title: "Won", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "CLOSED_LOST", title: "Lost", color: "bg-rose-50 text-rose-700 border-rose-200" },
];

export function DealsBoard({ deals }: { deals: any[] }) {
  async function handleStatusChange(id: number, currentStatus: string) {
    const statuses = ["LEAD", "PROPOSAL", "NEGOTIATION", "CLOSED_WON", "CLOSED_LOST"];
    const currentIndex = statuses.indexOf(currentStatus);
    if (currentIndex === 3 || currentIndex === 4) return; // Don't cycle if finished
    const nextStatus = statuses[currentIndex + 1];
    
    await updateDealStatus(id, nextStatus);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
      {STAGES.map((stage) => (
        <div key={stage.id} className="flex flex-col gap-4 min-w-[250px]">
          <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${stage.color} shadow-sm`}>
            <h3 className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              {stage.title}
              <span className="opacity-60 font-normal">
                ({deals.filter((d) => d.status === stage.id).length})
              </span>
            </h3>
          </div>
          
          <div className="flex flex-col gap-3 min-h-[600px] rounded-xl p-2 bg-slate-50/50 border border-slate-100">
            {deals
              .filter((deal) => deal.status === stage.id)
              .map((deal) => (
                <Card 
                  key={deal.id} 
                  className="group cursor-pointer border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-white overflow-hidden"
                  onClick={() => handleStatusChange(deal.id, deal.status)}
                >
                  <CardHeader className="p-3 space-y-0">
                    <CardTitle className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                      {deal.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <User className="h-3 w-3" />
                      {deal.customer.firstName} {deal.customer.lastName}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-0.5 text-blue-600 font-bold text-sm">
                        <DollarSign className="h-3 w-3" />
                        {deal.value.toLocaleString()}
                      </div>
                      {(deal.status !== "CLOSED_WON" && deal.status !== "CLOSED_LOST") && (
                        <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-blue-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
