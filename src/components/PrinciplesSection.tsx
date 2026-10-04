import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

export function PrinciplesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const principles = [
    {
      num: 1,
      title: "I question the brief.",
      desc: "If we're solving the wrong problem, I'll say so directly. Building the wrong feature beautifully is still a failure.",
    },
    {
      num: 2,
      title: "I design from evidence.",
      desc: "Every design decision must have a reason behind it: user observations, funnel analytics, or ergonomic constraints—never arbitrary aesthetics.",
    },
    {
      num: 3,
      title: "I think beyond the screen.",
      desc: "Good product design connects user emotions, business viability, and engineering feasibility. It survives contact with real developers and budgets.",
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.principle-card',
        { y: 25, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: containerRef.current || '.principles-grid',
            start: 'top 88%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 sm:py-36 lg:py-44" aria-labelledby="principles-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-[var(--lime)] text-[var(--lime-ink)] rounded-3xl sm:rounded-[48px] p-8 sm:p-16 lg:p-24 overflow-hidden shadow-2xl">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--paper)] text-[var(--ink)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide mb-8 sm:mb-10">
            <span className="w-2 h-2 rounded-full bg-[var(--lime-ink)] shadow-[0_0_0_1.5px_var(--lime)]"></span>
            06 · Fair warning
          </div>

          <h2
            id="principles-heading"
            className="font-display font-extrabold text-4xl sm:text-7xl lg:text-9xl leading-[0.88] tracking-[-0.055em] mb-6 sm:mb-8"
            style={{ textWrap: 'balance' }}
          >
            But don't hire me yet.
          </h2>

          <p className="font-display font-semibold text-xl sm:text-3xl tracking-tight max-w-[620px] mb-14 sm:mb-20">
            Before we work together, you should know how I think.
          </p>

          <div className="principles-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {principles.map((p) => (
              <div
                key={p.num}
                className="principle-card bg-[var(--card)] text-[var(--ink)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[260px] sm:min-h-[300px] hover:-translate-y-1.5 transition-transform duration-200 shadow-md"
              >
                <span className="w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-bold text-sm font-display">
                  {p.num}
                </span>

                <div className="mt-8">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
