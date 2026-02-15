import { getExpenses } from "@/lib/actions/expenses";
import { AddExpenseForm } from "@/components/expenses/AddExpenseForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Receipt, Calendar, Info, DollarSign, Tag } from "lucide-react";
import { EntityFiles } from "@/components/relationships/EntityFiles";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "RENT": return "bg-blue-100 text-blue-700";
      case "SALARIES": return "bg-purple-100 text-purple-700";
      case "MARKETING": return "bg-pink-100 text-pink-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Expense Ledger</h1>
          <p className="text-muted-foreground text-lg">Track operational costs and overhead.</p>
        </div>
        <AddExpenseForm />
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Amount</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold">Receipts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} className="hover:bg-slate-50/50">
                <TableCell>
                  <Badge variant="outline" className={`font-bold border-none ${getCategoryColor(expense.category)}`}>
                    <Tag className="h-3 w-3 mr-1" /> {expense.category}
                  </Badge>
                </TableCell>
                <TableCell className="font-black text-rose-600">
                  ${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" /> {new Date(expense.date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate text-slate-600 italic">
                  {expense.description || "---"}
                </TableCell>
                <TableCell className="w-[200px]">
                  <EntityFiles 
                    entityId={expense.id} 
                    entityType="expense" 
                    initialFiles={(expense as any).files || []} 
                  />
                </TableCell>
              </TableRow>
            ))}
            {expenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-muted-foreground">
                  No expenses recorded. Log your first overhead cost to start tracking net profit.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
