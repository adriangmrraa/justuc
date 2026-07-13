"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, Calendar, ChevronRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { notifications, upcomingEvents } from "@/lib/data";
import Modal from "./modal";

function getCountdown(dateStr: string): string {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return "Hoy";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Hoy";
  if (days === 1) return "Mañana";
  if (days <= 7) return `En ${days} días`;
  return `En ${days} días`;
}

export default function Notificaciones() {
  const [connected, setConnected] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<
    (typeof notifications)[number] | null
  >(null);
  const [showConnectedToast, setShowConnectedToast] = useState(false);
  const [unreadIds, setUnreadIds] = useState<Set<string>>(
    () => new Set(notifications.filter((n) => !n.read).map((n) => n.id))
  );

  useEffect(() => {
    const stored = localStorage.getItem("calendar-connected");
    if (stored === "true") setConnected(true);
  }, []);

  const handleConnect = useCallback(() => {
    localStorage.setItem("calendar-connected", "true");
    setConnected(true);
    setShowConnectedToast(true);
    setTimeout(() => setShowConnectedToast(false), 3000);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setUnreadIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  return (
    <>
      <section className="py-8 lg:py-12 bg-[#F0F7FE]">
        <div className="max-w-3xl mx-auto px-4 lg:px-6">
          <h2 className="text-lg lg:text-2xl font-bold text-[#1E3A5F] mb-6 lg:mb-8 flex items-center gap-2">
            🔔 Tus notificaciones
          </h2>

          {/* Google Calendar Connect */}
          <div className="mb-6 lg:mb-8">
            {!connected ? (
              <button
                onClick={handleConnect}
                className="w-full flex items-center justify-center gap-3 p-4 lg:p-5 rounded-xl border-2 border-dashed border-[#5BA3E6]/40 bg-white hover:bg-[#F0F7FE] transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#5BA3E6]/20 flex items-center justify-center group-hover:border-[#5BA3E6]/40 transition-colors shrink-0">
                  <Calendar className="w-5 h-5 text-[#5BA3E6]" />
                </div>
                <div className="text-left">
                  <p className="text-sm lg:text-base font-semibold text-[#1E3A5F] group-hover:text-[#5BA3E6] transition-colors">
                    🔗 Conectar Google Calendar
                  </p>
                  <p className="text-xs lg:text-sm text-slate-500">
                    Recibí tus audiencias directamente en tu calendario
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#5BA3E6] shrink-0 transition-colors" />
              </button>
            ) : (
              <div className="p-4 lg:p-5 rounded-xl bg-white border border-green-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-700">
                      ✅ Conectado
                    </p>
                    <p className="text-xs text-green-600">
                      Tus eventos se sincronizan con Google Calendar
                    </p>
                  </div>
                </div>

                {/* Next hearing with countdown */}
                {upcomingEvents.length > 0 && (
                  <div className="p-3 rounded-lg bg-[#5BA3E6]/5 border border-[#5BA3E6]/20">
                    <p className="text-xs text-[#5BA3E6] font-medium mb-1">
                      Próxima audiencia
                    </p>
                    <p className="text-sm font-semibold text-[#1E3A5F]">
                      {upcomingEvents[0].title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {new Date(upcomingEvents[0].date).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "long",
                      })}{" "}
                      — {upcomingEvents[0].time} — {upcomingEvents[0].location}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-semibold bg-[#5BA3E6] text-white px-2 py-0.5 rounded-full">
                      {getCountdown(upcomingEvents[0].date)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notification List */}
          {notifications.length > 0 ? (
            <div className="space-y-2 lg:space-y-3">
              <h3 className="text-xs lg:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Notificaciones recientes
              </h3>
              {notifications.map((n) => {
                const isUnread = unreadIds.has(n.id);
                return (
                  <button
                    key={n.id}
                    onClick={() => {
                      markAsRead(n.id);
                      setSelectedNotification(n);
                    }}
                    className={`w-full text-left p-3 lg:p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${
                      isUnread
                        ? "bg-white border-[#5BA3E6]/30"
                        : "bg-white/70 border-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          n.type === "hearing"
                            ? "bg-orange-100 text-orange-600"
                            : n.type === "status_change"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-sm truncate ${
                              isUnread
                                ? "font-semibold text-[#1E3A5F]"
                                : "font-medium text-slate-600"
                            }`}
                          >
                            {n.title}
                          </p>
                          {isUnread && (
                            <span className="w-2 h-2 rounded-full bg-[#5BA3E6] shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                          {n.message}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {new Date(n.date).toLocaleDateString("es-AR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 lg:p-12 text-center bg-white rounded-xl border border-slate-200">
              <Bell className="w-8 h-8 lg:w-10 lg:h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-500">
                No tenés notificaciones pendientes
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Las novedades de tu causa van a aparecer acá
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Connected toast */}
      {showConnectedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-bottom-2 duration-300">
          📅 ¡Calendar conectado!
        </div>
      )}

      {/* Notification Modal */}
      <Modal
        open={!!selectedNotification}
        onClose={() => {
          setSelectedNotification(null);
        }}
        title={selectedNotification?.title ?? ""}
      >
        {selectedNotification && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(selectedNotification.date).toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="p-3 lg:p-4 rounded-lg bg-[#F0F7FE] border border-[#5BA3E6]/20">
              <p className="text-sm text-slate-700 leading-relaxed">
                {selectedNotification.message}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
