import { getInventoryItems } from "@/lib/actions/inventory";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AddItemForm } from "@/components/inventory/AddItemForm";

export default async function InventoryPage() {
  const items = await getInventoryItems();

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Manage your products and stock levels.</p>
        </div>
        <AddItemForm />
      </div>
      <InventoryTable items={items} />
    </div>
  );
}
