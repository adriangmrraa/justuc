import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FileText, Lock, Send } from "lucide-react";

export default function DenunciaPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Nueva Denuncia</h1>
        <p className="text-slate-500 mt-1">Iniciá un nuevo proceso judicial</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Caso</CardTitle>
          <CardDescription>Completá los datos de tu denuncia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tipo de denuncia */}
          <div className="space-y-2">
            <Label>Tipo de Denuncia</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="violencia_genero">Violencia de Género</SelectItem>
                <SelectItem value="delito_comun">Delito Común</SelectItem>
                <SelectItem value="accidente">Accidente de Tránsito</SelectItem>
                <SelectItem value="propiedad">Delito contra la Propiedad</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label>Título del Caso</Label>
            <Input placeholder="Breve descripción del caso" />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label>Descripción Detallada</Label>
            <Textarea 
              placeholder="Describí lo que happenedió..." 
              className="min-h-[150px]"
            />
          </div>

          {/* Fecha del incidente */}
          <div className="space-y-2">
            <Label>Fecha del Incidente</Label>
            <Input type="date" />
          </div>

          {/* Modo Incógnito */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-medium">Modo Incógnito</div>
                <div className="text-sm text-slate-500">Tu identidad no será expuesta públicamente</div>
              </div>
            </div>
            <Switch />
          </div>

          {/* Archivos adjuntos */}
          <div className="space-y-2">
            <Label>Adjuntar Evidencia</Label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-slate-400 transition-colors">
              <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Click para subir archivos</p>
              <p className="text-xs text-slate-400">PDF, JPG, PNG hasta 10MB</p>
            </div>
          </div>

          {/* Submit */}
          <Button className="w-full bg-red-600 hover:bg-red-700">
            <Send className="w-4 h-4 mr-2" />
            Enviar Denuncia
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}