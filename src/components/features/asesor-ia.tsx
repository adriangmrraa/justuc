"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "¿En qué estado está mi causa?",
  "¿Cuándo tengo la próxima audiencia?",
  "¿Qué significa 'análisis de pruebas'?",
  "¿Qué tengo que llevar a la audiencia?",
];

export default function AsesorIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente judicial. Preguntame lo que necesites sobre tu causa. Respondo en lenguaje simple, sin vueltas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    if (!text) setInput("");

    const userMessage: Message = { role: "user", content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Lo siento, no pude procesar tu consulta. ¿Podrías repetirla?",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hubo un error de conexión. Revisá tu internet y volvé a intentar.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-3xl mx-auto px-4 lg:px-6">
        {/* Accordion trigger card */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left bg-white rounded-xl shadow-sm border border-blue-100 p-5 lg:p-6 hover:border-[#5BA3E6] hover:shadow-md transition-all duration-200 group cursor-pointer"
          aria-expanded={isOpen}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-[#E8F1FC] flex items-center justify-center text-xl group-hover:bg-[#5BA3E6] group-hover:text-white transition-colors duration-200">
              ⚖️
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg lg:text-xl font-bold text-[#1E3A5F]">
                  Sacate las dudas
                </h2>
                <svg
                  className={`shrink-0 w-5 h-5 text-[#5BA3E6] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p className="text-sm lg:text-base text-gray-500 mt-1">
                Consultá a tu asistente IA sobre tu causa, los pasos del proceso o
                cualquier duda judicial.
              </p>
            </div>
          </div>
        </button>

        {/* Chat panel (accordion body) */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 lg:p-5">
            {/* Messages */}
            <div className="h-72 lg:h-80 overflow-y-auto space-y-3 mb-4 pr-1">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] lg:max-w-[75%] rounded-2xl px-4 py-2.5 text-sm lg:text-base leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#5BA3E6] text-white rounded-br-md"
                        : "bg-[#F0F7FE] text-[#1E3A5F] rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#F0F7FE] rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-[#5BA3E6] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#5BA3E6] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#5BA3E6] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions (show only at start) */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-xs lg:text-sm bg-[#F0F7FE] text-[#1E3A5F] border border-blue-100 rounded-full px-3 py-1.5 hover:bg-[#E8F1FC] hover:border-[#5BA3E6] transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribí tu consulta..."
                disabled={loading}
                className="flex-1 min-w-0 border border-blue-200 rounded-xl px-4 py-2.5 text-sm lg:text-base text-[#1E3A5F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5BA3E6] focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="shrink-0 bg-[#5BA3E6] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-[#4a92d0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
