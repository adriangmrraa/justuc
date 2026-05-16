"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
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
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Configuración</h1>
        <p className="text-slate-500 mt-1">Administrá tu cuenta y preferencias</p>
      </div>

      {/* Perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Perfil
          </CardTitle>
          <CardDescription>Información de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-2xl font-bold">
              D
            </div>
            <div>
              <div className="font-medium">Usuario Demo</div>
              <div className="text-sm text-slate-500">demo@justiciatucuman.gob.ar</div>
              <Badge className="mt-1 bg-green-100 text-green-700">Cuenta verificada</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Google Calendar
          </CardTitle>
          <CardDescription>Sincronizá tus audiencias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium">Calendar Conectado</div>
                <div className="text-sm text-slate-500">demo@gmail.com</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Desconectar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Código de Seguimiento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            Código de Seguimiento
          </CardTitle>
          <CardDescription>Compartí el estado de tu caso sin iniciar sesión</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <code className="flex-1 font-mono text-lg">{trackingCode}</code>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <QrCode className="w-8 h-8 text-slate-400" />
            <div className="flex-1">
              <div className="text-sm font-medium">Código QR</div>
              <div className="text-xs text-slate-500">Escaneá para ver el estado público</div>
            </div>
            <Button variant="outline" size="sm">Ver QR</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificaciones
          </CardTitle>
          <CardDescription>Preferencias de alertas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Notificaciones de audiencias</div>
              <div className="text-sm text-slate-500">Reciuí alertas cuando haya nuevas audiencias</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Cambios de estado</div>
              <div className="text-sm text-slate-500">Notificaciones cuando tu caso cambie de estado</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Recordatorios</div>
              <div className="text-sm text-slate-500">Recordatorio 24hs antes de audiencias</div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Privacidad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacidad
          </CardTitle>
          <CardDescription>Control de privacidad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Modo Incógnito</div>
              <div className="text-sm text-slate-500">Ocultar mi identidad en vistas públicas</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Expediente público</div>
              <div className="text-sm text-slate-500">Permitir que otros vean mi expediente</div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}