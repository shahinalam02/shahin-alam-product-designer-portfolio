import { ShieldCheck, Settings, LogOut } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';

export function AdminBar() {
  const { isAdmin, logoutAdmin } = useProjects();

  if (!isAdmin) return null;

  return (
    <aside
      aria-label="Admin quick toolbar"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[var(--ink)] text-[var(--paper)] py-2 px-4 sm:px-5 rounded-full shadow-2xl border border-[var(--lime)] flex items-center gap-3 sm:gap-4 animate-fade text-xs font-semibold backdrop-blur-md"
    >
      <div className="flex items-center gap-1.5 text-[var(--lime)]">
        <ShieldCheck className="w-4 h-4" />
        <span className="font-bold hidden sm:inline">Admin: Shahin Alam</span>
      </div>

      <span className="opacity-30">|</span>

      <a
        href="#/manage"
        className="text-[var(--paper)] hover:text-[var(--lime)] transition-colors flex items-center gap-1.5 no-underline font-bold"
      >
        <Settings className="w-3.5 h-3.5" />
        <span>Add & Manage Work</span>
      </a>

      <span className="opacity-30">|</span>

      <button
        type="button"
        onClick={() => {
          logoutAdmin();
          window.location.hash = '#/';
        }}
        className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
        title="Sign out of Admin session"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
