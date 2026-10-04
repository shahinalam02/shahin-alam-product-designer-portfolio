import { useEffect, useState } from 'react';
import { useProjects } from '../context/ProjectsContext';
import { CASE_STUDIES } from '../data/portfolioData';
import {
  FintechDashboardMockup,
  SaaSPlatformMockup,
  MobileCheckoutMockup,
} from '../components/CaseStudyVisuals';
import { CheckCircle2, TrendingUp, Sparkles, Layers, Sliders } from 'lucide-react';

interface CaseStudyDetailProps {
  caseId: number;
}

export function CaseStudyDetail({ caseId }: CaseStudyDetailProps) {
  const { projects, projectList, isAdmin } = useProjects();
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSec, setActiveSec] = useState<string>('problem');
  const [expandedDecisions, setExpandedDecisions] = useState<Record<number, boolean>>({ 0: true });

  const currentCase = projects[caseId] || projectList[0] || CASE_STUDIES[1];
  const currentIndex = projectList.findIndex((p) => p.id === currentCase.id);
  const nextIndex = (currentIndex + 1) % projectList.length;
  const nextCase = projectList[nextIndex] || currentCase;

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'problem', label: '01 · The problem' },
    { id: 'goals', label: '02 · Goals' },
    { id: 'research', label: '03 · Research' },
    { id: 'insights', label: '04 · Insights' },
    { id: 'explore', label: '05 · Exploration' },
    { id: 'decisions', label: '06 · Decisions' },
    { id: 'solution', label: '07 · The solution' },
    { id: 'evidence', label: '08 · Evidence' },
    { id: 'learned', label: '09 · What I learned' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSec(id);
    const el = document.getElementById(`cs-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDecision = (idx: number) => {
    setExpandedDecisions((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <>
      {/* Floating Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[var(--lime)] z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <article className="pt-32 sm:pt-44 lg:pt-48 pb-32 sm:pb-40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Breadcrumb & Actions */}
          <div className="flex items-center justify-between gap-4 mb-10">
            <a
              href="#/work"
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-[var(--line2)] text-xs font-bold text-[var(--ink)] hover:bg-[var(--soft)] transition-colors no-underline"
            >
              ← Back to all work
            </a>
            {isAdmin && (
              <a
                href="#/manage"
                className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-xs font-bold hover:opacity-90 transition-all no-underline shadow-sm"
              >
                <span>✎ Edit in Studio</span>
              </a>
            )}
          </div>

          {/* Case Header */}
          <div className="flex flex-col gap-6 mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              {currentCase.tag}
            </span>

            <h1
              className="font-display font-bold text-4xl sm:text-7xl lg:text-8xl leading-[0.96] tracking-[-0.045em] text-[var(--ink)] max-w-[1050px]"
              style={{ textWrap: 'balance' }}
            >
              {currentCase.headlineQuote}
            </h1>

            <p className="font-display font-semibold text-xl sm:text-3xl text-[var(--mute)] max-w-3xl leading-snug">
              {currentCase.lead}
            </p>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-[var(--card)] border border-[var(--line)] p-4 sm:p-5 rounded-2xl shadow-sm">
                <small className="block font-bold text-xs text-[var(--mute)] mb-1">Context</small>
                <p className="font-semibold text-sm sm:text-base leading-snug">{currentCase.context}</p>
              </div>
              <div className="bg-[var(--card)] border border-[var(--line)] p-4 sm:p-5 rounded-2xl shadow-sm">
                <small className="block font-bold text-xs text-[var(--mute)] mb-1">Role</small>
                <p className="font-semibold text-sm sm:text-base leading-snug">{currentCase.role}</p>
              </div>
              <div className="bg-[var(--card)] border border-[var(--line)] p-4 sm:p-5 rounded-2xl shadow-sm">
                <small className="block font-bold text-xs text-[var(--mute)] mb-1">Timeline</small>
                <p className="font-semibold text-sm sm:text-base leading-snug">{currentCase.timeline}</p>
              </div>
              <div className="bg-[var(--card)] border border-[var(--line)] p-4 sm:p-5 rounded-2xl shadow-sm">
                <small className="block font-bold text-xs text-[var(--mute)] mb-1">Tools</small>
                <p className="font-semibold text-sm sm:text-base leading-snug">{currentCase.tools.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Layout: TOC Sidebar + Deep Dive Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 lg:gap-20 items-start mt-16">
            {/* Sticky TOC */}
            <aside className="hidden lg:flex flex-col gap-1 sticky top-28" aria-label="Table of Contents">
              <small className="font-bold text-xs text-[var(--mute)] uppercase tracking-wider mb-2 px-3">
                On this page
              </small>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeSec === sec.id
                      ? 'bg-[var(--ink)] text-[var(--paper)]'
                      : 'text-[var(--mute)] hover:bg-[var(--soft)] hover:text-[var(--ink)]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </aside>

            {/* Main Sections */}
            <div className="flex flex-col gap-24 sm:gap-32">
              {/* 01 The Problem */}
              <section id="cs-problem" className="scroll-mt-28">
                <div className="text-xs font-bold text-[var(--mute)] mb-2 uppercase tracking-wider">01 · The Problem</div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-6">
                  Why wasn't this working?
                </h2>
                <div className="flex flex-col gap-3 max-w-xl">
                  <div className="bg-[var(--card)] border border-[var(--line)] p-4 rounded-2xl text-sm shadow-sm">
                    <span className="font-bold text-xs text-[var(--mute)] block mb-1">Client Brief</span>
                    Users drop off without completing their setup or articulating value.
                  </div>
                  <div className="bg-[var(--panel)] text-[var(--on-panel)] border border-[var(--panel-line)] p-5 rounded-2xl text-sm sm:text-base leading-relaxed shadow-sm">
                    <span className="font-bold text-xs text-[var(--lime)] block mb-1">Design Diagnosis</span>
                    {currentCase.problem}
                  </div>
                </div>
              </section>

              {/* 02 Goals */}
              <section id="cs-goals" className="scroll-mt-28">
                <div className="text-xs font-bold text-[var(--mute)] mb-2 uppercase tracking-wider">02 · Goals</div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-6">
                  What we set out to change.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentCase.goals.map((g, idx) => (
                    <div key={idx} className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-3xl flex flex-col justify-between min-h-[180px] shadow-sm">
                      <span className="w-8 h-8 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <p className="font-display font-semibold text-lg sm:text-xl tracking-tight leading-snug mt-4">
                        {g}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 03 Research */}
              <section id="cs-research" className="scroll-mt-28">
                <div className="text-xs font-bold text-[var(--mute)] mb-2 uppercase tracking-wider">03 · Research</div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
                  What I looked at.
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentCase.methods.map((m) => (
                    <span key={m} className="py-2 px-4 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-xs font-bold">
                      {m}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentCase.findings.map((f, idx) => (
                    <div key={idx} className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-3xl shadow-sm">
                      <h4 className="font-display font-bold text-lg mb-2">{f.title}</h4>
                      <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed mb-3">{f.desc}</p>
                      <span className="text-[10px] font-bold text-[var(--ink)] opacity-60">{f.note}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 04 Insights */}
              <section id="cs-insights" className="scroll-mt-28">
                <div className="text-xs font-bold text-[var(--mute)] mb-2 uppercase tracking-wider">04 · Insights</div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-6">
                  What the evidence revealed.
                </h2>
                <div className="flex flex-col divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {currentCase.insights.map((ins, idx) => (
                    <div key={idx} className="py-6 grid grid-cols-1 sm:grid-cols-[60px_1fr] gap-4 items-baseline">
                      <span className="font-bold text-sm text-[var(--mute)]">0{idx + 1}</span>
                      <div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-2">
                          {ins.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed max-w-xl">
                          {ins.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 05 Exploration */}
              <section id="cs-explore" className="scroll-mt-28">
                <div className="text-xs font-bold text-[var(--mute)] mb-2 uppercase tracking-wider">05 · Exploration</div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-6">
                  Three directions, one choice.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {currentCase.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className={`p-6 rounded-3xl border flex flex-col justify-between min-h-[220px] relative transition-all ${
                        opt.chosen
                          ? 'bg-[var(--lime)] text-[var(--lime-ink)] border-[var(--lime)] shadow-lg ring-2 ring-[var(--ink)]'
                          : 'bg-[var(--card)] text-[var(--ink)] border-[var(--line)]'
                      }`}
                    >
                      {opt.chosen && (
                        <span className="absolute top-4 right-4 py-1 px-3 rounded-full bg-[var(--ink)] text-[var(--paper)] text-[10px] font-bold">
                          Chosen Path
                        </span>
                      )}
                      <div>
                        <span className="text-xs font-bold opacity-60 block mb-1">Option {opt.label}</span>
                        <h4 className="font-display font-bold text-lg mb-2">{opt.title}</h4>
                      </div>
                      <p className="text-xs leading-relaxed opacity-80">{opt.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[var(--panel)] text-[var(--on-panel)] p-6 rounded-3xl text-sm leading-relaxed border border-[var(--panel-line)]">
                  <b className="text-[var(--lime)] font-bold">Why this choice: </b>
                  {currentCase.choiceReason}
                </div>
              </section>

              {/* 06 Decisions */}
              <section id="cs-decisions" className="scroll-mt-28">
                <div className="text-xs font-bold text-[var(--mute)] mb-2 uppercase tracking-wider">06 · Decisions</div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-6">
                  The choices that mattered.
                </h2>
                <div className="flex flex-col gap-3">
                  {currentCase.decisions.map((dec, idx) => {
                    const isExp = expandedDecisions[idx];
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border p-5 transition-all ${
                          isExp ? 'bg-[var(--card)] shadow-md border-[var(--line)]' : 'bg-transparent border-[var(--line)]'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleDecision(idx)}
                          className="w-full flex justify-between items-center text-left font-display font-bold text-lg sm:text-xl tracking-tight cursor-pointer"
                        >
                          <span>{dec.title}</span>
                          <span className="text-xs font-bold px-2 py-1 rounded bg-[var(--soft)]">
                            {isExp ? 'Hide' : 'Details'}
                          </span>
                        </button>
                        {isExp && (
                          <div className="mt-4 pt-4 border-t border-[var(--line)] flex flex-col gap-2 text-xs sm:text-sm">
                            <div>
                              <b className="font-bold text-[var(--ink)] block mb-0.5">Why:</b>
                              <span className="text-[var(--mute)]">{dec.why}</span>
                            </div>
                            <div>
                              <b className="font-bold text-[var(--ink)] block mb-0.5">Deliberate Trade-off:</b>
                              <span className="text-[var(--mute)]">{dec.tradeOff}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 07 The Solution (Interactive Slider + Mockups) */}
              <section id="cs-solution" className="scroll-mt-28">
                <div className="text-xs font-bold text-[var(--mute)] mb-2 uppercase tracking-wider">07 · The Solution</div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
                  Interactive Before & After
                </h2>

                {/* Slider */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[16/8] select-none border border-[var(--line)] shadow-inner my-6">
                  {/* Before */}
                  <div className="absolute inset-0 bg-[var(--soft)] p-6 sm:p-10 flex flex-col justify-center items-center">
                    <span className="absolute top-3 left-3 py-1 px-3 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs font-bold">
                      Before
                    </span>
                    <div className="w-[85%] max-w-md flex flex-col gap-2 opacity-75">
                      <div className="h-2.5 bg-[var(--ink)]/30 rounded w-full"></div>
                      <div className="h-2.5 bg-[var(--ink)]/25 rounded w-3/4"></div>
                      <div className="h-2.5 bg-[var(--ink)]/30 rounded w-full"></div>
                      <div className="flex gap-2 mt-2">
                        <span className="py-1 px-3 rounded bg-[var(--card)] text-[10px] font-bold">Back</span>
                        <span className="py-1 px-3 rounded bg-[var(--card)] text-[10px]">Skip</span>
                        <span className="py-1 px-3 rounded bg-[var(--card)] text-[10px]">Continue</span>
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div
                    className="absolute inset-0 bg-[var(--lime)] text-[var(--lime-ink)] p-6 sm:p-10 flex flex-col justify-center items-center pointer-events-none"
                    style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
                  >
                    <span className="absolute top-3 right-3 py-1 px-3 rounded-full bg-[var(--lime-ink)] text-[var(--lime)] text-xs font-bold">
                      After
                    </span>
                    <div className="w-[85%] max-w-md flex flex-col gap-3">
                      <b className="font-display font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
                        {currentCase.solutionHeadline}
                      </b>
                      <div className="h-2.5 bg-[var(--lime-ink)]/25 rounded w-4/5"></div>
                      <span className="py-2.5 px-6 rounded-full bg-[var(--lime-ink)] text-[var(--lime)] font-bold text-xs self-start mt-2 shadow-md">
                        {currentCase.solutionCta} →
                      </span>
                    </div>
                  </div>

                  {/* Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-[var(--ink)] pointer-events-none z-10"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-bold text-xs shadow-lg">
                      ⇄
                    </div>
                  </div>

                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    aria-label="Compare before and after"
                  />
                </div>

                {/* Journey comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-5 rounded-2xl bg-[var(--soft)] flex flex-col gap-2">
                    <span className="text-xs font-bold text-[var(--mute)]">Original Journey ({currentCase.beforeJourney.length} steps)</span>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      {currentCase.beforeJourney.map((step, i) => (
                        <span key={step} className="flex items-center gap-1.5">
                          <span className="py-1 px-2.5 rounded bg-[var(--card)] font-medium">{step}</span>
                          {i < currentCase.beforeJourney.length - 1 && <span className="text-[var(--mute)]">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--lime)] text-[var(--lime-ink)] flex flex-col gap-2">
                    <span className="text-xs font-bold">Streamlined Journey ({currentCase.afterJourney.length} steps)</span>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      {currentCase.afterJourney.map((step, i) => (
                        <span key={step} className="flex items-center gap-1.5">
                          <span className="py-1 px-2.5 rounded bg-[#101114] text-[var(--lime)] font-bold">{step}</span>
                          {i < currentCase.afterJourney.length - 1 && <span>→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 08 Evidence */}
              <section id="cs-evidence" className="scroll-mt-28">
                <div className="text-xs font-bold text-[var(--mute)] mb-2 uppercase tracking-wider">08 · Evidence</div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-4">
                  How do we know it was better?
                </h2>
                <div className="p-6 sm:p-8 rounded-3xl bg-[var(--card)] border border-[var(--line)] shadow-sm">
                  <p className="text-base sm:text-lg leading-relaxed text-[var(--ink)] font-medium">
                    {currentCase.outcome}
                  </p>
                </div>
              </section>

              {/* 09 What I learned */}
              <section id="cs-learned" className="scroll-mt-28">
                <div className="text-xs font-bold text-[var(--mute)] mb-2 uppercase tracking-wider">09 · What I learned</div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-6">
                  What I carry forward.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentCase.learnings.map((lrn, idx) => (
                    <div key={idx} className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-3xl shadow-sm">
                      <b className="font-display font-bold text-xl block mb-2">{lrn.title}</b>
                      <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">{lrn.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Next Case Link */}
              <a
                href={`#/case/${nextCase.id}`}
                className="rounded-3xl p-8 sm:p-12 flex justify-between items-center gap-6 bg-[var(--panel)] text-[var(--on-panel)] border border-[var(--panel-line)] shadow-xl hover:-translate-y-1 transition-transform no-underline group"
              >
                <div>
                  <small className="text-xs font-bold text-[var(--panel-mute)] uppercase tracking-wider block mb-1">
                    Next Case Study
                  </small>
                  <h3 className="font-display font-bold text-2xl sm:text-4xl tracking-tight text-[var(--on-panel)]">
                    "{nextCase.headlineQuote}"
                  </h3>
                </div>
                <span className="w-14 h-14 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-2xl font-bold shrink-0 group-hover:rotate-[-45deg] transition-transform duration-200">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
