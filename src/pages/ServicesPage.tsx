import { SERVICES } from '../data/portfolioData';
import { ShahinAvatar } from '../components/ShahinAvatar';

export function ServicesPage() {
  const steps = [
    {
      num: 1,
      title: 'You tell me the problem',
      desc: 'Use the short inquiry form. A rough description of what feels off is more than enough.',
    },
    {
      num: 2,
      title: 'We talk it through',
      desc: 'We hop on a 25-minute call. I ask diagnostic questions and tell you honestly if I can deliver the solution.',
    },
    {
      num: 3,
      title: 'You get a clear plan',
      desc: 'A scoped proposal outlining exact phases, milestones, deliverables, and timeline—no ambiguity.',
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            Services
          </div>

          <h1
            className="font-display font-bold text-4xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] max-w-[1000px]"
            style={{ textWrap: 'balance' }}
          >
            What can we{' '}
            <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--lime)] text-[var(--lime-ink)] overflow-hidden shadow-sm">
              <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" />
              </svg>
            </span>{' '}
            build together?
          </h1>

          <div className="flex items-center gap-3.5 max-w-[540px] sm:ml-20">
            <ShahinAvatar className="w-10 h-10" />
            <p className="bg-[var(--card)] border border-[var(--line)] rounded-2xl rounded-bl-sm py-2.5 px-4 text-sm text-[var(--ink)] shadow-[var(--shadow)]">
              Five ways we can collaborate. Not sure where to begin? A 5-day UX audit is usually the highest-ROI starting point.
            </p>
          </div>
        </div>

        {/* Detailed Service Blocks */}
        <div className="flex flex-col gap-6 mb-20">
          {SERVICES.map((s, idx) => {
            const isDark = idx === 1;
            const isLime = idx === 2;
            const isSun = idx === 3;

            const cardBg = isDark
              ? 'bg-[var(--panel)] text-[var(--on-panel)]'
              : isLime
              ? 'bg-[var(--lime)] text-[var(--lime-ink)]'
              : isSun
              ? 'bg-[var(--sun)] text-[#101114]'
              : 'bg-[var(--card)] text-[var(--ink)] border border-[var(--line)]';

            const ctaBtn = isDark
              ? 'bg-[var(--lime)] text-[var(--lime-ink)] border-[var(--lime)]'
              : 'bg-[#101114] text-[#F5F5F2] border-[#101114]';

            return (
              <article
                key={s.id}
                id={`svc-${s.id}`}
                className={`rounded-3xl sm:rounded-[40px] p-6 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-14 shadow-lg ${cardBg}`}
              >
                <div>
                  <span className="inline-flex py-1.5 px-3.5 rounded-full border border-current font-bold text-xs opacity-80 mb-4">
                    {s.tag}
                  </span>
                  <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
                    {s.title}
                  </h2>
                  <p className="text-base sm:text-xl font-medium opacity-90 max-w-sm leading-relaxed mb-6">
                    {s.lede}
                  </p>
                  <a
                    href="#/contact"
                    className={`inline-flex items-center gap-3 border py-2.5 pl-6 pr-2.5 text-sm sm:text-base font-bold rounded-full hover:opacity-90 transition-all group no-underline ${ctaBtn}`}
                  >
                    <span>Talk about this</span>
                    <span className="w-8 h-8 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-base font-bold group-hover:rotate-[-45deg] transition-transform duration-200">
                      →
                    </span>
                  </a>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider opacity-70 mb-2">Good fit if</h4>
                    <p className="text-base sm:text-lg font-medium leading-relaxed">{s.fit}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider opacity-70 mb-3">What you get</h4>
                    <div className="flex flex-wrap gap-2">
                      {s.whatYouGet.map((item) => (
                        <span
                          key={item}
                          className="py-2 px-4 rounded-full text-xs sm:text-sm font-semibold bg-black/10 dark:bg-white/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider opacity-70 mb-2">How it works</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      {s.flow.map((st, i) => (
                        <span key={st} className="flex items-center gap-2">
                          <span className="py-1.5 px-3.5 rounded-full bg-white/20 text-xs font-bold">
                            {st}
                          </span>
                          {i < s.flow.length - 1 && <span className="opacity-40 text-xs">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 3 Steps To Start */}
        <div>
          <div className="mb-10">
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-2">
              How we'd start.
            </h2>
            <p className="text-base sm:text-lg text-[var(--mute)] max-w-xl">
              No bloated 40-page proposals before we've even aligned on the problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((st) => (
              <div
                key={st.num}
                className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-sm"
              >
                <span className="w-10 h-10 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center font-bold text-sm">
                  {st.num}
                </span>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-2xl tracking-tight mb-2">{st.title}</h3>
                  <p className="text-sm text-[var(--mute)] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
