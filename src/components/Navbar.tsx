import Link from "next/link";
import { Package2, LayoutDashboard, ListTodo, FolderCheck } from "lucide-react";

export function Navbar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block w-[240px] h-screen">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>InvAnalytics</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/inventory"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ListTodo className="h-4 w-4" />
              Inventory
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <FolderCheck className="h-4 w-4" />
              Projects
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}