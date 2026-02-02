import { getPurchaseOrders } from "@/lib/actions/phase1";
import { getSuppliers } from "@/lib/actions/relationships";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Truck, Calendar, Hash } from "lucide-react";
import { AddPOForm } from "@/components/procurement/AddPOForm";

export default async function ProcurementPage() {
  const pos = await getPurchaseOrders();
  const suppliers = await getSuppliers();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "RECEIVED": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "SENT": return "bg-blue-100 text-blue-700 border-blue-200";
      case "CANCELLED": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Procurement</h1>
          <p className="text-muted-foreground text-lg">Manage purchase orders and restock inventory.</p>
        </div>
        <AddPOForm suppliers={suppliers} />
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="font-bold">PO Number</TableHead>
              <TableHead className="font-bold">Supplier</TableHead>
              <TableHead className="font-bold">Total Value</TableHead>
              <TableHead className="font-bold text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pos.map((po) => (
              <TableRow key={po.id} className="hover:bg-slate-50/50">
                <TableCell className="font-bold text-blue-600 flex items-center gap-2">
                  <Hash className="h-4 w-4 text-slate-400" /> {po.orderNumber}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Truck className="h-3 w-3" /> {po.supplier.name}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${po.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={`font-bold ${getStatusStyle(po.status)}`}>
                    {po.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {pos.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-20 text-muted-foreground">
                  No Purchase Orders found. Start a new order to replenish stock.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
