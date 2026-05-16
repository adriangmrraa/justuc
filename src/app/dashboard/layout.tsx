"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, Calendar, FileText, MessageSquare, Settings, Bell } from "lucide-react";
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
    <div className="min-h-screen flex bg-[#F0F7FE]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A2647] text-white flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-5 border-b border-[#1A3F62]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
              <Image
                src="/logojustuc.jpg"
                alt="Justuc Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">Justuc</h1>
              <p className="text-[10px] text-blue-200/70">Justicia Tucumán</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? "bg-[#5BA3E6] text-white shadow-lg shadow-[#5BA3E6]/30 font-medium" 
                    : "text-blue-200/70 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section - Demo Mode */}
        <div className="p-4 border-t border-[#1A3F62]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5BA3E6]/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#5BA3E6] animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-blue-200/70">Demo activo</p>
              <p className="text-xs font-medium text-white/90">Usuario Demo</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="text-sm text-[#5BA3E6] font-medium">
              Panel de Seguimiento
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-[#F0F7FE] transition-colors relative">
              <Bell className="w-5 h-5 text-[#5BA3E6]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#5BA3E6] rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-[#E2E8F0]">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-[#D4E8F7] text-[#1E3A5F] font-medium">
                  D
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-[#1E3A5F]">
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