import { useState, useMemo } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: boolean; email?: boolean; problem?: boolean } = {};

    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = true;
    if (!formData.problem.trim()) newErrors.problem = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <section id="start" className="py-12 sm:py-20" aria-labelledby="contact-heading">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-[var(--panel)] text-[var(--on-panel)] rounded-3xl sm:rounded-[48px] p-6 sm:p-14 lg:p-20 border border-[var(--panel-line)] shadow-2xl">
          {/* Header */}
          <div className="flex flex-col gap-6 mb-8">
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
              You don't need a polished brief. Just tell me what you're working on and what's feeling off.
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
                  Your name
                </label>
                <input
                  type="text"
                  id="nm"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Hi, I'm..."
                  className={`bg-white/5 border rounded-2xl py-3.5 px-4 text-base text-[var(--on-panel)] placeholder:text-white/30 focus:outline-none transition-colors ${
                    errors.name ? 'border-red-400 bg-red-950/20' : 'border-transparent focus:border-[var(--lime)]'
                  }`}
                />
                {errors.name && <span className="text-red-400 text-xs font-semibold">Please tell me what to call you.</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="em" className="font-display font-semibold text-lg sm:text-xl text-[var(--on-panel)]">
                  Email
                </label>
                <input
                  type="email"
                  id="em"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className={`bg-white/5 border rounded-2xl py-3.5 px-4 text-base text-[var(--on-panel)] placeholder:text-white/30 focus:outline-none transition-colors ${
                    errors.email ? 'border-red-400 bg-red-950/20' : 'border-transparent focus:border-[var(--lime)]'
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
                  What's the biggest problem right now?
                </label>
                <textarea
                  id="pb"
                  rows={3}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  placeholder="Users drop off at signup. The product is hard to explain. Anything on your mind."
                  className={`bg-white/5 border rounded-2xl p-4 text-base text-[var(--on-panel)] placeholder:text-white/30 focus:outline-none resize-y transition-colors ${
                    errors.problem ? 'border-red-400 bg-red-950/20' : 'border-transparent focus:border-[var(--lime)]'
                  }`}
                />
                {errors.problem && <span className="text-red-400 text-xs font-semibold">Even a single sentence helps me prepare.</span>}
              </div>

              {/* Timeline Chips */}
              <div className="flex flex-col gap-3">
                <span className="font-display font-semibold text-lg sm:text-xl text-[var(--on-panel)]">
                  Your timeline
                </span>
                <div className="flex flex-wrap gap-2">
                  {['ASAP', '1–3 months', 'Exploring'].map((time) => {
                    const isSelected = formData.timeline === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeline: time })}
                        className={`py-2 px-4 rounded-full font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--lime)] text-[var(--lime-ink)] shadow-md'
                            : 'bg-white/10 text-[var(--on-panel)] hover:bg-white/15'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget */}
              <div className="flex flex-col gap-2">
                <label htmlFor="bd" className="font-display font-semibold text-lg sm:text-xl text-[var(--on-panel)]">
                  Budget <small className="text-xs text-[var(--panel-mute)] font-normal ml-1">Optional</small>
                </label>
                <input
                  type="text"
                  id="bd"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="A rough range is fine"
                  className="bg-white/5 border border-transparent focus:border-[var(--lime)] rounded-2xl py-3.5 px-4 text-base text-[var(--on-panel)] placeholder:text-white/30 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-[var(--lime)] text-[var(--lime-ink)] border border-[var(--lime)] py-3 pl-8 pr-3 text-base sm:text-lg font-bold rounded-full hover:opacity-95 transition-all group"
                >
                  <span>Start the conversation</span>
                  <span className="w-10 h-10 rounded-full bg-[var(--lime-ink)] text-[var(--lime)] flex items-center justify-center text-lg font-bold group-hover:rotate-[-45deg] transition-transform duration-200">
                    →
                  </span>
                </button>
              </div>
            </form>
          ) : (
            /* Success Response State */
            <div className="flex flex-col gap-4 max-w-xl animate-fade">
              <div className="bg-white/10 border border-[var(--panel-line)] text-[var(--on-panel)] p-5 rounded-3xl rounded-bl-sm">
                <span className="block text-xs font-bold text-[var(--panel-mute)] mb-1">You</span>
                I'm {formData.name}. I'm building a {formData.build.toLowerCase()} ({formData.timeline}). The biggest challenge: "{formData.problem}"
              </div>
              <div className="bg-[var(--lime)] text-[var(--lime-ink)] p-5 rounded-3xl rounded-br-sm">
                <span className="block text-xs font-bold opacity-70 mb-1">Shahin</span>
                Thanks {formData.name}, I've received your note! I read every inquiry personally and will reply to <b>{formData.email}</b> within 24 hours with a few clarifying questions.
              </div>
              <div className="flex items-center gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[var(--panel-mute)] underline hover:text-white cursor-pointer"
                >
                  Edit your message
                </button>
                <a
                  href={`mailto:Shahinalam982.as@gmail.com?subject=Project%20Inquiry%20from%20${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.problem)}`}
                  className="text-xs font-bold text-[var(--lime)] underline hover:opacity-80"
                >
                  Or open directly in email client →
                </a>
              </div>
            </div>
          )}

          {/* Direct Email fallback */}
          <div className="mt-12 pt-8 border-t border-[var(--panel-line)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm text-[var(--panel-mute)]">
            <div>
              Prefer direct email?{' '}
              <a
                href="mailto:Shahinalam982.as@gmail.com"
                className="font-bold text-[var(--on-panel)] hover:underline"
              >
                Shahinalam982.as@gmail.com
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
