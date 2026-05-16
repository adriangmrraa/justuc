import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import ExpandableLogo from "@/components/features/expandable-logo";

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
          <div className="inline-flex items-center justify-center mb-3 lg:mb-4">
            <ExpandableLogo src="/logojustuc.jpg" alt="Justuc Logo" size={72} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Justuc</h1>
          <p className="text-blue-200/70 mt-1 lg:mt-2 text-xs lg:text-sm">Justicia Tucumán</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader className="text-center pb-2 p-4 lg:p-6">
            <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-[#5BA3E6]/20 flex items-center justify-center mx-auto mb-2 lg:mb-3 overflow-hidden">
              <img
                src="/logojustuc.jpg"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <CardTitle className="text-lg lg:text-2xl font-bold text-white">Bienvenido de nuevo</CardTitle>
            <CardDescription className="text-xs lg:text-sm text-blue-200/60">
              Iniciá sesión para acceder a tu panel de seguimiento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 lg:space-y-6 p-4 lg:p-6 pt-2 lg:pt-4">
            {/* DEMO Button */}
            <div className="p-3 lg:p-4 rounded-lg bg-[#5BA3E6]/10 border border-[#5BA3E6]/30">
              <p className="text-xs lg:text-sm text-blue-200/80 text-center mb-3 lg:mb-4">
                <span className="text-[#5BA3E6] font-medium">¿Querés probar el MVP?</span><br />
                Accedé sin necesidad de cuenta de Google
              </p>
              <form action={async () => {
                "use server";
                await signIn("credentials", { redirectTo: "/dashboard" });
              }}>
                <Button type="submit" className="w-full bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white font-semibold py-4 lg:py-5 text-sm lg:text-lg">
                  <Play className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  Modo Demo
                </Button>
              </form>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-blue-200/40">o</span>
              </div>
            </div>

            {/* Google Button */}
            <form action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}>
              <Button type="submit" className="w-full bg-white text-[#1E3A5F] hover:bg-blue-50 font-semibold py-4 lg:py-6 text-sm lg:text-lg">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar con Google
              </Button>
            </form>

            {/* Info */}
            <div className="text-center text-[10px] lg:text-xs text-blue-200/40 space-y-1">
              <p>Al continuar, aceptás nuestros términos de uso</p>
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
