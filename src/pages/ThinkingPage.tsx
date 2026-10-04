import { useState } from 'react';
import { SELF_AUDIT_QUESTIONS } from '../data/portfolioData';
import { ShahinAvatar } from '../components/ShahinAvatar';

export function ThinkingPage() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === SELF_AUDIT_QUESTIONS.length;

  const handleAnswer = (qIndex: number, isYes: boolean) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: isYes }));
  };

  // Identify weak areas
  const weakAreas = SELF_AUDIT_QUESTIONS.filter((_, idx) => answers[idx] === false);

  const lenses = [
    {
      title: 'Hierarchy',
      desc: 'What should the user do first? If everything is loud, nothing gets seen. Every screen needs one clear conductor.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.4]">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: 'Cognitive Load',
      desc: 'How much must someone figure out before they can act? Friction is rarely physical; it is almost always mental fatigue.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.4]">
          <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" />
        </svg>
      ),
    },
    {
      title: 'Trust & Feedback',
      desc: 'After taking a step, does the product reassure what happened? Silence after submitting an action creates anxiety.',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.4]">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 018 0v3" />
        </svg>
      ),
    },
    {
      title: 'Clarity',
      desc: 'Can a first-time visitor say what this product does in five seconds without reading marketing buzzwords?',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.4]">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 114 2c-1 .7-1.5 1.2-1.5 2.5M12 17h.01" />
        </svg>
      ),
    },
    {
      title: 'Evidence',
      desc: 'Have we watched real users interact with it, or are we designing based on executive assumptions and hunches?',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2.4]">
          <path d="M5 12l5 5 9-10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            Thinking
          </div>

          <h1
            className="font-display font-bold text-4xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] max-w-[1000px]"
            style={{ textWrap: 'balance' }}
          >
            How do you{' '}
            <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--lime)] text-[var(--lime-ink)] overflow-hidden shadow-sm">
              <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l3 3" />
              </svg>
            </span>{' '}
            actually think?
          </h1>

          <div className="flex items-center gap-3.5 max-w-[540px] sm:ml-20">
            <ShahinAvatar className="w-10 h-10" />
            <p className="bg-[var(--card)] border border-[var(--line)] rounded-2xl rounded-bl-sm py-2.5 px-4 text-sm text-[var(--ink)] shadow-[var(--shadow)]">
              Here are the five diagnostic lenses I use on every screen, plus an interactive self-audit for your product.
            </p>
          </div>
        </div>

        {/* Section 1: The 5 Lenses */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-2">
              Five lenses I use on every screen.
            </h2>
            <p className="text-base sm:text-lg text-[var(--mute)] max-w-xl">
              Most product failures trace back to one of these core friction points. Correctly naming the issue is half the solution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {lenses.map((lens, i) => (
              <div
                key={lens.title}
                className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 flex flex-col justify-between min-h-[240px] shadow-sm hover:-translate-y-1 transition-transform"
              >
                <span className="w-10 h-10 rounded-full bg-[var(--soft)] flex items-center justify-center text-[var(--ink)]">
                  {lens.icon}
                </span>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-2">
                    {i + 1}. {lens.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed">{lens.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Interactive Product Self-Audit */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-2">
              Try it on your own product.
            </h2>
            <p className="text-base sm:text-lg text-[var(--mute)] max-w-xl">
              Five honest questions. Answer candidly based on your current experience.
            </p>
          </div>

          <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl sm:rounded-[40px] p-6 sm:p-12 shadow-xl">
            {/* Audit Progress Header */}
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-[var(--mute)] mb-3">
              <span>{answeredCount} of 5 questions answered</span>
              <span>Takes about 60 seconds</span>
            </div>
            <div className="h-1.5 bg-[var(--soft)] rounded-full overflow-hidden mb-8">
              <div
                className="h-full bg-[var(--ink)] transition-all duration-300 ease-out"
                style={{ width: `${(answeredCount / 5) * 100}%` }}
              ></div>
            </div>

            {/* Questions List */}
            <div className="flex flex-col divide-y divide-[var(--line)]">
              {SELF_AUDIT_QUESTIONS.map((q, idx) => {
                const currentAnswer = answers[idx];
                return (
                  <div key={q.id} className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
                    <div>
                      <span className="text-xs font-bold text-[var(--mute)] uppercase tracking-wider block mb-1">
                        0{idx + 1} · {q.area}
                      </span>
                      <p className="font-display font-semibold text-lg sm:text-2xl tracking-tight text-[var(--ink)] leading-snug">
                        {q.question}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAnswer(idx, true)}
                        className={`py-2 px-5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                          currentAnswer === true
                            ? 'bg-[var(--ink)] text-[var(--paper)] shadow-sm'
                            : 'border border-[var(--line2)] text-[var(--ink)] hover:bg-[var(--soft)]'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAnswer(idx, false)}
                        className={`py-2 px-5 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                          currentAnswer === false
                            ? 'bg-[var(--sun)] text-[#101114] shadow-sm font-extrabold'
                            : 'border border-[var(--line2)] text-[var(--ink)] hover:bg-[var(--soft)]'
                        }`}
                      >
                        Not really
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Diagnostic Result */}
            {allAnswered && (
              <div className="mt-8 p-6 sm:p-10 rounded-3xl bg-[var(--panel)] text-[var(--on-panel)] border border-[var(--panel-line)] shadow-2xl animate-fade">
                <h3 className="font-display font-bold text-2xl sm:text-4xl tracking-tight mb-3">
                  {weakAreas.length === 0
                    ? "You're in exceptional shape!"
                    : weakAreas.length <= 2
                    ? 'A few targeted refinements will unlock major lift.'
                    : 'Your product has noticeable friction points worth addressing.'}
                </h3>

                <p className="text-sm sm:text-base text-[var(--panel-mute)] leading-relaxed max-w-2xl mb-6">
                  {weakAreas.length === 0
                    ? 'Your fundamentals are solid. Periodic user testing is recommended to keep catching blind spots as you scale.'
                    : 'Based on your answers, these friction areas are likely impeding user onboarding and conversion:'}
                </p>

                {weakAreas.length > 0 && (
                  <div className="flex flex-col gap-3 mb-8">
                    {weakAreas.map((w) => (
                      <div key={w.id} className="p-4 rounded-2xl bg-white/5 border border-[var(--panel-line)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <b className="font-bold text-[var(--lime)] block text-base">{w.area}</b>
                          <span className="text-xs text-[var(--panel-mute)]">{w.why}</span>
                        </div>
                        <span className="py-1 px-3 rounded-full bg-[var(--sun)] text-[#101114] text-xs font-bold self-start sm:self-auto shrink-0">
                          Priority Fix
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#/contact"
                    className="inline-flex items-center gap-2.5 py-3 px-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-sm hover:opacity-95 transition-opacity no-underline"
                  >
                    <span>Let's talk about these fixes</span>
                    <span className="w-6 h-6 rounded-full bg-[var(--lime-ink)] text-[var(--lime)] flex items-center justify-center text-xs font-bold">
                      →
                    </span>
                  </a>
                  <a
                    href="#/services"
                    className="py-3 px-6 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors no-underline"
                  >
                    Explore UX Audit Scope
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Notes & Essays */}
        <div>
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-2">
              Notes I'm writing.
            </h2>
            <p className="text-base text-[var(--mute)] max-w-xl">
              Pragmatic frameworks on product architecture, user psychology, and developer collaboration.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                title: 'Why I question the brief',
                desc: 'Solving the wrong problem with high fidelity is still a catastrophic failure.',
              },
              {
                title: 'How to read any screen in 60 seconds',
                desc: 'The exact visual hierarchy and cognitive load tests I run on first view.',
              },
              {
                title: 'What a UX audit actually looks at',
                desc: 'Friction mapping, drop-off analysis, and how to prioritize low-effort/high-yield fixes.',
              },
              {
                title: 'Designing with engineers, not merely for them',
                desc: 'How state machines, edge cases, and design tokens eliminate development rework.',
              },
            ].map((n) => (
              <div
                key={n.title}
                className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-[var(--line2)] transition-colors"
              >
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight mb-1">
                    {n.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--mute)]">{n.desc}</p>
                </div>
                <span className="py-1 px-3 rounded-full bg-[var(--soft)] text-[var(--mute)] font-bold text-xs self-start sm:self-auto shrink-0">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
