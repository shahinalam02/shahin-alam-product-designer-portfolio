import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

export function ProofSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: 'Products & Platforms Designed', count: 18, suffix: '+', note: 'Fintech, SaaS & Mobile apps' },
    { label: 'Design Explorations', count: 120, suffix: '+', note: 'Tested & refined iterations' },
    { label: 'Deep Case Studies', count: 3, suffix: '', isZeroPadded: true, note: 'Documented with real evidence' },
    { label: 'Usability Test Sessions', count: 85, suffix: '+', note: 'Real user observations' },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Stagger counter cards entrance
      gsap.from('.stat-card', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });

      // 2. Animate each counter number
      const numElements = gsap.utils.toArray<HTMLElement>('.stat-number');
      numElements.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const isZeroPadded = el.getAttribute('data-padded') === 'true';
        const suffix = el.getAttribute('data-suffix') || '';

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            const current = Math.floor(obj.val);
            const formatted = isZeroPadded && current < 10 ? `0${current}` : `${current}`;
            el.textContent = `${formatted}${suffix}`;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 sm:py-20" aria-labelledby="proof-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            11 · Evidence
          </div>

          <h2
            id="proof-heading"
            className="font-display font-bold text-3xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.04em] text-[var(--ink)] max-w-[850px]"
            style={{ textWrap: 'balance' }}
          >
            Show me the{' '}
            <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--lime)] text-[var(--lime-ink)] overflow-hidden shadow-sm">
              <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>{' '}
            evidence.
          </h2>
        </div>

        {/* 4 Counter Cards */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className={`stat-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[190px] sm:min-h-[220px] border ${
                idx === 0
                  ? 'bg-[var(--lime)] text-[var(--lime-ink)] border-[var(--lime)] shadow-md'
                  : 'bg-[var(--card)] text-[var(--ink)] border-[var(--line)]'
              }`}
            >
              <span className="font-bold text-xs sm:text-sm">{s.label}</span>
              <div>
                <b
                  data-target={s.count}
                  data-suffix={s.suffix}
                  data-padded={s.isZeroPadded ? 'true' : 'false'}
                  className="stat-number font-display font-bold text-5xl sm:text-7xl lg:text-8xl tracking-[-0.06em] block leading-none my-1 tabular-nums"
                >
                  {s.isZeroPadded ? `0${s.count}` : s.count}{s.suffix}
                </b>
                <em className="not-italic text-xs opacity-65 font-medium block">{s.note}</em>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Logs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* What each case shows */}
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-10 shadow-sm">
            <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-5">
              What each case study shows
            </h3>
            <ul className="flex flex-col m-0 p-0 list-none">
              <li className="py-4 border-t border-[var(--line)] flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <b className="font-bold block text-sm sm:text-base">Before and after</b>
                  <span className="text-xs sm:text-sm text-[var(--mute)]">
                    The exact screens side by side with interactive comparison sliders.
                  </span>
                </div>
              </li>
              <li className="py-4 border-t border-[var(--line)] flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <b className="font-bold block text-sm sm:text-base">Design decisions & trade-offs</b>
                  <span className="text-xs sm:text-sm text-[var(--mute)]">
                    What was altered, what was deliberately sacrificed, and why.
                  </span>
                </div>
              </li>
              <li className="py-4 border-t border-[var(--line)] flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <b className="font-bold block text-sm sm:text-base">User feedback & observation data</b>
                  <span className="text-xs sm:text-sm text-[var(--mute)]">
                    Direct quotes, hesitation points, and drop-off metrics where measured.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* What I won't do */}
          <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-10 shadow-sm">
            <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-5">
              What I won't do
            </h3>
            <ul className="flex flex-col m-0 p-0 list-none">
              <li className="py-4 border-t border-[var(--line)] flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[var(--soft)] text-[var(--ink)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ×
                </span>
                <div>
                  <b className="font-bold block text-sm sm:text-base">Invent fake client metrics</b>
                  <span className="text-xs sm:text-sm text-[var(--mute)]">
                    No made-up "340% ROI in 2 weeks" fluff. Numbers only appear when legitimately tracked.
                  </span>
                </div>
              </li>
              <li className="py-4 border-t border-[var(--line)] flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[var(--soft)] text-[var(--ink)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ×
                </span>
                <div>
                  <b className="font-bold block text-sm sm:text-base">Hide the messy parts</b>
                  <span className="text-xs sm:text-sm text-[var(--mute)]">
                    Rejected iterations, architectural dead-ends, and pivots are documented openly.
                  </span>
                </div>
              </li>
              <li className="py-4 border-t border-[var(--line)] flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-[var(--soft)] text-[var(--ink)] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ×
                </span>
                <div>
                  <b className="font-bold block text-sm sm:text-base">Design unbuildable concepts</b>
                  <span className="text-xs sm:text-sm text-[var(--mute)]">
                    Every flow respects browser performance, edge states, and developer realities.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
