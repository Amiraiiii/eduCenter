'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Send, Phone, Mail, MapPin, Globe, Video, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07080c] text-zinc-400 text-sm mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Edu<span className="text-cyan-400">Center</span></span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Ведущая практическая IT-академия и центр подготовки разработчиков, AI-инженеров и дизайнеров. Официальный резидент IT Park Узбекистана.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://t.me" target="_blank" rel="noreferrer" title="Telegram" className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-cyan-500/10 hover:text-cyan-400 flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-pink-500/10 hover:text-pink-400 flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-red-500/10 hover:text-red-400 flex items-center justify-center transition-colors">
                <Video className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub" className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors">
                <Code2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Направления */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Курсы</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/courses#frontend-react" className="hover:text-zinc-200 transition-colors">Frontend (React & Next.js)</Link></li>
              <li><Link href="/courses#python-ai" className="hover:text-zinc-200 transition-colors">Python & AI Engineering</Link></li>
              <li><Link href="/courses#ui-ux-design" className="hover:text-zinc-200 transition-colors">UI/UX & Product Design</Link></li>
              <li><Link href="/courses#backend-golang" className="hover:text-zinc-200 transition-colors">Golang & Microservices</Link></li>
              <li><Link href="/courses#qa-automation" className="hover:text-zinc-200 transition-colors">QA Automation</Link></li>
            </ul>
          </div>

          {/* Col 3: Академия */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Академия</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-zinc-200 transition-colors">О нас и методологии</Link></li>
              <li><Link href="/about#mentors" className="hover:text-zinc-200 transition-colors">Наши менторы</Link></li>
              <li><Link href="/about#career" className="hover:text-zinc-200 transition-colors">Карьерный центр</Link></li>
              <li><Link href="/about#partners" className="hover:text-zinc-200 transition-colors">Компании-партнеры</Link></li>
              <li><Link href="/contacts#faq" className="hover:text-zinc-200 transition-colors">Частые вопросы (FAQ)</Link></li>
            </ul>
          </div>

          {/* Col 4: Контакты */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">Контакты</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>г. Ташкент, ул. Шота Руставели, 45</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+998712004488" className="hover:text-white transition-colors">+998 (71) 200-44-88</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:info@educenter.uz" className="hover:text-white transition-colors">info@educenter.uz</a>
              </li>
              <li className="text-[11px] text-zinc-400 pt-1">
                Ежедневно: 09:00 — 21:00
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© 2026 EduCenter. Все права защищены. Лицензия МО РУз №048291.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Набор открыт на весенний поток
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
