import { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';
import { ShieldCheck, Plus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ShahinAvatar } from '../components/ShahinAvatar';

export function WorkPage() {
  const { caseList, visualProjectList, isAdmin } = useProjects();
  const [workType, setWorkType] = useState<'cases' | 'projects'>('cases');
  const [filter, setFilter] = useState<'all' | 'fin' | 'web' | 'mob' | 'brand'>('all');

  const filteredCases = caseList.filter((c) => {
    if (filter === 'all') return true;
    return c.category === filter;
  });

  const filteredProjects = visualProjectList.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <div className="pt-28 sm:pt-36 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
              Portfolio Work
            </div>

            {isAdmin && (
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Mode · You can edit content in Studio</span>
              </div>
            )}
          </div>

          <h1
            className="font-display font-bold text-4xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] max-w-[1000px]"
            style={{ textWrap: 'balance' }}
          >
            Different problems.{' '}
            <span className="inline-grid place-items-center w-[1.5em] h-[0.85em] rounded-full align-[-0.05em] mx-[0.06em] bg-[var(--sun)] text-[#101114] overflow-hidden shadow-sm">
              <svg viewBox="0 0 24 24" className="w-[0.6em] h-[0.6em] fill-none stroke-current stroke-[2.4] stroke-linecap-round stroke-linejoin-round">
                <path d="M5 3l14 7-6 2-2 6z" />
              </svg>
            </span>{' '}
            Different solutions.
          </h1>

          <div className="flex items-center gap-3.5 max-w-[560px] sm:ml-20">
            <ShahinAvatar className="w-10 h-10" />
            <p className="bg-[var(--card)] border border-[var(--line)] rounded-2xl rounded-bl-sm py-2.5 px-4 text-sm text-[var(--ink)] shadow-[var(--shadow)]">
              Explore in-depth problem teardowns or browse visual client projects and design systems.
            </p>
          </div>
        </div>

        {/* WORK CATEGORY SELECTOR (CASE STUDIES VS VISUAL PROJECTS) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--line)]">
          <div className="flex items-center gap-2 p-1.5 bg-[var(--soft)] rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setWorkType('cases');
                setFilter('all');
              }}
              className={`py-2 px-5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                workType === 'cases'
                  ? 'bg-[var(--ink)] text-[var(--paper)] shadow-sm'
                  : 'text-[var(--ink)] hover:bg-[var(--card)]'
              }`}
            >
              <span>Case Studies (UX Teardowns)</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${workType === 'cases' ? 'bg-[var(--lime)] text-[var(--lime-ink)]' : 'bg-[var(--line)] text-[var(--mute)]'}`}>
                {caseList.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setWorkType('projects');
                setFilter('all');
              }}
              className={`py-2 px-5 rounded-xl font-display font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
                workType === 'projects'
                  ? 'bg-[var(--ink)] text-[var(--paper)] shadow-sm'
                  : 'text-[var(--ink)] hover:bg-[var(--card)]'
              }`}
            >
              <span>Visual & Showcase Projects</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${workType === 'projects' ? 'bg-[var(--lime)] text-[var(--lime-ink)]' : 'bg-[var(--line)] text-[var(--mute)]'}`}>
                {visualProjectList.length}
              </span>
            </button>
          </div>

          {/* If Admin, show Quick Add button */}
          {isAdmin && (
            <a
              href="#/manage"
              className="inline-flex items-center gap-1.5 py-2 px-5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-xs sm:text-sm shadow-sm hover:opacity-90 transition-all no-underline shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{workType === 'cases' ? 'Add Case Study' : 'Add Visual Project'}</span>
            </a>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2" role="group" aria-label="Filter work">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'fin', label: 'Fintech / SaaS' },
            { id: 'web', label: 'Web Platform' },
            { id: 'mob', label: 'Mobile App' },
            ...(workType === 'projects' ? [{ id: 'brand', label: 'Brand & E-Comm' }] : []),
          ].map((btn) => {
            const isSelected = filter === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilter(btn.id as any)}
                aria-pressed={isSelected}
                className={`py-1.5 px-4 rounded-full font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--ink)] text-[var(--paper)] shadow-sm'
                    : 'border border-[var(--line2)] text-[var(--ink)] hover:bg-[var(--soft)]'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* -------------------------------------------------------------
            CASE STUDIES GRID
        ------------------------------------------------------------- */}
        {workType === 'cases' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCases.map((c) => {
              const bgClass =
                c.themeClass === 'c1'
                  ? 'bg-[var(--panel)] text-[var(--on-panel)]'
                  : c.themeClass === 'c2'
                  ? 'bg-[var(--lime)] text-[var(--lime-ink)]'
                  : 'bg-[var(--sun)] text-[#101114]';

              const goBtnClass =
                c.themeClass === 'c1'
                  ? 'bg-[var(--lime)] text-[var(--lime-ink)]'
                  : 'bg-[#101114] text-[var(--lime)]';

              return (
                <a
                  key={c.id}
                  href={`#/case/${c.id}`}
                  className={`rounded-3xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl no-underline group ${bgClass}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="inline-block py-1 px-3 rounded-full border border-current text-xs font-bold tracking-wide opacity-80">
                        {c.tag}
                      </span>
                      <span className="text-xs font-bold opacity-60">Case #{c.id}</span>
                    </div>

                    <h2 className="font-display font-bold text-2xl sm:text-4xl tracking-tight leading-[1.1] mb-6">
                      "{c.headlineQuote}"
                    </h2>

                    <dl className="grid grid-cols-[70px_1fr] gap-x-3 gap-y-3 text-xs sm:text-sm mb-8 opacity-90">
                      <dt className="opacity-60 font-semibold">Problem</dt>
                      <dd className="m-0 font-medium line-clamp-3">{c.problem}</dd>
                      <dt className="opacity-60 font-semibold">Outcome</dt>
                      <dd className="m-0 font-medium line-clamp-3">{c.outcome}</dd>
                    </dl>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-current/15">
                    <span className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                      <span>Explore problem & solution</span>
                    </span>
                    <span className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm group-hover:rotate-[-45deg] transition-transform duration-200 ${goBtnClass}`}>
                      →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* -------------------------------------------------------------
            VISUAL PROJECTS GRID
        ------------------------------------------------------------- */}
        {workType === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="py-1 px-3 rounded-full text-xs font-bold bg-[var(--soft)] text-[var(--ink)]">
                      {p.categoryLabel}
                    </span>
                    <span className="text-xs font-bold text-[var(--mute)]">{p.year}</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[var(--ink)] leading-snug mb-1">
                    {p.title}
                  </h3>
                  <span className="text-xs font-semibold text-[var(--mute)] block mb-4">
                    Client: {p.client}
                  </span>

                  <p className="text-sm text-[var(--mute)] leading-relaxed mb-5">
                    {p.summary}
                  </p>

                  {p.metrics && (
                    <div className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-xl p-3 text-xs font-semibold mb-5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{p.metrics}</span>
                    </div>
                  )}

                  {/* Deliverables List */}
                  <div className="mb-5">
                    <span className="text-xs font-bold text-[var(--mute)] uppercase tracking-wider block mb-2">
                      Deliverables:
                    </span>
                    <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
                      {p.deliverables.map((item, idx) => (
                        <li key={idx} className="text-xs text-[var(--ink)] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.tools.map((t) => (
                      <span key={t} className="text-[11px] py-1 px-2.5 bg-[var(--soft)] text-[var(--ink)] rounded-lg font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="flex items-center justify-between pt-5 border-t border-[var(--line)]">
                  {p.externalUrl ? (
                    <a
                      href={p.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[var(--ink)] hover:underline flex items-center gap-1.5"
                    >
                      <span>View Live Deliverable</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-[var(--mute)]">Confidential / Direct Deliverable</span>
                  )}

                  {p.figmaUrl && (
                    <a
                      href={p.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1 px-3 rounded-full bg-[var(--soft)] text-xs font-bold text-[var(--ink)] hover:bg-[var(--line2)] flex items-center gap-1"
                    >
                      <span>Figma Specs</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
