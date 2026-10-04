import { useState, useEffect, useRef } from 'react';
import { DIAGNOSIS_OPTIONS } from '../data/portfolioData';
import { gsap, ScrollTrigger, refreshScrollTrigger } from '../utils/gsapSetup';
import { ShahinAvatar } from './ShahinAvatar';

interface QuickDiagnosisProps {
  onSelectCase?: (caseId: number) => void;
}

export function QuickDiagnosis({ onSelectCase }: QuickDiagnosisProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.diag-opt-btn',
        { y: 20, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: containerRef.current || '#diagnosis',
            start: 'top 90%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );

      gsap.fromTo(
        '.diag-output-card',
        { scale: 0.97, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: containerRef.current || '#diagnosis',
            start: 'top 90%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const selectedData = DIAGNOSIS_OPTIONS.find((item) => item.key === selectedKey);

  const handleSelect = (key: string, caseId: number) => {
    setSelectedKey(key);
    if (onSelectCase) {
      onSelectCase(caseId);
    }
    refreshScrollTrigger(120);
  };

  return (
    <section ref={containerRef} id="diagnosis" className="py-24 sm:py-36 lg:py-44" aria-labelledby="diag-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Question Header */}
        <div className="flex flex-col gap-6 mb-14 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            02 · Quick diagnosis
          </div>

          <h2
            id="diag-heading"
            className="font-display font-bold text-3xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.04em] text-[var(--ink)] max-w-[1050px]"
            style={{ textWrap: 'balance' }}
          >
            Before we talk, what's{' '}
            <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--sun)] text-[#101114] overflow-hidden shadow-sm">
              <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                <circle cx="11" cy="11" r="6" />
                <path d="M16 16l5 5" />
              </svg>
            </span>{' '}
            going wrong?
          </h2>

          <div className="flex items-center gap-3.5 max-w-[540px] sm:ml-20 mt-6 sm:mt-10 lg:mt-14">
            <ShahinAvatar className="w-10 h-10" />
            <p className="bg-[var(--card)] border border-[var(--line)] rounded-2xl rounded-bl-sm py-2.5 px-4 text-sm text-[var(--ink)] shadow-[var(--shadow)]">
              Pick the closest one. I'll point you to the work that matches.
            </p>
          </div>
        </div>

        {/* Diagnosis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 items-start">
          {/* Radio Options */}
          <div className="diag-opts-list flex flex-col gap-2.5" role="radiogroup" aria-label="What's going wrong?">
            {DIAGNOSIS_OPTIONS.map((item) => {
              const isChecked = selectedKey === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  role="radio"
                  aria-checked={isChecked}
                  onClick={() => handleSelect(item.key, item.caseId)}
                  className={`diag-opt-btn w-full flex items-center gap-4 py-4 px-5 sm:py-5 sm:px-6 rounded-2xl border text-left font-display font-semibold text-lg sm:text-2xl tracking-tight transition-all duration-200 cursor-pointer ${
                    isChecked
                      ? 'bg-[var(--lime)] text-[var(--lime-ink)] border-[var(--lime)] translate-x-2 shadow-[var(--shadow)]'
                      : 'bg-[var(--card)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--line2)] hover:translate-x-1'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isChecked ? 'bg-[var(--lime-ink)] border-[var(--lime-ink)] text-[var(--lime)]' : 'border-[var(--line2)]'
                    }`}
                  >
                    {isChecked && <span className="text-xs font-black">✓</span>}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Diagnostic Output */}
          <div
            className="diag-output-card lg:sticky lg:top-28 bg-[var(--panel)] text-[var(--on-panel)] rounded-3xl min-h-[340px] overflow-hidden flex flex-col border border-[var(--panel-line)] shadow-xl"
            aria-live="polite"
          >
            <div className="py-4 px-6 border-b border-[var(--panel-line)] flex items-center justify-between text-xs font-bold text-[var(--panel-mute)]">
              <span>Where to look first</span>
              <span>{selectedData ? selectedData.tag : 'Waiting for your answer'}</span>
            </div>

            {selectedData ? (
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <span className="font-hand text-2xl text-[var(--lime)] font-semibold">
                  you said: {selectedData.label.toLowerCase()}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-4xl leading-tight tracking-tight mt-2 mb-4 text-[var(--on-panel)]">
                  {selectedData.headline}
                </h3>
                <p className="text-[var(--panel-mute)] text-sm sm:text-base leading-relaxed mb-6 flex-1">
                  {selectedData.why}
                </p>
                <div className="mt-auto pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={selectedData.href || (selectedData.caseId > 0 ? `#/case/${selectedData.caseId}` : '#thinking')}
                    className="inline-flex items-center gap-3 bg-[var(--lime)] text-[var(--lime-ink)] border border-[var(--lime)] py-2.5 pl-6 pr-2.5 text-sm sm:text-base font-bold rounded-full hover:opacity-95 transition-all group no-underline"
                  >
                    <span>{selectedData.cta}</span>
                    <span className="w-8 h-8 rounded-full bg-[var(--lime-ink)] text-[var(--lime)] flex items-center justify-center text-base font-bold group-hover:rotate-[-45deg] transition-transform duration-200">
                      →
                    </span>
                  </a>

                  {selectedData.secondaryCta && selectedData.secondaryHref && (
                    <a
                      href={selectedData.secondaryHref}
                      className="py-2.5 px-5 rounded-full border border-[var(--panel-line)] text-[var(--on-panel)] font-bold text-xs sm:text-sm hover:bg-[var(--panel-line)] transition-colors no-underline"
                    >
                      {selectedData.secondaryCta}
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="m-auto p-8 text-center text-[var(--panel-mute)] max-w-sm">
                <span className="font-hand text-3xl text-[var(--lime)] block mb-2">pick one</span>
                <p className="text-sm">Choose what's closest and I'll prescribe the most relevant case study and solution approach.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
