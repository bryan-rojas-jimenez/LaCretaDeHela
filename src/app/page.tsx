import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Package, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Smart Inventory. Clear Analytics.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The all-in-one platform to manage your stock and gain deep insights into your business operations.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="px-8">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/inventory">
                  <Button variant="outline" className="px-8">View Inventory</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-none bg-transparent">
                <div className="p-3 rounded-full bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Inventory Tracking</h2>
                <p className="text-muted-foreground text-center">
                  Real-time monitoring of stock levels with simple Stock-In/Stock-Out actions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-none bg-transparent">
                <div className="p-3 rounded-full bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Data Visualization</h2>
                <p className="text-muted-foreground text-center">
                  Beautiful charts and metrics to help you understand category distributions and total value.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-none bg-transparent">
                <div className="p-3 rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Reliable Storage</h2>
                <p className="text-muted-foreground text-center">
                  Built with SQLite for speed and ready to scale to PostgreSQL whenever you are.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2026 InvAnalytics. All rights reserved.</p>
      </footer>
    </div>
  );
}