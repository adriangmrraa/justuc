"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, Calendar, FileText, MessageSquare, Settings, Scale, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/timeline", icon: Calendar, label: "Mi Timeline" },
  { href: "/dashboard/expediente", icon: FileText, label: "Expediente" },
  { href: "/dashboard/denuncia", icon: FileText, label: "Nueva Denuncia" },
  { href: "/dashboard/feedback", icon: MessageSquare, label: "El Buen Trato" },
  { href: "/dashboard/settings", icon: Settings, label: "Configuración" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="text-xl font-bold text-white">Mi Proceso</h1>
              <p className="text-xs text-slate-400">Justicia Tucumán</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? "bg-red-600 text-white shadow-lg shadow-red-500/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section - Demo Mode */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 text-slate-400">
            <div className="text-xs">Modo Demo</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500">
              Panel de Seguimiento
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors relative">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-red-100 text-red-600 font-medium">
                  D
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-slate-700">
                Usuario Demo
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}