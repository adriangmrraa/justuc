import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Calendar, TrendingUp, Plus, ArrowRight, Eye, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const userName = "Usuario Demo";

  const stats = [
    { icon: FileText, label: "Casos Activos", value: "3", subtext: "En seguimiento" },
    { icon: Clock, label: "Pendientes", value: "1", subtext: "Audiencia próxima" },
    { icon: Calendar, label: "Calendario", value: "Conectado", subtext: "Google Calendar sync" },
    { icon: TrendingUp, label: "Estado General", value: "En proceso", subtext: "Sin bloqueos" },
  ];

  const cases = [
    { id: "001", title: "Violencia de Género", lastUpdate: "hace 2 días", status: "En Audiencia", statusColor: "yellow" },
    { id: "002", title: "Delito contra la Propiedad", lastUpdate: "hace 5 días", status: "Peritaje", statusColor: "blue" },
    { id: "003", title: "Accidente de Tránsito", lastUpdate: "hace 1 semana", status: "Asignado a Fiscal", statusColor: "green" },
  ];

  const statusColors: Record<string, string> = {
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className="space-y-4 lg:space-y-8">
      {/* Header — stacks on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#1E3A5F]">
            Bienvenido, {userName}
          </h1>
          <p className="text-sm lg:text-base text-slate-500 mt-0.5 lg:mt-1">
            Aquí está el estado de tus procesos judiciales
          </p>
        </div>
        <Link href="/denuncia" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Denuncia
          </Button>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 lg:p-4">
              <CardTitle className="text-xs lg:text-sm font-medium text-slate-500">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 lg:p-4 pt-0 lg:pt-0">
              <div className="text-xl lg:text-2xl font-bold text-[#1E3A5F]">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-0.5">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Casos Recientes */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between p-4 lg:p-6">
          <div className="min-w-0">
            <CardTitle className="text-base lg:text-lg text-[#1E3A5F]">Tus Casos Recientes</CardTitle>
            <CardDescription className="text-xs lg:text-sm">Casos que tenés en seguimiento</CardDescription>
          </div>
          <Link href="/timeline" className="shrink-0">
            <Button variant="ghost" size="sm" className="text-xs lg:text-sm text-slate-500">
              <span className="hidden sm:inline">Ver todos</span>
              <ArrowRight className="w-4 h-4 sm:ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-2 lg:space-y-3 px-4 lg:px-6 pb-4 lg:pb-6">
          {cases.map((c) => (
            <div
              key={c.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border rounded-lg hover:border-[#5BA3E6]/40 hover:bg-[#F0F7FE] transition-all gap-2 sm:gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm lg:text-base text-slate-900 truncate">{c.title}</div>
                <div className="text-xs lg:text-sm text-slate-500">
                  Caso #{c.id} &bull; {c.lastUpdate}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
                <Badge variant="outline" className={`text-xs whitespace-nowrap ${statusColors[c.statusColor]}`}>
                  {c.status}
                </Badge>
                <div className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        <Link href="/denuncia">
          <div className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-[#5BA3E6] to-[#3B82F6] text-white shadow-lg hover:scale-[1.02] transition-transform">
            <FileText className="w-6 h-6 lg:w-8 lg:h-8 mb-2 lg:mb-3" />
            <h3 className="font-semibold text-sm lg:text-lg mb-0.5 lg:mb-1">Nueva Denuncia</h3>
            <p className="text-blue-100 text-xs lg:text-sm">Iniciá un nuevo proceso judicial</p>
          </div>
        </Link>
        <Link href="/calendar">
          <div className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg hover:scale-[1.02] transition-transform">
            <Calendar className="w-6 h-6 lg:w-8 lg:h-8 mb-2 lg:mb-3" />
            <h3 className="font-semibold text-sm lg:text-lg mb-0.5 lg:mb-1">Sincronizar Calendar</h3>
            <p className="text-blue-100 text-xs lg:text-sm">Conectá tus audiencias</p>
          </div>
        </Link>
        <Link href="/feedback">
          <div className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg hover:scale-[1.02] transition-transform">
            <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 mb-2 lg:mb-3" />
            <h3 className="font-semibold text-sm lg:text-lg mb-0.5 lg:mb-1">Calificar Trato</h3>
            <p className="text-purple-100 text-xs lg:text-sm">Evaluá tu experiencia</p>
          </div>
        </Link>
      </div>

      {/* Compartir tracking — stacks on mobile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg bg-slate-100 border border-slate-200">
        <div className="p-2 lg:p-3 rounded-full bg-blue-100 shrink-0">
          <Eye className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700">¿Querés compartir el estado de tu caso?</p>
          <p className="text-xs text-slate-500">Generá un código de seguimiento público desde Configuración</p>
        </div>
        <Link href="/settings" className="w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
            Ir a Configuración
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
