import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, Calendar, FileText, MessageSquare, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-red-500">Mi Proceso</h1>
          <p className="text-xs text-slate-400 mt-1">Justicia Tucumán</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </Link>
          <Link
            href="/dashboard/timeline"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span>Mi Timeline</span>
          </Link>
          <Link
            href="/dashboard/expediente"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Expediente</span>
          </Link>
          <Link
            href="/dashboard/denuncia"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Nueva Denuncia</span>
          </Link>
          <Link
            href="/dashboard/feedback"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span>El Buen Trato</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Cerrar Sesión
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <div className="text-sm text-slate-500">
            Panel de Seguimiento
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={session.user?.image ?? ""} />
              <AvatarFallback>
                {session.user?.name?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              {session.user?.name ?? session.user?.email}
            </span>
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