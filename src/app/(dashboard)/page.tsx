import { auth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Calendar, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Bienvenido, {session?.user?.name?.split(" ")[0] ?? "Usuario"}
        </h1>
        <p className="text-slate-500 mt-1">
          Aquí está el estado de tus procesos judiciales
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Casos Activos
            </CardTitle>
            <FileText className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-slate-500 mt-1">En seguimiento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Pendientes
            </CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-slate-500 mt-1">Audiencia próxima</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Calendario
            </CardTitle>
            <Calendar className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Conectado</div>
            <p className="text-xs text-slate-500 mt-1">Google Calendar sync</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Estado General
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">En proceso</div>
            <p className="text-xs text-slate-500 mt-1">Sin bloqueos</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Tus Casos Recientes</CardTitle>
          <CardDescription>
            Casos que tenés en seguimiento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">Violencia de Género</div>
              <div className="text-sm text-slate-500">Caso #001 • Última actualización: hace 2 días</div>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              En Audiencia
            </Badge>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">Delito contra la Propiedad</div>
              <div className="text-sm text-slate-500">Caso #002 • Última actualización: hace 5 días</div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Peritaje
            </Badge>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">Accidente de Tránsito</div>
              <div className="text-sm text-slate-500">Caso #003 • Última actualización: hace 1 semana</div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Asignado a Fiscal
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}