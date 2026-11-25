import { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Flame,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  QUIZ_QUESTIONS,
  getSpaceRank,
  type QuizCategory,
  type QuizQuestion,
} from '../data/cosmicData';

interface ShuffledQuestion {
  id: number;
  category: QuizCategory;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildQuizDeck(shouldShuffle: boolean): ShuffledQuestion[] {
  const ordered: QuizQuestion[] = shouldShuffle ? shuffleArray(QUIZ_QUESTIONS) : [...QUIZ_QUESTIONS];
  return ordered.map((q) => {
    if (!shouldShuffle) {
      return {
        id: q.id,
        category: q.category,
        question: q.question,
        options: [...q.options],
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      };
    }

    const indexedOptions = q.options.map((text, idx) => ({
      text,
      isCorrect: idx === q.correctIndex,
    }));
    const shuffledOptions = shuffleArray(indexedOptions);
    return {
      id: q.id,
      category: q.category,
      question: q.question,
      options: shuffledOptions.map((o) => o.text),
      correctIndex: shuffledOptions.findIndex((o) => o.isCorrect),
      explanation: q.explanation,
    };
  });
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export function CosmicQuizSection() {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [deck, setDeck] = useState<ShuffledQuestion[]>(() => buildQuizDeck(false));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [categoryStats, setCategoryStats] = useState<
    Record<QuizCategory, { correct: number; total: number }>
  >({
    'Galáxias e Via Láctea': { correct: 0, total: 0 },
    'Organização do Universo': { correct: 0, total: 0 },
    'Medidas Astronômicas': { correct: 0, total: 0 },
  });

  const currentQuestion = deck[currentIndex];
  const isAnswered = selectedOption !== null;
  const isCurrentCorrect = isAnswered && selectedOption === currentQuestion.correctIndex;

  const startExpedition = (shouldShuffle: boolean) => {
    setDeck(buildQuizDeck(shouldShuffle));
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setCategoryStats({
      'Galáxias e Via Láctea': { correct: 0, total: 0 },
      'Organização do Universo': { correct: 0, total: 0 },
      'Medidas Astronômicas': { correct: 0, total: 0 },
    });
    setPhase('playing');
  };

  const handleSelectOption = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);

    const correct = optionIdx === currentQuestion.correctIndex;
    if (correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const nextStreak = prev + 1;
        setBestStreak((best) => Math.max(best, nextStreak));
        return nextStreak;
      });
    } else {
      setStreak(0);
    }

    setCategoryStats((prev) => {
      const cat = currentQuestion.category;
      return {
        ...prev,
        [cat]: {
          correct: prev[cat].correct + (correct ? 1 : 0),
          total: prev[cat].total + 1,
        },
      };
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setPhase('finished');
    }
  };

  const percentage = Math.round((score / deck.length) * 100);
  const rank = getSpaceRank(score);

  return (
    <section
      id="desafio"
      className="relative py-16 sm:py-24 pb-28 md:pb-24 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Section Header */}
        <header className="space-y-2.5">
          <p className="text-xs sm:text-sm font-medium text-amber-300/90">
            Seção 03 · Ciências — 9º Ano do Ensino Fundamental
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">
            Desafio Cósmico
          </h2>
          <p className="text-sm sm:text-base text-sky-100/80 leading-relaxed max-w-2xl">
            Perguntas diretas e acessíveis para quem está começando a aprender sobre galáxias,
            organização do universo e medidas astronômicas, com explicação imediata a cada resposta.
          </p>
        </header>

        {/* ================= PHASE 1: INTRO SCREEN ================= */}
        {phase === 'intro' && (
          <div className="liquid-glass rounded-3xl p-6 sm:p-10 space-y-8">
            <div className="space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-slate-50">
                Pronto para começar o desafio de Ciências do 9º ano?
              </h3>
              <p className="text-sm sm:text-base text-sky-100/80 leading-relaxed">
                O jogo traz <strong className="text-slate-100">10 perguntas fáceis e diretas</strong>{' '}
                para ajudar você a aprender os conceitos básicos sem complicação. A cada resposta,
                você vê na hora se acertou junto com uma explicação simples.
              </p>
            </div>

            {/* Balanced Topic Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-5 border-y border-sky-200/15">
              <div>
                <p className="font-mono text-lg font-semibold text-sky-300 tabular-nums">
                  03 questões
                </p>
                <p className="font-display text-base font-medium text-slate-100 mt-0.5">
                  Galáxias e Via Láctea
                </p>
                <p className="text-xs text-sky-100/70 mt-1">
                  O que é uma galáxia, formato da Via Láctea e onde fica o Sistema Solar.
                </p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold text-indigo-300 tabular-nums">
                  03 questões
                </p>
                <p className="font-display text-base font-medium text-slate-100 mt-0.5">
                  Organização do Universo
                </p>
                <p className="text-xs text-sky-100/70 mt-1">
                  Ordem do menor para o maior, nossa vizinha Andrômeda e Laniakea.
                </p>
              </div>
              <div>
                <p className="font-mono text-lg font-semibold text-amber-300 tabular-nums">
                  04 questões
                </p>
                <p className="font-display text-base font-medium text-slate-100 mt-0.5">
                  Medidas Astronômicas
                </p>
                <p className="text-xs text-sky-100/70 mt-1">
                  O que é Unidade Astronômica, quando usar UA, o que mede o ano-luz e o parsec.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-sky-100/75 space-y-1">
                <p className="font-medium text-slate-100">Patentes alcançáveis:</p>
                <p>
                  Cadete Espacial · Navegador Estelar · Comandante Galáctico · Astrofísico Mestre
                </p>
              </div>

              <button
                type="button"
                onClick={() => startExpedition(false)}
                className="liquid-btn-primary rounded-2xl px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-50 inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                <span>Iniciar Expedição</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= PHASE 2: ACTIVE QUIZ ================= */}
        {phase === 'playing' && currentQuestion && (
          <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Progress Bar, Score & Streak Header */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                <span className="font-mono font-medium text-sky-300 tabular-nums">
                  Pergunta {currentIndex + 1} de {deck.length}
                </span>

                <div className="flex items-center gap-4 font-mono tabular-nums">
                  <span className="text-emerald-300">
                    Acertos: <strong>{score}</strong>
                  </span>
                  <span className="text-amber-300 inline-flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Sequência: {streak}</span>
                  </span>
                </div>
              </div>

              <div
                role="progressbar"
                aria-valuenow={currentIndex + 1}
                aria-valuemin={1}
                aria-valuemax={deck.length}
                className="h-2 rounded-full bg-[#040814]/70 border border-sky-200/15 overflow-hidden"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-300 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Content */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-medium text-sky-300/85">{currentQuestion.category}</p>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-slate-50 leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            {/* 4 Multiple Choice Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isThisSelected = selectedOption === idx;
                const isThisCorrect = idx === currentQuestion.correctIndex;

                let stateClasses =
                  'liquid-glass-subtle hover:border-sky-300/45 text-sky-100/90 cursor-pointer';
                if (isAnswered) {
                  if (isThisCorrect) {
                    stateClasses =
                      'bg-emerald-500/20 border border-emerald-400/75 text-emerald-50 shadow-[0_0_24px_-8px_rgba(16,185,129,0.5)] cursor-default';
                  } else if (isThisSelected && !isThisCorrect) {
                    stateClasses =
                      'bg-rose-500/20 border border-rose-400/75 text-rose-50 shadow-[0_0_24px_-8px_rgba(244,63,94,0.45)] cursor-default';
                  } else {
                    stateClasses =
                      'bg-[#040814]/35 border border-sky-200/10 text-sky-100/45 cursor-default';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left rounded-2xl px-4 sm:px-5 py-4 flex items-center justify-between gap-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${stateClasses}`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <span
                        className={`font-mono text-xs font-semibold w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isAnswered && isThisCorrect
                            ? 'bg-emerald-400/25 text-emerald-200 border border-emerald-300/50'
                            : isAnswered && isThisSelected && !isThisCorrect
                            ? 'bg-rose-400/25 text-rose-200 border border-rose-300/50'
                            : 'bg-sky-950/65 text-sky-300 border border-sky-200/15'
                        }`}
                      >
                        {OPTION_LETTERS[idx]}
                      </span>
                      <span className="text-sm sm:text-base leading-relaxed">{option}</span>
                    </div>

                    {isAnswered && isThisCorrect && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 shrink-0">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Correta</span>
                      </span>
                    )}
                    {isAnswered && isThisSelected && !isThisCorrect && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 shrink-0">
                        <XCircle className="w-4 h-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Incorreta</span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mandatory Educational Feedback Liquid Glass Card */}
            {isAnswered && (
              <div
                aria-live="polite"
                className={`rounded-2xl p-5 sm:p-6 space-y-4 backdrop-blur-2xl border ${
                  isCurrentCorrect
                    ? 'bg-emerald-950/35 border-emerald-400/45'
                    : 'bg-rose-950/30 border-rose-400/45'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCurrentCorrect ? (
                    <CheckCircle2
                      className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle
                      className="w-5 h-5 text-rose-300 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  )}
                  <div className="space-y-1.5">
                    <p
                      className={`font-display text-base font-semibold ${
                        isCurrentCorrect ? 'text-emerald-200' : 'text-rose-200'
                      }`}
                    >
                      {isCurrentCorrect
                        ? 'Resposta correta!'
                        : 'Quase lá — confira a resposta correta:'}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-100 font-medium">
                      Resposta correta:{' '}
                      <span className="text-emerald-300">
                        {OPTION_LETTERS[currentQuestion.correctIndex]}) {currentQuestion.options[currentQuestion.correctIndex]}
                      </span>
                    </p>
                    <p className="text-sm text-sky-100/85 leading-relaxed pt-1">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="liquid-btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-50 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                  >
                    <span>
                      {currentIndex + 1 < deck.length
                        ? 'Próxima Pergunta'
                        : 'Ver Resultado Final'}
                    </span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= PHASE 3: FINAL RESULTS SCREEN ================= */}
        {phase === 'finished' && (
          <div className="liquid-glass rounded-3xl p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-sky-200/15">
              <div className="space-y-2">
                <p className="text-xs font-medium text-sky-300/90 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>Patente Conquistada</span>
                </p>
                <h3 className={`font-display text-3xl sm:text-4xl font-semibold ${rank.accentClass}`}>
                  {rank.title}
                </h3>
                <p className="text-sm text-sky-100/80 max-w-xl leading-relaxed">
                  {rank.description}
                </p>
              </div>

              <div className="rounded-2xl bg-[#040814]/55 border border-sky-200/20 px-6 py-5 text-center shrink-0">
                <p className="text-xs text-sky-200/70">Pontuação Final</p>
                <p className="font-mono text-4xl font-semibold text-slate-50 tabular-nums mt-1">
                  {score}
                  <span className="text-xl text-sky-200/60">/{deck.length}</span>
                </p>
                <p className="font-mono text-sm text-sky-300 tabular-nums mt-1">
                  {percentage}% de acerto
                </p>
              </div>
            </div>

            {/* Performance Breakdown by Category + Best Streak */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(Object.keys(categoryStats) as QuizCategory[]).map((cat) => {
                const stat = categoryStats[cat];
                return (
                  <div
                    key={cat}
                    className="rounded-2xl bg-[#040814]/45 border border-sky-200/12 p-4 space-y-1"
                  >
                    <p className="text-xs text-sky-200/70">{cat}</p>
                    <p className="font-mono text-xl font-semibold text-slate-100 tabular-nums">
                      {stat.correct}/{stat.total}
                    </p>
                  </div>
                );
              })}

              <div className="rounded-2xl bg-[#040814]/45 border border-amber-300/20 p-4 space-y-1">
                <p className="text-xs text-amber-200/80 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                  <span>Maior Sequência</span>
                </p>
                <p className="font-mono text-xl font-semibold text-amber-300 tabular-nums">
                  {bestStreak} {bestStreak === 1 ? 'acerto' : 'acertos'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-xs text-sky-200/70">
                Ao jogar novamente, a ordem das 10 perguntas e das alternativas será embaralhada.
              </p>

              <button
                type="button"
                onClick={() => startExpedition(true)}
                className="liquid-btn-primary rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-50 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Jogar Novamente</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
