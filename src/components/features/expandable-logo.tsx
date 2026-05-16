"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Expand } from "lucide-react";

export default function ExpandableLogo({
  src,
  alt,
  size = 36,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  const [open, setOpen] = useState(false);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Logo chico — click para expandir */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden shrink-0 hover:bg-white/20 transition-colors cursor-pointer"
        title="Tocá para ver el logo completo"
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-contain"
        />
      </button>

      {/* Lightbox fullscreen */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          {/* Cerrar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo grande centrado */}
          <div
            className="relative w-[70vw] max-w-[300px] aspect-square"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Texto inferior */}
          <p className="absolute bottom-8 text-white/50 text-xs text-center w-full px-4">
            Tocá en cualquier parte para cerrar
          </p>
        </div>
      )}
    </>
  );
}
