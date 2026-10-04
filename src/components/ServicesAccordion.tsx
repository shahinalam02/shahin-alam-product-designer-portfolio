import { useState, useEffect, useRef } from 'react';
import { SERVICES } from '../data/portfolioData';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';
import { ShahinAvatar } from './ShahinAvatar';

export function ServicesAccordion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string>('product');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-accordion-item',
        { y: 25, opacity: 0.3 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: containerRef.current || '#services',
            start: 'top 92%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggle = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section ref={containerRef} id="services" className="py-12 sm:py-20" aria-labelledby="svc-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-6 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            10 · Services
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              id="svc-heading"
              className="font-display font-bold text-3xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.04em] text-[var(--ink)] max-w-[850px]"
              style={{ textWrap: 'balance' }}
            >
              What can we{' '}
              <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--sun)] text-[#101114] overflow-hidden shadow-sm">
                <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                  <path d="M14 7l3-3 3 3-3 3zM4 20l10-10 3 3L7 23z" />
                </svg>
              </span>{' '}
              build together?
            </h2>

            <a
              href="#/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--ink)] text-[var(--ink)] font-semibold text-sm hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors self-start shrink-0 no-underline"
            >
              <span>See all services</span>
              <span className="w-6 h-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-xs font-bold">
                →
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3.5 max-w-[480px] sm:ml-20">
            <ShahinAvatar className="w-10 h-10" />
            <p className="bg-[var(--card)] border border-[var(--line)] rounded-2xl rounded-bl-sm py-2.5 px-4 text-sm text-[var(--ink)] shadow-[var(--shadow)]">
              Pick one to see how I'd approach it from first principles.
            </p>
          </div>
        </div>

        {/* Accordion List */}
        <div className="svc-list-wrap flex flex-col gap-3">
          {SERVICES.map((s) => {
            const isOpen = openId === s.id;
            return (
              <div
                key={s.id}
                className={`svc-accordion-item rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] shadow-xl'
                    : 'bg-[var(--card)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--line2)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-expanded={isOpen}
                  className="w-full py-6 sm:py-8 px-6 sm:px-10 text-left flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <h3 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl tracking-tight transition-transform duration-200 group-hover:translate-x-2">
                    {s.title}
                  </h3>
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0 transition-transform ${
                      isOpen
                        ? 'bg-[var(--lime)] text-[var(--lime-ink)] rotate-45'
                        : 'bg-[var(--soft)] text-[var(--ink)]'
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-10 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center border-t border-white/10 pt-6 animate-fade">
                    <p className="text-lg sm:text-xl font-medium opacity-90 leading-relaxed max-w-md">
                      {s.lede}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {s.flow.map((step, idx) => (
                        <span key={step} className="flex items-center gap-2">
                          <span
                            className={`py-2 px-4 rounded-full text-xs sm:text-sm font-bold ${
                              idx === s.flow.length - 1
                                ? 'bg-[var(--lime)] text-[var(--lime-ink)]'
                                : 'bg-white/10 text-white'
                            }`}
                          >
                            {step}
                          </span>
                          {idx < s.flow.length - 1 && (
                            <span className="opacity-40 text-xs">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
