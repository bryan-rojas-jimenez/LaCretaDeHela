"use client";

import { useState } from "react";
import { createExpense } from "@/lib/actions/expenses";
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
import { Banknote } from "lucide-react";

export function AddExpenseForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      category: formData.get("category") as string,
      amount: parseFloat(formData.get("amount") as string),
      description: formData.get("description") as string,
      date: new Date(formData.get("date") as string),
    };

    try {
      const result = await createExpense(data);
      if (result.success) {
        setOpen(false);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert("System Error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-rose-600 hover:bg-rose-700">
          <Banknote className="h-4 w-4" /> Log Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Business Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RENT">Rent / Lease</SelectItem>
                <SelectItem value="SALARIES">Payroll / Salaries</SelectItem>
                <SelectItem value="UTILITIES">Utilities (Power, Water, Net)</SelectItem>
                <SelectItem value="MARKETING">Marketing & Ads</SelectItem>
                <SelectItem value="OTHER">Other Overhead</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input id="amount" name="amount" type="number" step="0.01" required />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" placeholder="e.g. Office electricity bill" />
          </div>
          <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={loading}>
            {loading ? "Recording..." : "Save Expense"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
