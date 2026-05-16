import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Star, MessageSquare, TrendingUp, Copy, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">El Buen Trato</h1>
        <p className="text-slate-500 mt-1">Calificá tu experiencia con el sistema judicial</p>
      </div>

      {/* Nueva Calificación */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-500" />
            Nueva Calificación
          </CardTitle>
          <CardDescription>Tu feedback ayuda a mejorar el sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">¿Te trataron con respeto?</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="p-2 hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">¿Te escucharon?</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="p-2 hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">¿Te informaron claramente?</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="p-2 hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Comentarios (opcional)</Label>
            <textarea 
              className="w-full p-3 border rounded-lg min-h-[100px]" 
              placeholder="Contanos más sobre tu experiencia..."
            />
          </div>

          <Button className="w-full bg-red-600 hover:bg-red-700">
            Enviar Calificación
          </Button>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">4.2</div>
            <div className="text-slate-500">Promedio General</div>
            <div className="flex justify-center mt-2">
              {[1,2,3,4].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">156</div>
            <div className="text-slate-500">Calificaciones</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">+0.3</div>
            <div className="text-slate-500">Este mes</div>
            <TrendingUp className="w-4 h-4 text-green-500 mx-auto mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}