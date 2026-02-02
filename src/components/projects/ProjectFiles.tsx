"use client";

import { useState } from "react";
import { addProjectFile } from "@/lib/actions/files";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Paperclip, FileText, Download, X } from "lucide-react";

export function ProjectFiles({ projectId, initialFiles }: { projectId: number, initialFiles: any[] }) {
  const [files, setFiles] = useState(initialFiles);
  const [uploading, setUploading] = useState(false);

  async function handleMockUpload() {
    const fileName = prompt("Enter file name (Simulation):");
    if (!fileName) return;

    setUploading(true);
    const result = await addProjectFile(projectId, fileName);
    setUploading(false);

    if (result.success) {
      setFiles([result.file, ...files]);
    }
  }

  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Paperclip className="h-5 w-5 text-blue-600" />
          Project Documents
        </CardTitle>
        <Button size="sm" onClick={handleMockUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Attach File"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-white border border-slate-200">
                  <FileText className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">{file.name}</p>
                  <p className="text-[10px] text-slate-400">{new Date(file.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {files.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-sm italic">
              No files attached to this project.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
