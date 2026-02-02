"use client";

import { useState } from "react";
import { createPurchaseOrder } from "@/lib/actions/phase1";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";

export function AddPOForm({ suppliers }: { suppliers: any[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      orderNumber: formData.get("orderNumber") as string,
      supplierId: parseInt(formData.get("supplierId") as string),
      total: parseFloat(formData.get("total") as string),
    };

    const result = await createPurchaseOrder(data);
    setLoading(false);

    if (result.success) {
      setOpen(false);
    } else {
      alert(result.error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <ShoppingCart className="h-4 w-4" /> New PO
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Purchase Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="orderNumber">PO Number</Label>
            <Input id="orderNumber" name="orderNumber" placeholder="PO-2026-001" required />
          </div>
          <div>
            <Label htmlFor="supplierId">Supplier</Label>
            <Select name="supplierId" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="total">Estimated Total ($)</Label>
            <Input id="total" name="total" type="number" step="0.01" required />
          </div>
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
            {loading ? "Generating..." : "Generate Purchase Order"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
