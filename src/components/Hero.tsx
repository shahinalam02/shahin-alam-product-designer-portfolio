import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRowRef = useRef<HTMLDivElement>(null);
  const claimRef = useRef<HTMLParagraphElement>(null);
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [shahinCursor, setShahinCursor] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animId: number;
    const updatePhysics = () => {
      setShahinCursor((prev) => ({
        x: prev.x + (cursorPos.x + 60 - prev.x) * 0.08,
        y: prev.y + (cursorPos.y + 40 - prev.y) * 0.08,
      }));
      animId = requestAnimationFrame(updatePhysics);
    };
    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [cursorPos]);

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (headlineRef.current) {
        tl.from(headlineRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
        });
      }

      if (subRowRef.current) {
        tl.from(
          subRowRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        );
      }

      if (panelRef.current) {
        tl.from(
          panelRef.current,
          {
            scale: 0.95,
            y: 40,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.5'
        );
      }

      if (claimRef.current) {
        tl.from(
          claimRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        );
      }

      // 2. Active ScrollTrigger Parallax on clue fragments inside the panel
      if (panelRef.current) {
        gsap.to('.hero-frag-1', {
          y: -50,
          rotation: -4,
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 70%',
            end: 'bottom 10%',
            scrub: 1,
          },
        });

        gsap.to('.hero-frag-2', {
          y: 45,
          rotation: 4,
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 70%',
            end: 'bottom 10%',
            scrub: 1.2,
          },
        });

        gsap.to('.hero-frag-3', {
          y: -40,
          scale: 1.05,
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 70%',
            end: 'bottom 10%',
            scrub: 1,
          },
        });

        gsap.to('.hero-big-q', {
          y: 60,
          scale: 0.9,
          opacity: 0.02,
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top center',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setOffsets({ x: nx, y: ny });
    setCursorPos({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setOffsets({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <section ref={containerRef} className="pt-28 sm:pt-36 pb-12 sm:pb-20 relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main Headline */}
        <h1
          ref={headlineRef}
          id="hero-heading"
          className="font-display font-bold text-4xl sm:text-7xl lg:text-[110px] leading-[0.94] tracking-[-0.045em] text-[var(--ink)] max-w-[1150px]"
          style={{ textWrap: 'balance' }}
        >
          Something{' '}
          <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--lime)] text-[var(--lime-ink)] overflow-hidden shadow-sm">
            <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
              <path d="M5 3l14 7-6 2-2 6z" />
            </svg>
          </span>{' '}
          feels off with your{' '}
          <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--ink)] text-[var(--paper)] overflow-hidden shadow-sm">
            <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
              <path d="M4 18V9M10 18V5M16 18v-6M22 18v-3" />
            </svg>
          </span>{' '}
          product?
        </h1>

        {/* Subtitle & CTAs row */}
        <div ref={subRowRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 my-8 sm:my-10">
          <div className="max-w-[480px] text-lg sm:text-xl text-[var(--mute)] leading-relaxed">
            <p>Maybe users aren't converting.</p>
            <p>Maybe the experience feels complicated.</p>
            <p>Maybe your product simply isn't communicating its value.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#diagnosis"
              className="inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] py-2 pl-6 pr-2 text-base font-semibold rounded-full hover:opacity-95 transition-all group no-underline"
            >
              <span>Let's find the problem</span>
              <span className="w-9 h-9 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-lg font-bold group-hover:rotate-[-45deg] transition-transform duration-200">
                →
              </span>
            </a>
            <a
              href="#/work"
              className="inline-flex items-center justify-center px-6 py-3.5 border-1.5 border-[var(--ink)] text-[var(--ink)] font-semibold rounded-full hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors no-underline text-base"
            >
              See my work
            </a>
          </div>
        </div>

        {/* Interactive Clue Panel */}
        <div
          ref={panelRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-[var(--lime)] text-[var(--lime-ink)] rounded-3xl sm:rounded-[40px] h-[480px] sm:h-[580px] overflow-hidden p-6 sm:p-10 select-none shadow-[var(--shadow)]"
        >
          {/* Subtle watermark background */}
          <span
            className="hero-big-q absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] font-display font-extrabold text-[280px] sm:text-[460px] text-[#1011140e] pointer-events-none select-none"
            aria-hidden="true"
          >
            ?
          </span>

          {/* Handwritten Annotation */}
          <span className="hidden md:block absolute left-[44%] top-12 font-hand text-3xl font-bold -rotate-6 text-[var(--lime-ink)]">
            three clues →
          </span>

          {/* Fragment 1: Sign-ups drop */}
          <div
            className="hero-frag-1 hidden sm:block absolute left-[5%] top-[12%] w-[min(34%,340px)] bg-[#101114] text-[#F5F5F2] rounded-2xl p-5 shadow-2xl transition-transform duration-200 ease-out z-10"
            style={{
              transform: `translate(${offsets.x * 24}px, ${offsets.y * 24}px) rotate(${offsets.x * 3}deg)`,
            }}
          >
            <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-bold text-xs border-2 border-[var(--lime)] animate-ping-subtle">
              1
            </span>
            <div className="font-display font-bold text-sm sm:text-base">Sign-ups this week</div>
            <div className="flex items-end gap-1.5 h-20 mt-3">
              <i className="flex-1 bg-[var(--lime)] rounded-t-sm" style={{ height: '92%' }}></i>
              <i className="flex-1 bg-[var(--lime)] rounded-t-sm" style={{ height: '80%' }}></i>
              <i className="flex-1 bg-[var(--lime)] rounded-t-sm" style={{ height: '70%' }}></i>
              <i className="flex-1 bg-[var(--warn)] rounded-t-sm" style={{ height: '24%' }} title="Friction drop-off"></i>
              <i className="flex-1 bg-[var(--lime)]/50 rounded-t-sm" style={{ height: '30%' }}></i>
            </div>
            <div className="flex justify-between text-xs text-white/60 mt-2 font-medium">
              <span>Mon</span>
              <span className="text-[var(--warn)] font-bold">Fri (Drop-off)</span>
            </div>
          </div>

          {/* Fragment 2: Validation Error */}
          <div
            className="hero-frag-2 hidden sm:block absolute right-[6%] top-[10%] w-[min(28%,280px)] bg-[var(--card)] text-[var(--ink)] rounded-2xl p-4 sm:p-5 shadow-2xl transition-transform duration-200 ease-out z-10"
            style={{
              transform: `translate(${offsets.x * -18}px, ${offsets.y * -18}px) rotate(${offsets.x * -2}deg)`,
            }}
          >
            <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-bold text-xs border-2 border-[var(--lime)] animate-ping-subtle">
              2
            </span>
            <div className="font-display font-bold text-sm">Create account</div>
            <div className="border border-[var(--warn)] rounded-xl p-2.5 my-2 text-xs text-[var(--mute)] bg-red-50/50 dark:bg-red-950/20">
              user_name@domain
            </div>
            <div className="text-[var(--warn)] text-xs font-semibold">Enter a valid email address</div>
          </div>

          {/* Fragment 3: Confusing pricing */}
          <div
            className="hero-frag-3 hidden sm:block absolute left-[34%] bottom-[10%] w-[min(32%,320px)] bg-[var(--card)] text-[var(--ink)] rounded-2xl p-4 sm:p-5 shadow-2xl transition-transform duration-200 ease-out z-10"
            style={{
              transform: `translate(${offsets.x * 16}px, ${offsets.y * 16}px) rotate(${offsets.x * 1.5}deg)`,
            }}
          >
            <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-bold text-xs border-2 border-[var(--lime)] animate-ping-subtle">
              3
            </span>
            <div className="font-display font-bold text-sm">Which plan is for me?</div>
            <div className="flex gap-1.5 mt-3">
              <span className="flex-1 text-center py-2 px-1 rounded-lg bg-[var(--soft)] font-bold text-xs">Basic</span>
              <span className="flex-1 text-center py-2 px-1 rounded-lg bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-xs">Plus</span>
              <span className="flex-1 text-center py-2 px-1 rounded-lg bg-[var(--soft)] font-bold text-xs">Pro</span>
            </div>
          </div>

          {/* Fragment 4: Pill tag */}
          <div
            className="hidden sm:block absolute right-[8%] bottom-[12%] bg-[var(--ink)] text-[var(--paper)] px-5 py-3 rounded-full font-bold text-sm shadow-xl transition-transform duration-200 ease-out z-10"
            style={{
              transform: `translate(${offsets.x * -12}px, ${offsets.y * -12}px)`,
            }}
          >
            Spot the problem?
          </div>

          {/* Mobile Fallback: stacked cards inside the panel */}
          <div className="sm:hidden flex flex-col gap-3 relative z-10 justify-center h-full">
            <div className="bg-[#101114] text-[#F5F5F2] rounded-xl p-3 shadow-lg">
              <div className="font-display font-bold text-xs">1 · Sign-ups Drop</div>
              <div className="flex items-end gap-1 h-12 mt-1.5">
                <i className="flex-1 bg-[var(--lime)]" style={{ height: '80%' }}></i>
                <i className="flex-1 bg-[var(--lime)]" style={{ height: '90%' }}></i>
                <i className="flex-1 bg-[var(--warn)]" style={{ height: '30%' }}></i>
              </div>
            </div>
            <div className="bg-[var(--card)] text-[var(--ink)] rounded-xl p-3 shadow-lg">
              <div className="font-display font-bold text-xs">2 · Form Validation Failure</div>
              <div className="text-[var(--warn)] text-xs mt-1">"Enter a valid email"</div>
            </div>
            <div className="bg-[var(--ink)] text-[var(--paper)] px-4 py-2 rounded-full font-bold text-xs self-start">
              Spot the problem?
            </div>
          </div>
        </div>

        {/* Claim */}
        <p ref={claimRef} className="mt-8 font-display font-semibold text-xl sm:text-2xl tracking-tight text-[var(--ink)]">
          I don't start with Figma. <span className="text-[var(--mute)]">I start with the problem.</span>
        </p>
      </div>

      {/* Floating Interactive Desktop Cursors */}
      {isHovering && (
        <div className="hidden lg:block pointer-events-none fixed z-50">
          {/* Visitor Cursor */}
          <div
            className="fixed top-0 left-0 transition-opacity duration-300 pointer-events-none"
            style={{
              transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
            }}
          >
            <svg width="20" height="22" viewBox="0 0 20 22" className="drop-shadow-md">
              <path d="M2 2l15 8-6.5 2L8 19z" fill="#101114" stroke="#fff" strokeWidth="1.5" />
            </svg>
            <span className="absolute left-4 top-4 font-bold text-xs bg-[var(--ink)] text-[var(--paper)] py-0.5 px-2.5 rounded-full shadow-sm whitespace-nowrap">
              You
            </span>
          </div>

          {/* Shahin Chasing Cursor */}
          <div
            className="fixed top-0 left-0 transition-opacity duration-300 pointer-events-none"
            style={{
              transform: `translate(${shahinCursor.x}px, ${shahinCursor.y}px)`,
            }}
          >
            <svg width="20" height="22" viewBox="0 0 20 22" className="drop-shadow-md">
              <path d="M2 2l15 8-6.5 2L8 19z" fill="#C6F34F" stroke="#101114" strokeWidth="1.5" />
            </svg>
            <span className="absolute left-4 top-4 font-bold text-xs bg-[var(--lime)] text-[var(--lime-ink)] py-0.5 px-2.5 rounded-full border border-[var(--lime-ink)] shadow-sm whitespace-nowrap">
              Shahin
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
