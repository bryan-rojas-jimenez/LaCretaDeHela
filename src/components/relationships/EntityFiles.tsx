"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Upload, Paperclip } from "lucide-react";
import { addCustomerFile, addSupplierFile } from "@/lib/actions/relationships";
import { addExpenseFile } from "@/lib/actions/expenses";

interface FileItem {
  id: number;
  name: string;
  createdAt: Date;
}

export function EntityFiles({ 
  entityId, 
  entityType, 
  initialFiles 
}: { 
  entityId: number, 
  entityType: 'customer' | 'supplier' | 'expense',
  initialFiles: FileItem[] 
}) {
  const [files, setFiles] = useState(initialFiles);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    const fileName = prompt("Document Name (Simulation):");
    if (!fileName) return;

    setUploading(true);
    let result;
    if (entityType === 'customer') {
      result = await addCustomerFile(entityId, fileName);
    } else if (entityType === 'supplier') {
      result = await addSupplierFile(entityId, fileName);
    } else {
      result = await addExpenseFile(entityId, fileName);
    }
    setUploading(false);

    if (result.success) {
      setFiles([result.file as FileItem, ...files]);
    }
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Paperclip className="h-4 w-4 text-slate-500" />
          Documents ({files.length})
        </CardTitle>
        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={handleUpload} disabled={uploading}>
          <Upload className="h-3 w-3 mr-1" /> {uploading ? "..." : "Upload"}
        </Button>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div className="space-y-2 max-h-[150px] overflow-auto">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 group">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="h-3 w-3 text-slate-400 shrink-0" />
                <span className="text-[11px] font-medium truncate">{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                <Download className="h-3 w-3" />
              </Button>
            </div>
          ))}
          {files.length === 0 && (
            <div className="text-center py-4 text-[10px] text-slate-400 italic">
              No documents.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
