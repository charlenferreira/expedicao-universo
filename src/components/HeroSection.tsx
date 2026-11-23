import { useState } from 'react';
import { ArrowDownRight, Compass, Orbit, Trophy } from 'lucide-react';
import { COSMIC_ADDRESS_LEVELS } from '../data/cosmicData';

export function HeroSection() {
  const [hoveredRing, setHoveredRing] = useState<number>(3); // Default highlight: Via Láctea (index 3)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeLevel = COSMIC_ADDRESS_LEVELS[hoveredRing] ?? COSMIC_ADDRESS_LEVELS[3];

  return (
    <section
      id="inicio"
      className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Mission Brief & Primary CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-sky-300/90">
              Astronomia Interativa · Da Terra ao Universo Observável
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-slate-50">
              Expedição ao Universo:{' '}
              <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
                Nosso Endereço Cósmico
              </span>
            </h1>

            <p className="text-base sm:text-lg text-sky-100/80 leading-relaxed max-w-2xl">
              Descubra onde exatamente estamos no cosmos. Navegue pelas estruturas da Via Láctea,
              percorra os sete níveis da organização do universo, domine as medidas astronômicas e
              explore órbitas planetárias e galáxias em tempo real.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('explorador')}
                className="liquid-btn-primary rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-50 inline-flex items-center gap-2.5 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <Orbit className="w-4 h-4 text-sky-200 shrink-0" aria-hidden="true" />
                <span>Explorar o Universo</span>
              </button>

              <button
                type="button"
                onClick={() => scrollTo('desafio')}
                className="liquid-glass-interactive rounded-2xl px-6 py-3.5 text-sm sm:text-base font-medium text-sky-100 inline-flex items-center gap-2.5 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <Trophy className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                <span>Jogar Desafio</span>
              </button>
            </div>

            {/* Clean Unboxed Expedition Objectives Strip */}
            <div className="pt-6 border-t border-sky-200/12 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <p className="font-display text-sm font-semibold text-slate-100">
                  01. Esquema Ilustrado
                </p>
                <p className="text-xs sm:text-sm text-sky-100/70 mt-1 leading-relaxed">
                  Galáxias, Via Láctea, 7 escalas cósmicas e conversor de UA, anos-luz e parsecs.
                </p>
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-slate-100">
                  02. Explorador Orbital
                </p>
                <p className="text-xs sm:text-sm text-sky-100/70 mt-1 leading-relaxed">
                  Mapa interativo com órbitas planetárias, luas proeminentes, Via Láctea e Grupo Local.
                </p>
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-slate-100">
                  03. Desafio Cósmico
                </p>
                <p className="text-xs sm:text-sm text-sky-100/70 mt-1 leading-relaxed">
                  Quiz completo com 10 questões, explicações científicas e patente espacial final.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Concentric Cosmic Address Visual */}
          <div className="lg:col-span-5">
            <div className="liquid-glass rounded-3xl p-6 sm:p-7 relative overflow-hidden">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-medium text-sky-300/90">
                    Mapa Rápido de Escalas
                  </p>
                  <h2 className="font-display text-lg font-semibold text-slate-100 mt-0.5">
                    7 Níveis do Endereço Cósmico
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => scrollTo('endereco')}
                  aria-label="Ir para o Esquema Ilustrado"
                  className="p-2 rounded-xl text-sky-200/80 hover:text-sky-300 hover:bg-sky-400/10 transition-colors cursor-pointer"
                >
                  <ArrowDownRight className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Concentric Rings SVG */}
              <div className="relative aspect-square max-w-[320px] mx-auto my-2">
                <svg
                  viewBox="0 0 320 320"
                  className="w-full h-full overflow-visible"
                  role="img"
                  aria-label="Diagrama concêntrico interativo dos sete níveis do endereço cósmico"
                >
                  <defs>
                    <radialGradient id="heroCoreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                      <stop offset="55%" stopColor="#818CF8" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#040814" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx="160" cy="160" r="148" fill="url(#heroCoreGlow)" />

                  {/* 7 Interactive Rings (Outer to Inner so click/hover hits cleanly) */}
                  {[...COSMIC_ADDRESS_LEVELS].reverse().map((level) => {
                    const idx = level.step - 1;
                    const radius = 22 + idx * 20;
                    const isSelected = hoveredRing === idx;
                    const angle = (idx * 1.15) - 0.7;
                    const dotX = 160 + Math.cos(angle) * radius;
                    const dotY = 160 + Math.sin(angle) * radius;

                    return (
                      <g
                        key={level.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredRing(idx)}
                        onClick={() => setHoveredRing(idx)}
                      >
                        <circle
                          cx="160"
                          cy="160"
                          r={radius}
                          fill={isSelected ? 'rgba(56, 189, 248, 0.08)' : 'transparent'}
                          stroke={
                            isSelected
                              ? idx === 6
                                ? '#FCD34D'
                                : '#38BDF8'
                              : 'rgba(186, 230, 253, 0.22)'
                          }
                          strokeWidth={isSelected ? 2 : 1}
                          strokeDasharray={idx % 2 === 1 ? '4 4' : undefined}
                          className="transition-all duration-200"
                        />
                        <circle
                          cx={dotX}
                          cy={dotY}
                          r={isSelected ? 5.5 : 3.2}
                          fill={
                            isSelected
                              ? idx === 6
                                ? '#FCD34D'
                                : '#38BDF8'
                              : idx === 0
                              ? '#38BDF8'
                              : '#94A3B8'
                          }
                          className="transition-all duration-200"
                        />
                      </g>
                    );
                  })}

                  {/* Earth Center Point */}
                  <circle cx="160" cy="160" r="6" fill="#38BDF8" />
                  <circle cx="160" cy="160" r="11" fill="none" stroke="rgba(56,189,248,0.45)" strokeWidth="1" />
                </svg>
              </div>

              {/* Active Ring Readout */}
              <div className="mt-4 pt-4 border-t border-sky-200/15 space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-xs text-sky-200/75">
                  <span className="font-mono tabular-nums text-sky-300">
                    Nível {activeLevel.step} de 7
                  </span>
                  <span className="font-mono tabular-nums text-amber-300/90 truncate">
                    {activeLevel.scaleLabel}
                  </span>
                </div>
                <p className="font-display text-lg font-semibold text-slate-50">
                  {activeLevel.name}
                </p>
                <p className="text-xs sm:text-sm text-sky-100/75 leading-relaxed">
                  {activeLevel.shortRole} — passe o cursor ou toque nos anéis para percorrer a escala.
                </p>

                <button
                  type="button"
                  onClick={() => scrollTo('endereco')}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-sky-300 hover:text-sky-200 transition-colors cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Abrir esquema completo do Endereço Cósmico</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
