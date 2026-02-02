import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Package, Shield, Rocket, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section with Gradient Background */}
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 -z-10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
                <Rocket className="h-4 w-4" />
                <span>New: Project Management Suite is live!</span>
              </div>
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Business Operations, <br />Reimagined.
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl">
                  One unified platform for your Inventory, Analytics, and Team Workflows. Built for growth.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button className="px-10 py-6 text-lg rounded-xl bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all hover:scale-105">
                    Enter Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" className="px-10 py-6 text-lg rounded-xl border-2 transition-all hover:bg-muted">
                    Explore Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section with Floating Cards */}
        <section className="w-full py-12 md:py-24 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Package className="h-24 w-24" />
                </div>
                <div className="p-3 w-fit rounded-xl bg-blue-500/10 mb-4">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Inventory Pro</h2>
                <p className="text-muted-foreground">
                  Smart stock tracking with intelligent alerts and real-time category management.
                </p>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <BarChart3 className="h-24 w-24" />
                </div>
                <div className="p-3 w-fit rounded-xl bg-purple-500/10 mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Live Insights</h2>
                <p className="text-muted-foreground">
                  Dynamic charts and reporting tools that turn complex data into clear business strategy.
                </p>
              </div>
              
              <div className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <CheckCircle2 className="h-24 w-24" />
                </div>
                <div className="p-3 w-fit rounded-xl bg-pink-500/10 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-pink-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Workflow Hub</h2>
                <p className="text-muted-foreground">
                  Manage tasks and projects with a high-performance Kanban board designed for speed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-12 bg-background">
        <div className="container flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Prisma, and Tailwind. © 2026 InvAnalytics Corp.
          </p>
        </div>
      </footer>
    </div>
  );
}
