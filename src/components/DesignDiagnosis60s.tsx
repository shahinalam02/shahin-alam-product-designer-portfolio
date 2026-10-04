import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, refreshScrollTrigger } from '../utils/gsapSetup';
import { ShahinAvatar } from './ShahinAvatar';

export function DesignDiagnosis60s() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNote, setActiveNote] = useState<number>(0);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Animate card stage and hotspots
      gsap.fromTo(
        '.dd-stage-card',
        { scale: 0.97, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: containerRef.current || '#thinking',
            start: 'top 88%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );

      gsap.fromTo(
        '.dd-hotspot',
        { scale: 0 },
        {
          scale: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: 'back.out(2)',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: containerRef.current || '#thinking',
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );

      gsap.fromTo(
        '.dd-note-item',
        { x: 15, opacity: 0.3 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all',
          lazy: false,
          scrollTrigger: {
            trigger: containerRef.current || '#thinking',
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const notes = [
    {
      id: 0,
      title: 'Hierarchy',
      desc: 'The primary action competes with secondary information. Seven fields, four links, and competing buttons distract from the actual purpose.',
    },
    {
      id: 1,
      title: 'Cognitive load',
      desc: 'The user has to interpret too much before acting. Asking for category, tags, and scheduling up front creates hesitation on a high-stakes transfer.',
    },
    {
      id: 2,
      title: 'Trust & Confirmation',
      desc: "The interface doesn't reassure what happens after sending. Critical details like delivery arrival time and masked account numbers are hidden.",
    },
  ];

  return (
    <section ref={containerRef} id="thinking" className="py-24 sm:py-36 lg:py-44" aria-labelledby="dd-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-[var(--panel)] text-[var(--on-panel)] rounded-3xl sm:rounded-[48px] p-8 sm:p-16 lg:p-24 border border-[var(--panel-line)] shadow-2xl">
          {/* Header */}
          <div className="flex flex-col gap-6 mb-16 sm:mb-24 lg:mb-28">
            <div className="inline-flex items-center gap-2 self-start bg-white/10 border border-[var(--panel-line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide text-[var(--on-panel)]">
              <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
              04 · How I think
            </div>

            <h2
              id="dd-heading"
              className="font-display font-bold text-3xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.04em] text-[var(--on-panel)] max-w-[950px]"
              style={{ textWrap: 'balance' }}
            >
              Give me 60 seconds.{' '}
              <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--lime)] text-[var(--lime-ink)] overflow-hidden shadow-sm">
                <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                  <circle cx="12" cy="13" r="7" />
                  <path d="M12 9v4l2 2M9 3h6" />
                </svg>
              </span>{' '}
              I'll show you how I think.
            </h2>

            <div className="flex items-center gap-3.5 max-w-[540px] sm:ml-20 mt-6 sm:mt-10 lg:mt-14">
              <ShahinAvatar className="w-10 h-10" />
              <p className="bg-white/10 border border-[var(--panel-line)] rounded-2xl rounded-bl-sm py-2.5 px-4 text-sm text-[var(--on-panel)]">
                Tap the numbered markers, then apply the fixes.
              </p>
            </div>
          </div>

          {/* Interactive Playground Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-12 lg:gap-20 items-center">
            {/* Stage Frame (Lime Canvas) */}
            <div className="dd-stage-card relative bg-[var(--lime)] rounded-3xl p-6 sm:p-12 overflow-hidden shadow-lg select-none">
              {/* Payment Card Simulation */}
              <div
                className={`bg-[var(--card)] text-[var(--ink)] rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-[480px] mx-auto shadow-2xl transition-all duration-300 ${
                  isFixed ? 'scale-[1.02]' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-display font-bold text-xl sm:text-2xl tracking-tight m-0">
                    Confirm transfer
                  </h4>
                  {isFixed && (
                    <span className="py-1 px-3 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-xs">
                      Optimized Flow
                    </span>
                  )}
                </div>

                <div className="flex justify-between py-2.5 border-b border-[var(--line)] text-sm">
                  <span className="text-[var(--mute)]">Send to</span>
                  <span className="font-semibold text-[var(--ink)]">A. Rahman</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-[var(--line)] text-sm">
                  <span className="text-[var(--mute)]">Amount</span>
                  <span className="font-bold text-[var(--ink)] text-base sm:text-lg">$1,240.00</span>
                </div>

                {!isFixed && (
                  <div className="flex justify-between py-2.5 border-b border-[var(--line)] text-xs text-[var(--mute)]">
                    <span>Fee, rate & tax</span>
                    <span className="underline cursor-pointer">See details</span>
                  </div>
                )}

                {/* Clutter Fields (Hidden when fixed) */}
                {!isFixed ? (
                  <>
                    <div className="grid grid-cols-2 gap-2 my-4">
                      <div className="bg-[var(--soft)] rounded-xl p-3 text-xs text-[var(--mute)]">Reference # (Optional)</div>
                      <div className="bg-[var(--soft)] rounded-xl p-3 text-xs text-[var(--mute)]">Budget Category</div>
                      <div className="bg-[var(--soft)] rounded-xl p-3 text-xs text-[var(--mute)]">Execution Date</div>
                      <div className="bg-[var(--soft)] rounded-xl p-3 text-xs text-[var(--mute)]">Internal Notes</div>
                    </div>

                    <div className="flex gap-3 flex-wrap text-xs text-[var(--mute)] underline my-3">
                      <span>Terms</span>
                      <span>Limits</span>
                      <span>Edit recipient</span>
                      <span>Save template</span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        type="button"
                        className="flex-1 py-3 px-4 rounded-full bg-[var(--soft)] font-bold text-sm text-[var(--ink)] hover:bg-[var(--line2)]"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn-transfer-action flex-1 py-3 px-4 rounded-full font-bold text-sm transition-opacity hover:opacity-90 shadow-sm"
                      >
                        Send $1,240.00
                      </button>
                    </div>
                  </>
                ) : (
                  /* Clean, High-Trust, 1-Step Fixed UI */
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0">
                        ✓
                      </span>
                      <span>Recipient verified · ends in 4821 · arrives today by 2:00 PM</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        type="button"
                        className="btn-transfer-action w-full py-4 px-6 rounded-full font-bold text-base shadow-lg transition-opacity hover:opacity-90"
                      >
                        Send $1,240.00 now
                      </button>
                      <button
                        type="button"
                        className="text-xs text-[var(--mute)] font-medium underline py-1 hover:text-[var(--ink)]"
                      >
                        Cancel and return to accounts
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Hotspot 1: Hierarchy */}
              {!isFixed && (
                <button
                  type="button"
                  onClick={() => setActiveNote(0)}
                  aria-pressed={activeNote === 0}
                  className={`dd-hotspot absolute right-4 sm:right-8 top-36 sm:top-40 w-9 h-9 rounded-full bg-[#101114] text-[#F5F5F2] border-2 border-[var(--lime)] font-bold text-sm flex items-center justify-center transition-all ${
                    activeNote === 0 ? 'scale-125 shadow-xl ring-2 ring-[#101114]' : 'animate-ping-subtle'
                  }`}
                  aria-label="Issue 1: Visual Hierarchy"
                >
                  1
                </button>
              )}

              {/* Hotspot 2: Cognitive Load */}
              {!isFixed && (
                <button
                  type="button"
                  onClick={() => setActiveNote(1)}
                  aria-pressed={activeNote === 1}
                  className={`dd-hotspot absolute left-4 sm:left-8 top-48 sm:top-56 w-9 h-9 rounded-full bg-[#101114] text-[#F5F5F2] border-2 border-[var(--lime)] font-bold text-sm flex items-center justify-center transition-all ${
                    activeNote === 1 ? 'scale-125 shadow-xl ring-2 ring-[#101114]' : 'animate-ping-subtle'
                  }`}
                  aria-label="Issue 2: Cognitive Load"
                >
                  2
                </button>
              )}

              {/* Hotspot 3: Trust */}
              {!isFixed && (
                <button
                  type="button"
                  onClick={() => setActiveNote(2)}
                  aria-pressed={activeNote === 2}
                  className={`dd-hotspot absolute right-6 sm:right-10 bottom-8 sm:bottom-12 w-9 h-9 rounded-full bg-[#101114] text-[#F5F5F2] border-2 border-[var(--lime)] font-bold text-sm flex items-center justify-center transition-all ${
                    activeNote === 2 ? 'scale-125 shadow-xl ring-2 ring-[#101114]' : 'animate-ping-subtle'
                  }`}
                  aria-label="Issue 3: Trust and Feedback"
                >
                  3
                </button>
              )}
            </div>

            {/* Explanatory Notes & Action Column */}
            <div className="dd-notes-list flex flex-col gap-3">
              {notes.map((note) => {
                const isOpen = activeNote === note.id;
                return (
                  <button
                    key={note.id}
                    type="button"
                    onClick={() => setActiveNote(note.id)}
                    aria-expanded={isOpen}
                    className={`dd-note-item border border-[var(--panel-line)] rounded-2xl p-5 text-left transition-all ${
                      isOpen ? 'bg-white/10 shadow-md' : 'bg-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="font-display font-bold text-xl sm:text-2xl tracking-tight text-[var(--on-panel)] flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-xs font-bold flex items-center justify-center shrink-0">
                        {note.id + 1}
                      </span>
                      <span>{note.title}</span>
                    </div>
                    {isOpen && (
                      <p className="mt-3 text-sm text-[var(--panel-mute)] leading-relaxed animate-fade">
                        {note.desc}
                      </p>
                    )}
                  </button>
                );
              })}

              {/* Fix Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  setIsFixed(!isFixed);
                  refreshScrollTrigger(120);
                }}
                className="inline-flex items-center gap-3 bg-[var(--lime)] text-[var(--lime-ink)] border border-[var(--lime)] py-3 px-6 text-base font-bold rounded-full hover:opacity-95 transition-all self-start mt-2 group"
              >
                <span>{isFixed ? 'Show the cluttered original' : 'Apply the fixes'}</span>
                <span className="w-8 h-8 rounded-full bg-[var(--lime-ink)] text-[var(--lime)] flex items-center justify-center text-base font-bold group-hover:rotate-[-45deg] transition-transform duration-200">
                  →
                </span>
              </button>

              {isFixed && (
                <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-[var(--panel-line)]">
                  <p className="font-display font-bold text-xl text-[var(--lime)] tracking-tight">
                    This is how I approach a product.
                  </p>
                  <p className="text-xs text-[var(--panel-mute)] mt-1">
                    Eliminate competing noise, provide crystal-clear confirmation, and make the next step unmistakable.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-[var(--panel-mute)] mt-8">
            Interactive simulated interface demonstrating information hierarchy, cognitive load reduction, and state feedback.
          </p>
        </div>
      </div>
    </section>
  );
}
