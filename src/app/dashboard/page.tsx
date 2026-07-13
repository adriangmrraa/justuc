"use client";

import { useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import StickyHeader from "@/components/features/sticky-header";
import Timeline from "@/components/features/timeline";
import Notificaciones from "@/components/features/notificaciones";
import AsesorIA from "@/components/features/asesor-ia";
import Onboarding, { clearOnboardingFlag } from "@/components/features/onboarding";

const ThreeBackground = dynamic(
  () => import("@/components/features/three-background"),
  { ssr: false }
);

function Footer() {
  return (
    <footer className="py-6 lg:py-8 bg-[#0A2647] text-center">
      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        <p className="text-xs lg:text-sm text-blue-200/70">
          Hackathon Norte Potencia 2026 — Equipo 6
        </p>
        <p className="text-[10px] lg:text-xs text-blue-300/50 mt-1">
          Propuesta de funcionalidades para el SAE — Poder Judicial de Tucumán
        </p>
      </div>
    </footer>
  );
}

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  const replayTutorial = useCallback(() => {
    clearOnboardingFlag();
    setShowOnboarding(true);
  }, []);

  return (
    <>
      {/* Three.js background (fixed, no interaction) */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Content wrapped in relative container above z-0 */}
      <div className="relative z-10">
        {/* Sticky Header */}
        <StickyHeader onReplayTutorial={replayTutorial} />

        {/* Timeline Section */}
        <Timeline />

        {/* Notifications Section */}
        <Notificaciones />

        {/* AI Assistant Section */}
        <AsesorIA />

        {/* Footer */}
        <Footer />
      </div>

      {/* Onboarding (shown once, on first visit) */}
      {showOnboarding && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
    </>
  );
}
