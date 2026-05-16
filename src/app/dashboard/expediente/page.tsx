import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, CheckCircle, XCircle, Clock } from "lucide-react";

const documents = [
  { name: "Denuncia original", type: "DENUNCIA", institution: "POLICIA", status: "aprobado" },
  { name: "Declaración testimonial", type: "TESTIMONIO", institution: "MINISTERIO", status: "aprobado" },
  { name: "Certificado médico", type: "PRUEBA", institution: "MINISTERIO", status: "en_revision" },
  { name: "Fotos evidence", type: "PRUEBA", institution: "POLICIA", status: "pendiente" },
  { name: "Peritaje psicológico", type: "PERITAJE", institution: "JUZGADO", status: "pendiente" },
];

const statusConfig = {
  aprobado: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  en_revision: { color: "bg-blue-100 text-blue-700", icon: Clock },
  pendiente: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  rechazado: { color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function ExpedientePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Expediente Digital</h1>
        <p className="text-slate-500 mt-1">Documentos de todas las instituciones</p>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="policia">Policía</TabsTrigger>
          <TabsTrigger value="ministerio">Ministerio</TabsTrigger>
          <TabsTrigger value="juzgado">Juzgado</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4 mt-6">
          {documents.map((doc, index) => {
            const config = statusConfig[doc.status as keyof typeof statusConfig];
            const Icon = config.icon;
            return (
              <Card key={index} className="border-slate-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-slate-100">
                      <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-slate-500">{doc.institution} • {doc.type}</div>
                    </div>
                  </div>
                  <Badge className={config.color}>
                    <Icon className="w-3 h-3 mr-1" />
                    {doc.status.replace("_", " ")}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="policia">
          <div className="text-slate-500 py-8 text-center">Documentos de Policía</div>
        </TabsContent>
        <TabsContent value="ministerio">
          <div className="text-slate-500 py-8 text-center">Documentos del Ministerio</div>
        </TabsContent>
        <TabsContent value="juzgado">
          <div className="text-slate-500 py-8 text-center">Documentos del Juzgado</div>
        </TabsContent>
      </Tabs>

      <Card className="border-dashed border-2 border-slate-300">
        <CardContent className="p-8 text-center">
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-500">Arrastrá archivos aquí o hacé click para subir</p>
          <p className="text-xs text-slate-400 mt-2">PDF, JPG, PNG hasta 10MB</p>
        </CardContent>
      </Card>
    </div>
  );
}