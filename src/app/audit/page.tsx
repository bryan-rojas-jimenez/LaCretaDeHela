import { getAuditLogs } from "@/lib/actions/audit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, User, Clock, Info } from "lucide-react";

export default async function AuditLogPage() {
  const logs = await getAuditLogs();

  const getActionColor = (action: string) => {
    if (action.includes("CREATE")) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (action.includes("UPDATE")) return "bg-blue-100 text-blue-700 border-blue-200";
    if (action.includes("DELETE")) return "bg-rose-100 text-rose-700 border-rose-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">System Audit Log</h1>
        <p className="text-muted-foreground text-lg">A full record of all business operations.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="font-bold">Action</TableHead>
              <TableHead className="font-bold">Details</TableHead>
              <TableHead className="font-bold">User</TableHead>
              <TableHead className="font-bold text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="hover:bg-slate-50/50">
                <TableCell>
                  <Badge variant="outline" className={`font-bold ${getActionColor(log.action)}`}>
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-1 text-slate-400 shrink-0" />
                    <span className="text-sm">{log.details}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-3 w-3" /> {log.user?.email || "System"}
                  </div>
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  <div className="flex items-center justify-end gap-1">
                    <Clock className="h-3 w-3" /> {new Date(log.timestamp).toLocaleString()}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {logs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-20 text-muted-foreground">
                  No activity recorded yet. Perform actions to see them here.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
