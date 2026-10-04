import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

export function FeaturedStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-chat-bubble',
        { x: -20, opacity: 0.5 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          clearProps: 'all',
          scrollTrigger: {
            trigger: containerRef.current || '#story',
            start: 'top 88%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.story-tab-container',
        { y: 25, opacity: 0.5 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          clearProps: 'all',
          scrollTrigger: {
            trigger: containerRef.current || '#story',
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const tabs = [
    { id: 0, label: 'Before' },
    { id: 1, label: 'Insight' },
    { id: 2, label: 'Exploration' },
    { id: 3, label: 'Solution' },
  ];

  return (
    <section ref={containerRef} id="story" className="py-24 sm:py-36 lg:py-44" aria-labelledby="story-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col gap-6 mb-16 sm:mb-24 lg:mb-28">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            05 · Featured case study
          </div>

          <h2
            id="story-heading"
            className="font-display font-bold text-3xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-[-0.04em] text-[var(--ink)] max-w-[1050px]"
            style={{ textWrap: 'balance' }}
          >
            Why wasn't this{' '}
            <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--lime)] text-[var(--lime-ink)] overflow-hidden shadow-sm">
              <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                <path d="M4 5h16v11H9l-5 4z" />
              </svg>
            </span>{' '}
            working?
          </h2>
        </div>

        {/* Narrative Flow */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {/* Chat Bubble 1 */}
          <div className="story-chat-wrap flex flex-col gap-4 max-w-[640px]">
            <div className="story-chat-bubble bg-[var(--panel)] text-[var(--on-panel)] border border-[var(--panel-line)] py-4 px-6 rounded-3xl rounded-br-sm self-start text-sm sm:text-base leading-relaxed shadow-sm">
              <span className="block text-xs font-bold text-[var(--lime)] mb-1">Designer</span>
              Users were struggling because the crucial next action was buried inside an intimidating 7-field form.
            </div>
            <div className="story-chat-bubble bg-[var(--card)] border border-[var(--line)] text-[var(--ink)] py-3.5 px-6 rounded-3xl rounded-bl-sm self-start text-sm sm:text-base shadow-[var(--shadow)] ml-4 sm:ml-8">
              <span className="block text-xs font-bold text-[var(--mute)] mb-1">Client</span>
              So what changed?
            </div>
          </div>

          {/* Interactive Case Tabs Container */}
          <div className="story-tab-container flex flex-col gap-4">
            {/* Tab Bar */}
            <div className="flex items-center gap-1.5 p-1.5 bg-[var(--soft)] rounded-full w-fit max-w-full overflow-x-auto" role="tablist">
              {tabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-[var(--ink)] text-[var(--paper)] shadow-sm'
                        : 'text-[var(--ink)] hover:bg-[var(--card)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Panel 0: Before */}
            {activeTab === 0 && (
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 items-center shadow-[var(--shadow)] animate-fade">
                <div>
                  <h4 className="font-display font-bold text-2xl sm:text-4xl tracking-tight mb-3">
                    The flow, as it was
                  </h4>
                  <p className="text-[var(--mute)] text-sm sm:text-base leading-relaxed">
                    Seven inputs, three optional links, and two competing buttons, all packed into a single scroll. The primary action people signed up for sat neglected at the very bottom.
                  </p>
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs">
                  <div className="bg-[var(--soft)] p-3 rounded-xl text-[var(--mute)]">Header · Promotional banner & carousel</div>
                  <div className="bg-[var(--soft)] p-3 rounded-xl text-[var(--mute)]">Form · 7 dense text inputs</div>
                  <div className="bg-[var(--soft)] p-3 rounded-xl text-[var(--mute)]">Links · Help doc · Terms · Skip for now</div>
                  <div className="bg-[var(--lime)] text-[var(--lime-ink)] p-3 rounded-xl font-bold font-sans">Button · Continue (Buried at bottom)</div>
                </div>
              </div>
            )}

            {/* Tab Panel 1: Insight */}
            {activeTab === 1 && (
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 items-center shadow-[var(--shadow)] animate-fade">
                <div>
                  <h4 className="font-display font-bold text-2xl sm:text-4xl tracking-tight mb-3">
                    What research exposed
                  </h4>
                  <p className="text-[var(--mute)] text-sm sm:text-base leading-relaxed mb-4">
                    Watching recorded user sessions revealed consistent hesitation points: users treated optional fields as mandatory, grew anxious about data privacy, and abandoned midway.
                  </p>
                  <span className="inline-block border border-dashed border-[var(--line2)] text-[var(--mute)] py-1 px-3 rounded-full text-xs font-bold">
                    Usability testing cohort (n=14)
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="bg-[var(--soft)] p-3.5 rounded-xl">
                    <b className="block text-[var(--ink)] font-bold mb-1">Observation 01</b>
                    <span className="text-[var(--mute)]">Users hesitated for 40+ seconds trying to decipher what "Portfolio Classification" meant.</span>
                  </div>
                  <div className="bg-[var(--soft)] p-3.5 rounded-xl">
                    <b className="block text-[var(--ink)] font-bold mb-1">Observation 02</b>
                    <span className="text-[var(--mute)]">Users who linked their account retained 3.4x better, but the link button had zero contrast.</span>
                  </div>
                  <div className="bg-[var(--lime)] text-[var(--lime-ink)] p-3.5 rounded-xl font-bold">
                    Key Insight: People need ONE immediate milestone, not an encyclopedia.
                  </div>
                </div>
              </div>
            )}

            {/* Tab Panel 2: Exploration */}
            {activeTab === 2 && (
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 items-center shadow-[var(--shadow)] animate-fade">
                <div>
                  <h4 className="font-display font-bold text-2xl sm:text-4xl tracking-tight mb-3">
                    Three directions explored
                  </h4>
                  <p className="text-[var(--mute)] text-sm sm:text-base leading-relaxed">
                    I mapped and compared three distinct UX models. Direction B won decisively because it segregated optional configuration from the essential initial value step.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 text-xs font-semibold">
                  <div className="aspect-[3/4] bg-[var(--soft)] rounded-2xl p-3 flex flex-col justify-between border border-[var(--line)]">
                    <div className="flex flex-col gap-1.5 opacity-40">
                      <div className="h-1.5 bg-[var(--ink)] rounded"></div>
                      <div className="h-1.5 bg-[var(--ink)] rounded w-3/4"></div>
                    </div>
                    <span className="text-[11px]">A · One long page</span>
                  </div>

                  <div className="aspect-[3/4] bg-[var(--lime)] text-[var(--lime-ink)] rounded-2xl p-3 flex flex-col justify-between ring-2 ring-[var(--ink)] shadow-md">
                    <div className="flex flex-col gap-1.5">
                      <div className="h-1.5 bg-[var(--lime-ink)] rounded"></div>
                      <div className="h-1.5 bg-[var(--lime-ink)] rounded w-1/2"></div>
                    </div>
                    <span className="text-[11px] font-bold">B · Guided path (Chosen)</span>
                  </div>

                  <div className="aspect-[3/4] bg-[var(--soft)] rounded-2xl p-3 flex flex-col justify-between border border-[var(--line)]">
                    <div className="flex flex-col gap-1.5 opacity-40">
                      <div className="h-1.5 bg-[var(--ink)] rounded w-2/3"></div>
                      <div className="h-1.5 bg-[var(--ink)] rounded"></div>
                    </div>
                    <span className="text-[11px]">C · Chatbot wizard</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Panel 3: Solution (with Interactive Slider) */}
            {activeTab === 3 && (
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-12 flex flex-col gap-6 shadow-[var(--shadow)] animate-fade">
                <div>
                  <h4 className="font-display font-bold text-2xl sm:text-4xl tracking-tight mb-2">
                    The Result: Interactive Before & After
                  </h4>
                  <p className="text-[var(--mute)] text-sm sm:text-base">
                    Drag the slider below to compare the cluttered form against the unified, high-clarity guided path.
                  </p>
                </div>

                {/* Interactive Split-Screen Slider */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[16/8] select-none border border-[var(--line)] shadow-inner">
                  {/* Before View (Background) */}
                  <div className="absolute inset-0 bg-[var(--soft)] p-6 sm:p-10 flex flex-col justify-center items-center">
                    <span className="absolute top-3 left-3 py-1 px-3 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs font-bold">
                      Before
                    </span>
                    <div className="w-[85%] max-w-md flex flex-col gap-2 opacity-75">
                      <div className="h-2 bg-[var(--ink)]/30 rounded w-full"></div>
                      <div className="h-2 bg-[var(--ink)]/25 rounded w-3/4"></div>
                      <div className="h-2 bg-[var(--ink)]/30 rounded w-full"></div>
                      <div className="h-2 bg-[var(--ink)]/20 rounded w-1/2"></div>
                      <div className="flex gap-2 mt-2">
                        <span className="py-1 px-3 rounded bg-[var(--card)] text-[10px] font-bold">Back</span>
                        <span className="py-1 px-3 rounded bg-[var(--card)] text-[10px]">Skip</span>
                        <span className="py-1 px-3 rounded bg-[var(--card)] text-[10px]">Next</span>
                      </div>
                    </div>
                  </div>

                  {/* After View (Clipped Foreground) */}
                  <div
                    className="absolute inset-0 bg-[var(--lime)] text-[var(--lime-ink)] p-6 sm:p-10 flex flex-col justify-center items-center pointer-events-none"
                    style={{
                      clipPath: `inset(0 0 0 ${sliderPos}%)`,
                    }}
                  >
                    <span className="absolute top-3 right-3 py-1 px-3 rounded-full bg-[var(--lime-ink)] text-[var(--lime)] text-xs font-bold">
                      After
                    </span>
                    <div className="w-[85%] max-w-md flex flex-col gap-3">
                      <b className="font-display font-bold text-xl sm:text-3xl tracking-tight leading-tight">
                        Connect your first account
                      </b>
                      <div className="h-2.5 bg-[var(--lime-ink)]/25 rounded w-4/5"></div>
                      <div className="h-2.5 bg-[var(--lime-ink)]/20 rounded w-3/5"></div>
                      <button
                        type="button"
                        className="py-2.5 px-6 rounded-full bg-[var(--lime-ink)] text-[var(--lime)] font-bold text-xs self-start mt-2 shadow-md"
                      >
                        Connect securely →
                      </button>
                    </div>
                  </div>

                  {/* Divider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[var(--ink)] pointer-events-none z-10"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-bold text-xs shadow-lg">
                      ⇄
                    </div>
                  </div>

                  {/* Range Input for Scrubbing */}
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    aria-label="Compare before and after design"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Chat Bubble 2 */}
          <div className="flex flex-col gap-3 max-w-[620px]">
            <div className="bg-[var(--card)] border border-[var(--line)] text-[var(--ink)] py-3 px-5 rounded-3xl rounded-bl-sm self-start text-sm sm:text-base shadow-[var(--shadow)]">
              <span className="block text-xs font-bold text-[var(--mute)] mb-1">Client</span>
              How do you know it was actually better?
            </div>
          </div>

          {/* Evidence Triad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-xl tracking-tight mb-2">Usability Findings</h4>
                <p className="text-sm text-[var(--mute)] leading-relaxed">
                  Average time-to-first-connect dropped from 4m 12s down to 54 seconds across 14 observed sessions.
                </p>
              </div>
              <span className="inline-block mt-4 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 py-1 px-3 rounded-full w-fit">
                Zero hesitation blocks
              </span>
            </div>

            <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-xl tracking-tight mb-2">Design Iterations</h4>
                <p className="text-sm text-[var(--mute)] leading-relaxed">
                  Three design rounds testing varying copy lengths, security badges, and instant OAuth bank connections.
                </p>
              </div>
              <span className="inline-block mt-4 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 py-1 px-3 rounded-full w-fit">
                3 tested versions
              </span>
            </div>

            <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-xl tracking-tight mb-2">Measured Results</h4>
                <p className="text-sm text-[var(--mute)] leading-relaxed">
                  Day-one onboarding completion increased by +48%, and related customer support tickets declined by 36%.
                </p>
              </div>
              <span className="inline-block mt-4 text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400 py-1 px-3 rounded-full w-fit">
                Live production metrics
              </span>
            </div>
          </div>

          {/* Final Mockup Frame */}
          <div className="bg-[var(--soft)] rounded-3xl p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-center border border-[var(--line)]">
            {/* Desktop Mockup */}
            <div className="bg-[var(--card)] text-[var(--ink)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--line)] text-xs">
              <div className="flex items-center gap-1.5 py-2.5 px-3.5 border-b border-[var(--line)] bg-[var(--card)]">
                <i className="w-2.5 h-2.5 rounded-full bg-red-400"></i>
                <i className="w-2.5 h-2.5 rounded-full bg-yellow-400"></i>
                <i className="w-2.5 h-2.5 rounded-full bg-green-400"></i>
                <em className="ml-auto not-italic text-[11px] text-[var(--mute)]">final · desktop</em>
              </div>
              <div className="p-6 sm:p-8 flex flex-col gap-3">
                <div className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
                  Connect your first account
                </div>
                <div className="h-2 bg-[var(--ink)]/15 rounded w-3/5"></div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="py-2.5 px-5 rounded-full bg-[var(--ink)] text-[var(--paper)] font-bold text-xs">
                    Connect securely
                  </span>
                  <span className="text-xs text-[var(--mute)] underline cursor-pointer">Do this later</span>
                </div>
                <div className="h-16 bg-[var(--soft)]/60 rounded-xl mt-4 border border-[var(--line)] flex items-center px-4 gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-xs">256-bit Bank Grade Encryption</div>
                    <div className="text-[10px] text-[var(--mute)]">Read-only financial data synchronization</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Mockup */}
            <div className="w-full max-w-[220px] mx-auto aspect-[9/17] border-2 border-[var(--ink)] rounded-3xl bg-[var(--card)] text-[var(--ink)] p-4 flex flex-col gap-3 text-xs shadow-2xl">
              <div className="flex gap-1">
                <i className="flex-1 h-1.5 bg-[var(--ink)] rounded"></i>
                <i className="flex-1 h-1.5 bg-[var(--soft)] rounded"></i>
              </div>
              <b className="text-[11px] text-[var(--mute)]">Almost there</b>
              <div className="font-display font-bold text-sm">One tap connect</div>
              <div className="h-2 bg-[var(--ink)]/15 rounded w-full"></div>
              <div className="h-2 bg-[var(--ink)]/15 rounded w-3/4"></div>
              <div className="mt-auto py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper)] text-center font-bold text-xs">
                Continue with Passkey
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
