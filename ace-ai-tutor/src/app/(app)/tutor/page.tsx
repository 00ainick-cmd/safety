"use client";

import { useState, useRef, useEffect } from "react";
import { CAET_MODULES } from "@/lib/constants";
import type { ChatMessage } from "@/lib/types";

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hey! I'm ACE, your CAET study partner. What would you like to work on today? You can pick a module, ask me a question, or tell me what you're struggling with and I'll help you from there.",
  timestamp: new Date().toISOString(),
};

export default function TutorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || isStreaming) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);

    // TODO: Replace with actual API call to /api/chat with SSE streaming
    // For now, simulate a response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        role: "assistant",
        content:
          "I'll be connected to the Claude API soon! For now, this is a placeholder response. Once the Anthropic integration is wired up, I'll be able to teach you avionics concepts, quiz you on material, and adapt to your learning style.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsStreaming(false);
    }, 1200);
  }

  return (
    <div className="flex h-[calc(100vh-57px)] md:h-screen">
      {/* ── Module sidebar (collapsible) ──── */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-30 w-64 h-full bg-panel border-r border-panel-light transition-transform duration-200`}
      >
        <div className="p-4 border-b border-panel-light flex items-center justify-between">
          <span className="font-heading text-neon-cyan text-[10px]">MODULES</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-text-muted hover:text-text-light"
          >
            &times;
          </button>
        </div>
        <div className="p-3 space-y-1 overflow-y-auto h-[calc(100%-49px)]">
          <button
            onClick={() => setSelectedModule(null)}
            className={`w-full text-left text-sm px-3 py-2 rounded-md transition ${
              selectedModule === null
                ? "bg-neon-cyan/10 text-neon-cyan"
                : "text-text-muted hover:bg-panel-light"
            }`}
          >
            All Topics
          </button>
          {CAET_MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setSelectedModule(mod.id)}
              className={`w-full text-left text-sm px-3 py-2 rounded-md transition ${
                selectedModule === mod.id
                  ? "bg-neon-cyan/10 text-neon-cyan"
                  : "text-text-muted hover:bg-panel-light"
              }`}
            >
              {mod.id.replace("module_", "")}. {mod.shortName}
            </button>
          ))}
        </div>
      </aside>

      {/* ── Chat area ────────────────────── */}
      <div className="flex-1 flex flex-col">
        {/* Context bar */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-panel-light bg-bg-midnight text-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-text-muted hover:text-text-light"
          >
            Modules
          </button>
          <span className="text-text-muted">
            {selectedModule
              ? CAET_MODULES.find((m) => m.id === selectedModule)?.name
              : "General conversation"}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[70%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-neon-cyan/15 text-text-light border border-neon-cyan/20"
                    : "bg-panel border border-panel-light text-text-light"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="text-neon-cyan font-semibold text-xs mb-1">ACE</div>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {isStreaming && (
            <div className="flex justify-start">
              <div className="bg-panel border border-panel-light rounded-xl px-4 py-3 text-sm">
                <div className="text-neon-cyan font-semibold text-xs mb-1">ACE</div>
                <span className="text-text-muted animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {["Quiz me on this", "Explain differently", "Show me a diagram", "Next topic"].map(
            (action) => (
              <button
                key={action}
                onClick={() => setInput(action)}
                className="text-xs border border-panel-light text-text-muted rounded-full px-3 py-1 hover:border-border-glow hover:text-neon-cyan transition"
              >
                {action}
              </button>
            )
          )}
        </div>

        {/* Input */}
        <div className="px-4 pb-4">
          <div className="flex gap-2 bg-panel border border-panel-light rounded-xl p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Ask ACE a question..."
              className="flex-1 bg-transparent text-text-light placeholder:text-text-muted text-sm outline-none px-2"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="bg-neon-cyan text-bg-navy font-semibold text-sm px-4 py-2 rounded-lg disabled:opacity-40 hover:brightness-110 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
