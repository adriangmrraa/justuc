"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Calendar, TrendingUp, Plus, ArrowRight, Eye, ExternalLink, Scale, MapPin, User, Building } from "lucide-react";
import Link from "next/link";
import Modal from "@/components/features/modal";

interface CaseItem {
  id: string;
  title: string;
  lastUpdate: string;
  status: string;
  statusColor: string;
  desc: string;
  type: string;
  location: string;
  officer: string;
  institution: string;
}

const stats = [
  { icon: FileText, label: "Casos Activos", value: "3", subtext: "En seguimiento" },
  { icon: Clock, label: "Pendientes", value: "1", subtext: "Audiencia próxima" },
  { icon: Calendar, label: "Calendario", value: "Conectado", subtext: "Google Calendar sync" },
  { icon: TrendingUp, label: "Estado General", value: "En proceso", subtext: "Sin bloqueos" },
];

const cases: CaseItem[] = [
  {
    id: "001",
    title: "Violencia de Género",
    lastUpdate: "hace 2 días",
    status: "En Audiencia",
    statusColor: "yellow",
    desc: "Denuncia por violencia de género en el ámbito familiar. Se encuentra en etapa de audiencia preliminar.",
    type: "Violencia de Género",
    location: "Juzgado de Familia N°2 - Tribunales de Tucumán",
    officer: "Dra. María González",
    institution: "Poder Judicial de Tucumán",
  },
  {
    id: "002",
    title: "Delito contra la Propiedad",
    lastUpdate: "hace 5 días",
    status: "Peritaje",
    statusColor: "blue",
    desc: "Hurto calificado. Se están realizando pericias forenses sobre las evidencias recolectadas.",
    type: "Delito Común",
    location: "Fiscalía de Instrucción N°3",
    officer: "Dr. Carlos Martínez",
    institution: "Ministerio Público Fiscal",
  },
  {
    id: "003",
    title: "Accidente de Tránsito",
    lastUpdate: "hace 1 semana",
    status: "Asignado a Fiscal",
    statusColor: "green",
    desc: "Accidente de tránsito con lesionados. Se asignó fiscal para investigar las circunstancias.",
    type: "Accidente de Tránsito",
    location: "Fiscalía de Instrucción N°5",
    officer: "Dra. Laura Rodríguez",
    institution: "Ministerio Público Fiscal",
  },
];

const statusColors: Record<string, string> = {
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function DashboardPage() {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  return (
    <div className="space-y-4 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#1E3A5F]">
            Bienvenido, Usuario Demo
          </h1>
          <p className="text-sm lg:text-base text-slate-500 mt-0.5 lg:mt-1">
            Aquí está el estado de tus procesos judiciales
          </p>
        </div>
        <Link href="/dashboard/denuncia" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Denuncia
          </Button>
        </Link>
      </div>

      {/* Stats */}
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

      {/* Casos Recientes — click opens modal */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between p-4 lg:p-6">
          <div className="min-w-0">
            <CardTitle className="text-base lg:text-lg text-[#1E3A5F]">Tus Casos Recientes</CardTitle>
            <CardDescription className="text-xs lg:text-sm">Tocá un caso para ver el detalle completo</CardDescription>
          </div>
          <Link href="/dashboard/timeline" className="shrink-0">
            <Button variant="ghost" size="sm" className="text-xs lg:text-sm text-slate-500">
              <span className="hidden sm:inline">Ver todos</span>
              <ArrowRight className="w-4 h-4 sm:ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-2 lg:space-y-3 px-4 lg:px-6 pb-4 lg:pb-6">
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between p-3 lg:p-4 border rounded-lg hover:border-[#5BA3E6]/40 hover:bg-[#F0F7FE] transition-all gap-2 sm:gap-3 cursor-pointer"
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
                <div className="p-1.5 rounded-lg bg-[#F0F7FE] text-[#5BA3E6]">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        <Link href="/dashboard/denuncia">
          <div className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-[#5BA3E6] to-[#3B82F6] text-white shadow-lg hover:scale-[1.02] transition-transform">
            <FileText className="w-6 h-6 lg:w-8 lg:h-8 mb-2 lg:mb-3" />
            <h3 className="font-semibold text-sm lg:text-lg mb-0.5 lg:mb-1">Nueva Denuncia</h3>
            <p className="text-blue-100 text-xs lg:text-sm">Iniciá un nuevo proceso judicial</p>
          </div>
        </Link>
        <Link href="/dashboard/settings">
          <div className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg hover:scale-[1.02] transition-transform">
            <Calendar className="w-6 h-6 lg:w-8 lg:h-8 mb-2 lg:mb-3" />
            <h3 className="font-semibold text-sm lg:text-lg mb-0.5 lg:mb-1">Sincronizar Calendar</h3>
            <p className="text-blue-100 text-xs lg:text-sm">Conectá tus audiencias</p>
          </div>
        </Link>
        <Link href="/dashboard/feedback">
          <div className="p-4 lg:p-6 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg hover:scale-[1.02] transition-transform">
            <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 mb-2 lg:mb-3" />
            <h3 className="font-semibold text-sm lg:text-lg mb-0.5 lg:mb-1">Calificar Trato</h3>
            <p className="text-purple-100 text-xs lg:text-sm">Evaluá tu experiencia</p>
          </div>
        </Link>
      </div>

      {/* Compartir tracking */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg bg-slate-100 border border-slate-200">
        <div className="p-2 lg:p-3 rounded-full bg-blue-100 shrink-0">
          <Eye className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700">¿Querés compartir el estado de tu caso?</p>
          <p className="text-xs text-slate-500">Generá un código de seguimiento público desde Configuración</p>
        </div>
        <Link href="/dashboard/settings" className="w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
            Ir a Configuración
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>

      {/* ============ MODAL DE DETALLE DEL CASO ============ */}
      <Modal
        open={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        title={selectedCase ? `Caso #${selectedCase.id}` : ""}
      >
        {selectedCase && (
          <div className="space-y-5">
            {/* Título y estado */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-[#1E3A5F]">{selectedCase.title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">Última actualización: {selectedCase.lastUpdate}</p>
              </div>
              <Badge className={`shrink-0 text-xs ${statusColors[selectedCase.statusColor]}`}>
                {selectedCase.status}
              </Badge>
            </div>

            {/* Descripción */}
            <div className="p-4 rounded-lg bg-[#F0F7FE] border border-[#5BA3E6]/20">
              <p className="text-sm text-slate-700 leading-relaxed">{selectedCase.desc}</p>
            </div>

            {/* Datos estructurados */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                  <Scale className="w-4 h-4 text-slate-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Tipo</p>
                  <p className="text-sm font-medium text-[#1E3A5F]">{selectedCase.type}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                  <MapPin className="w-4 h-4 text-slate-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Ubicación</p>
                  <p className="text-sm font-medium text-[#1E3A5F]">{selectedCase.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Funcionario a cargo</p>
                  <p className="text-sm font-medium text-[#1E3A5F]">{selectedCase.officer}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                  <Building className="w-4 h-4 text-slate-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Institución</p>
                  <p className="text-sm font-medium text-[#1E3A5F]">{selectedCase.institution}</p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
              <Link href="/dashboard/timeline" className="w-full sm:flex-1" onClick={() => setSelectedCase(null)}>
                <Button variant="outline" className="w-full text-xs lg:text-sm border-slate-300">
                  Ver Timeline
                </Button>
              </Link>
              <Link href="/dashboard/expediente" className="w-full sm:flex-1" onClick={() => setSelectedCase(null)}>
                <Button className="w-full bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white text-xs lg:text-sm">
                  Ver Expediente
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
