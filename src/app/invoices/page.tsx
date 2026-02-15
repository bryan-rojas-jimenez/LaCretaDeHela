import { getInvoices } from "@/lib/actions/invoices";
import { getCustomers } from "@/lib/actions/relationships";
import { AddInvoiceForm } from "@/components/invoices/AddInvoiceForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Receipt, Calendar, User, DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const invoices = await getInvoices();
  const customers = await getCustomers();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PAID": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "UNPAID": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Invoices</h1>
          <p className="text-muted-foreground text-lg">Billing and financial records.</p>
        </div>
        <AddInvoiceForm customers={customers} />
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="font-bold">Invoice #</TableHead>
              <TableHead className="font-bold">Customer</TableHead>
              <TableHead className="font-bold">Amount</TableHead>
              <TableHead className="font-bold">Due Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-slate-50/50">
                <TableCell className="font-bold text-indigo-600">
                  {invoice.number}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-3 w-3" /> {invoice.customer.firstName} {invoice.customer.lastName}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${invoice.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-bold ${getStatusStyle(invoice.status)}`}>
                    {invoice.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {invoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">
                  No invoices found. Generate your first invoice to start billing.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
