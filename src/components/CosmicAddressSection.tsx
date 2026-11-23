import { useState } from 'react';
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Ruler,
  Sparkles,
} from 'lucide-react';
import {
  ASTRONOMICAL_UNITS,
  COSMIC_ADDRESS_LEVELS,
  COSMIC_DESTINATIONS,
  GALAXY_TYPES,
  MILKY_WAY_FACTS,
  type GalaxyKind,
} from '../data/cosmicData';

function GalaxyIllustration({ kind }: { kind: GalaxyKind }) {
  if (kind === 'espiral') {
    return (
      <svg
        viewBox="0 0 200 130"
        className="w-full h-32"
        role="img"
        aria-label="Ilustração estilizada de uma galáxia espiral"
      >
        <defs>
          <radialGradient id="spiralCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.98" />
            <stop offset="35%" stopColor="#FCD34D" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#040814" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="65" rx="76" ry="38" fill="url(#spiralCore)" opacity="0.55" />
        {/* Luminous Spiral Arms */}
        <g fill="none" strokeLinecap="round">
          <path
            d="M 100 65 C 122 50, 152 48, 170 64 C 180 74, 166 94, 134 99"
            stroke="#38BDF8"
            strokeWidth="3.2"
            opacity="0.85"
          />
          <path
            d="M 100 65 C 78 80, 48 82, 30 66 C 20 56, 34 36, 66 31"
            stroke="#38BDF8"
            strokeWidth="3.2"
            opacity="0.85"
          />
          <path
            d="M 100 65 C 118 76, 138 82, 154 78"
            stroke="#818CF8"
            strokeWidth="2.2"
            opacity="0.75"
          />
          <path
            d="M 100 65 C 82 54, 62 48, 46 52"
            stroke="#818CF8"
            strokeWidth="2.2"
            opacity="0.75"
          />
        </g>
        {/* Star clusters along arms */}
        {[
          [138, 52],
          [162, 62],
          [154, 86],
          [62, 78],
          [38, 66],
          [48, 43],
          [124, 79],
          [75, 49],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 2 === 0 ? 1.8 : 1.2}
            fill={i % 3 === 0 ? '#E0F2FE' : '#7DD3FC'}
          />
        ))}
        <ellipse cx="100" cy="65" rx="18" ry="10" fill="#FEF3C7" opacity="0.92" />
        <ellipse cx="100" cy="65" rx="9" ry="5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (kind === 'eliptica') {
    return (
      <svg
        viewBox="0 0 200 130"
        className="w-full h-32"
        role="img"
        aria-label="Ilustração estilizada de uma galáxia elíptica"
      >
        <defs>
          <radialGradient id="ellipticalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.98" />
            <stop offset="28%" stopColor="#FCD34D" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#040814" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="100"
          cy="65"
          rx="74"
          ry="46"
          transform="rotate(-14 100 65)"
          fill="url(#ellipticalGlow)"
        />
        <ellipse
          cx="100"
          cy="65"
          rx="42"
          ry="25"
          transform="rotate(-14 100 65)"
          fill="rgba(254, 243, 199, 0.35)"
        />
        <ellipse
          cx="100"
          cy="65"
          rx="16"
          ry="10"
          transform="rotate(-14 100 65)"
          fill="#FFFBEB"
          opacity="0.92"
        />
        {[
          [56, 52],
          [145, 76],
          [75, 86],
          [128, 42],
          [66, 72],
          [135, 58],
          [92, 35],
          [112, 93],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.2} fill="#FDE68A" opacity="0.7" />
        ))}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 130"
      className="w-full h-32"
      role="img"
      aria-label="Ilustração estilizada de uma galáxia irregular"
    >
      <defs>
        <radialGradient id="irregA" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="irregB" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="irregC" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="82" cy="58" r="36" fill="url(#irregA)" />
      <circle cx="122" cy="70" r="34" fill="url(#irregB)" />
      <circle cx="96" cy="82" r="24" fill="url(#irregC)" />
      <circle cx="66" cy="78" r="22" fill="url(#irregB)" opacity="0.7" />
      <circle cx="132" cy="48" r="22" fill="url(#irregA)" opacity="0.75" />
      {[
        [78, 55, 2.2, '#E0F2FE'],
        [86, 62, 1.5, '#7DD3FC'],
        [118, 66, 2.1, '#E0E7FF'],
        [128, 49, 1.8, '#BAE6FD'],
        [98, 82, 2.0, '#FEF3C7'],
        [63, 74, 1.6, '#C7D2FE'],
        [106, 52, 1.3, '#FFFFFF'],
        [142, 76, 1.4, '#7DD3FC'],
        [52, 60, 1.2, '#E0F2FE'],
        [114, 86, 1.5, '#FDE68A'],
      ].map(([x, y, r, fill], i) => (
        <circle
          key={i}
          cx={x as number}
          cy={y as number}
          r={r as number}
          fill={fill as string}
        />
      ))}
    </svg>
  );
}

