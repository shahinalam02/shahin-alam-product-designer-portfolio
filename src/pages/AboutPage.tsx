import { ShahinPortrait } from '../components/ShahinPortrait';
import { ShahinAvatar } from '../components/ShahinAvatar';

export function AboutPage() {
  const beliefs = [
    {
      title: 'Problems before pixels.',
      desc: "A stunning answer to the wrong question doesn't help anyone. I spend time diagnosing the real business and user bottlenecks before opening Figma.",
    },
    {
      title: 'Reasons for every decision.',
      desc: "If I cannot articulate why a button is placed where it is, or why a field was removed, it shouldn't exist in the product.",
    },
    {
      title: 'Design that survives code.',
      desc: 'Great design survives contact with developers, APIs, loading spinners, edge-case network errors, and real production budgets.',
    },
  ];

  const tools = [
    'Product Design',
    'UI/UX Architecture',
    'Web Application Design',
    'Mobile App Design (iOS/Android)',
    'UX Research & Usability Testing',
    'Figma Design Systems',
    'Interactive Prototyping',
    'Frontend Fluency (TypeScript & Tailwind)',
  ];

  const clients = [
    'Seed & Series A Startup Founders',
    'B2B SaaS Companies',
    'Fintech & Treasury Platforms',
    'E-Commerce & High-Frequency Apps',
    'Engineering & Product Teams',
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          <ShahinPortrait className="max-w-[460px] mx-auto lg:mx-0 w-full" />

          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
              About
            </div>

            <h1
              className="font-display font-bold text-4xl sm:text-7xl leading-[0.96] tracking-[-0.04em] text-[var(--ink)]"
              style={{ textWrap: 'balance' }}
            >
              Who's actually behind the work?
            </h1>

            <div className="flex items-center gap-3.5">
              <ShahinAvatar className="w-10 h-10" />
              <p className="bg-[var(--card)] border border-[var(--line)] rounded-2xl rounded-bl-sm py-2.5 px-4 text-sm text-[var(--ink)] shadow-[var(--shadow)]">
                A little more about my journey, technical background, and how I collaborate.
              </p>
            </div>

            <p className="font-display font-semibold text-2xl sm:text-3xl text-[var(--ink)] tracking-tight leading-snug">
              I'm Shahin Alam. I specialize in turning ambiguous, complicated product problems into intuitive, production-grade digital experiences.
            </p>
          </div>
        </div>

        {/* Narrative Dialogue Box */}
        <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-12 mb-16 shadow-[var(--shadow)]">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="bg-[var(--soft)] py-3 px-5 rounded-2xl self-start text-sm sm:text-base">
              <span className="font-bold text-xs text-[var(--mute)] block mb-1">Founder / Client</span>
              What is your background and training?
            </div>
            <div className="bg-[var(--ink)] text-[var(--paper)] py-3.5 px-5 rounded-2xl self-start text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-xs text-[var(--lime)] block mb-1">Shahin Alam</span>
              I come from a Computer Science & Engineering (CSE) background. That means I understand component lifecycles, API constraints, and responsive CSS—I design with technical feasibility baked in from day one.
            </div>

            <div className="bg-[var(--soft)] py-3 px-5 rounded-2xl self-start text-sm sm:text-base mt-2">
              <span className="font-bold text-xs text-[var(--mute)] block mb-1">Founder / Client</span>
              What does your day-to-day engagement look like?
            </div>
            <div className="bg-[var(--ink)] text-[var(--paper)] py-3.5 px-5 rounded-2xl self-start text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-xs text-[var(--lime)] block mb-1">Shahin Alam</span>
              I dig into the root problem, structure the user journey, prototype the highest-friction screens, and test them with real users. Then I deliver clean, tokenized Figma files with comprehensive state documentation for your engineers.
            </div>
          </div>
        </div>

        {/* Design Beliefs */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mb-8">
            What I believe about design.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {beliefs.map((b, i) => (
              <div
                key={b.title}
                className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[220px] shadow-sm"
              >
                <span className="w-9 h-9 rounded-full bg-[var(--soft)] flex items-center justify-center font-bold text-xs">
                  0{i + 1}
                </span>
                <div className="mt-6">
                  <h3 className="font-display font-bold text-2xl tracking-tight mb-2">{b.title}</h3>
                  <p className="text-sm text-[var(--mute)] leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Toolset & Client Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-4">
              What I work with.
            </h2>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span
                  key={t}
                  className="py-2.5 px-5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight mb-4">
              Who I work with.
            </h2>
            <div className="flex flex-wrap gap-2">
              {clients.map((c) => (
                <span
                  key={c}
                  className="py-2.5 px-5 rounded-full bg-[var(--card)] border border-[var(--line)] font-bold text-sm text-[var(--ink)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
