import { useEffect, useState } from 'react';
import { ScrollTrigger } from './utils/gsapSetup';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickDiagnosis } from './components/QuickDiagnosis';
import { ProblemCases } from './components/ProblemCases';
import { DesignDiagnosis60s } from './components/DesignDiagnosis60s';
import { FeaturedStory } from './components/FeaturedStory';
import { PrinciplesSection } from './components/PrinciplesSection';
import { TrustFAQ } from './components/TrustFAQ';
import { AboutPreview } from './components/AboutPreview';
import { Process4D } from './components/Process4D';
import { ServicesAccordion } from './components/ServicesAccordion';
import { ProofSection } from './components/ProofSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollMarquee } from './components/ScrollMarquee';

import { WorkPage } from './pages/WorkPage';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { ThinkingPage } from './pages/ThinkingPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { ManageProjectsPage } from './pages/ManageProjectsPage';
import { ProjectsProvider } from './context/ProjectsContext';
import { AdminBar } from './components/AdminBar';

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash || '#/');
  const [highlightedCaseId, setHighlightedCaseId] = useState<number | null>(null);

  // Theme Management (Default: dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-preference') as 'light' | 'dark' | null;
      if (stored) return stored;
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const h = window.location.hash || '#/';
      setCurrentHash(h);

      // In-page anchor scroll
      if (h.startsWith('#') && !h.startsWith('#/')) {
        const anchorId = h.slice(1);
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      // Title sync
      const titles: Record<string, string> = {
        '': 'Shahin Alam — Product Designer',
        work: 'Work — Shahin Alam',
        thinking: 'Thinking — Shahin Alam',
        about: 'About — Shahin Alam',
        services: 'Services — Shahin Alam',
        contact: 'Start a Project — Shahin Alam',
        manage: 'Admin Studio — Shahin Alam',
        admin: 'Admin Studio Login — Shahin Alam',
        login: 'Admin Studio Login — Shahin Alam',
      };

      const path = h.startsWith('#/') ? h.slice(2).split('/')[0] : '';
      if (h.startsWith('#/case/')) {
        document.title = 'Case Study — Shahin Alam';
      } else {
        document.title = titles[path] || 'Shahin Alam — Product Designer';
      }

      // Refresh GSAP ScrollTrigger measurements on route changes
      const rafId = requestAnimationFrame(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 60);
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // Ensure ScrollTrigger accurately calculates measurements after fonts and assets load
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Parse path & params
  const rawPath = currentHash.startsWith('#/') ? currentHash.slice(2) : '';
  const [routeSegment, paramSegment] = rawPath.split('/');

  const handleSelectCaseFromDiagnosis = (caseId: number) => {
    setHighlightedCaseId(caseId);
  };

  return (
    <ProjectsProvider>
      <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)] antialiased transition-colors duration-200">
        {/* Real-time GSAP Scroll Progress Indicator */}
        <ScrollProgressBar />

        {/* Navigation */}
        <Navbar
          currentRoute={routeSegment || 'home'}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Page Content */}
        <main className="flex-1">
          {(!routeSegment || routeSegment === 'home') && (
            <>
              <Hero />
              <QuickDiagnosis onSelectCase={handleSelectCaseFromDiagnosis} />
              <ProblemCases highlightedCaseId={highlightedCaseId} />
              <ScrollMarquee />
              <DesignDiagnosis60s />
              <FeaturedStory />
              <PrinciplesSection />
              <TrustFAQ />
              <AboutPreview />
              <Process4D />
              <ServicesAccordion />
              <ProofSection />
              <ContactForm />
            </>
          )}

          {routeSegment === 'work' && <WorkPage />}

          {routeSegment === 'case' && (
            <CaseStudyDetail caseId={parseInt(paramSegment, 10) || 1} />
          )}

          {routeSegment === 'thinking' && <ThinkingPage />}

          {routeSegment === 'about' && <AboutPage />}

          {routeSegment === 'services' && <ServicesPage />}

          {routeSegment === 'contact' && <ContactPage />}

          {(routeSegment === 'manage' || routeSegment === 'admin' || routeSegment === 'login') && (
            <ManageProjectsPage />
          )}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Toolbar (Only visible to authenticated Admin) */}
        <AdminBar />
      </div>
    </ProjectsProvider>
  );
}
