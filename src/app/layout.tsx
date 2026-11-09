import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiAssistant from '@/components/AiAssistant';

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
      <body className="bg-[#08090d] text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <AiAssistant />
      </body>
    </html>
  );
}
