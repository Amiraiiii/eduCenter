'use client';

import React from 'react';
import Link from 'next/link';
import { Send, Phone, Mail, MapPin, Globe, Video, Code2 } from 'lucide-react';

function FourPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className}>
      <path d="M18 2 L19.6 15.4 L33 18 L19.6 20.6 L18 34 L16.4 20.6 L3 18 L16.4 15.4 Z" fill="white" opacity="0.95"/>
      <path d="M18 8 L18.9 16.1 L27 18 L18.9 19.9 L18 28 L17.1 19.9 L9 18 L17.1 16.1 Z" fill="#ffffff" opacity="0.4"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#040507] text-zinc-400 text-sm mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 group-hover:scale-110 transition-transform duration-300">
                <FourPointStar className="w-8 h-8" />
              </div>
              <span className="font-display font-extrabold text-lg text-white tracking-tight">Edu<span className="text-zinc-400">Center</span></span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-tech">
              Практическая IT-академия и технологический хаб подготовки разработчиков, AI-инженеров и дизайнеров. <span className="font-editorial-italic text-zinc-300 text-sm">Официальный резидент IT Park Узбекистана.</span>
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a href="https://t.me" target="_blank" rel="noreferrer" title="Telegram" className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] flex items-center justify-center transition-colors">
                <Send className="w-3.5 h-3.5 text-zinc-300" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] flex items-center justify-center transition-colors">
                <Globe className="w-3.5 h-3.5 text-zinc-300" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] flex items-center justify-center transition-colors">
                <Video className="w-3.5 h-3.5 text-zinc-300" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub" className="w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.06] flex items-center justify-center transition-colors">
                <Code2 className="w-3.5 h-3.5 text-zinc-300" />
              </a>
            </div>
          </div>

          {/* Col 2: Направления */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-tech font-bold uppercase tracking-widest text-zinc-200">Курсы</h4>
            <ul className="space-y-2 text-xs font-tech">
              <li><Link href="/courses/frontend-react" className="hover:text-white transition-colors">Frontend (React &amp; Next.js)</Link></li>
              <li><Link href="/courses/python-ai" className="hover:text-white transition-colors">Python &amp; AI Engineering</Link></li>
              <li><Link href="/courses/ui-ux-design" className="hover:text-white transition-colors">UI/UX &amp; Product Design</Link></li>
              <li><Link href="/courses/backend-golang" className="hover:text-white transition-colors">Golang &amp; Microservices</Link></li>
              <li><Link href="/courses/qa-automation" className="hover:text-white transition-colors">QA Automation</Link></li>
            </ul>
          </div>

          {/* Col 3: Академия */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-tech font-bold uppercase tracking-widest text-zinc-200">Академия</h4>
            <ul className="space-y-2 text-xs font-tech">
              <li><Link href="/about" className="hover:text-white transition-colors">О нас и методологии</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Наши менторы</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Каталог программ</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты и кампусы</Link></li>
            </ul>
          </div>

          {/* Col 4: Контакты */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-tech font-bold uppercase tracking-widest text-zinc-200">Контакты</h4>
            <ul className="space-y-2.5 text-xs font-tech">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>г. Ташкент, ул. Шота Руставели, 45</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <a href="tel:+998712004488" className="hover:text-white transition-colors">+998 (71) 200-44-88</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <a href="mailto:info@educenter.uz" className="hover:text-white transition-colors">info@educenter.uz</a>
              </li>
              <li className="text-[11px] text-zinc-500 pt-1 font-tech">
                Кампус: 09:00 — 21:00 ежедневно
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 font-tech">
          <p>© 2026 EduCenter. Все права защищены. Лицензия МО РУз №048291.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] text-zinc-200 border border-white/[0.12] text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Набор открыт на весенний поток 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
