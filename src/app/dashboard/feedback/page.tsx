import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare, TrendingUp } from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1E3A5F]">El Buen Trato</h1>
        <p className="text-sm lg:text-base text-slate-500 mt-0.5 lg:mt-1">
          Calificá tu experiencia con el sistema judicial
        </p>
      </div>

      {/* Nueva Calificación */}
      <Card className="border-[#5BA3E6]/20">
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-base lg:text-lg text-[#1E3A5F]">
            <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5 text-[#5BA3E6]" />
            Nueva Calificación
          </CardTitle>
          <CardDescription className="text-xs lg:text-sm">
            Tu feedback ayuda a mejorar el sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 lg:space-y-6 px-4 lg:px-6 pb-4 lg:pb-6">
          <div className="space-y-2">
            <Label className="text-sm lg:text-base font-medium">¿Te trataron con respeto?</Label>
            <div className="flex gap-1 lg:gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="p-1 lg:p-2 hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-400 fill-yellow-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm lg:text-base font-medium">¿Te escucharon?</Label>
            <div className="flex gap-1 lg:gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="p-1 lg:p-2 hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-400 fill-yellow-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm lg:text-base font-medium">¿Te informaron claramente?</Label>
            <div className="flex gap-1 lg:gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="p-1 lg:p-2 hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-400 fill-yellow-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm lg:text-base font-medium">Comentarios (opcional)</Label>
            <textarea
              className="w-full p-3 border rounded-lg min-h-[80px] lg:min-h-[100px] text-sm"
              placeholder="Contanos más sobre tu experiencia..."
            />
          </div>

          <Button className="w-full bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white">
            Enviar Calificación
          </Button>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-3 lg:gap-4">
        <Card>
          <CardContent className="p-3 lg:p-6 text-center">
            <div className="text-xl lg:text-4xl font-bold text-green-600 mb-1 lg:mb-2">4.2</div>
            <div className="text-[10px] lg:text-sm text-slate-500">Promedio General</div>
            <div className="flex justify-center mt-1 lg:mt-2 gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 lg:p-6 text-center">
            <div className="text-xl lg:text-4xl font-bold text-blue-600 mb-1 lg:mb-2">156</div>
            <div className="text-[10px] lg:text-sm text-slate-500">Calificaciones</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 lg:p-6 text-center">
            <div className="text-xl lg:text-4xl font-bold text-purple-600 mb-1 lg:mb-2">+0.3</div>
            <div className="text-[10px] lg:text-sm text-slate-500">Este mes</div>
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-500 mx-auto mt-1 lg:mt-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
