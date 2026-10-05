import { useState, useMemo } from 'react';
import { CheckCircle2, Send, Copy, ExternalLink, Mail, Loader2, ArrowRight } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    build: 'SaaS',
    problem: '',
    timeline: '1–3 months',
    budget: '',
  });

  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; problem?: boolean }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'sent' | 'mailto'>('sent');

  const TARGET_EMAIL = 'Shahinalam982.as@gmail.com';

  // Calculate live progress percentage
  const progressPercent = useMemo(() => {
    let filled = 0;
    if (formData.name.trim()) filled++;
    if (formData.email.trim()) filled++;
    if (formData.build) filled++;
    if (formData.problem.trim()) filled++;
    if (formData.timeline) filled++;
    return (filled / 5) * 100;
  }, [formData]);

  const emailSubject = useMemo(() => {
    return `New Project Inquiry from ${formData.name || 'Visitor'} (${formData.build})`;
  }, [formData.name, formData.build]);

  const formattedMessage = useMemo(() => {
    return [
      `Hi Shahin,`,
      ``,
      `I would like to discuss a design project:`,
      `• Name: ${formData.name}`,
      `• Email: ${formData.email}`,
      `• Product Type: ${formData.build}`,
      `• Target Timeline: ${formData.timeline}`,
      `• Rough Budget: ${formData.budget || 'Not specified'}`,
      ``,
      `What we are trying to solve / current challenge:`,
      `"${formData.problem}"`,
      ``,
      `---`,
      `Sent via Shahin Alam Portfolio (Section 12: Your Turn)`,
    ].join('\n');
  }, [formData]);

  const mailtoUrl = useMemo(() => {
    return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(formattedMessage)}`;
  }, [emailSubject, formattedMessage]);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formattedMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: boolean; email?: boolean; problem?: boolean } = {};

    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = true;
    if (!formData.problem.trim()) newErrors.problem = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSending(true);

      // Attempt direct web dispatch to Shahin's email inbox
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            _replyto: formData.email,
            _subject: emailSubject,
            product_type: formData.build,
            timeline: formData.timeline,
            budget: formData.budget || 'Not specified',
            problem_description: formData.problem,
            full_formatted_brief: formattedMessage,
          }),
        });

        if (res.ok) {
          setDeliveryMethod('sent');
        } else {
          setDeliveryMethod('mailto');
        }
      } catch {
        // Fallback to mailto if network or adblocker interrupts formsubmit
        setDeliveryMethod('mailto');
      } finally {
        setIsSending(false);
        setSubmitted(true);

        // Also trigger mailto directly so their desktop or mobile mail client opens immediately with everything pre-filled
        try {
          const mailLink = document.createElement('a');
          mailLink.href = mailtoUrl;
          mailLink.click();
        } catch {
          // ignore popup restrictions
        }
      }
    }
  };

  return (
    <section id="start" className="py-24 sm:py-36 lg:py-44" aria-labelledby="contact-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-[var(--panel)] text-[var(--on-panel)] rounded-3xl sm:rounded-[48px] p-8 sm:p-16 lg:p-24 border border-[var(--panel-line)] shadow-2xl">
          {/* Header */}
          <div className="flex flex-col gap-6 mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 self-start bg-white/10 border border-[var(--panel-line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide text-[var(--on-panel)]">
              <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
              12 · Your turn
            </div>

            <h2
              id="contact-heading"
              className="font-display font-extrabold text-4xl sm:text-7xl lg:text-[100px] leading-[0.92] tracking-[-0.05em] text-[var(--on-panel)] max-w-[1000px]"
              style={{ textWrap: 'balance' }}
            >
              So... what are you building?
            </h2>

            <p className="text-lg sm:text-2xl text-[var(--panel-mute)] max-w-xl font-medium">
              You don't need a polished brief. Just tell me what you're working on and what's feeling off. Messages route directly to{' '}
              <strong className="text-[var(--lime)] font-mono">{TARGET_EMAIL}</strong>.
            </p>
          </div>

          {/* Form Completion Progress Bar */}
          <div className="h-1.5 bg-[var(--panel-line)] max-w-3xl mb-10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--lime)] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${submitted ? 100 : progressPercent}%` }}
            ></div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="nm" className="font-display font-semibold text-lg sm:text-xl text-[var(--on-panel)]">
                  Your name <span className="text-[var(--lime)]">*</span>
                </label>
                <input
                  type="text"
                  id="nm"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Hi, I'm..."
                  className={`bg-white/5 border rounded-2xl py-3.5 px-4 text-base text-[var(--on-panel)] placeholder:text-[var(--panel-mute)] focus:outline-none transition-colors ${
                    errors.name ? 'border-red-400 bg-red-950/20' : 'border-[var(--panel-line)] focus:border-[var(--lime)]'
                  }`}
                />
                {errors.name && <span className="text-red-400 text-xs font-semibold">Please tell me what to call you.</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="em" className="font-display font-semibold text-lg sm:text-xl text-[var(--on-panel)]">
                  Your email <span className="text-[var(--lime)]">*</span>
                </label>
                <input
                  type="email"
                  id="em"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className={`bg-white/5 border rounded-2xl py-3.5 px-4 text-base text-[var(--on-panel)] placeholder:text-[var(--panel-mute)] focus:outline-none transition-colors ${
                    errors.email ? 'border-red-400 bg-red-950/20' : 'border-[var(--panel-line)] focus:border-[var(--lime)]'
                  }`}
                />
                {errors.email && <span className="text-red-400 text-xs font-semibold">Enter a valid email address I can reply to.</span>}
              </div>

              {/* What are you building? Chips */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <span className="font-display font-semibold text-lg sm:text-xl text-[var(--on-panel)]">
                  What are you building?
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {['Website', 'SaaS', 'Mobile app', 'Other'].map((type) => {
                    const isSelected = formData.build === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, build: type })}
                        className={`py-2.5 px-5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--lime)] text-[var(--lime-ink)] shadow-md scale-105'
                            : 'bg-white/10 text-[var(--on-panel)] hover:bg-white/15'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Problem textarea */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label htmlFor="pb" className="font-display font-semibold text-lg sm:text-xl text-[var(--on-panel)]">
                  What's the main challenge or friction point? <span className="text-[var(--lime)]">*</span>
                </label>
                <textarea
                  id="pb"
                  rows={4}
                  required
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="Users get confused at onboarding... / Our website isn't converting... / We need to build our MVP from scratch..."
                  className={`bg-white/5 border rounded-2xl p-4 text-base text-[var(--on-panel)] placeholder:text-[var(--panel-mute)] focus:outline-none resize-none transition-colors ${
                    errors.problem ? 'border-red-400 bg-red-950/20' : 'border-[var(--panel-line)] focus:border-[var(--lime)]'
                  }`}
                />
                {errors.problem && <span className="text-red-400 text-xs font-semibold">A brief summary of what's off helps me give you a useful response.</span>}
              </div>

              {/* Timeline dropdown/chips */}
              <div className="flex flex-col gap-2">
                <label className="font-display font-semibold text-lg sm:text-xl text-[var(--on-panel)]">
                  Target timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="bg-white/5 border border-[var(--panel-line)] focus:border-[var(--lime)] rounded-2xl py-3.5 px-4 text-base text-[var(--on-panel)] focus:outline-none cursor-pointer"
                >
                  <option value="ASAP" className="bg-[#121316] text-white">ASAP (Next 2-3 weeks)</option>
                  <option value="1–3 months" className="bg-[#121316] text-white">1–3 months (Standard)</option>
                  <option value="3–6 months" className="bg-[#121316] text-white">3–6 months</option>
                  <option value="Just exploring" className="bg-[#121316] text-white">Just exploring options</option>
                </select>
              </div>

              {/* Budget input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="bg" className="font-display font-semibold text-lg sm:text-xl text-[var(--on-panel)]">
                  Budget expectation <span className="text-xs text-[var(--panel-mute)] font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  id="bg"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g. $3k – $8k / A rough range is fine"
                  className="bg-white/5 border border-[var(--panel-line)] focus:border-[var(--lime)] rounded-2xl py-3.5 px-4 text-base text-[var(--on-panel)] placeholder:text-[var(--panel-mute)] focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center gap-3 bg-[var(--lime)] text-[var(--lime-ink)] border border-[var(--lime)] py-3 pl-8 pr-3 text-base sm:text-lg font-bold rounded-full hover:opacity-95 transition-all group disabled:opacity-50 cursor-pointer shadow-lg"
                >
                  <span>{isSending ? 'Sending directly to Shahin...' : 'Start the conversation'}</span>
                  <span className="w-10 h-10 rounded-full bg-[var(--lime-ink)] text-[var(--lime)] flex items-center justify-center text-lg font-bold group-hover:rotate-[-45deg] transition-transform duration-200">
                    {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : '→'}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            /* Success Response State with Direct Dispatch Confirmation */
            <div className="flex flex-col gap-6 max-w-2xl animate-fade">
              <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 p-6 rounded-3xl flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-[var(--lime)] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-1">
                    Inquiry Routed to Shahin Alam
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--panel-mute)] leading-relaxed">
                    Your project details have been dispatched to <strong className="text-[var(--lime)] font-mono">{TARGET_EMAIL}</strong>. I read and answer every inquiry personally within 24 hours.
                  </p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white/5 border border-[var(--panel-line)] text-[var(--on-panel)] p-6 rounded-3xl flex flex-col gap-3">
                <span className="text-xs font-bold text-[var(--panel-mute)] uppercase tracking-wider">
                  Summary of your note:
                </span>
                <div className="font-medium text-sm sm:text-base leading-relaxed">
                  "I'm <strong className="text-white">{formData.name}</strong> ({formData.email}). Building a <strong className="text-[var(--lime)]">{formData.build}</strong> on a {formData.timeline} timeline. Main challenge: {formData.problem}"
                </div>
              </div>

              {/* Instant Action Toolbar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={mailtoUrl}
                  className="py-3 px-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md hover:opacity-95 no-underline"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open in Email App (Gmail / Mail)</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="py-3 px-5 rounded-full bg-white/10 hover:bg-white/15 text-[var(--on-panel)] text-xs sm:text-sm font-bold inline-flex items-center gap-2 border border-[var(--panel-line)] cursor-pointer transition-colors"
                >
                  <Copy className="w-4 h-4 text-[var(--lime)]" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Inquiry Text'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="py-3 px-4 rounded-full text-xs text-[var(--panel-mute)] hover:text-white underline cursor-pointer"
                >
                  Edit or send another note
                </button>
              </div>
            </div>
          )}

          {/* Direct Email fallback bar */}
          <div className="mt-12 pt-8 border-t border-[var(--panel-line)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm text-[var(--panel-mute)]">
            <div>
              Prefer your own email client?{' '}
              <a
                href={`mailto:${TARGET_EMAIL}?subject=Project%20Inquiry%20from%20Portfolio`}
                className="font-bold text-[var(--lime)] hover:underline inline-flex items-center gap-1"
              >
                <span>{TARGET_EMAIL}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#/work" className="hover:text-[var(--on-panel)] no-underline">Work</a>
              <a href="#/thinking" className="hover:text-[var(--on-panel)] no-underline">Thinking</a>
              <a href="#/about" className="hover:text-[var(--on-panel)] no-underline">About</a>
              <a href="#/services" className="hover:text-[var(--on-panel)] no-underline">Services</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
