import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, CheckCircle, XCircle, Clock } from "lucide-react";

const documents = [
  { name: "Denuncia original", type: "DENUNCIA", institution: "POLICIA", status: "aprobado" },
  { name: "Declaración testimonial", type: "TESTIMONIO", institution: "MINISTERIO", status: "aprobado" },
  { name: "Certificado médico", type: "PRUEBA", institution: "MINISTERIO", status: "en_revision" },
  { name: "Fotos evidencia", type: "PRUEBA", institution: "POLICIA", status: "pendiente" },
  { name: "Peritaje psicológico", type: "PERITAJE", institution: "JUZGADO", status: "pendiente" },
];

const statusConfig: Record<string, { color: string; icon: typeof FileText }> = {
  aprobado: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  en_revision: { color: "bg-blue-100 text-blue-700", icon: Clock },
  pendiente: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  rechazado: { color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function ExpedientePage() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1E3A5F]">Expediente Digital</h1>
        <p className="text-sm lg:text-base text-slate-500 mt-0.5 lg:mt-1">
          Documentos de todas las instituciones
        </p>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <div className="overflow-x-auto pb-1 scrollbar-none">
          <TabsList className="inline-flex w-max min-w-full">
            <TabsTrigger value="todos" className="text-xs lg:text-sm">Todos</TabsTrigger>
            <TabsTrigger value="policia" className="text-xs lg:text-sm">Policía</TabsTrigger>
            <TabsTrigger value="ministerio" className="text-xs lg:text-sm">Ministerio</TabsTrigger>
            <TabsTrigger value="juzgado" className="text-xs lg:text-sm">Juzgado</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="todos" className="space-y-2 lg:space-y-4 mt-4 lg:mt-6">
          {documents.map((doc, index) => {
            const config = statusConfig[doc.status];
            const Icon = config.icon;
            return (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-3 lg:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 lg:p-2 rounded-lg bg-slate-100 shrink-0">
                      <FileText className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm lg:text-base font-medium text-[#1E3A5F] truncate">
                        {doc.name}
                      </div>
                      <div className="text-xs lg:text-sm text-slate-500 truncate">
                        {doc.institution} &bull; {doc.type}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${config.color} text-xs w-fit shrink-0 self-end sm:self-auto`}>
                    <Icon className="w-3 h-3 mr-1 inline" />
                    {doc.status.replace("_", " ")}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="policia">
          <div className="text-slate-500 py-8 text-center text-sm">Documentos de Policía</div>
        </TabsContent>
        <TabsContent value="ministerio">
          <div className="text-slate-500 py-8 text-center text-sm">Documentos del Ministerio</div>
        </TabsContent>
        <TabsContent value="juzgado">
          <div className="text-slate-500 py-8 text-center text-sm">Documentos del Juzgado</div>
        </TabsContent>
      </Tabs>

      {/* Upload area */}
      <Card className="border-dashed border-2 border-slate-300">
        <CardContent className="p-6 lg:p-8 text-center">
          <Upload className="w-8 h-8 lg:w-12 lg:h-12 text-slate-400 mx-auto mb-3 lg:mb-4" />
          <p className="text-sm lg:text-base text-slate-500">Arrastrá archivos aquí o hacé click para subir</p>
          <p className="text-xs text-slate-400 mt-1 lg:mt-2">PDF, JPG, PNG hasta 10MB</p>
        </CardContent>
      </Card>
    </div>
  );
}
