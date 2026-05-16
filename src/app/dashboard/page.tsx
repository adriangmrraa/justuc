import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Calendar, TrendingUp, Plus, ArrowRight, Eye, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Modo demo - usuario hardcodeado
  const userName = "Usuario Demo";

  const stats = [
    { icon: FileText, label: "Casos Activos", value: "3", subtext: "En seguimiento", color: "blue" },
    { icon: Clock, label: "Pendientes", value: "1", subtext: "Audiencia próxima", color: "yellow" },
    { icon: Calendar, label: "Calendario", value: "Conectado", subtext: "Google Calendar sync", color: "green" },
    { icon: TrendingUp, label: "Estado General", value: "En proceso", subtext: "Sin bloqueos", color: "purple" },
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Bienvenido, {userName}
          </h1>
          <p className="text-slate-500 mt-1">
            Aquí está el estado de tus procesos judiciales
          </p>
        </div>
        <Link href="/denuncia">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Denuncia
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">{stat.label}</CardTitle>
              <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tus Casos Recientes</CardTitle>
            <CardDescription>Casos que tenés en seguimiento</CardDescription>
          </div>
          <Link href="/timeline">
            <Button variant="ghost" size="sm" className="text-slate-500">
              Ver todos
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {cases.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-red-300 hover:bg-red-50/30 transition-all group cursor-pointer">
              <div className="flex-1">
                <div className="font-medium text-slate-900">{c.title}</div>
                <div className="text-sm text-slate-500">Caso #{c.id} • {c.lastUpdate}</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={statusColors[c.statusColor]}>{c.status}</Badge>
                <div className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><Eye className="w-4 h-4" /></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/denuncia">
          <div className="p-6 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white cursor-pointer shadow-lg hover:scale-[1.02] transition-transform">
            <FileText className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Nueva Denuncia</h3>
            <p className="text-red-100 text-sm">Iniciá un nuevo proceso judicial</p>
          </div>
        </Link>
        <Link href="/calendar">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white cursor-pointer shadow-lg hover:scale-[1.02] transition-transform">
            <Calendar className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Sincronizar Calendar</h3>
            <p className="text-blue-100 text-sm">Conectá tus audiencias</p>
          </div>
        </Link>
        <Link href="/feedback">
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white cursor-pointer shadow-lg hover:scale-[1.02] transition-transform">
            <TrendingUp className="w-8 h-8 mb-3" />
            <h3 className="font-semibold text-lg mb-1">Calificar Trato</h3>
            <p className="text-purple-100 text-sm">Evaluá tu experiencia</p>
          </div>
        </Link>
      </div>

      <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 flex items-center gap-4">
        <div className="p-3 rounded-full bg-blue-100"><Eye className="w-5 h-5 text-blue-600" /></div>
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-700">¿Querés compartir el estado de tu caso?</p>
          <p className="text-xs text-slate-500">Generá un código de seguimiento público desde Configuración</p>
        </div>
        <Link href="/settings">
          <Button variant="outline" size="sm">Ir a Configuración <ExternalLink className="w-3 h-3 ml-1" /></Button>
        </Link>
      </div>
    </div>
  );
}