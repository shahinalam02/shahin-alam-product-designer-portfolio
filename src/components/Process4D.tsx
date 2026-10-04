import { useState, useEffect, useRef } from 'react';
import { PROCESS_STAGES } from '../data/portfolioData';
import { gsap, ScrollTrigger, refreshScrollTrigger } from '../utils/gsapSetup';

export function Process4D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState<number>(0);

  const stage = PROCESS_STAGES[currentStage];
  // Circumference of radius 36 = 2 * pi * 36 ≈ 226.2
  const arcOffset = 226.2 * (1 - (currentStage + 1) / 4);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-wheel-container',
        { rotation: -20, scale: 0.92, opacity: 0.5 },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: containerRef.current || '.process-wheel-container',
            start: 'top 88%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );

      gsap.fromTo(
        '.process-node-btn',
        { scale: 0.5, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: 'back.out(2)',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: containerRef.current || '.process-wheel-container',
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const selectStage = (idx: number) => {
    setCurrentStage(idx);
    refreshScrollTrigger(100);
  };

  return (
    <section ref={containerRef} className="py-24 sm:py-36 lg:py-44" aria-labelledby="proc-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl sm:rounded-[48px] p-8 sm:p-16 lg:p-24 shadow-xl">
          {/* Header */}
          <div className="flex flex-col gap-6 mb-16 sm:mb-20 lg:mb-24">
            <div className="inline-flex items-center gap-2 self-start bg-[var(--soft)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
              09 · The 4D method
            </div>

            <h2
              id="proc-heading"
              className="font-display font-bold text-3xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.04em] text-[var(--ink)] max-w-[950px]"
              style={{ textWrap: 'balance' }}
            >
              How will we actually work{' '}
              <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--lime)] text-[var(--lime-ink)] overflow-hidden shadow-sm">
                <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                  <path d="M20 12a8 8 0 10-3 6.2M20 5v5h-5" />
                </svg>
              </span>{' '}
              together?
            </h2>
          </div>

          {/* Grid Layout: Wheel on left, Stage Details on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            {/* Interactive Circular Wheel */}
            <div className="process-wheel-container relative aspect-square max-w-[440px] w-full mx-auto select-none">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Background dotted ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  className="fill-none stroke-[var(--line2)] stroke-[0.8]"
                  strokeDasharray="2 3"
                />
                {/* Active progress arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  transform="rotate(-90 50 50)"
                  className="fill-none stroke-[var(--ink)] stroke-[2] transition-all duration-500 ease-out"
                  strokeDasharray="226.2"
                  strokeDashoffset={arcOffset}
                  strokeLinecap="round"
                />
              </svg>

              {/* 4 Interactive Nodes */}
              {/* 01 Discover (Top) */}
              <button
                type="button"
                onClick={() => selectStage(0)}
                aria-pressed={currentStage === 0}
                className={`process-node-btn absolute left-1/2 top-[14%] -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 aspect-square rounded-full font-display font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all cursor-pointer ${
                  currentStage === 0
                    ? 'bg-[var(--lime)] text-[var(--lime-ink)] scale-110 shadow-lg ring-2 ring-[var(--ink)]'
                    : 'bg-[var(--soft)] text-[var(--ink)] hover:scale-105'
                }`}
              >
                <span>Discover</span>
                <small className="font-body text-[10px] opacity-60">01</small>
              </button>

              {/* 02 Define (Right) */}
              <button
                type="button"
                onClick={() => selectStage(1)}
                aria-pressed={currentStage === 1}
                className={`process-node-btn absolute left-[86%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 aspect-square rounded-full font-display font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all cursor-pointer ${
                  currentStage === 1
                    ? 'bg-[var(--lime)] text-[var(--lime-ink)] scale-110 shadow-lg ring-2 ring-[var(--ink)]'
                    : 'bg-[var(--soft)] text-[var(--ink)] hover:scale-105'
                }`}
              >
                <span>Define</span>
                <small className="font-body text-[10px] opacity-60">02</small>
              </button>

              {/* 03 Design (Bottom) */}
              <button
                type="button"
                onClick={() => selectStage(2)}
                aria-pressed={currentStage === 2}
                className={`process-node-btn absolute left-1/2 top-[86%] -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 aspect-square rounded-full font-display font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all cursor-pointer ${
                  currentStage === 2
                    ? 'bg-[var(--lime)] text-[var(--lime-ink)] scale-110 shadow-lg ring-2 ring-[var(--ink)]'
                    : 'bg-[var(--soft)] text-[var(--ink)] hover:scale-105'
                }`}
              >
                <span>Design</span>
                <small className="font-body text-[10px] opacity-60">03</small>
              </button>

              {/* 04 Demonstrate (Left) */}
              <button
                type="button"
                onClick={() => selectStage(3)}
                aria-pressed={currentStage === 3}
                className={`process-node-btn absolute left-[14%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-24 aspect-square rounded-full font-display font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all cursor-pointer ${
                  currentStage === 3
                    ? 'bg-[var(--lime)] text-[var(--lime-ink)] scale-110 shadow-lg ring-2 ring-[var(--ink)]'
                    : 'bg-[var(--soft)] text-[var(--ink)] hover:scale-105'
                }`}
              >
                <span>Demonstrate</span>
                <small className="font-body text-[10px] opacity-60">04</small>
              </button>

              {/* Center Hub */}
              <div className="absolute inset-[30%] flex flex-col items-center justify-center text-center font-display font-bold text-lg sm:text-2xl tracking-tight pointer-events-none">
                <span>Iterate</span>
                <small className="font-body font-normal text-xs text-[var(--mute)]">
                  and back to Discover
                </small>
              </div>
            </div>

            {/* Stage Detail Pane */}
            <div className="flex flex-col min-h-[320px] justify-between" aria-live="polite">
              <div>
                <span className="font-hand font-semibold text-2xl text-[var(--mute)]">
                  stage 0{currentStage + 1} · {stage.name}
                </span>

                <h3 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight mt-1 mb-4 leading-tight">
                  {stage.question}
                </h3>

                <p className="text-base sm:text-lg text-[var(--mute)] leading-relaxed mb-6">
                  {stage.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {stage.deliverables.map((item) => (
                    <span
                      key={item}
                      className="py-1.5 px-3.5 rounded-full bg-[var(--soft)] text-xs sm:text-sm font-semibold text-[var(--ink)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stage Switcher Pills */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[var(--line)]">
                {PROCESS_STAGES.map((s, idx) => {
                  const isCur = currentStage === idx;
                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => selectStage(idx)}
                      aria-pressed={isCur}
                      className={`py-2 px-4 rounded-full text-xs sm:text-sm font-bold border transition-all ${
                        isCur
                          ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                          : 'border-[var(--line2)] text-[var(--ink)] hover:bg-[var(--soft)]'
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-[var(--line)]">
            <p className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--ink)] max-w-[850px]">
              Design isn't finished when the Figma file is finished.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
