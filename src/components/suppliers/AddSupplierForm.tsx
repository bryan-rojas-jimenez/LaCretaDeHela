"use client";

import { useState } from "react";
import { createSupplier } from "@/lib/actions/relationships";
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
import { Truck } from "lucide-react";

export function AddSupplierForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      taxId: formData.get("taxId") as string,
    };

    try {
      const result = await createSupplier(data);
      if (result.success) {
        setOpen(false);
      } else {
        alert(result.error);
      }
    } catch (error: any) {
      console.error("Client-side error adding supplier:", error);
      alert("A system error occurred. Please check the logs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Truck className="h-4 w-4" /> Add Supplier
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Detailed Supplier Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Company Name</Label>
            <Input id="name" name="name" placeholder="Acme Logistics" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact">Primary Contact</Label>
              <Input id="contact" name="contact" placeholder="Manager Name" />
            </div>
            <div>
              <Label htmlFor="email">Business Email</Label>
              <Input id="email" name="email" type="email" placeholder="sales@acme.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="taxId">Tax ID / VAT</Label>
              <Input id="taxId" name="taxId" placeholder="TAX-99001" />
            </div>
            <div>
              <Label htmlFor="address">Warehouse Address</Label>
              <Input id="address" name="address" placeholder="456 Supply Way" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
            {loading ? "Registering Supplier..." : "Save Supplier Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}