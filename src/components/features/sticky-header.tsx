"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { caseInfo } from "@/lib/data";
import Link from "next/link";

interface StickyHeaderProps {
  onReplayTutorial?: () => void;
}

export default function StickyHeader({ onReplayTutorial }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const statusLabel = {
    active: "Activo",
    in_process: "En proceso",
    resolved: "Resuelto",
  } as const;

  const statusColor = {
    active: "bg-green-100 text-green-700 border-green-200",
    in_process: "bg-blue-100 text-blue-700 border-blue-200",
    resolved: "bg-slate-100 text-slate-700 border-slate-200",
  } as const;

  return (
    <header
      className={`sticky top-0 z-40 transition-shadow duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        {/* Main row */}
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Left: Logo + text */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#5BA3E6] flex items-center justify-center text-white font-bold text-sm">
              MP
            </div>
            <div>
              <h1 className="text-sm lg:text-base font-bold text-[#1E3A5F] leading-tight">
                Mi Proceso
              </h1>
              <p className="text-[10px] text-[#5BA3E6] leading-tight hidden sm:block">
                Justicia Tucumán
              </p>
            </div>
          </Link>

          {/* Right: Avatar + Tutorial */}
          <div className="flex items-center gap-2 lg:gap-3">
            {onReplayTutorial && (
              <button
                onClick={onReplayTutorial}
                className="text-xs text-[#5BA3E6] hover:text-[#4A8FCC] font-medium px-3 py-1.5 rounded-lg hover:bg-[#5BA3E6]/10 transition-colors hidden sm:block"
              >
                📖 Tutorial
              </button>
            )}
            <Avatar className="w-8 h-8 lg:w-9 lg:h-9 ring-2 ring-[#5BA3E6]/20">
              <AvatarFallback className="bg-[#D4E8F7] text-[#1E3A5F] font-medium text-xs lg:text-sm">
                {caseInfo.victimName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Case badge row */}
        <div className="flex items-center gap-2 pb-2.5">
          <Badge
            variant="outline"
            className={`text-[10px] lg:text-xs px-2 py-0.5 ${statusColor[caseInfo.status]}`}
          >
            {statusLabel[caseInfo.status]}
          </Badge>
          <span className="text-[10px] lg:text-xs text-slate-400 font-mono">
            {caseInfo.caseNumber}
          </span>
        </div>
      </div>
    </header>
  );
}
