import { getDashboardStats } from "@/lib/actions/analytics";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  FileText 
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Enterprise Overview</h1>
        <p className="text-muted-foreground text-lg">Real-time business performance metrics.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Inventory Value Card */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-linear-to-br from-blue-600 to-indigo-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Inventory Value</CardTitle>
            <Package className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.totalStockValue.toLocaleString()}</div>
            <p className="text-xs opacity-70 mt-1">{stats.totalItems} unique items in stock</p>
          </CardContent>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Package className="h-24 w-24" />
          </div>
        </Card>

        {/* CRM Card */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-linear-to-br from-pink-600 to-rose-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Total Customers</CardTitle>
            <Users className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs opacity-70 mt-1">Active client base</p>
          </CardContent>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Users className="h-24 w-24" />
          </div>
        </Card>

        {/* Financials Card */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-linear-to-br from-emerald-600 to-teal-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.totalInvoiced.toLocaleString()}</div>
            <p className="text-xs opacity-70 mt-1">{stats.pendingInvoices} unpaid invoices</p>
          </CardContent>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <FileText className="h-24 w-24" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card className="shadow-md border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Inventory Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">Stock levels across categories</p>
            </div>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart data={stats.categoryData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
