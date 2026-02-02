"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInventoryItems, updateStock } from "@/lib/actions/inventory";
import { Badge } from "@/components/ui/badge";
import { Camera, Package, ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * SCAN STATION COMPONENT
 * Uses the device camera to scan QR codes (SKUs).
 * Instantly looks up the item and allows for rapid stock updates.
 */
export function Scanner() {
  const [scannedSku, setScannedSku] = useState<string | null>(null);
  const [item, setItem] = useState<any | null>(null);
  const [amount, setAmount] = useState<number>(1);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        setScannedSku(decodedText);
        lookupItem(decodedText);
      },
      (error) => {
        // Silent error for scanning frames
      }
    );

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, []);

  async function lookupItem(sku: string) {
    const items = await getInventoryItems();
    const found = items.find(i => i.sku === sku);
    if (found) {
      setItem(found);
      setMessage(null);
    } else {
      setItem(null);
      setMessage({ type: 'error', text: `SKU ${sku} not found in inventory.` });
    }
  }

  async function handleUpdate(type: "IN" | "OUT") {
    if (!item) return;
    const result = await updateStock(item.id, amount, type);
    if (result.success) {
      setMessage({ type: 'success', text: `Successfully updated ${item.name} stock.` });
      // Refresh local item state
      setItem({ ...item, quantity: type === "IN" ? item.quantity + amount : item.quantity - amount });
    } else {
      setMessage({ type: 'error', text: result.error });
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Scanner Side */}
      <Card className="overflow-hidden border-none shadow-xl bg-slate-900 text-white">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-blue-400" />
            Live QR Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div id="reader" className="w-full"></div>
          <div className="p-4 bg-slate-800/50 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
              Position QR code within the frame
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Side */}
      <div className="space-y-6">
        {item ? (
          <Card className="border-none shadow-xl bg-white overflow-hidden">
            <div className="h-2 bg-blue-600 w-full" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="outline" className="mb-2 border-blue-200 text-blue-700">
                    SKU: {item.sku}
                  </Badge>
                  <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
                  <p className="text-slate-500">{item.category}</p>
                </div>
                <Package className="h-10 w-10 text-slate-200" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-600 font-medium">Current Stock</span>
                <span className="text-3xl font-black text-slate-900">{item.quantity}</span>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div>
                  <Label htmlFor="amount" className="text-slate-600">Update Amount</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    className="text-lg font-bold h-12 mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={() => handleUpdate("IN")}
                    className="h-14 bg-emerald-600 hover:bg-emerald-700 text-lg font-bold shadow-lg shadow-emerald-500/20"
                  >
                    Stock In
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleUpdate("OUT")}
                    className="h-14 border-2 border-rose-600 text-rose-600 hover:bg-rose-50 text-lg font-bold"
                  >
                    Stock Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-dashed border-slate-200 shadow-none h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="p-4 rounded-full bg-slate-50 mb-4">
              <Package className="h-12 w-12 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-400">Waiting for Scan...</h3>
            <p className="text-slate-400 text-sm max-w-[200px]">Scan a product QR code to view details and update stock.</p>
          </Card>
        )}

        {message && (
          <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <Package className="h-5 w-5" />}
            <span className="font-bold text-sm">{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}
