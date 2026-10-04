import { ContactForm } from '../components/ContactForm';

export function ContactPage() {
  return (
    <div className="pt-32 sm:pt-44 lg:pt-48 pb-32 sm:pb-40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Header */}
        <div className="mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 self-start bg-[var(--card)] border border-[var(--line)] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] shadow-[0_0_0_1.5px_var(--ink)]"></span>
            Contact
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-7xl lg:text-8xl tracking-[-0.045em] text-[var(--ink)] mb-4">
            Start the conversation.
          </h1>
          <p className="text-lg sm:text-2xl text-[var(--mute)] max-w-xl">
            Tell me about your product, your current friction points, and what you're hoping to achieve.
          </p>
        </div>

        {/* Reusable Contact Form Section */}
        <ContactForm />
      </div>
    </div>
  );
}
