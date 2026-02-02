import { getBIRawData } from "@/lib/actions/bi";
import { ReportStudio } from "@/components/bi/ReportStudio";
import { Skeleton } from "@/components/ui/skeleton";

export default async function BIStudioPage() {
  const data = await getBIRawData();

  if (!data) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-12 w-[250px]" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50/30 min-h-screen">
      <ReportStudio data={data} />
    </div>
  );
}
