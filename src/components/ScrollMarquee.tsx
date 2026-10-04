import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

export function ScrollMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !trackRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-8 sm:py-12 bg-[var(--panel)] text-[var(--on-panel)] overflow-hidden border-y border-[var(--panel-line)] select-none my-20 sm:my-32 lg:my-40"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight uppercase"
      >
        <span className="flex items-center gap-6 px-4">
          <span>Evidence Over Guesswork</span>
          <span className="w-3 h-3 rounded-full bg-[var(--lime)] inline-block"></span>
          <span className="text-[var(--lime)]">High-Converting User Journeys</span>
          <span className="w-3 h-3 rounded-full bg-[var(--lime)] inline-block"></span>
          <span>Zero Fluff</span>
          <span className="w-3 h-3 rounded-full bg-[var(--lime)] inline-block"></span>
          <span className="text-[var(--sun)]">First-Principles Product Design</span>
          <span className="w-3 h-3 rounded-full bg-[var(--lime)] inline-block"></span>
          <span>Friction Found & Destroyed</span>
          <span className="w-3 h-3 rounded-full bg-[var(--lime)] inline-block"></span>
          <span>Evidence Over Guesswork</span>
          <span className="w-3 h-3 rounded-full bg-[var(--lime)] inline-block"></span>
          <span className="text-[var(--lime)]">High-Converting User Journeys</span>
          <span className="w-3 h-3 rounded-full bg-[var(--lime)] inline-block"></span>
          <span>Zero Fluff</span>
          <span className="w-3 h-3 rounded-full bg-[var(--lime)] inline-block"></span>
          <span className="text-[var(--sun)]">First-Principles Product Design</span>
          <span className="w-3 h-3 rounded-full bg-[var(--lime)] inline-block"></span>
        </span>
      </div>
    </div>
  );
}
