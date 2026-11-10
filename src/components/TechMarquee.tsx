'use client';

import React from 'react';
import { 
  Code2, 
  Database, 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Boxes, 
  Workflow,
  Globe2,
  Building
} from 'lucide-react';

export default function TechMarquee() {
  const items = [
    { label: 'React 19 & Next.js 16', category: 'Frontend', icon: Code2 },
    { label: 'Python 3.12 & LangChain', category: 'AI & Data', icon: Cpu },
    { label: 'Go & Highload Microservices', category: 'Backend', icon: Boxes },
    { label: 'Uzum Technologies Partner', category: 'Hiring', icon: Building },
    { label: 'FastAPI & Vector DBs (Pinecone)', category: 'AI', icon: Database },
    { label: 'Figma & Design Systems', category: 'UI/UX', icon: Layers },
    { label: 'EPAM Systems Partner', category: 'Hiring', icon: Building },
    { label: 'Docker & Kubernetes CI/CD', category: 'DevOps', icon: Workflow },
    { label: 'Playwright & PyTest QA', category: 'Testing', icon: ShieldCheck },
    { label: 'IT Park Official Resident', category: 'Accreditation', icon: Globe2 },
    { label: 'Click & Payme Fintech', category: 'Hiring', icon: Building },
    { label: 'Tailwind CSS v4 & TypeScript', category: 'Frontend', icon: Sparkles },
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.08] bg-[#050608]/40 backdrop-blur-md py-4 select-none">
      {/* Left/Right gradient fades for seamless edge blur */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050608] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050608] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-6">
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-300 whitespace-nowrap hover:bg-white/[0.06] hover:border-white/10 transition-colors"
            >
              <Icon className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-medium text-white">{item.label}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-400">
                {item.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
