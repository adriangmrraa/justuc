"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, AlertTriangle, Loader2 } from "lucide-react";
import { useChatStore, type Message } from "@/stores/chat-store";

interface AsesorIaChatProps {
  caseData?: Record<string, unknown>;
}

export default function AsesorIaChat({ caseData }: AsesorIaChatProps) {
  const { messages, isStreaming, addMessage, updateLastAssistantMessage, setStreaming } = useChatStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome message on first render
  const hasStarted = useRef(false);
  useEffect(() => {
    if (!hasStarted.current && messages.length === 0) {
      addMessage({
        id: "welcome",
        role: "assistant",
        content:
          "¡Hola! Soy tu Asistente IA de Justuc Tucumán. Puedo orientarte sobre el estado de tus causas judiciales, explicarte términos legales y ayudarte a entender los pasos a seguir. ¿En qué puedo ayudarte hoy?",
        timestamp: new Date(),
      });
      hasStarted.current = true;
    }
  }, [messages.length, addMessage]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    setInput("");

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    addMessage(userMsg);

    // Prepare messages for API (exclude timestamps, keep last 20)
    const apiMessages = [...useChatStore.getState().messages]
      .slice(-20)
      .map((m) => ({ role: m.role, content: m.content }));

    // Add placeholder assistant message
    const assistantId = crypto.randomUUID();
    addMessage({
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    });

    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, caseData }),
      });

      if (!res.ok) {
        const errData = await res.json();
        updateLastAssistantMessage(
          `Error: ${errData.error || "No se pudo conectar con el asistente."}`
        );
        setStreaming(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        updateLastAssistantMessage("Error: No se pudo establecer la conexión.");
        setStreaming(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                updateLastAssistantMessage(parsed.content);
              }
              if (parsed.error) {
                updateLastAssistantMessage(`Error: ${parsed.error}`);
              }
            } catch {
              // Skip malformed data
            }
          }
        }
      }
    } catch {
      updateLastAssistantMessage(
        "Error de conexión. Verificá tu conexión a internet e intentá de nuevo."
      );
    } finally {
      setStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-3 lg:p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs lg:text-sm text-amber-800">
            <strong>Importante:</strong> Este asistente es una herramienta informativa y orientativa.
            No reemplaza el asesoramiento legal de un abogado. Si estás en una situación de emergencia,
            llamá al <strong>911</strong> o a la línea <strong>137</strong>.
          </p>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="border-slate-200">
        <CardHeader className="p-4 lg:p-6 pb-2 lg:pb-2">
          <CardTitle className="text-base lg:text-lg text-[#1E3A5F] flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#5BA3E6]" />
            Asistente IA
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-2 lg:pt-2">
          <div className="space-y-3 lg:space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 lg:gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-[#5BA3E6] text-white"
                      : "bg-[#F0F7FE] text-[#5BA3E6]"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] rounded-xl px-3 lg:px-4 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#5BA3E6] text-white rounded-tr-sm"
                      : "bg-[#F0F7FE] text-slate-800 rounded-tl-sm"
                  }`}
                >
                  {msg.content || (msg.role === "assistant" && isStreaming && messages[messages.length - 1]?.id === msg.id) ? (
                    msg.content
                  ) : msg.role === "assistant" && messages[messages.length - 1]?.id === msg.id && isStreaming ? (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#5BA3E6] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#5BA3E6] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#5BA3E6] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribí tu consulta..."
          disabled={isStreaming}
          className="flex-1 border-slate-300 focus-visible:ring-[#5BA3E6]"
        />
        <Button
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
          className="bg-[#5BA3E6] hover:bg-[#4A8FCC] text-white shrink-0"
        >
          {isStreaming ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