// Conversion constants
const UA_PER_LIGHT_YEAR = 63241.077;
const LIGHT_YEARS_PER_PARSEC = 3.26156;

function formatScientificPt(value: number): string {
  if (!Number.isFinite(value) || value === 0) return '0';
  if (Math.abs(value) >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} bilhões`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} milhões`;
  }
  if (Math.abs(value) >= 100) {
    return value.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
  }
  if (Math.abs(value) >= 0.01) {
    return value.toLocaleString('pt-BR', { maximumFractionDigits: 4 });
  }
  return value.toExponential(2).replace('.', ',');
}

export function CosmicAddressSection() {
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(3); // Via Láctea
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('proxima-centauri');
  const [mwHighlight, setMwHighlight] = useState<'center' | 'orion' | 'arms'>('orion');

  // Interactive free unit converter state
  const [converterValue, setConverterValue] = useState<string>('1');
  const [converterUnit, setConverterUnit] = useState<'ua' | 'al' | 'pc'>('pc');

  const activeLevel = COSMIC_ADDRESS_LEVELS[selectedLevelIdx];
  const activeDestination =
    COSMIC_DESTINATIONS.find((d) => d.id === selectedDestinationId) ?? COSMIC_DESTINATIONS[0];

  const numericInput = Math.max(0, parseFloat(converterValue.replace(',', '.')) || 0);
  const convertedLightYears =
    converterUnit === 'al'
      ? numericInput
      : converterUnit === 'pc'
      ? numericInput * LIGHT_YEARS_PER_PARSEC
      : numericInput / UA_PER_LIGHT_YEAR;

  const convertedUA = convertedLightYears * UA_PER_LIGHT_YEAR;
  const convertedParsecs = convertedLightYears / LIGHT_YEARS_PER_PARSEC;

  return (
    <section
      id="endereco"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto space-y-20 sm:space-y-24">
        {/* Section Header */}
        <header className="max-w-3xl space-y-3">
          <p className="text-xs sm:text-sm font-medium text-sky-300/90">
            Seção 01 · Esquema Ilustrado
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">
            Nosso Endereço Cósmico
          </h2>
          <p className="text-base text-sky-100/80 leading-relaxed">
            Para localizar a Terra na imensidão do espaço, a astronomia organiza o universo em
            estruturas cada vez maiores e utiliza réguas sob medida para cada escala.
          </p>
        </header>

        {/* ================= BLOCO A1: GALÁXIA E VIA LÁCTEA ================= */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-2.5">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-slate-100">
              1. Galáxias e a Via Láctea
            </h3>
            <p className="text-sm sm:text-base text-sky-100/80 leading-relaxed">
              Uma <strong className="text-slate-100 font-semibold">galáxia</strong> é um imenso
              sistema gravitacional formado por bilhões de estrelas, sistemas planetários, nuvens
              de gás, poeira interestelar e matéria escura unidos pela gravidade. Os astrônomos
              agrupam as galáxias em três grandes famílias morfológicas:
            </p>
          </div>

          {/* 3 Comparative Galaxy Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALAXY_TYPES.map((galaxy) => (
              <article
                key={galaxy.id}
                className="liquid-glass rounded-3xl p-6 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="rounded-2xl bg-[#040814]/55 border border-sky-200/12 p-3 mb-5">
                    <GalaxyIllustration kind={galaxy.id} />
                  </div>

                  <p className="text-xs text-sky-300/85 font-medium">{galaxy.subtitle}</p>
                  <h4 className="font-display text-xl font-semibold text-slate-50 mt-1">
                    {galaxy.name}
                  </h4>
                  <p className="text-sm text-sky-100/80 leading-relaxed mt-2.5">
                    {galaxy.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-sky-100/75">
                    {galaxy.characteristics.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-400 mt-0.5 select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-sky-200/12 text-xs text-sky-200/75">
                  <span className="text-sky-300/90 font-medium">Exemplos: </span>
                  {galaxy.example}
                </div>
              </article>
            ))}
          </div>

          {/* Special Spotlight: Via Láctea */}
          <div className="liquid-glass rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-amber-300/90">
                    Destaque Galáctico · Nossa Casa no Cosmos
                  </p>
                  <h4 className="font-display text-2xl sm:text-3xl font-semibold text-slate-50">
                    Via Láctea: Uma Espiral Barrada
                  </h4>
                  <p className="text-sm sm:text-base text-sky-100/80 leading-relaxed">
                    Nossa galáxia possui uma barra central brilhante que alimenta seus grandes
                    braços espirais. Com cerca de{' '}
                    <strong className="text-slate-100">100.000 anos-luz de diâmetro</strong> e entre{' '}
                    <strong className="text-slate-100">100 e 400 bilhões de estrelas</strong>, ela
                    abriga o buraco negro supermassivo{' '}
                    <strong className="text-amber-200">Sagitário A*</strong> no centro. Nosso{' '}
                    <strong className="text-sky-300">Sistema Solar</strong> orbita calmamente no{' '}
                    <strong className="text-sky-200">Braço de Órion</strong>, a cerca de 26.000
                    anos-luz do núcleo.
                  </p>
                </div>

                {/* Clean 6-metric grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-4 pt-3 border-t border-sky-200/15">
                  {MILKY_WAY_FACTS.map((fact) => (
                    <div key={fact.label}>
                      <p className="text-xs text-sky-200/65">{fact.label}</p>
                      <p className="font-mono text-sm sm:text-base font-medium text-slate-100 tabular-nums mt-0.5">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Milky Way Schematic */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl bg-[#040814]/65 border border-sky-200/15 p-4 sm:p-5 relative">
                  <svg
                    viewBox="0 0 380 260"
                    className="w-full h-auto"
                    role="img"
                    aria-label="Esquema ilustrado da Via Láctea mostrando Sagitário A*, barra central e Sistema Solar no Braço de Órion"
                  >
                    <defs>
                      <radialGradient id="mwHalo" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.45" />
                        <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.18" />
                        <stop offset="70%" stopColor="#4F46E5" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#040814" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    <ellipse cx="190" cy="130" rx="168" ry="112" fill="url(#mwHalo)" />

                    {/* Spiral Arms */}
                    <g
                      fill="none"
                      strokeLinecap="round"
                      opacity={mwHighlight === 'arms' ? 1 : 0.72}
                      className="transition-opacity duration-200"
                    >
                      {/* Perseus Arm */}
                      <path
                        d="M 155 118 C 110 75, 165 24, 245 45 C 315 62, 342 128, 304 185"
                        stroke="#818CF8"
                        strokeWidth={mwHighlight === 'arms' ? 4.5 : 3}
                      />
                      {/* Scutum-Centaurus Arm */}
                      <path
                        d="M 225 142 C 270 185, 215 236, 135 215 C 65 198, 38 132, 76 75"
                        stroke="#38BDF8"
                        strokeWidth={mwHighlight === 'arms' ? 4.5 : 3}
                      />
                      {/* Orion Spur (local arm) */}
                      <path
                        d="M 135 162 C 160 190, 215 196, 250 176"
                        stroke="#7DD3FC"
                        strokeWidth={mwHighlight === 'orion' ? 4.2 : 2.5}
                        strokeDasharray="6 3"
                      />
                    </g>

                    {/* Galactic Bar */}
                    <ellipse
                      cx="190"
                      cy="130"
                      rx="42"
                      ry="13"
                      transform="rotate(24 190 130)"
                      fill="rgba(253, 224, 130, 0.48)"
                      stroke="rgba(252, 211, 77, 0.65)"
                      strokeWidth="1"
                    />

                    {/* Distance line 26.000 al */}
                    <line
                      x1="190"
                      y1="130"
                      x2="196"
                      y2="188"
                      stroke="rgba(186, 230, 253, 0.5)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <text
                      x="204"
                      y="164"
                      fill="#BAE6FD"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      ~26.000 al
                    </text>

                    {/* Sagittarius A* */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setMwHighlight('center')}
                    >
                      <circle
                        cx="190"
                        cy="130"
                        r={mwHighlight === 'center' ? 14 : 9}
                        fill="rgba(252, 211, 77, 0.25)"
                        stroke="#FCD34D"
                        strokeWidth="1.5"
                      />
                      <circle cx="190" cy="130" r="4.5" fill="#040814" stroke="#FCD34D" strokeWidth="1.8" />
                      <text
                        x="190"
                        y="108"
                        textAnchor="middle"
                        fill="#FDE68A"
                        fontSize="11"
                        fontWeight="600"
                      >
                        Sagitário A*
                      </text>
                    </g>

                    {/* Solar System in Orion Arm */}
                    <g
                      className="cursor-pointer"
                      onClick={() => setMwHighlight('orion')}
                    >
                      <circle
                        cx="196"
                        cy="188"
                        r={mwHighlight === 'orion' ? 13 : 8}
                        fill="rgba(56, 189, 248, 0.26)"
                        stroke="#38BDF8"
                        strokeWidth="1.5"
                      />
                      <circle cx="196" cy="188" r="4" fill="#38BDF8" />
                      <text
                        x="196"
                        y="214"
                        textAnchor="middle"
                        fill="#7DD3FC"
                        fontSize="11"
                        fontWeight="600"
                      >
                        Sistema Solar (Braço de Órion)
                      </text>
                    </g>

                    {/* Diameter ruler */}
                    <line
                      x1="28"
                      y1="244"
                      x2="352"
                      y2="244"
                      stroke="rgba(186, 230, 253, 0.35)"
                      strokeWidth="1"
                    />
                    <text
                      x="190"
                      y="238"
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      Diâmetro total ≈ 100.000 anos-luz
                    </text>
                  </svg>

                  {/* Interactive Spotlight Switcher */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-sky-200/12">
                    {[
                      { id: 'orion' as const, label: 'Braço de Órion' },
                      { id: 'center' as const, label: 'Sagitário A*' },
                      { id: 'arms' as const, label: 'Braços Espirais' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMwHighlight(tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          mwHighlight === tab.id
                            ? 'bg-sky-400/25 text-sky-100 border border-sky-300/45'
                            : 'text-sky-200/75 hover:text-slate-100 border border-transparent hover:border-sky-200/20'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-sky-100/75 mt-2.5 leading-relaxed">
                    {mwHighlight === 'orion' &&
                      'O Braço de Órion é um filamento espiral secundário onde o Sistema Solar orbita em relativa tranquilidade, longe da radiação extrema do centro galáctico.'}
                    {mwHighlight === 'center' &&
                      'Sagitário A* é o buraco negro supermassivo de 4 milhões de massas solares no coração da barra central da Via Láctea.'}
                    {mwHighlight === 'arms' &&
                      'Os braços principais (como Perseu e Escudo-Centauro) funcionam como ondas de densidade onde gás é comprimido e novas estrelas azuis nascem.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BLOCO A2: ORGANIZAÇÃO DO UNIVERSO (ESCALA INTERATIVA) ================= */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-2.5">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-slate-100">
              2. Organização do Universo: Escala Interativa
            </h3>
            <p className="text-sm sm:text-base text-sky-100/80 leading-relaxed">
              Avance passo a passo do nosso planeta até o horizonte do Universo Observável. Clique
              em qualquer nível para expandir sua escala aproximada, definição e curiosidade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Vertical Interactive Cascade List */}
            <div className="lg:col-span-5 space-y-2.5">
              {COSMIC_ADDRESS_LEVELS.map((level, index) => {
                const isActive = index === selectedLevelIdx;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setSelectedLevelIdx(index)}
                    className={`w-full text-left rounded-2xl px-4 py-3.5 flex items-center gap-4 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isActive
                        ? 'liquid-glass-strong border-sky-300/55 shadow-[0_0_28px_-8px_rgba(56,189,248,0.45)]'
                        : 'liquid-glass-subtle hover:border-sky-200/30'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-semibold w-8 h-8 rounded-xl flex items-center justify-center shrink-0 tabular-nums ${
                        isActive
                          ? 'bg-sky-400/25 text-sky-200 border border-sky-300/45'
                          : 'bg-sky-950/60 text-sky-200/65 border border-sky-200/12'
                      }`}
                    >
                      0{level.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-display text-base font-semibold truncate ${
                          isActive ? 'text-slate-50' : 'text-slate-200/90'
                        }`}
                      >
                        {level.name}
                      </p>
                      <p className="text-xs text-sky-100/65 truncate">{level.shortRole}</p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-sky-300 translate-x-0.5' : 'text-sky-200/40'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            {/* Expanded Liquid Glass Detail Panel */}
            <div className="lg:col-span-7 liquid-glass rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4 border-b border-sky-200/15">
                <div>
                  <p className="font-mono text-xs text-sky-300/90 tabular-nums">
                    Nível 0{activeLevel.step} / 07 · Endereço Cósmico
                  </p>
                  <h4 className="font-display text-2xl sm:text-3xl font-semibold text-slate-50 mt-1">
                    {activeLevel.name}
                  </h4>
                </div>
                <p className="font-mono text-xs sm:text-sm text-amber-300 tabular-nums">
                  {activeLevel.scaleLabel}
                </p>
              </div>

              {/* Visual Zoom Progression Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-sky-200/70">
                  <span>Escala Planetária</span>
                  <span>Escala Cosmológica</span>
                </div>
                <div className="h-2 rounded-full bg-sky-950/70 border border-sky-200/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-300 transition-all duration-300"
                    style={{ width: `${(activeLevel.step / 7) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-sky-300/85 mb-1">Definição</p>
                  <p className="text-sm sm:text-base text-sky-100/85 leading-relaxed">
                    {activeLevel.definition}
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-200/12">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300/90 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Curiosidade Marcante</span>
                  </div>
                  <p className="text-sm text-sky-100/80 leading-relaxed">
                    {activeLevel.curiosity}
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-200/12 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-sky-200/65">{activeLevel.keyMetricLabel}</p>
                    <p className="font-mono text-base font-semibold text-slate-100 tabular-nums mt-0.5">
                      {activeLevel.keyMetricValue}
                    </p>
                  </div>

                  {/* Stepper Navigation */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={selectedLevelIdx === 0}
                      onClick={() => setSelectedLevelIdx((prev) => Math.max(0, prev - 1))}
                      className="liquid-glass-interactive rounded-xl px-3.5 py-2 text-xs font-medium text-sky-100 inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      <span>Aproximar</span>
                    </button>
                    <button
                      type="button"
                      disabled={selectedLevelIdx === COSMIC_ADDRESS_LEVELS.length - 1}
                      onClick={() =>
                        setSelectedLevelIdx((prev) =>
                          Math.min(COSMIC_ADDRESS_LEVELS.length - 1, prev + 1)
                        )
                      }
                      className="liquid-btn-primary rounded-xl px-3.5 py-2 text-xs font-medium text-slate-50 inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                    >
                      <span>Ampliar Escala</span>
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BLOCO A3: MEDIDAS ASTRONÔMICAS + CONVERSOR INTERATIVO ================= */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-2.5">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-slate-100">
              3. Medidas Astronômicas e Comparador Interativo
            </h3>
            <p className="text-sm sm:text-base text-sky-100/80 leading-relaxed">
              No espaço, quilômetros se tornam números gigantescos e difíceis de ler. Por isso, a
              astronomia utiliza três unidades oficiais adaptadas ao tamanho do cosmos.
            </p>
          </div>

          {/* 3 Official Units Didactic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ASTRONOMICAL_UNITS.map((unit) => (
              <article
                key={unit.id}
                className="liquid-glass rounded-3xl p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={`font-mono text-2xl font-semibold ${unit.accentColor}`}>
                      {unit.symbol}
                    </span>
                    <span className="font-mono text-xs text-sky-200/75 tabular-nums">
                      {unit.kmEquivalent}
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-semibold text-slate-50">
                    {unit.name}
                  </h4>

                  <p className="text-sm text-sky-100/80 leading-relaxed">{unit.definition}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-sky-200/12 text-xs leading-relaxed">
                  <p className="text-sky-100/80">
                    <span className="text-sky-300 font-medium">Quando usar: </span>
                    {unit.bestUse}
                  </p>
                  <p className="text-sky-100/75">
                    <span className="text-amber-300 font-medium">Analogia: </span>
                    {unit.analogy}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Interactive Cosmic Destination Comparator & Unit Converter */}
          <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-7">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-sky-300/90 flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Comparador de Distâncias Cósmicas</span>
                </p>
                <h4 className="font-display text-2xl font-semibold text-slate-50 mt-1">
                  Escolha um destino para comparar UA, anos-luz e parsecs
                </h4>
              </div>
              <p className="text-xs text-sky-200/70">
                Referência medida a partir da Terra
              </p>
            </div>

            {/* Quick Destination Selector Buttons */}
            <div
              role="tablist"
              aria-label="Destinos cósmicos"
              className="flex flex-wrap gap-2.5"
            >
              {COSMIC_DESTINATIONS.map((dest) => {
                const isSelected = dest.id === activeDestination.id;
                return (
                  <button
                    key={dest.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedDestinationId(dest.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isSelected
                        ? 'liquid-btn-primary text-slate-50'
                        : 'liquid-glass-subtle text-sky-100/80 hover:text-slate-50 hover:border-sky-300/35'
                    }`}
                  >
                    {dest.name}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Readout Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
              <div className="p-4 rounded-2xl bg-[#040814]/45 border border-sky-200/12">
                <p className="text-xs text-sky-200/70">Unidade Astronômica</p>
                <p className="font-mono text-lg sm:text-xl font-semibold text-amber-300 tabular-nums mt-1.5">
                  {activeDestination.ua}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#040814]/45 border border-sky-200/12">
                <p className="text-xs text-sky-200/70">Anos-luz</p>
                <p className="font-mono text-lg sm:text-xl font-semibold text-sky-300 tabular-nums mt-1.5">
                  {activeDestination.lightYears}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#040814]/45 border border-sky-200/12">
                <p className="text-xs text-sky-200/70">Parsecs</p>
                <p className="font-mono text-lg sm:text-xl font-semibold text-indigo-300 tabular-nums mt-1.5">
                  {activeDestination.parsecs}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#040814]/45 border border-sky-300/25">
                <p className="text-xs text-sky-200/70 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-300" aria-hidden="true" />
                  <span>Tempo de viagem da luz</span>
                </p>
                <p className="font-mono text-lg sm:text-xl font-semibold text-slate-50 tabular-nums mt-1.5">
                  {activeDestination.lightTravelTime}
                </p>
              </div>
            </div>

            {/* Logarithmic Proportional Visual Scale Bar & Didactic Note */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-sky-200/75">
                <span>
                  Escala logarítmica relativa — <strong className="text-slate-100">{activeDestination.name}</strong> ({activeDestination.category})
                </span>
                <span>
                  Unidade ideal: <strong className="text-sky-300">{activeDestination.recommendedUnit}</strong>
                </span>
              </div>

              <div className="relative h-3 rounded-full bg-[#040814]/70 border border-sky-200/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 via-sky-400 to-indigo-400 transition-all duration-300"
                  style={{ width: `${activeDestination.logScalePercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-sky-200/55">
                <span>Lua (1,3 s)</span>
                <span className="hidden sm:inline">Netuno (4h 10m)</span>
                <span>Próxima Centauri (4,24 anos)</span>
                <span>Andrômeda (2,54 mi anos)</span>
              </div>

              <p className="text-sm text-sky-100/85 leading-relaxed pt-1">
                {activeDestination.didacticNote}
              </p>
            </div>

            {/* Compact Live Custom Unit Converter */}
            <div className="pt-6 border-t border-sky-200/15">
              <div className="flex items-center gap-2 text-xs font-medium text-sky-300/90 mb-3">
                <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Conversor Livre (UA ⇄ Anos-luz ⇄ Parsecs)</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-5 flex items-center gap-2">
                  <label htmlFor="cosmic-converter-input" className="sr-only">
                    Valor para conversão astronômica
                  </label>
                  <input
                    id="cosmic-converter-input"
                    type="number"
                    min="0"
                    step="any"
                    value={converterValue}
                    onChange={(e) => setConverterValue(e.target.value)}
                    className="w-full rounded-xl bg-[#040814]/65 border border-sky-200/20 px-3.5 py-2.5 font-mono text-sm text-slate-100 tabular-nums focus:outline-none focus:border-sky-400"
                    placeholder="Digite um valor"
                  />
                  <div className="flex items-center rounded-xl bg-[#040814]/65 border border-sky-200/15 p-1 shrink-0">
                    {(['ua', 'al', 'pc'] as const).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setConverterUnit(u)}
                        className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors cursor-pointer uppercase ${
                          converterUnit === u
                            ? 'bg-sky-400/25 text-sky-100'
                            : 'text-sky-200/65 hover:text-slate-100'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="px-3 py-2 rounded-xl bg-[#040814]/40 border border-sky-200/10">
                    <span className="text-[11px] text-sky-200/60 block">Em UA</span>
                    <span className="font-mono font-semibold text-amber-300 tabular-nums">
                      {formatScientificPt(convertedUA)} UA
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#040814]/40 border border-sky-200/10">
                    <span className="text-[11px] text-sky-200/60 block">Em Anos-luz</span>
                    <span className="font-mono font-semibold text-sky-300 tabular-nums">
                      {formatScientificPt(convertedLightYears)} al
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#040814]/40 border border-sky-200/10">
                    <span className="text-[11px] text-sky-200/60 block">Em Parsecs</span>
                    <span className="font-mono font-semibold text-indigo-300 tabular-nums">
                      {formatScientificPt(convertedParsecs)} pc
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
