"use client";

import { useState, FormEvent, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, Loader2, UserCheck, AlertCircle, KeyRound } from "lucide-react";
import Link from "next/link";
import { findUserByDni, validatePassword, setUserPassword } from "@/lib/data";

const ThreeBackground = dynamic(
  () => import("@/components/features/three-background"),
  { ssr: false }
);

type LoginMode = "login" | "change-password" | "success";
type FormErrors = {
  dni?: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>("login");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [userName, setUserName] = useState("");
  // Track the current logged-in user DNI for password change
  const [activeDni, setActiveDni] = useState("");

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

  function handleNewPasswordChange(value: string) {
    setNewPassword(value);
    if (errors.newPassword || errors.confirmPassword)
      setErrors((prev) => ({ ...prev, newPassword: undefined, confirmPassword: undefined }));
  }

  function handleConfirmPasswordChange(value: string) {
    setConfirmPassword(value);
    if (errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
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
    setActiveDni(user.dni);
    setLoading(false);

    if (user.mustChangePassword) {
      // First login with provisional password → force change
      setMode("change-password");
    } else {
      // Returning user → straight to dashboard
      router.push("/dashboard");
    }
  }

  async function handlePasswordChangeSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    if (!newPassword) {
      setErrors({ newPassword: "Creá una nueva contraseña" });
      return;
    }
    if (newPassword.length < 6) {
      setErrors({ newPassword: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }
    if (!confirmPassword) {
      setErrors({ confirmPassword: "Confirmá tu nueva contraseña" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden" });
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    setUserPassword(activeDni, newPassword);
    setLoading(false);
    setMode("success");

    setTimeout(() => {
      router.push("/dashboard");
    }, 1800);
  }

  // ===== SUCCESS VIEW =====
  if (mode === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A2647] p-4 relative overflow-y-auto">
        <Suspense fallback={null}><ThreeBackground /></Suspense>
        <div className="w-full max-w-md text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6">
            <UserCheck className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            ¡Listo, {userName}!
          </h1>
          <p className="text-blue-200/70">Tu contraseña se actualizó correctamente.</p>
          <p className="text-blue-200/50 text-sm mt-1">Te estamos redirigiendo a tu panel...</p>
          <Loader2 className="w-6 h-6 animate-spin text-[#5BA3E6] mx-auto mt-6" />
        </div>
      </div>
    );
  }

  // ===== CHANGE PASSWORD VIEW =====
  if (mode === "change-password") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A2647] p-4 relative overflow-y-auto">
        <Suspense fallback={null}><ThreeBackground /></Suspense>

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#5BA3E6]/20 mb-3 lg:mb-4">
              <KeyRound className="w-7 h-7 lg:w-8 lg:h-8 text-[#5BA3E6]" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Creá tu contraseña</h1>
            <p className="text-blue-200/70 mt-1 lg:mt-2 text-xs lg:text-sm">
              Es tu primera vez. Cambiá la contraseña provisoria por una personal.
            </p>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="text-center pb-2 p-4 lg:p-6">
              <CardTitle className="text-lg lg:text-2xl font-bold text-white">
                Bienvenida, {userName}
              </CardTitle>
              <CardDescription className="text-xs lg:text-sm text-blue-200/60">
                Ingresaste con la contraseña provisoria. Ahora creá una nueva.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 lg:p-6 pt-2 lg:pt-4">
              <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                {/* New Password */}
                <div>
                  <label htmlFor="new-pass" className="block text-xs lg:text-sm font-medium text-blue-200/80 mb-1.5">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="new-pass"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={newPassword}
                      onChange={(e) => handleNewPasswordChange(e.target.value)}
                      className={`w-full px-3 py-3 pr-12 rounded-lg bg-white/10 border text-white text-sm lg:text-base placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#5BA3E6]/50 transition-colors ${
                        errors.newPassword ? "border-red-400/50" : "border-white/20"
                      }`}
                      autoComplete="new-password"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-blue-200/50 hover:text-blue-200/80 transition-colors rounded-lg hover:bg-white/5"
                      aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-300 text-xs mt-1 break-words">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirm-pass" className="block text-xs lg:text-sm font-medium text-blue-200/80 mb-1.5">
                    Repetí la contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirm-pass"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Repetí la misma contraseña"
                      value={confirmPassword}
                      onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                      className={`w-full px-3 py-3 pr-12 rounded-lg bg-white/10 border text-white text-sm lg:text-base placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#5BA3E6]/50 transition-colors ${
                        errors.confirmPassword ? "border-red-400/50" : "border-white/20"
                      }`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-blue-200/50 hover:text-blue-200/80 transition-colors rounded-lg hover:bg-white/5"
                      aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-300 text-xs mt-1 break-words">{errors.confirmPassword}</p>
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
                      Guardando...
                    </>
                  ) : (
                    "Crear contraseña"
                  )}
                </Button>
              </form>

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

  // ===== LOGIN VIEW =====
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A2647] p-4 relative overflow-y-auto">
      <Suspense fallback={null}><ThreeBackground /></Suspense>

      {/* Back Button */}
      <div className="absolute top-4 lg:top-6 left-4 lg:left-6 z-20">
        <Link href="/" className="flex items-center gap-2 text-blue-200/70 hover:text-white transition-colors text-xs lg:text-sm py-2">
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
                <p className="break-words">{errors.general}</p>
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
                  className={`w-full px-3 py-3 rounded-lg bg-white/10 border text-white text-sm lg:text-base placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#5BA3E6]/50 transition-colors ${
                    errors.dni ? "border-red-400/50" : "border-white/20"
                  }`}
                  autoComplete="username"
                  autoFocus
                />
                {errors.dni && (
                  <p className="text-red-300 text-xs mt-1 break-words">{errors.dni}</p>
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
                    placeholder="Usá el código de causa que te dieron"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`w-full px-3 py-3 pr-12 rounded-lg bg-white/10 border text-white text-sm lg:text-base placeholder:text-blue-200/30 focus:outline-none focus:ring-2 focus:ring-[#5BA3E6]/50 transition-colors ${
                      errors.password ? "border-red-400/50" : "border-white/20"
                    }`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-blue-200/50 hover:text-blue-200/80 transition-colors rounded-lg hover:bg-white/5"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-300 text-xs mt-1 break-words">{errors.password}</p>
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

            {/* Demo credentials */}
            <div className="p-3 rounded-lg bg-emerald-500/8 border border-emerald-500/25">
              <p className="text-[10px] lg:text-xs text-emerald-300/70 text-center leading-relaxed">
                <span className="text-emerald-300 font-semibold">Demo — probá el simulador</span><br />
                DNI: <span className="text-white/90 font-mono">30123456</span>
                &nbsp;·&nbsp; Contraseña: <span className="text-white/90 font-mono">MPF-TUC-2026-00421</span>
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
