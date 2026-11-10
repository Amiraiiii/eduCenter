'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw, User, MessageSquareCode, CornerDownLeft } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  source?: string;
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Здравствуйте! Я AI-консультант EduCenter, подключенный к базе знаний академии. Готов ответить на любые вопросы по программам обучения, стоимости, рассрочке 0%, менторам и гарантии трудоустройства.',
      source: 'RAG База знаний EduCenter'
    }
  ]);

  const quickPrompts = [
    'Какая стоимость курсов и условия рассрочки 0%?',
    'Помоги выбрать между Frontend и Python AI',
    'Как работает гарантия трудоустройства в договоре?',
    'Кто преподает на курсе Golang?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Listen for global custom event to open AI with a question
  useEffect(() => {
    const handleAskAiEvent = (e: CustomEvent<{ prompt: string }>) => {
      if (e.detail?.prompt) {
        setIsOpen(true);
        sendMessage(e.detail.prompt);
      }
    };

    window.addEventListener('open-ai-chat' as any, handleAskAiEvent);
    return () => window.removeEventListener('open-ai-chat' as any, handleAskAiEvent);
  }, []);

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-8),
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply, source: data.source }
        ]);
      } else {
        throw new Error(data.error || 'Пустой ответ от сервера');
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Извините, сервис временно недоступен. Вы можете связаться с методистом академии напрямую в Telegram: @educenter_support или по телефону +998 (71) 200-44-88.',
          source: 'System fallback'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Zero Neon, Clean Silver & Charcoal) */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#12141a] hover:bg-[#181b24] border border-white/[0.12] text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Открыть AI-консультанта"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#12141a]" />
            </div>

            <div className="text-left hidden sm:block pr-1 font-tech">
              <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                <span>AI Консультант</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/[0.08] text-white">RAG</span>
              </div>
              <div className="text-[10px] text-zinc-400">Онлайн • Ответит за 2 сек</div>
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-[#0a0c10] border border-white/[0.12] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 font-tech">
          {/* Chat Header */}
          <div className="p-4 bg-[#11131a] border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-tight">EduCenter AI</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.08] text-zinc-200 border border-white/20">
                    Online
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 block -mt-0.5">
                  База знаний курсов и условий 2026
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
              aria-label="Закрыть чат"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={index}
                  className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-3.5 ${
                    isAssistant
                      ? 'bg-[#151822] border border-white/[0.08] text-zinc-200'
                      : 'bg-white text-zinc-950 font-medium'
                  }`}>
                    <p className="whitespace-pre-line leading-relaxed">
                      {msg.content}
                    </p>

                    {msg.source && isAssistant && (
                      <div className="mt-2 pt-2 border-t border-white/[0.06] text-[10px] text-zinc-500 flex items-center gap-1">
                        <span>Источник:</span>
                        <span className="text-zinc-400">{msg.source}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="rounded-2xl p-3.5 bg-[#151822] border border-white/[0.08] flex items-center gap-1.5 text-zinc-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(p)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-[11px] text-zinc-400 hover:text-white whitespace-nowrap transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-[#131620] border-t border-white/[0.08]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Задайте вопрос об обучении..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 p-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 transition-all disabled:opacity-30 disabled:hover:bg-white"
                aria-label="Отправить"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
