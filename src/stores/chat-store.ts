import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatStore {
  messages: Message[];
  isStreaming: boolean;
  addMessage: (msg: Message) => void;
  updateLastAssistantMessage: (content: string) => void;
  setStreaming: (v: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isStreaming: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  updateLastAssistantMessage: (content) => set((s) => {
    const msgs = [...s.messages];
    if (msgs.length > 0 && msgs[msgs.length - 1].role === 'assistant') {
      msgs[msgs.length - 1].content += content;
    }
    return { messages: msgs };
  }),
  setStreaming: (v) => set({ isStreaming: v }),
  clearMessages: () => set({ messages: [] }),
}));
