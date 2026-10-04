import { useEffect, useRef } from 'react';
import { useProjects } from '../context/ProjectsContext';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';
import { ShahinAvatar } from './ShahinAvatar';

interface ProblemCasesProps {
  highlightedCaseId?: number | null;
}

export function ProblemCases({ highlightedCaseId }: ProblemCasesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { projectList, isAdmin } = useProjects();
  const caseList = projectList.slice(0, 5); // Show up to 5 cases on homepage stack

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.case-card-item');
      cards.forEach((card) => {
        // Entrance reveal for each card
        gsap.fromTo(
          card,
          { y: 40, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
            clearProps: 'all',
            lazy: false,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
              fastScrollEnd: true,
            },
          }
        );

        // Subtle parallax drift on the mockup inside each card
        const preview = card.querySelector('.case-preview-container');
        if (preview) {
          gsap.to(preview, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [caseList.length]);

  return (
    <section ref={containerRef} id="work" className="py-24 sm:py-36 lg:py-44" aria-labelledby="work-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-6 mb-16 sm:mb-24 lg:mb-28">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            03 · Work, sorted by problem
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="work-heading"
              className="font-display font-bold text-3xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.04em] text-[var(--ink)] max-w-[900px]"
              style={{ textWrap: 'balance' }}
            >
              Different problems.{' '}
              <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--lime)] text-[var(--lime-ink)] overflow-hidden shadow-sm">
                <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>{' '}
              Different solutions.
            </h2>
            <div className="flex flex-wrap items-center gap-2.5 self-start shrink-0">
              {isAdmin && (
                <a
                  href="#/manage"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-sm hover:opacity-90 transition-all shadow-sm no-underline"
                >
                  <span className="text-base leading-none">+</span>
                  <span>Add Case Study</span>
                </a>
              )}
              <a
                href="#/work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--ink)] text-[var(--ink)] font-semibold text-sm hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors no-underline"
              >
                <span>View all work</span>
                <span className="w-6 h-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-xs font-bold">
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 max-w-[540px] sm:ml-20 mt-6 sm:mt-10 lg:mt-14">
            <ShahinAvatar className="w-10 h-10" />
            <p className="bg-[var(--card)] border border-[var(--line)] rounded-2xl rounded-bl-sm py-2.5 px-4 text-sm text-[var(--ink)] shadow-[var(--shadow)]">
              Every project starts with what wasn't working, not what got built.
            </p>
          </div>
        </div>

        {/* Stacked Case Studies */}
        <div className="flex flex-col gap-12 sm:gap-20 lg:gap-28">
          {caseList.map((c, index) => {
            const isHighlighted = highlightedCaseId === c.id;

            // Background theme classes
            const bgClass =
              c.themeClass === 'c1'
                ? 'bg-[var(--panel)] text-[var(--on-panel)] border border-[var(--panel-line)]'
                : c.themeClass === 'c2'
                ? 'bg-[var(--lime)] text-[var(--lime-ink)] shadow-md'
                : 'bg-[var(--sun)] text-[#101114] shadow-md';

            const buttonClass =
              c.themeClass === 'c1'
                ? 'bg-[var(--lime)] text-[var(--lime-ink)] border-[var(--lime)]'
                : 'bg-[#101114] text-[#F5F5F2] border-[#101114]';

            const buttonArrowClass =
              c.themeClass === 'c1'
                ? 'bg-[var(--lime-ink)] text-[var(--lime)]'
                : 'bg-[var(--lime)] text-[#101114]';

            return (
              <article
                key={c.id}
                id={`case${c.id}`}
                className={`case-card-item rounded-3xl sm:rounded-[44px] p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-14 items-center transition-all duration-300 ${bgClass} ${
                  isHighlighted ? 'ring-4 ring-[var(--paper)] ring-offset-4 ring-offset-[var(--ink)] shadow-2xl' : ''
                }`}
                style={{
                  top: `calc(96px + ${index * 14}px)`,
                }}
              >
                {/* Content Column */}
                <div className="flex flex-col">
                  <span className="inline-flex self-start py-1.5 px-3.5 rounded-full border border-current font-bold text-xs opacity-90 mb-4">
                    {c.tag}
                  </span>

                  <h3
                    className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05] mb-6"
                    style={{ textWrap: 'balance' }}
                  >
                    "{c.headlineQuote}"
                  </h3>

                  <dl className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-2.5 text-sm sm:text-base mb-8">
                    <dt className="opacity-60 font-semibold">Problem</dt>
                    <dd className="m-0 font-medium">{c.problem}</dd>
                    <dt className="opacity-60 font-semibold">Context</dt>
                    <dd className="m-0 font-medium">{c.context}</dd>
                    <dt className="opacity-60 font-semibold">Outcome</dt>
                    <dd className="m-0 font-medium">{c.outcome}</dd>
                  </dl>

                  <a
                    href={`#/case/${c.id}`}
                    className={`inline-flex items-center gap-3 border py-2.5 pl-6 pr-2.5 text-sm sm:text-base font-bold rounded-full hover:opacity-90 transition-all self-start group no-underline ${buttonClass}`}
                  >
                    <span>Explore the problem</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-bold group-hover:rotate-[-45deg] transition-transform duration-200 ${buttonArrowClass}`}>
                      →
                    </span>
                  </a>
                </div>

                {/* Simulated Visual UI Preview */}
                <div className="case-preview-container relative grid place-items-center w-full" aria-hidden="true">
                  {c.id === 1 && (
                    <div className="w-full bg-[var(--card)] dark:bg-[#20232D] text-[var(--ink)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--line)] dark:border-white/10 text-xs">
                      {/* Window Topbar */}
                      <div className="flex items-center gap-1.5 py-2.5 px-3.5 border-b border-[var(--line)] dark:border-white/10 bg-[var(--card)] dark:bg-[#20232D]">
                        <i className="w-2.5 h-2.5 rounded-full bg-red-400"></i>
                        <i className="w-2.5 h-2.5 rounded-full bg-yellow-400"></i>
                        <i className="w-2.5 h-2.5 rounded-full bg-green-400"></i>
                        <em className="ml-auto not-italic text-[11px] text-[var(--mute)]">app / overview</em>
                      </div>
                      {/* App Layout */}
                      <div className="grid grid-cols-[80px_1fr] min-h-[220px]">
                        <div className="border-r border-[var(--line)] dark:border-white/10 p-3 flex flex-col gap-2 bg-[var(--soft)]/50 dark:bg-[#181B22]">
                          <div className="h-2 bg-[var(--ink)]/15 rounded w-full"></div>
                          <div className="h-2 bg-[var(--ink)]/15 rounded w-4/5"></div>
                          <div className="h-2 bg-[var(--ink)]/15 rounded w-3/5"></div>
                          <div className="h-2 bg-[var(--ink)]/15 rounded w-4/5 mt-4"></div>
                        </div>
                        <div className="p-4 flex flex-col gap-2.5">
                          <div className="flex gap-2">
                            <span className="py-1 px-2.5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-[10px]">
                              Start here
                            </span>
                            <span className="py-1 px-2.5 rounded-full bg-[var(--soft)] font-medium text-[10px]">
                              Reports
                            </span>
                          </div>
                          <div className="font-display font-bold text-base sm:text-lg leading-tight">
                            Your next step: connect an account
                          </div>
                          <div className="h-2 bg-[var(--ink)]/15 rounded w-4/5"></div>
                          <div className="h-2 bg-[var(--ink)]/15 rounded w-3/5"></div>
                          <div className="flex gap-2 mt-2">
                            <div className="flex-1 bg-[var(--soft)] h-12 rounded-xl p-2 flex flex-col justify-center">
                              <span className="font-bold text-[11px]">Primary Bank</span>
                              <span className="text-[10px] text-[var(--mute)]">Ready to link</span>
                            </div>
                            <div className="flex-1 bg-[var(--soft)]/50 h-12 rounded-xl p-2 flex flex-col justify-center">
                              <span className="font-bold text-[11px] opacity-60">Treasury</span>
                              <span className="text-[10px] text-[var(--mute)]">Optional step</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {c.id === 2 && (
                    <div className="w-full bg-[var(--card)] text-[var(--ink)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--line)] text-xs">
                      {/* Window Topbar */}
                      <div className="flex items-center gap-1.5 py-2.5 px-3.5 border-b border-[var(--line)]">
                        <i className="w-2.5 h-2.5 rounded-full bg-[var(--soft)]"></i>
                        <i className="w-2.5 h-2.5 rounded-full bg-[var(--soft)]"></i>
                        <i className="w-2.5 h-2.5 rounded-full bg-[var(--soft)]"></i>
                        <em className="ml-auto not-italic text-[11px] text-[var(--mute)]">site / home</em>
                      </div>
                      <div className="p-5 sm:p-6 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <div className="h-2 bg-[var(--ink)]/20 rounded w-16"></div>
                          <div className="h-2 bg-[var(--ink)]/15 rounded w-28"></div>
                        </div>
                        <div className="font-display font-bold text-2xl sm:text-3xl leading-[1.0] tracking-tight mt-3 max-w-[320px]">
                          One clear promise, one clear action.
                        </div>
                        <div className="h-2 bg-[var(--ink)]/15 rounded w-3/5"></div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="py-2 px-4 rounded-full bg-[var(--ink)] text-[var(--paper)] font-bold text-xs">
                            Book a demo
                          </span>
                          <span className="text-xs underline font-medium">See pricing</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[var(--line)]">
                          <div className="bg-[var(--soft)] h-12 rounded-xl flex items-center justify-center font-bold text-[11px]">
                            Acme Corp
                          </div>
                          <div className="bg-[var(--soft)] h-12 rounded-xl flex items-center justify-center font-bold text-[11px]">
                            Stripe
                          </div>
                          <div className="bg-[var(--soft)] h-12 rounded-xl flex items-center justify-center font-bold text-[11px]">
                            Linear
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {c.id === 3 && (
                    <div className="flex items-center justify-center gap-3 sm:gap-6 w-full py-4">
                      {/* Old flow: 6 steps */}
                      <div className="w-[45%] max-w-[190px] aspect-[9/16] border-2 border-[#101114]/70 rounded-3xl bg-[var(--card)] text-[var(--ink)] p-3 sm:p-4 flex flex-col gap-2 text-[11px] opacity-70 -rotate-3 shadow-md">
                        <div className="flex gap-1">
                          <i className="flex-1 h-1 bg-[var(--ink)] rounded"></i>
                          <i className="flex-1 h-1 bg-[var(--ink)] rounded"></i>
                          <i className="flex-1 h-1 bg-[var(--soft)] rounded"></i>
                          <i className="flex-1 h-1 bg-[var(--soft)] rounded"></i>
                          <i className="flex-1 h-1 bg-[var(--soft)] rounded"></i>
                          <i className="flex-1 h-1 bg-[var(--soft)] rounded"></i>
                        </div>
                        <span className="font-bold text-[10px]">Step 2 of 6</span>
                        <div className="h-1.5 bg-[var(--ink)]/20 rounded w-full"></div>
                        <div className="h-1.5 bg-[var(--ink)]/15 rounded w-4/5"></div>
                        <div className="h-1.5 bg-[var(--ink)]/15 rounded w-full"></div>
                        <div className="h-1.5 bg-[var(--ink)]/15 rounded w-3/5"></div>
                        <div className="h-1.5 bg-[var(--ink)]/15 rounded w-full mt-2"></div>
                      </div>

                      <span className="font-hand font-bold text-3xl sm:text-4xl text-[#101114]">→</span>

                      {/* New flow: 2 stages */}
                      <div className="w-[48%] max-w-[210px] aspect-[9/16] border-2 border-[#101114] rounded-3xl bg-[var(--card)] text-[var(--ink)] p-3 sm:p-4 flex flex-col gap-2.5 text-[11px] shadow-2xl">
                        <div className="flex gap-1.5">
                          <i className="flex-1 h-1.5 bg-[var(--ink)] rounded"></i>
                          <i className="flex-1 h-1.5 bg-[var(--soft)] rounded"></i>
                        </div>
                        <span className="font-bold text-[10px] text-[var(--mute)]">Stage 1 of 2</span>
                        <div className="font-display font-bold text-sm sm:text-base leading-tight">
                          Just the essentials
                        </div>
                        <div className="h-1.5 bg-[var(--ink)]/20 rounded w-full"></div>
                        <div className="h-1.5 bg-[var(--ink)]/15 rounded w-4/5"></div>
                        <div className="mt-auto py-2 rounded-full bg-[#101114] text-[#F5F5F2] text-center font-bold text-xs">
                          Continue
                        </div>
                      </div>
                    </div>
                  )}

                  {c.id > 3 && (
                    <div className="w-full bg-[var(--card)] text-[var(--ink)] rounded-2xl p-5 sm:p-7 shadow-2xl border border-[var(--line)] flex flex-col gap-4">
                      <div className="flex justify-between items-center pb-3 border-b border-[var(--line)]">
                        <span className="font-bold text-xs uppercase tracking-wider text-[var(--mute)]">
                          {c.categoryLabel}
                        </span>
                        <span className="py-1 px-3 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-xs">
                          {c.timeline}
                        </span>
                      </div>
                      <div className="font-display font-bold text-lg sm:text-xl text-[var(--ink)] leading-snug">
                        {c.lead}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-3 bg-[var(--soft)]/60 rounded-xl">
                          <span className="font-bold block text-[var(--mute)] mb-1">Role:</span>
                          <span className="font-medium truncate block">{c.role}</span>
                        </div>
                        <div className="p-3 bg-[var(--soft)]/60 rounded-xl">
                          <span className="font-bold block text-[var(--mute)] mb-1">Tools:</span>
                          <span className="font-medium truncate block">{c.tools?.join(', ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 p-2.5 rounded-xl">
                        <span>✓</span>
                        <span className="line-clamp-1">{c.outcome}</span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="text-xs text-[var(--mute)] mt-6 text-center sm:text-left">
          Interactive case study concepts showcasing problem decomposition, information architecture, and outcomes.
        </p>
      </div>
    </section>
  );
}
