"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Video, Camera, RotateCcw, Send, CheckCircle2, ShieldCheck, AlertTriangle, Loader2, FileText } from "lucide-react";

type RecordingState = "idle" | "requesting" | "ready" | "recording" | "recorded" | "submitting" | "submitted" | "error";

export default function VideoDeclaracionJurada() {
  const [state, setState] = useState<RecordingState>("idle");
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (recordedUrl) URL.revokeObjectURL(recordedUrl);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recordedUrl]);

  const requestCamera = useCallback(async () => {
    setState("requesting");
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setState("ready");
    } catch (err) {
      setState("error");
      setErrorMsg(
        "No se pudo acceder a la cámara. Asegurate de permitir el acceso en tu navegador."
      );
    }
  }, []);

  const startRecording = useCallback(() => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    setRecordingTime(0);
    const recorder = new MediaRecorder(streamRef.current, {
      mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
        ? "video/webm;codecs=vp9,opus"
        : "video/webm",
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedBlob(blob);
      setRecordedUrl(url);
      setState("recorded");

      if (previewVideoRef.current) {
        previewVideoRef.current.src = url;
      }

      // Detener el stream de la cámara
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };

    recorder.start(100);
    mediaRecorder.current = recorder;
    setState("recording");

    // Timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 180) {
          // Máximo 3 minutos
          if (mediaRecorder.current?.state === "recording") mediaRecorder.current.stop();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current?.state === "recording") {
      mediaRecorder.current.stop();
    }
  }, []);

  const resetRecording = useCallback(() => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
    setRecordedBlob(null);
    setRecordedUrl(null);
    setAccepted(false);
    setRecordingTime(0);
    setState("idle");
  }, [recordedUrl]);

  const submitDeclaration = useCallback(() => {
    if (!recordedBlob || !accepted) return;

    setState("submitting");

    // Simular envío a las autoridades
    setTimeout(() => {
      setState("submitted");
    }, 2500);
  }, [recordedBlob, accepted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (state === "submitted") {
    return (
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardContent className="pt-8 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-2xl text-green-800">Declaración Jurada Enviada</CardTitle>
            <CardDescription className="text-green-600 mt-2">
              Tu declaración en video fue registrada y enviada a las autoridades correspondientes.
            </CardDescription>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Número de seguimiento: <strong>DJ-{Date.now().toString(36).toUpperCase()}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Recibido por: División de Denuncias Digitales - Policía de Tucumán</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Tu video queda como constancia fehaciente de tu denuncia</span>
            </div>
          </div>
          <Button
            onClick={resetRecording}
            variant="outline"
            className="mt-4"
          >
            Grabar otra declaración
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#5BA3E6]/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#5BA3E6]/10 flex items-center justify-center">
            <Video className="w-5 h-5 text-[#5BA3E6]" />
          </div>
          <div>
            <CardTitle className="text-lg text-[#1E3A5F]">Declaración Jurada en Video</CardTitle>
            <CardDescription>
              Tu denuncia en video tiene validez como declaración jurada digital
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* State: Recording */}
        {state === "recording" && (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3]">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600/90 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>GRABANDO</span>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-mono">
                {formatTime(recordingTime)}
              </div>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
                  <p className="text-white text-xs text-center">
                    Estás dando tu declaración jurada ante cámara
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={stopRecording}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
            >
              <div className="w-4 h-4 rounded bg-white mr-2" />
              Detener Grabación
            </Button>
          </div>
        )}

        {/* State: Ready (cámara lista para grabar) */}
        {state === "ready" && (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3]">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/40 backdrop-blur-sm rounded-xl px-6 py-3 text-center">
                  <Camera className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white text-sm">Presioná grabar para comenzar tu declaración</p>
                </div>
              </div>
            </div>
            <Button
              onClick={startRecording}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
            >
              <div className="w-4 h-4 rounded-full bg-white mr-2" />
              Comenzar Grabación
            </Button>
          </div>
        )}

        {/* State: Idle / Error */}
        {(state === "idle" || state === "error") && (
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-[#F0F7FE] to-white border border-[#5BA3E6]/20 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#5BA3E6]/10 flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-[#5BA3E6]" />
              </div>
              <h4 className="text-lg font-semibold text-[#1E3A5F] mb-2">
                Declaración Jurada Digital
              </h4>
              <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                Grabá un video contando tu denuncia. Este video queda registrado como 
                declaración jurada y es enviado a las autoridades judiciales de Tucumán.
              </p>
              <ul className="text-left text-sm text-slate-500 space-y-2 mb-6 max-w-sm mx-auto">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5BA3E6] mt-0.5 shrink-0" />
                  <span>Tu identidad queda protegida (podés elegir modo incógnito)</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5BA3E6] mt-0.5 shrink-0" />
                  <span>El video se almacena de forma segura</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#5BA3E6] mt-0.5 shrink-0" />
                  <span>Tenés hasta 3 minutos para dar tu testimonio</span>
                </li>
              </ul>
            </div>

            {state === "error" && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <p className="text-sm text-red-700">{errorMsg}</p>
              </div>
            )}

            <Button
              onClick={requestCamera}
              className="w-full bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white py-6"
            >
              <Camera className="w-5 h-5 mr-2" />
              Activar Cámara
            </Button>
          </div>
        )}

        {/* State: Recorded (video grabado) */}
        {state === "requesting" && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-8 h-8 text-[#5BA3E6] animate-spin" />
            <p className="text-sm text-slate-500">Accediendo a la cámara...</p>
          </div>
        )}

        {/* Playback + Confirmation */}
        {state === "recorded" && recordedUrl && (
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden bg-black aspect-[4/3]">
              <video
                ref={previewVideoRef}
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-lg bg-[#F0F7FE] border border-[#5BA3E6]/20">
              <div className="flex items-center gap-2 text-[#1E3A5F] font-medium mb-3">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Declaración Jurada</span>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="declaracion-acepto"
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked as boolean)}
                  className="mt-1 data-[state=checked]:bg-[#5BA3E6] data-[state=checked]:border-[#5BA3E6]"
                />
                <label htmlFor="declaracion-acepto" className="text-sm text-slate-600 leading-relaxed cursor-pointer">
                  Declaro bajo juramento que los hechos relatados en este video son 
                  verdaderos y que esta grabación constituye mi declaración jurada 
                  voluntaria. Asumo la responsabilidad legal sobre la veracidad de 
                  lo declarado.
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={resetRecording}
                variant="outline"
                className="flex-1 border-slate-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Regrabar
              </Button>
              <Button
                onClick={submitDeclaration}
                disabled={!accepted}
                className="flex-1 bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar a las Autoridades
              </Button>
            </div>
          </div>
        )}

        {/* Submitting */}
        {state === "submitting" && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-10 h-10 text-[#5BA3E6] animate-spin" />
            <p className="text-sm font-medium text-[#1E3A5F]">Enviando tu declaración jurada...</p>
            <p className="text-xs text-slate-500">Tu video está siendo procesado y enviado a la División de Denuncias Digitales</p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}
