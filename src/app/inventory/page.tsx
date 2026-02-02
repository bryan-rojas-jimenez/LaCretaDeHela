import { getInventoryItems } from "@/lib/actions/inventory";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AddItemForm } from "@/components/inventory/AddItemForm";

export default async function InventoryPage() {
  const items = await getInventoryItems();

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Inventory</h1>
          <p className="text-muted-foreground text-lg">Manage your warehouse and products.</p>
        </div>
        <div className="bg-white p-1 rounded-xl shadow-sm border">
          <AddItemForm />
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-1">
        <InventoryTable items={items} />
      </div>
    </div>
  );
}