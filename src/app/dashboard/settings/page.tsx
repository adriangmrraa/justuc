"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Bell, Shield, Link2, Copy, Check, QrCode } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [copied, setCopied] = useState(false);
  const trackingCode = "JP-2026-A7B3";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://justiciatucuman.com/seguimiento/${trackingCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1E3A5F]">Configuración</h1>
        <p className="text-sm lg:text-base text-slate-500 mt-0.5 lg:mt-1">
          Administrá tu cuenta y preferencias
        </p>
      </div>

      {/* Perfil */}
      <Card>
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-base lg:text-lg text-[#1E3A5F]">
            <User className="w-4 h-4 lg:w-5 lg:h-5" />
            Perfil
          </CardTitle>
          <CardDescription className="text-xs lg:text-sm">Información de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="px-4 lg:px-6 pb-4 lg:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#D4E8F7] flex items-center justify-center text-[#1E3A5F] text-lg lg:text-2xl font-bold shrink-0">
              D
            </div>
            <div className="min-w-0">
              <div className="font-medium text-sm lg:text-base text-[#1E3A5F]">Usuario Demo</div>
              <div className="text-xs lg:text-sm text-slate-500 truncate">demo@justiciatucuman.gob.ar</div>
              <Badge className="mt-1 bg-green-100 text-green-700 text-[10px] lg:text-xs">Cuenta verificada</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Calendar */}
      <Card>
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-base lg:text-lg text-[#1E3A5F]">
            <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
            Google Calendar
          </CardTitle>
          <CardDescription className="text-xs lg:text-sm">Sincronizá tus audiencias</CardDescription>
        </CardHeader>
        <CardContent className="px-4 lg:px-6 pb-4 lg:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 lg:p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-1.5 lg:p-2 rounded-lg bg-green-100 shrink-0">
                <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm text-[#1E3A5F]">Calendar Conectado</div>
                <div className="text-xs lg:text-sm text-slate-500 truncate">demo@gmail.com</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
              Desconectar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Código de Seguimiento */}
      <Card>
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-base lg:text-lg text-[#1E3A5F]">
            <Link2 className="w-4 h-4 lg:w-5 lg:h-5" />
            Código de Seguimiento
          </CardTitle>
          <CardDescription className="text-xs lg:text-sm">
            Compartí el estado de tu caso sin iniciar sesión
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 lg:space-y-4 px-4 lg:px-6 pb-4 lg:pb-6">
          <div className="flex items-center gap-2 p-3 lg:p-4 bg-slate-50 rounded-lg">
            <code className="flex-1 font-mono text-sm lg:text-lg text-[#1E3A5F] min-w-0 truncate">
              {trackingCode}
            </code>
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="shrink-0">
              {copied ? <Check className="w-3 h-3 lg:w-4 lg:h-4" /> : <Copy className="w-3 h-3 lg:w-4 lg:h-4" />}
            </Button>
          </div>

          <div className="flex items-center gap-3 p-3 lg:p-4 bg-slate-50 rounded-lg">
            <QrCode className="w-5 h-5 lg:w-8 lg:h-8 text-slate-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs lg:text-sm font-medium text-[#1E3A5F]">Código QR</div>
              <div className="text-[10px] lg:text-xs text-slate-500">Escaneá para ver el estado público</div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 text-xs">
              Ver QR
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-base lg:text-lg text-[#1E3A5F]">
            <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
            Notificaciones
          </CardTitle>
          <CardDescription className="text-xs lg:text-sm">Preferencias de alertas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 lg:space-y-4 px-4 lg:px-6 pb-4 lg:pb-6">
          {[
            { label: "Notificaciones de audiencias", desc: "Recibí alertas cuando haya nuevas audiencias", checked: true },
            { label: "Cambios de estado", desc: "Notificaciones cuando tu caso cambie de estado", checked: true },
            { label: "Recordatorios", desc: "Recordatorio 24hs antes de audiencias", checked: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="text-sm lg:text-base font-medium text-[#1E3A5F]">{item.label}</div>
                <div className="text-xs lg:text-sm text-slate-500">{item.desc}</div>
              </div>
              <Switch defaultChecked={item.checked} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacidad */}
      <Card>
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center gap-2 text-base lg:text-lg text-[#1E3A5F]">
            <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
            Privacidad
          </CardTitle>
          <CardDescription className="text-xs lg:text-sm">Control de privacidad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 lg:space-y-4 px-4 lg:px-6 pb-4 lg:pb-6">
          {[
            { label: "Modo Incógnito", desc: "Ocultar mi identidad en vistas públicas", checked: true },
            { label: "Expediente público", desc: "Permitir que otros vean mi expediente", checked: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="text-sm lg:text-base font-medium text-[#1E3A5F]">{item.label}</div>
                <div className="text-xs lg:text-sm text-slate-500">{item.desc}</div>
              </div>
              <Switch defaultChecked={item.checked} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
