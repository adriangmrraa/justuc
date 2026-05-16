import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const events = [
  { date: "16 May 2026", title: "Audiencia de Control", description: "Audiencia programada con el juez", institution: "JUZGADO", status: "pendiente", completed: false },
  { date: "10 May 2026", title: "Peritaje Psicológico", description: "Se solicitó peritaje psicológico", institution: "MINISTERIO", status: "en_proceso", completed: false },
  { date: "28 Abr 2026", title: "Asignación a Fiscal", description: "Caso asignado a Fiscal de Género", institution: "MINISTERIO", status: "completado", completed: true },
  { date: "20 Abr 2026", title: "Denuncia Presentada", description: "Se presentó denuncia en comisaría", institution: "POLICIA", status: "completado", completed: true },
];

const statusColors = {
  completado: "bg-green-100 text-green-700 border-green-200",
  en_proceso: "bg-blue-100 text-blue-700 border-blue-200",
  pendiente: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Mi Línea de Tiempo</h1>
        <p className="text-slate-500 mt-1">Seguimiento visual de tu proceso judicial</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />

        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative flex gap-6">
              {/* Timeline Dot */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${event.completed ? 'bg-green-500' : event.status === 'en_proceso' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>

              {/* Event Card */}
              <Card className="flex-1 border-slate-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">{event.date}</div>
                    <Badge variant="outline" className={statusColors[event.status as keyof typeof statusColors]}>
                      {event.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">
                    {event.institution}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}