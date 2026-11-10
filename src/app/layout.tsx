import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiAssistant from '@/components/AiAssistant';
import GlobalCosmosBackdrop from '@/components/GlobalCosmosBackdrop';

export const metadata: Metadata = {
  title: 'EduCenter — Практическая IT-Академия и AI Хаб в Ташкенте',
  description: 'Курсы Frontend, Python & AI, Go Backend, UI/UX и QA Automation с гарантией трудоустройства. Официальный резидент IT Park.',
  keywords: ['IT курсы Ташкент', 'обучение программированию', 'Frontend React', 'Python AI', 'UI UX дизайн', 'EduCenter', 'IT Park'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="bg-[#050608] text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-white/20 selection:text-white relative">
        {/* Continuous 3D Cosmic Space Backdrop (Star shards, 3D asteroids, nebula fog, orbital rings) */}
        <GlobalCosmosBackdrop />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <AiAssistant />
      </body>
    </html>
  );
}
