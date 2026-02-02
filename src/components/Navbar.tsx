import Link from "next/link";
import { 
  Package2, 
  LayoutDashboard, 
  ListTodo, 
  FolderCheck, 
  BrainCircuit, 
  Users, 
  Truck, 
  Receipt, 
  History,
  TrendingUp,
  ShoppingCart
} from "lucide-react";

export function Navbar() {
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/deals", label: "Sales Pipeline", icon: TrendingUp },
    { href: "/inventory", label: "Inventory", icon: ListTodo },
    { href: "/procurement", label: "Procurement", icon: ShoppingCart },
    { href: "/projects", label: "Projects", icon: FolderCheck },
    { href: "/bi-studio", label: "BI Studio", icon: BrainCircuit },
    { href: "/crm", label: "CRM", icon: Users },
    { href: "/suppliers", label: "Suppliers", icon: Truck },
    { href: "/invoices", label: "Invoices", icon: Receipt },
    { href: "/audit", label: "Audit Log", icon: History },
  ];

  return (
    <div className="hidden border-r bg-slate-900 md:block w-[240px] h-screen text-slate-300">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b border-slate-800 px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-white">
            <Package2 className="h-6 w-6 text-blue-500" />
            <span>InvAnalytics <span className="text-[10px] bg-blue-500 text-white px-1 rounded ml-1">ERP</span></span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-slate-800 hover:text-white"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
