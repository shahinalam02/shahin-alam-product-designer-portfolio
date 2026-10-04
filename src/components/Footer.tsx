import { useProjects } from '../context/ProjectsContext';

export function Footer() {
  const { isAdmin, logoutAdmin } = useProjects();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-[var(--line)] bg-[var(--paper)] text-[var(--mute)] text-xs sm:text-sm">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <span className="font-bold text-[var(--ink)] block mb-1">
            © 2026 Shahin Alam · Product Designer
          </span>
          <span>Designed with evidence, built with code.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a href="#/" className="hover:text-[var(--ink)] transition-colors no-underline">Home</a>
          <a href="#/work" className="hover:text-[var(--ink)] transition-colors no-underline">Work</a>
          <a href="#/thinking" className="hover:text-[var(--ink)] transition-colors no-underline">Thinking</a>
          <a href="#/about" className="hover:text-[var(--ink)] transition-colors no-underline">About</a>
          <a href="#/services" className="hover:text-[var(--ink)] transition-colors no-underline">Services</a>
          <a href="#/contact" className="hover:text-[var(--ink)] transition-colors no-underline">Contact</a>

          {/* Admin only Login / Logout */}
          {isAdmin ? (
            <button
              type="button"
              onClick={logoutAdmin}
              className="text-red-500 hover:text-red-600 transition-colors font-bold cursor-pointer"
              title="Logout from Admin Studio"
            >
              Logout (Admin)
            </button>
          ) : (
            <a
              href="#/admin"
              className="hover:text-[var(--ink)] transition-colors no-underline opacity-50 hover:opacity-100 text-[11px]"
              title="Administrator only portal"
            >
              Admin Login
            </a>
          )}

          <button
            type="button"
            onClick={scrollToTop}
            className="font-bold text-[var(--ink)] hover:underline ml-2 cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
