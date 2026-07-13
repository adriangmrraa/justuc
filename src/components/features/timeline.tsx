"use client";

import { useState } from "react";
import {
  Calendar,
  FileText,
  Gavel,
  Bell,
  MapPin,
  User,
  Building,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { timelineEvents, type TimelineEvent } from "@/lib/data";
import { useInView } from "@/hooks/use-in-view";
import Modal from "./modal";

const categoryIcons: Record<string, React.ReactNode> = {
  hearing: <Calendar className="w-4 h-4" />,
  document: <FileText className="w-4 h-4" />,
  resolution: <Gavel className="w-4 h-4" />,
  notification: <Bell className="w-4 h-4" />,
};

function TimelineEventCard({
  event,
  index,
  onSelect,
}: {
  event: TimelineEvent;
  index: number;
  onSelect: (event: TimelineEvent) => void;
}) {
  const { ref, inView } = useInView({ threshold: 0.2, once: true });
  const isCurrent = event.status === "in_progress";

  const dotColors = {
    completed: "bg-green-500 border-green-300",
    in_progress: "bg-[#5BA3E6] border-[#5BA3E6]/40",
    pending: "bg-slate-300 border-slate-200",
  };

  const lineColors = {
    completed: "bg-green-300",
    in_progress: "bg-gradient-to-b from-[#5BA3E6] to-slate-200",
    pending: "bg-slate-200",
  };

  return (
    <div
      ref={ref}
      className={`flex gap-4 lg:gap-6 transition-all duration-700 ease-out ${
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Left: dot + connecting line */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`relative w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 flex items-center justify-center ${dotColors[event.status]}`}
        >
          {isCurrent && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[#5BA3E6]/30" />
          )}
          {event.status === "completed" && (
            <CheckCircle2 className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white" />
          )}
        </div>
        <div
          className={`w-0.5 flex-1 min-h-[3rem] ${
            index === timelineEvents.length - 1
              ? "bg-transparent"
              : lineColors[event.status]
          } ${event.status === "pending" ? "border-l border-dashed border-slate-300 ml-0 w-0 bg-transparent" : ""}`}
        />
      </div>

      {/* Right: card */}
      <div className="flex-1 pb-6 lg:pb-8">
        <button
          onClick={() => onSelect(event)}
          className="w-full text-left group"
        >
          <div
            className={`rounded-xl border p-3 lg:p-4 transition-all duration-200 hover:shadow-md ${
              isCurrent
                ? "bg-[#F0F7FE] border-[#5BA3E6]/40 shadow-sm"
                : event.status === "completed"
                  ? "bg-white border-slate-200 hover:border-slate-300"
                  : "bg-white/70 border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? "bg-[#5BA3E6] text-white"
                      : event.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {categoryIcons[event.category]}
                </div>
                <div className="min-w-0">
                  <h3
                    className={`text-sm lg:text-base truncate ${
                      isCurrent
                        ? "font-bold text-[#1E3A5F]"
                        : event.status === "completed"
                          ? "font-semibold text-[#1E3A5F]/80"
                          : "font-medium text-slate-500"
                    }`}
                  >
                    {event.title}
                  </h3>
                  <p
                    className={`text-[10px] lg:text-xs flex items-center gap-1 mt-0.5 ${
                      isCurrent ? "text-[#5BA3E6]" : "text-slate-400"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {new Date(event.date).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              {/* Current badge */}
              {isCurrent && (
                <span className="shrink-0 text-[10px] lg:text-xs font-semibold bg-[#5BA3E6] text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                  📍 Estás acá
                </span>
              )}
            </div>
            <p
              className={`text-xs lg:text-sm leading-relaxed mt-1 ${
                event.status === "completed"
                  ? "text-slate-500"
                  : event.status === "pending"
                    ? "text-slate-400"
                    : "text-slate-700"
              }`}
            >
              {event.description}
            </p>
            <p className="text-[10px] lg:text-xs text-slate-400 mt-1.5">
              {event.institution}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <>
      <section className="py-8 lg:py-12">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <h2 className="text-lg lg:text-2xl font-bold text-[#1E3A5F] mb-6 lg:mb-8 flex items-center gap-2">
            ⏳ El recorrido de tu causa
          </h2>

          <div className="space-y-0">
            {timelineEvents.map((event, index) => (
              <TimelineEventCard
                key={event.id}
                event={event}
                index={index}
                onSelect={setSelectedEvent}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title ?? ""}
      >
        {selectedEvent && (
          <div className="space-y-4 lg:space-y-5">
            {/* Status badge + date */}
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  selectedEvent.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : selectedEvent.status === "in_progress"
                      ? "bg-[#5BA3E6]/10 text-[#5BA3E6]"
                      : "bg-slate-100 text-slate-500"
                }`}
              >
                {selectedEvent.status === "completed"
                  ? "✅ Completado"
                  : selectedEvent.status === "in_progress"
                    ? "📍 En curso"
                    : "⏳ Pendiente"}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(selectedEvent.date).toLocaleDateString("es-AR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Description */}
            <div className="p-3 lg:p-4 rounded-lg bg-[#F0F7FE] border border-[#5BA3E6]/20">
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                  <Building className="w-4 h-4 text-slate-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                    Institución
                  </p>
                  <p className="text-sm font-medium text-[#1E3A5F]">
                    {selectedEvent.institution}
                  </p>
                </div>
              </div>

              {selectedEvent.officer && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Funcionario a cargo
                    </p>
                    <p className="text-sm font-medium text-[#1E3A5F]">
                      {selectedEvent.officer}
                    </p>
                  </div>
                </div>
              )}

              {selectedEvent.location && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                    <MapPin className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                      Ubicación
                    </p>
                    <p className="text-sm font-medium text-[#1E3A5F]">
                      {selectedEvent.location}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
