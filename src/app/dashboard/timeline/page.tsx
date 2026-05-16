import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const events = [
  { date: "16 May 2026", title: "Audiencia de Control", description: "Audiencia programada con el juez", institution: "JUZGADO", status: "pendiente", completed: false },
  { date: "10 May 2026", title: "Peritaje Psicológico", description: "Se solicitó peritaje psicológico", institution: "MINISTERIO", status: "en_proceso", completed: false },
  { date: "28 Abr 2026", title: "Asignación a Fiscal", description: "Caso asignado a Fiscal de Género", institution: "MINISTERIO", status: "completado", completed: true },
  { date: "20 Abr 2026", title: "Denuncia Presentada", description: "Se presentó denuncia en comisaría", institution: "POLICIA", status: "completado", completed: true },
];

const statusColors: Record<string, string> = {
  completado: "bg-green-100 text-green-700 border-green-200",
  en_proceso: "bg-blue-100 text-blue-700 border-blue-200",
  pendiente: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function TimelinePage() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1E3A5F]">Mi Línea de Tiempo</h1>
        <p className="text-sm lg:text-base text-slate-500 mt-0.5 lg:mt-1">
          Seguimiento visual de tu proceso judicial
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[18px] lg:left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

        <div className="space-y-4 lg:space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative flex gap-3 lg:gap-6">
              {/* Timeline dot */}
              <div
                className={`
                  w-9 h-9 lg:w-12 lg:h-12 rounded-full flex items-center justify-center z-10 shrink-0
                  ${event.completed
                    ? "bg-green-500"
                    : event.status === "en_proceso"
                    ? "bg-blue-500"
                    : "bg-yellow-500"
                  }
                `}
              >
                <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-white" />
              </div>

              {/* Event card */}
              <Card className="flex-1 min-w-0 border-slate-200">
                <CardHeader className="p-3 lg:p-4 pb-1 lg:pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <div className="text-xs lg:text-sm text-slate-500">{event.date}</div>
                    <Badge
                      variant="outline"
                      className={`text-xs w-fit whitespace-nowrap ${
                        statusColors[event.status]
                      }`}
                    >
                      {event.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm lg:text-lg mt-1 lg:mt-2 text-[#1E3A5F]">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-xs lg:text-sm">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-3 lg:px-4 pb-3 lg:pb-4">
                  <div className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-wide">
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
