"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Printer } from "lucide-react";

/**
 * QR CODE DIALOG
 * Encodes an item's SKU into a QR code for physical tagging.
 * Allows users to view and prepare a label for printing.
 */
export function QRCodeDialog({ sku, itemName }: { sku: string; itemName: string }) {
  const [open, setOpen] = useState(false);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Label - ${itemName}</title>
            <style>
              body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; }
              .label { border: 2px solid #000; padding: 20px; text-align: center; border-radius: 10px; }
              h1 { margin: 10px 0; font-size: 24px; }
              p { margin: 5px 0; font-size: 18px; color: #666; }
            </style>
          </head>
          <body>
            <div class="label">
              <h1>${itemName}</h1>
              <div id="qr-container"></div>
              <p>SKU: ${sku}</p>
            </div>
            <script>
              // We pass the SVG content directly for simple printing
              document.getElementById('qr-container').innerHTML = 
                document.getElementById('qr-svg')?.outerHTML;
              window.onload = () => { window.print(); window.close(); };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-600">
          <QrCode className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle className="text-center">{itemName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <div className="bg-white p-4 rounded-xl border-4 border-slate-100 shadow-sm" id="qr-svg">
            <QRCodeSVG value={sku} size={200} level="H" includeMargin={true} />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">SKU Identifier</p>
            <p className="text-sm font-mono font-bold text-slate-700">{sku}</p>
          </div>
          <Button onClick={handlePrint} className="w-full gap-2 bg-blue-600">
            <Printer className="h-4 w-4" /> Print Label
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
