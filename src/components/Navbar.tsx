'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import ApplicationModal from './ApplicationModal';

interface NavbarProps {
  onOpenApply?: () => void;
}

export default function Navbar({ onOpenApply }: NavbarProps) {
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
            ? 'bg-[#090a0f]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400/60 transition-all">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg text-white tracking-tight">Edu<span className="text-cyan-400">Center</span></span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">2026</span>
                </div>
                <span className="text-[11px] text-zinc-400 block -mt-0.5">IT Academy & AI Hub</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white/[0.08] text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+998712004488"
                className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>+998 (71) 200-44-88</span>
              </a>

              <button
                onClick={handleApplyClick}
                className="relative group px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold tracking-wide transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Записаться</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#0f1118] border border-white/10 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                      pathname === link.href
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
                <a
                  href="tel:+998712004488"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-zinc-400 hover:text-cyan-400"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+998 (71) 200-44-88</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleApplyClick();
                  }}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold text-xs text-center transition-colors"
                >
                  Записаться на курс
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {!onOpenApply && (
        <ApplicationModal
          isOpen={localModalOpen}
          onClose={() => setLocalModalOpen(false)}
        />
      )}
    </>
  );
}
