"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ExpandableLogo from "@/components/features/expandable-logo";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Bell,
  Menu,
  X,
  Bot,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/timeline", icon: Calendar, label: "Mi Timeline" },
  { href: "/dashboard/expediente", icon: FileText, label: "Expediente" },
  { href: "/dashboard/asesor-ia", icon: Bot, label: "Asesor IA" },
  { href: "/dashboard/feedback", icon: MessageSquare, label: "El Buen Trato" },
  { href: "/dashboard/settings", icon: Settings, label: "Configuración" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex bg-[#F0F7FE]">
      {/* Overlay oscuro cuando el sidebar está abierto en mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* ========== SIDEBAR ========== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-[#0A2647] text-white
          flex flex-col transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:fixed lg:inset-y-0 lg:left-0
        `}
      >
        {/* Logo */}
        <div className="p-5 border-b border-[#1A3F62] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={closeSidebar}>
            <ExpandableLogo src="/logojustuc.jpg" alt="Justuc Logo" size={36} />
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
                Justuc
              </h1>
              <p className="text-[10px] text-blue-200/70">Justicia Tucumán</p>
            </div>
          </Link>
          {/* Cerrar en mobile */}
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 rounded-lg hover:bg-white/10 text-blue-200/70"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#5BA3E6] text-white shadow-lg shadow-[#5BA3E6]/30 font-medium"
                      : "text-blue-200/70 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[#1A3F62]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5BA3E6]/20 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-[#5BA3E6] animate-pulse" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-blue-200/70">Demo activo</p>
              <p className="text-xs font-medium text-white/90 truncate">
                Usuario Demo
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Header */}
        <header className="h-14 lg:h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-3 lg:px-6 shadow-sm sticky top-0 z-20">
          <div className="flex items-center gap-2 min-w-0">
            {/* Hamburger — solo mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-[#F0F7FE] transition-colors text-[#5BA3E6]"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm text-[#5BA3E6] font-medium truncate">
              Panel de Seguimiento
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <button className="p-2 rounded-lg hover:bg-[#F0F7FE] transition-colors relative">
              <Bell className="w-5 h-5 text-[#5BA3E6]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#5BA3E6] rounded-full" />
            </button>
            <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-[#E2E8F0]">
              <Avatar className="w-8 h-8 lg:w-9 lg:h-9">
                <AvatarFallback className="bg-[#D4E8F7] text-[#1E3A5F] font-medium text-xs lg:text-sm">
                  D
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-medium text-[#1E3A5F] truncate max-w-[120px]">
                Usuario Demo
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
