import { useEffect, useRef } from 'react';
import { ShahinPortrait } from './ShahinPortrait';
import { ShahinAvatar } from './ShahinAvatar';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

export function AboutPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-portrait-wrap',
        { x: -25, opacity: 0.3 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: '.about-portrait-wrap',
            start: 'top 88%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );

      gsap.fromTo(
        '.about-copy-wrap',
        { x: 25, opacity: 0.3 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: '.about-copy-wrap',
            start: 'top 88%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );

      gsap.fromTo(
        '.about-cred-card',
        { y: 20, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: '.about-copy-wrap',
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 sm:py-36 lg:py-44 scroll-mt-28" aria-labelledby="about-preview-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-6 mb-16 sm:mb-24 lg:mb-28">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            08 · About
          </div>

          <h2
            id="about-preview-heading"
            className="font-display font-bold text-3xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.04em] text-[var(--ink)] max-w-[950px]"
            style={{ textWrap: 'balance' }}
          >
            Okay. Who's actually{' '}
            <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--ink)] text-[var(--paper)] overflow-hidden shadow-sm">
              <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </span>{' '}
            behind the work?
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-24 items-center">
          {/* Real Portrait with caption (Shahin Alam · Product Designer) */}
          <div className="about-portrait-wrap w-full max-w-[460px] mx-auto lg:mx-0">
            <ShahinPortrait />
          </div>

          {/* Copy & Credentials */}
          <div className="about-copy-wrap flex flex-col">
            <div className="flex items-center gap-3.5 mb-5">
              <ShahinAvatar className="w-11 h-11" />
              <div>
                <b className="font-display font-bold text-xl block text-[var(--ink)]">Shahin Alam</b>
                <span className="text-xs sm:text-sm font-semibold text-[var(--mute)]">Product Designer</span>
              </div>
            </div>

            <p className="font-display font-semibold text-2xl sm:text-4xl leading-[1.1] tracking-tight text-[var(--ink)] mb-8">
              I turn complicated product problems into simpler, high-performing digital experiences.
            </p>

            <div className="about-creds-grid grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="about-cred-card bg-[var(--card)] border border-[var(--line)] p-4 sm:p-5 rounded-2xl shadow-sm">
                <small className="block font-bold text-xs text-[var(--mute)] mb-2">Design</small>
                <p className="font-display font-semibold text-base sm:text-lg tracking-tight leading-snug">
                  UI / UX & Product Design
                </p>
              </div>

              <div className="about-cred-card bg-[var(--card)] border border-[var(--line)] p-4 sm:p-5 rounded-2xl shadow-sm">
                <small className="block font-bold text-xs text-[var(--mute)] mb-2">Engineering</small>
                <p className="font-display font-semibold text-base sm:text-lg tracking-tight leading-snug">
                  CSE background + Frontend fluency
                </p>
              </div>

              <div className="about-cred-card bg-[var(--card)] border border-[var(--line)] p-4 sm:p-5 rounded-2xl shadow-sm">
                <small className="block font-bold text-xs text-[var(--mute)] mb-2">Approach</small>
                <p className="font-display font-semibold text-base sm:text-lg tracking-tight leading-snug">
                  Evidence → Prototype → Ship
                </p>
              </div>
            </div>

            <a
              href="#/about"
              className="inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] py-2.5 pl-6 pr-2.5 text-base font-bold rounded-full hover:opacity-95 transition-all self-start group no-underline shadow-md"
            >
              <span>Get to know me</span>
              <span className="w-8 h-8 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-base font-bold group-hover:rotate-[-45deg] transition-transform duration-200">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
