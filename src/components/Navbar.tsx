'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import ApplicationModal from './ApplicationModal';

interface NavbarProps {
  onOpenApply?: () => void;
  onOpenQuiz?: () => void;
}

function FourPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className={className}>
      <path d="M18 2 L19.6 15.4 L33 18 L19.6 20.6 L18 34 L16.4 20.6 L3 18 L16.4 15.4 Z" fill="white" opacity="0.95"/>
      <path d="M18 8 L18.9 16.1 L27 18 L18.9 19.9 L18 28 L17.1 19.9 L9 18 L17.1 16.1 Z" fill="#ffffff" opacity="0.4"/>
    </svg>
  );
}

export default function Navbar({ onOpenApply, onOpenQuiz }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localModalOpen, setLocalModalOpen] = useState(false);
  const pathname = usePathname();

  const handleApplyClick = () => {
    if (onOpenApply) {
      onOpenApply();
    } else {
      setLocalModalOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Главная' },
    { href: '/courses', label: 'Все курсы' },
    { href: '/about', label: 'Об академии' },
    { href: '/contacts', label: 'Контакты' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050608]/92 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 group-hover:scale-110 transition-transform duration-300">
                <FourPointStar className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-lg text-white tracking-tight">Edu<span className="text-zinc-400">Center</span></span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-300 border border-white/[0.1] font-tech">2026</span>
                </div>
                <span className="text-[11px] text-zinc-400 block -mt-0.5 font-tech">IT Academy &amp; AI Hub</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-1.5 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-tech font-medium transition-all ${
                      isActive
                        ? 'text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+998712004488"
                className="flex items-center gap-2 text-xs font-tech text-zinc-400 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <span>+998 (71) 200-44-88</span>
              </a>

              {onOpenQuiz && (
                <button
                  onClick={onOpenQuiz}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-tech font-medium text-zinc-200 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Тест профессии</span>
                </button>
              )}

              <button
                onClick={handleApplyClick}
                className="btn-shimmer relative px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-tech font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Записаться</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 px-4 pb-6 pt-3 bg-[#08090d]/98 backdrop-blur-2xl border-b border-white/[0.08] space-y-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-tech font-medium transition-all ${
                    pathname === link.href
                      ? 'bg-white/[0.08] text-white border-l-2 border-white pl-3'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-white/[0.06] space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleApplyClick();
                }}
                className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-tech font-bold tracking-widest uppercase transition-all"
              >
                Записаться на открытый урок
              </button>

              <a
                href="tel:+998712004488"
                className="block text-center py-2 text-xs font-tech text-zinc-400"
              >
                +998 (71) 200-44-88
              </a>
            </div>
          </div>
        )}
      </header>

      <ApplicationModal
        isOpen={localModalOpen}
        onClose={() => setLocalModalOpen(false)}
      />
    </>
  );
}
