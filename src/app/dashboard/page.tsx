import { getDashboardStats } from "@/lib/actions/analytics";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Your business at a glance.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden border-none shadow-lg bg-linear-to-br from-blue-600 to-blue-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Total Items</CardTitle>
            <Package className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalItems}</div>
            <p className="text-xs opacity-70 mt-1">+2 from yesterday</p>
          </CardContent>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Package className="h-24 w-24" />
          </div>
        </Card>

        <Card className="relative overflow-hidden border-none shadow-lg bg-linear-to-br from-purple-600 to-purple-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Total Stock Value</CardTitle>
            <DollarSign className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.totalStockValue.toLocaleString()}</div>
            <p className="text-xs opacity-70 mt-1">Market valuation</p>
          </CardContent>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <DollarSign className="h-24 w-24" />
          </div>
        </Card>

        <Card className="relative overflow-hidden border-none shadow-lg bg-linear-to-br from-rose-500 to-rose-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-80">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-5 w-5 opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.lowStockItems}</div>
            <p className="text-xs opacity-70 mt-1">Requires attention</p>
          </CardContent>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <AlertTriangle className="h-24 w-24" />
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