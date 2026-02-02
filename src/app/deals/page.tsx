import { getDeals } from "@/lib/actions/phase1";
import { getCustomers } from "@/lib/actions/relationships";
import { DealsBoard } from "@/components/deals/DealsBoard";
import { CreateDealForm } from "@/components/deals/CreateDealForm";

export default async function DealsPage() {
  const deals = await getDeals();
  const customers = await getCustomers();

  return (
    <div className="p-8 space-y-8 bg-slate-50/30 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Sales Pipeline</h1>
          <p className="text-muted-foreground text-lg">Manage leads and close high-value deals.</p>
        </div>
        <CreateDealForm customers={customers} />
      </div>

      <DealsBoard deals={deals} />
    </div>
  );
}
