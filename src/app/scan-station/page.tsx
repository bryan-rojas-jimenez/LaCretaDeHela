import { Scanner } from "@/components/inventory/Scanner";

export default function ScanStationPage() {
  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Scan Station</h1>
          <p className="text-muted-foreground text-lg">Use your camera for rapid inventory control.</p>
        </div>
      </div>
      
      <Scanner />
    </div>
  );
}
