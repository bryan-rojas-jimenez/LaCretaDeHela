"use client";

import { useState } from "react";
import { createCustomer } from "@/lib/actions/relationships";
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
import { UserPlus } from "lucide-react";

export function AddCustomerForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      accountNumber: formData.get("accountNumber") as string,
    };

    const result = await createCustomer(data);
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
        <Button className="gap-2 bg-pink-600 hover:bg-pink-700">
          <UserPlus className="h-4 w-4" /> Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Detailed Customer Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" placeholder="Jane" required />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder="Smith" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="jane@example.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" placeholder="+1..." />
            </div>
          </div>
          <div>
            <Label htmlFor="accountNumber">Account Number (Internal ID)</Label>
            <Input id="accountNumber" name="accountNumber" placeholder="CUST-1001" />
          </div>
          <div>
            <Label htmlFor="address">Physical Address</Label>
            <Input id="address" name="address" placeholder="123 Business St, Suite 400" />
          </div>
          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={loading}>
            {loading ? "Creating Profile..." : "Save Customer Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}