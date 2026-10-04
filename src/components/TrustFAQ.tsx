import { useState } from 'react';
import { FAQS } from '../data/portfolioData';
import { ShahinAvatar } from './ShahinAvatar';

export function TrustFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-20" aria-labelledby="faq-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
        {/* Left Headline */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            07 · Trust
          </div>

          <h2
            id="faq-heading"
            className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-[-0.04em] text-[var(--ink)]"
            style={{ textWrap: 'balance' }}
          >
            Before you hand over your product, you probably have questions.
          </h2>

          <div className="flex items-center gap-3.5 max-w-[480px]">
            <ShahinAvatar className="w-10 h-10" />
            <p className="bg-[var(--card)] border border-[var(--line)] rounded-2xl rounded-bl-sm py-2.5 px-4 text-sm text-[var(--ink)] shadow-[var(--shadow)]">
              Fair. Here are the ones I hear most from founders and product leads.
            </p>
          </div>
        </div>

        {/* Right Accordion List */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] shadow-lg'
                    : 'bg-[var(--card)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--line2)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 sm:px-8 text-left font-display font-semibold text-lg sm:text-2xl tracking-tight flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                      isOpen
                        ? 'bg-[var(--lime)] text-[var(--lime-ink)] rotate-45'
                        : 'bg-[var(--soft)] text-[var(--ink)]'
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-sm sm:text-base opacity-85 leading-relaxed animate-fade">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
