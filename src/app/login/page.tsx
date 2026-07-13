"use client";

import { useState, FormEvent, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, Loader2, UserCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { findUserByDni, validatePassword, mockUsers } from "@/lib/data";

const ThreeBackground = dynamic(
  () => import("@/components/features/three-background"),
  { ssr: false }
);

type LoginMode = "login" | "first-time" | "success";
type FormErrors = {
  dni?: string;
  password?: string;
  caseCode?: string;
  general?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>("login");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [caseCode, setCaseCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [userName, setUserName] = useState("");

  function validateDni(value: string): string | undefined {
    const clean = value.replace(/\D/g, "");
    if (!clean) return "Ingresá tu DNI";
    if (clean.length < 7 || clean.length > 8) return "El DNI debe tener 7 u 8 dígitos";
    return undefined;
  }

  function handleDniChange(value: string) {
    const clean = value.replace(/\D/g, "").slice(0, 8);
    setDni(clean);
    if (errors.dni) setErrors((prev) => ({ ...prev, dni: undefined }));
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
  }

  function handleCaseCodeChange(value: string) {
    setCaseCode(value);
    if (errors.caseCode) setErrors((prev) => ({ ...prev, caseCode: undefined }));
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const dniError = validateDni(dni);
    if (dniError) {
      setErrors({ dni: dniError });
      return;
    }
    if (!password) {
      setErrors({ password: "Ingresá tu contraseña" });
      return;
    }

    setLoading(true);

    // Simulate async validation
    await new Promise((r) => setTimeout(r, 800));

    const user = findUserByDni(dni);
    if (!user) {
      setErrors({
        general: "No encontramos una causa asociada a este DNI. Si hiciste una denuncia, la contraseña provisoria está en el acta que te dieron en la Fiscalía.",
      });
      setLoading(false);
      return;
    }

    if (!validatePassword(user, password)) {
      setErrors({ password: "Contraseña incorrecta. Si es tu primera vez, usá el código de causa como contraseña." });
      setLoading(false);
      return;
    }

    setUserName(user.name);

    if (user.mustChangePassword) {
      setMode("success");
      setLoading(false);
      // After showing success, redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleFirstTime(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const dniError = validateDni(dni);
    if (dniError) {
      setErrors({ dni: dniError });
      return;
    }
    if (!caseCode) {
      setErrors({ caseCode: "Ingresá el número de causa que figura en tu constancia" });
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    const user = findUserByDni(dni);
    if (!user) {
      setErrors({
        general: "No encontramos una causa asociada a este DNI. Verificá los datos en la constancia que te dieron en la Fiscalía.",
      });
      setLoading(false);
      return;
    }

    if (caseCode.toUpperCase() !== user.caseNumber) {
      setErrors({ caseCode: "El código de causa no coincide con el DNI ingresado. Revisá tu constancia." });
      setLoading(false);
      return;
    }

    // Activation successful — go to dashboard
    setUserName(user.name);
    setMode("success");
    setLoading(false);

    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  }

  // ===== SUCCESS VIEW =====
  if (mode === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A2647] p-4 relative overflow-hidden">
        <Suspense fallback={null}><ThreeBackground /></Suspense>
        <div className="w-full max-w-md text-center relative z-10 animate-in fade-in zoom-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6">
            <UserCheck className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            ¡Bienvenida, {userName}!
          </h1>
          <p className="text-blue-200/70">Estamos preparando tu panel de seguimiento...</p>
          <Loader2 className="w-6 h-6 animate-spin text-[#5BA3E6] mx-auto mt-6" />
        </div>
      </div>
    );
  }

  // ===== LOGIN VIEW =====
  if (mode === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A2647] p-4 relative overflow-hidden">
        <Suspense fallback={null}><ThreeBackground /></Suspense>

        {/* Back Button */}
        <div className="absolute top-4 lg:top-6 left-4 lg:left-6 z-20">
          <Link href="/" className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors text-xs lg:text-sm">
            <ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4" />
            Volver al inicio
          </Link>
        </div>

        <div className="w-full max-w-md relative z-10">
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
              <CardTitle className="text-lg lg:text-2xl font-bold text-white">Ingresá a tu causa</CardTitle>
              <CardDescription className="text-xs lg:text-sm text-blue-200/60">
                Usá el DNI y la contraseña que te dieron en la Fiscalía
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 lg:p-6 pt-2 lg:pt-4">
              {/* General Error */}
              {errors.general && (
                <div className="flex gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs lg:text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {/* DNI Field */}
                <div>
                  <label htmlFor="dni" className="block text-xs lg:text-sm font-medium text-blue-200/80 mb-1.5">
                    DNI
                  </label>
                  <input
                    id="dni"
                    type="text"
                    inputMode="numeric"
                    placeholder="Ej: 30123456"
                    value={dni}
                    onChange={(e) => handleDniChange(e.target.value)}
                    className={`w-full px-3 py-2.5 lg:py-3 rounded-lg bg-white/10 border text-white text-sm lg:text-base placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#5BA3E6]/50 transition-colors ${
                      errors.dni ? "border-red-400/50" : "border-white/20"
                    }`}
                    autoComplete="username"
                    autoFocus
                  />
                  {errors.dni && (
                    <p className="text-red-300 text-xs mt-1">{errors.dni}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-xs lg:text-sm font-medium text-blue-200/80 mb-1.5">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Tu contraseña o código de causa"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      className={`w-full px-3 py-2.5 lg:py-3 pr-10 rounded-lg bg-white/10 border text-white text-sm lg:text-base placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#5BA3E6]/50 transition-colors ${
                        errors.password ? "border-red-400/50" : "border-white/20"
                      }`}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/50 hover:text-blue-200/80 transition-colors"
                      tabIndex={-1}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-300 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white font-semibold py-4 lg:py-5 text-sm lg:text-lg cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 mr-2 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Ingresar"
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 text-xs text-blue-200/40 bg-transparent">o</span>
                </div>
              </div>

              {/* First time link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode("first-time");
                    setErrors({});
                    setPassword("");
                  }}
                  className="text-xs lg:text-sm text-[#5BA3E6] hover:text-[#6BB4F0] underline underline-offset-2 transition-colors"
                >
                  ¿Es tu primera vez? Activá tu cuenta acá
                </button>
              </div>

              {/* Demo link */}
              <div className="p-3 rounded-lg bg-[#5BA3E6]/10 border border-[#5BA3E6]/30">
                <p className="text-xs lg:text-sm text-blue-200/80 text-center">
                  <span className="text-[#5BA3E6] font-medium">¿Solo querés probar?</span>
                  <br />
                  <Link href="/dashboard" className="underline underline-offset-2 hover:text-white transition-colors">
                    Entrá al modo demo
                  </Link>
                </p>
              </div>

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

  // ===== FIRST TIME VIEW =====
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2647] p-4 relative overflow-hidden">
      <Suspense fallback={null}><ThreeBackground /></Suspense>

      {/* Back Button */}
      <div className="absolute top-4 lg:top-6 left-4 lg:left-6 z-20">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setErrors({});
            setCaseCode("");
          }}
          className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors text-xs lg:text-sm"
        >
          <ArrowLeft className="w-3 h-3 lg:w-4 lg:h-4" />
          Volver al inicio de sesión
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-6 lg:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#5BA3E6]/20 mb-3 lg:mb-4">
            <span className="text-2xl lg:text-3xl font-bold text-[#5BA3E6]">MP</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Primera vez</h1>
          <p className="text-blue-200/70 mt-1 lg:mt-2 text-xs lg:text-sm">Activá tu cuenta</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader className="text-center pb-2 p-4 lg:p-6">
            <CardTitle className="text-lg lg:text-2xl font-bold text-white">Activá tu acceso</CardTitle>
            <CardDescription className="text-xs lg:text-sm text-blue-200/60">
              Usá los datos de la constancia que te dieron en la Fiscalía
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 lg:p-6 pt-2 lg:pt-4">
            {/* General Error */}
            {errors.general && (
              <div className="flex gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs lg:text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleFirstTime} className="space-y-4">
              {/* DNI Field */}
              <div>
                <label htmlFor="ft-dni" className="block text-xs lg:text-sm font-medium text-blue-200/80 mb-1.5">
                  Tu DNI
                </label>
                <input
                  id="ft-dni"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: 30123456"
                  value={dni}
                  onChange={(e) => handleDniChange(e.target.value)}
                  className={`w-full px-3 py-2.5 lg:py-3 rounded-lg bg-white/10 border text-white text-sm lg:text-base placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#5BA3E6]/50 transition-colors ${
                    errors.dni ? "border-red-400/50" : "border-white/20"
                  }`}
                  autoFocus
                />
                {errors.dni && (
                  <p className="text-red-300 text-xs mt-1">{errors.dni}</p>
                )}
              </div>

              {/* Case Code Field */}
              <div>
                <label htmlFor="case-code" className="block text-xs lg:text-sm font-medium text-blue-200/80 mb-1.5">
                  Código de causa
                </label>
                <input
                  id="case-code"
                  type="text"
                  placeholder="Ej: MPF-TUC-2026-00421"
                  value={caseCode}
                  onChange={(e) => handleCaseCodeChange(e.target.value)}
                  className={`w-full px-3 py-2.5 lg:py-3 rounded-lg bg-white/10 border text-white text-sm lg:text-base placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#5BA3E6]/50 transition-colors ${
                    errors.caseCode ? "border-red-400/50" : "border-white/20"
                  }`}
                  autoComplete="off"
                />
                {errors.caseCode && (
                  <p className="text-red-300 text-xs mt-1">{errors.caseCode}</p>
                )}
                <p className="text-blue-200/40 text-[10px] mt-1">
                  Está en la constancia impresa que te dieron al hacer la denuncia
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white font-semibold py-4 lg:py-5 text-sm lg:text-lg cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 mr-2 animate-spin" />
                    Activando...
                  </>
                ) : (
                  "Activar cuenta"
                )}
              </Button>
            </form>

            {/* Info box */}
            <div className="p-3 rounded-lg bg-[#5BA3E6]/5 border border-[#5BA3E6]/20">
              <p className="text-[10px] lg:text-xs text-blue-200/50 leading-relaxed">
                <strong className="text-blue-200/80">¿No tenés estos datos?</strong><br />
                Si hiciste una denuncia recientemente, la constancia con tu DNI,
                número de causa y contraseña provisoria se entrega en la Fiscalía
                en el momento de hacer la denuncia.
              </p>
            </div>

            <div className="text-center text-[10px] lg:text-xs text-blue-200/40">
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
