import { getCustomers } from "@/lib/actions/relationships";
import { AddCustomerForm } from "@/components/crm/AddCustomerForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EntityFiles } from "@/components/relationships/EntityFiles";
import { Users, Mail, Phone, MapPin, Hash, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function CRMPage() {
  const customers = await getCustomers();

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Customer Intelligence</h1>
          <p className="text-muted-foreground text-lg">Manage detailed client profiles and records.</p>
        </div>
        <AddCustomerForm />
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="font-bold w-[250px]">Customer Profile</TableHead>
              <TableHead className="font-bold">Contact & Identity</TableHead>
              <TableHead className="font-bold">Loyalty & Location</TableHead>
              <TableHead className="font-bold w-[300px]">Document Vault</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-slate-50/50 align-top">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{customer.firstName} {customer.lastName}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Hash className="h-3 w-3" /> {customer.accountNumber || "No ID Assigned"}
                    </span>
                    <Badge className="w-fit mt-2 bg-pink-100 text-pink-700 hover:bg-pink-100 border-none">
                      <Star className="h-3 w-3 mr-1 fill-pink-700" /> {customer.loyaltyPoints} Points
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1.5 py-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-4 w-4 text-slate-400" /> {customer.email || "N/A"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-4 w-4 text-slate-400" /> {customer.phone || "N/A"}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-2 text-sm text-slate-600 py-1">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{customer.address || "No address on file."}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <EntityFiles 
                    entityId={customer.id} 
                    entityType="customer" 
                    initialFiles={(customer as any).files || []} 
                  />
                </TableCell>
              </TableRow>
            ))}
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-20 text-muted-foreground">
                  No customer records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}