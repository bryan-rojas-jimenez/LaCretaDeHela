import { getSuppliers } from "@/lib/actions/relationships";
import { AddSupplierForm } from "@/components/suppliers/AddSupplierForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EntityFiles } from "@/components/relationships/EntityFiles";
import { Truck, Mail, User, MapPin, Landmark, Box } from "lucide-react";

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Supplier Network</h1>
          <p className="text-muted-foreground text-lg">Manage detailed vendor logistics and contracts.</p>
        </div>
        <AddSupplierForm />
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="font-bold">Vendor Info</TableHead>
              <TableHead className="font-bold">Logistics & Tax</TableHead>
              <TableHead className="font-bold">Supply Chain</TableHead>
              <TableHead className="font-bold w-[300px]">Document Vault</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id} className="hover:bg-slate-50/50 align-top">
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <Truck className="h-4 w-4 text-emerald-600" /> {supplier.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                      <User className="h-3 w-3" /> {supplier.contact || "No Contact Person"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Mail className="h-3 w-3" /> {supplier.email || "No Email"}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1.5 py-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Landmark className="h-4 w-4 text-slate-400" /> {supplier.taxId || "No Tax ID"}
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                      <span className="leading-tight">{supplier.address || "No address."}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2 py-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Box className="h-4 w-4 text-blue-600" /> {supplier._count.items} Products
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <EntityFiles 
                    entityId={supplier.id} 
                    entityType="supplier" 
                    initialFiles={(supplier as any).files || []} 
                  />
                </TableCell>
              </TableRow>
            ))}
            {suppliers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-20 text-muted-foreground">
                  No suppliers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}