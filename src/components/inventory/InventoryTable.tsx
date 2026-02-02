"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { updateStock } from "@/lib/actions/inventory";

interface Item {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  category: string;
}

export function InventoryTable({ items }: { items: Item[] }) {
  async function handleStockUpdate(id: number, type: "IN" | "OUT") {
    const amount = parseInt(prompt("Enter amount:") || "0");
    if (amount > 0) {
      const result = await updateStock(id, amount, type);
      if (!result.success) alert(result.error);
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleStockUpdate(item.id, "IN")}>
                  Stock In
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleStockUpdate(item.id, "OUT")}>
                  Stock Out
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                No items found. Add your first item to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
