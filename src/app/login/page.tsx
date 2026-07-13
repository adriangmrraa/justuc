import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2647] p-4">
      {/* Back Button */}
      <div className="absolute top-4 lg:top-6 left-4 lg:left-6">
        <Link href="/" className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors text-xs lg:text-sm">
          <ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4" />
          Volver al inicio
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 lg:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#5BA3E6]/20 mb-3 lg:mb-4">
            <span className="text-2xl lg:text-3xl font-bold text-[#5BA3E6]">MP</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Mi Proceso</h1>
          <p className="text-blue-200/70 mt-1 lg:mt-2 text-xs lg:text-sm">Justicia Tucumán</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader className="text-center pb-2 p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-2xl font-bold text-white">Bienvenido de nuevo</CardTitle>
            <CardDescription className="text-xs lg:text-sm text-blue-200/60">
              Accedé a tu panel de seguimiento judicial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 lg:space-y-6 p-4 lg:p-6 pt-2 lg:pt-4">
            {/* DEMO Button */}
            <div className="p-3 lg:p-4 rounded-lg bg-[#5BA3E6]/10 border border-[#5BA3E6]/30">
              <p className="text-xs lg:text-sm text-blue-200/80 text-center mb-3 lg:mb-4">
                <span className="text-[#5BA3E6] font-medium">¿Querés probar el MVP?</span><br />
                Accedé sin necesidad de cuenta de Google
              </p>
              <Link href="/dashboard">
                <Button className="w-full bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white font-semibold py-4 lg:py-5 text-sm lg:text-lg cursor-pointer">
                  <Play className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  Modo Demo
                </Button>
              </Link>
            </div>

            {/* Info */}
            <div className="text-center text-[10px] lg:text-xs text-blue-200/40 space-y-1">
              <p>Tu información está segura y nunca será compartida</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-blue-200/40 text-[10px] lg:text-sm mt-4 lg:mt-6">
          Hackathon Norte Potencia 2026
        </p>
      </div>
    </div>
  );
}
