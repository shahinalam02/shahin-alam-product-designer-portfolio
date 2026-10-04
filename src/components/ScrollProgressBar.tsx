import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.15,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[4px] z-[60] pointer-events-none bg-black/10 dark:bg-white/5">
      <div
        ref={barRef}
        className="h-full bg-[var(--lime)] shadow-[0_0_12px_var(--lime)] origin-left scale-x-0"
      />
    </div>
  );
}
