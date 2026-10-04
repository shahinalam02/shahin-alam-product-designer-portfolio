import { useState } from 'react';
import { Sun, Moon, ShieldCheck } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';
import { ShahinAvatar } from './ShahinAvatar';

interface NavbarProps {
  currentRoute: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navbar({ currentRoute, theme, onToggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useProjects();

  const navLinks = [
    { label: 'Work', route: 'work' },
    { label: 'Thinking', route: 'thinking' },
    { label: 'About', route: 'about' },
    { label: 'Services', route: 'services' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-3 sm:px-6 pt-3">
        <div className="max-w-[1280px] mx-auto pointer-events-auto flex items-center justify-between gap-3 bg-[var(--card)]/90 backdrop-blur-md border border-[var(--line)] rounded-full py-2 px-3 sm:px-5 shadow-[var(--shadow)]">
          {/* Brand */}
          <a
            href="#/"
            className="flex items-center gap-2.5 font-display font-bold text-base sm:text-lg tracking-tight text-[var(--ink)] no-underline group"
            aria-label="Shahin Alam, product designer home"
          >
            <ShahinAvatar className="w-8 h-8 group-hover:scale-105 transition-transform" />
            <span className="tracking-tight">SHAHIN ALAM</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 list-none m-0 p-0" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route || (currentRoute.startsWith('case') && link.route === 'work');
              return (
                <a
                  key={link.route}
                  href={`#/${link.route}`}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 no-underline ${
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--paper)]'
                      : 'text-[var(--ink)] hover:bg-[var(--soft)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Zone */}
          <div className="flex items-center gap-2">
            {/* If Admin is logged in, show prominent Admin Studio button */}
            {isAdmin && (
              <a
                href="#/manage"
                className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-xs font-bold transition-all no-underline shadow-sm"
                title="Admin Studio: Manage Projects & Case Studies"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Studio</span>
              </a>
            )}

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-full border border-[var(--line2)] bg-[var(--card)] text-[var(--ink)] flex items-center justify-center hover:bg-[var(--soft)] transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[var(--sun)]" /> : <Moon className="w-4 h-4 text-[var(--ink)]" />}
            </button>

            {/* Start a project primary CTA */}
            <a
              href="#/contact"
              className="inline-flex items-center gap-2.5 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] py-1.5 pl-4 pr-1.5 text-sm font-semibold rounded-full hover:opacity-95 transition-all group no-underline"
            >
              <span>Start<span className="hidden sm:inline"> a project</span></span>
              <span className="w-7 h-7 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-sm font-bold group-hover:rotate-[-45deg] transition-transform duration-200">
                →
              </span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden border border-[var(--line2)] bg-transparent text-[var(--ink)] px-3.5 py-1.5 rounded-full font-semibold text-sm hover:bg-[var(--soft)] transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="fixed inset-0 z-40 bg-[var(--paper)] px-6 pt-28 pb-10 flex flex-col justify-between md:hidden"
        >
          <nav className="flex flex-col gap-2">
            <a
              href="#/"
              onClick={handleLinkClick}
              className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-[var(--ink)] no-underline py-2 border-b border-[var(--line)]"
            >
              Home
            </a>
            {navLinks.map((link) => (
              <a
                key={link.route}
                href={`#/${link.route}`}
                onClick={handleLinkClick}
                className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-[var(--ink)] no-underline py-2 border-b border-[var(--line)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#/contact"
              onClick={handleLinkClick}
              className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-[var(--ink)] no-underline py-2 border-b border-[var(--line)]"
            >
              Contact
            </a>
            <a
              href="#/manage"
              onClick={handleLinkClick}
              className={`font-display font-bold text-lg sm:text-xl py-3 px-5 rounded-2xl no-underline mt-2 flex items-center justify-between ${
                isAdmin
                  ? 'text-[var(--lime-ink)] bg-[var(--lime)]'
                  : 'text-[var(--ink)] bg-[var(--soft)]'
              }`}
            >
              <span>{isAdmin ? 'Admin Studio (Active)' : 'Admin Studio Login'}</span>
              <span>{isAdmin ? '⚙' : '🔒'}</span>
            </a>
          </nav>

          <div className="pt-6 border-t border-[var(--line)] flex items-center justify-between">
            <span className="text-sm text-[var(--mute)]">Shahinalam982.as@gmail.com</span>
            <button
              type="button"
              onClick={onToggleTheme}
              className="px-4 py-2 rounded-full border border-[var(--line2)] text-xs font-semibold flex items-center gap-2"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[var(--sun)]" /> : <Moon className="w-3.5 h-3.5" />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
