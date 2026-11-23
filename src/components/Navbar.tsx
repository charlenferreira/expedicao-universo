import { useEffect, useState } from 'react';
import { Compass, Orbit, Sparkles, Trophy } from 'lucide-react';

export type SectionId = 'inicio' | 'endereco' | 'explorador' | 'desafio';

interface NavItem {
  id: SectionId;
  label: string;
  mobileLabel: string;
  icon: typeof Compass;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', label: 'Início', mobileLabel: 'Início', icon: Sparkles },
  { id: 'endereco', label: 'Endereço Cósmico', mobileLabel: 'Endereço', icon: Compass },
  { id: 'explorador', label: 'Explorador Orbital', mobileLabel: 'Explorador', icon: Orbit },
  { id: 'desafio', label: 'Desafio Cósmico', mobileLabel: 'Desafio', icon: Trophy },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId>('inicio');

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: '-25% 0px -50% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Desktop Floating Liquid Glass Pill Navigation — 3-Zone Contract */}
      <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-5xl mx-auto pointer-events-auto">
          <div className="liquid-glass rounded-full px-5 sm:px-6 py-2.5 flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark */}
            <button
              type="button"
              onClick={() => scrollToSection('inicio')}
              className="font-display text-base sm:text-lg font-semibold tracking-tight text-slate-100 hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md"
            >
              Expedição ao Universo
            </button>

            {/* Zone 2: 4 Clean Single-Line Nav Links */}
            <nav
              aria-label="Navegação principal"
              className="hidden md:flex items-center gap-6"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded ${
                      isActive
                        ? 'text-sky-300'
                        : 'text-sky-100/75 hover:text-slate-100'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-opacity duration-200 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => scrollToSection('desafio')}
                className="liquid-btn-primary rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-50 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Jogar Desafio
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Clean Floating Bottom Liquid Glass Bar (compact <= 10% viewport height) */}
      <nav
        aria-label="Navegação móvel"
        className="md:hidden fixed bottom-3 inset-x-3 z-50"
      >
        <div className="liquid-glass-strong rounded-2xl px-2 py-1.5 grid grid-cols-4 gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-xl text-[11px] font-medium transition-colors cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-sky-400/18 text-sky-300'
                    : 'text-sky-100/70 hover:text-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="truncate max-w-full">{item.mobileLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
