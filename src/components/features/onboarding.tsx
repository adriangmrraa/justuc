"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STORAGE_KEY = "mi-proceso-onboarding";

const steps = [
  {
    title: "Esta es tu causa",
    description:
      "Acá vas a ver toda la información de tu proceso judicial organizada de forma clara y simple.",
    highlight: "header",
  },
  {
    title: "Seguí cada paso",
    description:
      "El timeline muestra cada etapa de tu causa. Sabé siempre qué pasó, qué está pasando y qué sigue.",
    highlight: "timeline",
  },
  {
    title: "Sin ir al tribunal",
    description:
      "Conectá tu calendario, recibí notificaciones y grabá tu declaración en video desde tu celular. Sin filas, sin esperar.",
    highlight: "rest",
  },
];

export function clearOnboardingFlag() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function Onboarding({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      // Small delay to let the page render first
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
    onComplete?.();
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleComplete();
    }
  }, [currentStep, handleComplete]);

  if (!visible) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Tutorial de Mi Proceso"
      >
        {/* Progress bar */}
        <div className="flex gap-1 p-4 pb-0">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= currentStep ? "bg-[#5BA3E6]" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 text-center space-y-4">
          {/* Illustration area */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[#F0F7FE] flex items-center justify-center mx-auto">
            <span className="text-2xl lg:text-3xl">
              {currentStep === 0 ? "🏛️" : currentStep === 1 ? "⏳" : "📱"}
            </span>
          </div>

          <div>
            <h3 className="text-lg lg:text-xl font-bold text-[#1E3A5F]">
              {step.title}
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 pt-0 gap-3">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentStep ? "bg-[#5BA3E6]" : "bg-slate-300"
                }`}
                aria-label={`Paso ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSkip}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 font-medium"
            >
              Saltar
            </button>

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((s) => s - 1)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              {currentStep === steps.length - 1 ? (
                "Entendí"
              ) : (
                <>
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
