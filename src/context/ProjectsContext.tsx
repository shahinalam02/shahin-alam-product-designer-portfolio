import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CASE_STUDIES, CaseStudy } from '../data/portfolioData';

export interface VisualProject {
  id: number;
  title: string;
  client: string;
  year: string;
  category: 'fin' | 'web' | 'mob' | 'brand';
  categoryLabel: string;
  summary: string;
  deliverables: string[];
  tools: string[];
  externalUrl?: string;
  figmaUrl?: string;
  metrics?: string;
  accentColor: string;
  themeStyle: 'dark' | 'lime' | 'gold' | 'slate';
  highlights: string[];
}

export const INITIAL_VISUAL_PROJECTS: Record<number, VisualProject> = {
  101: {
    id: 101,
    title: 'Mercury Multi-brand Design System',
    client: 'Mercury Financial',
    year: '2024',
    category: 'fin',
    categoryLabel: 'Design System / Fintech',
    summary: 'A robust token-driven component architecture built for 24 cross-functional product squads across web, iOS, and Android.',
    deliverables: ['Design Tokens Architecture', 'Component Library (140+ UI components)', 'Accessibility Guidelines (WCAG AAA)', 'Storybook Integration'],
    tools: ['Figma', 'Tokens Studio', 'Storybook', 'TypeScript', 'Tailwind CSS'],
    externalUrl: 'https://github.com',
    figmaUrl: 'https://figma.com',
    metrics: 'Reduced squad sprint handoff friction by 60%',
    accentColor: '#C6F34F',
    themeStyle: 'dark',
    highlights: [
      'Zero token drift between Figma variables and CSS tokens',
      'Tested across 4 dark mode contrast presets',
      'Adopted by 65 engineers in first quarter'
    ]
  },
  102: {
    id: 102,
    title: 'Pulse Health Biometric Companion',
    client: 'Pulse Health Technologies',
    year: '2024',
    category: 'mob',
    categoryLabel: 'Mobile App / Health',
    summary: 'A mindful daily health tracking app using subtle micro-haptics and progressive milestone rings instead of anxiety-inducing alarms.',
    deliverables: ['iOS App Architecture', 'Haptic Feedback Design', 'Interactive Onboarding Flow', 'Design System Spec'],
    tools: ['Figma', 'ProtoPie', 'Principle', 'SwiftUI specs'],
    externalUrl: 'https://apps.apple.com',
    metrics: '+44% 30-day medication habit adherence',
    accentColor: '#FFD84A',
    themeStyle: 'lime',
    highlights: [
      'Glanceable biometric widget for lockscreen',
      'One-tap logging without navigating multi-level menus',
      'Private offline-first encrypted data sync'
    ]
  },
  103: {
    id: 103,
    title: 'Vortex Real-time Infrastructure Console',
    client: 'Vortex Cloud Inc.',
    year: '2023',
    category: 'web',
    categoryLabel: 'Web Platform / DevOps',
    summary: 'High-density telemetry dashboard displaying live Kubernetes pod statuses, memory alerts, and cluster health with zero visual noise.',
    deliverables: ['Information Architecture', 'Data Visualization Hierarchy', 'Incident Alerting Flow', 'Dark UI Kit'],
    tools: ['Figma', 'D3.js tokens', 'Linear', 'React'],
    metrics: 'Cut average incident triage time by 4.2 minutes',
    accentColor: '#1F8A5B',
    themeStyle: 'dark',
    highlights: [
      'Color-blind safe status indicators with dual shape encoding',
      'Keyboard-first command palette for senior site reliability engineers',
      'Dynamic density zoom from micro to macro node topologies'
    ]
  },
  104: {
    id: 104,
    title: 'Aura Minimalist E-Commerce Experience',
    client: 'Aura Studio',
    year: '2024',
    category: 'brand',
    categoryLabel: 'E-Commerce / Brand',
    summary: 'High-converting direct-to-consumer store with instant 1-tap checkout, editorial lookbooks, and fluid page transitions.',
    deliverables: ['E-Commerce UX/UI', 'Mobile-first Checkout', 'Editorial Typography System', 'Animation Specs'],
    tools: ['Figma', 'Shopify Liquid', 'Tailwind CSS', 'GSAP'],
    metrics: '+38% mobile cart-to-purchase conversion',
    accentColor: '#C6F34F',
    themeStyle: 'gold',
    highlights: [
      'Zero-delay product drawer without full page reloads',
      'Automated regional currency and tax transparency',
      'Sub-800ms perception load times'
    ]
  }
};

interface ProjectsContextType {
  // Admin Auth
  isAdmin: boolean;
  adminEmail: string;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPasscode: (oldPass: string, newPass: string) => boolean;

  // Case Studies (In-depth UX Teardowns)
  caseStudies: Record<number, CaseStudy>;
  caseList: CaseStudy[];
  addCaseStudy: (data: Partial<CaseStudy>) => number;
  updateCaseStudy: (id: number, data: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: number) => boolean;

  // Visual / Showcase Projects
  visualProjects: Record<number, VisualProject>;
  visualProjectList: VisualProject[];
  addVisualProject: (data: Partial<VisualProject>) => number;
  updateVisualProject: (id: number, data: Partial<VisualProject>) => void;
  deleteVisualProject: (id: number) => boolean;

  // Global Utilities
  resetAllToDefaults: () => void;
  exportPortfolioJSON: () => string;
  importPortfolioJSON: (jsonStr: string) => boolean;

  // Backward compatibility aliases
  projects: Record<number, CaseStudy>;
  projectList: CaseStudy[];
  addProject: (data: Partial<CaseStudy>) => number;
  updateProject: (id: number, data: Partial<CaseStudy>) => void;
  deleteProject: (id: number) => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
}

const STORAGE_CASES_KEY = 'shahin_portfolio_cases_v3';
const STORAGE_PROJECTS_KEY = 'shahin_portfolio_visual_projects_v3';
const STORAGE_AUTH_KEY = 'shahin_admin_auth_v3';
const STORAGE_PASS_KEY = 'shahin_admin_passcode_v3';

const ADMIN_EMAIL = 'Shahinalam982.as@gmail.com';
const DEFAULT_PASSCODE = 'Qazxcv982@#$%';

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  // Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_AUTH_KEY) === 'true';
  });

  // Case Studies State
  const [caseStudies, setCaseStudies] = useState<Record<number, CaseStudy>>(() => {
    if (typeof window === 'undefined') return CASE_STUDIES;
    try {
      const saved = localStorage.getItem(STORAGE_CASES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load case studies:', e);
    }
    return CASE_STUDIES;
  });

  // Visual Projects State
  const [visualProjects, setVisualProjects] = useState<Record<number, VisualProject>>(() => {
    if (typeof window === 'undefined') return INITIAL_VISUAL_PROJECTS;
    try {
      const saved = localStorage.getItem(STORAGE_PROJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load visual projects:', e);
    }
    return INITIAL_VISUAL_PROJECTS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CASES_KEY, JSON.stringify(caseStudies));
    } catch (e) {
      console.error(e);
    }
  }, [caseStudies]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(visualProjects));
    } catch (e) {
      console.error(e);
    }
  }, [visualProjects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_AUTH_KEY, isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdmin]);

  // Auth Methods
  const loginAdmin = (passcode: string): boolean => {
    const savedCustomPass = localStorage.getItem(STORAGE_PASS_KEY);
    if (
      passcode.trim() === DEFAULT_PASSCODE ||
      (savedCustomPass && passcode.trim() === savedCustomPass.trim())
    ) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_AUTH_KEY);
  };

  const updateAdminPasscode = (oldPass: string, newPass: string): boolean => {
    const currentPass = localStorage.getItem(STORAGE_PASS_KEY) || DEFAULT_PASSCODE;
    if (oldPass.trim() === currentPass.trim() && newPass.trim().length >= 4) {
      localStorage.setItem(STORAGE_PASS_KEY, newPass.trim());
      return true;
    }
    return false;
  };

  // Case Studies Methods
  const caseList = Object.values(caseStudies).sort((a, b) => a.id - b.id);

  const addCaseStudy = (data: Partial<CaseStudy>): number => {
    if (!isAdmin) {
      alert('Action unauthorized. Please log in as Admin.');
      return 0;
    }

    const existingIds = Object.keys(caseStudies).map(Number);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

    const themeClass = data.themeClass || (newId % 3 === 1 ? 'c1' : newId % 3 === 2 ? 'c2' : 'c3');
    const accentColor =
      themeClass === 'c1' ? '#C6F34F' : themeClass === 'c2' ? '#101114' : '#FFD84A';

    const newCase: CaseStudy = {
      id: newId,
      tag: data.tag || `Case 0${newId} · Product Design`,
      category: data.category || 'web',
      categoryLabel: data.categoryLabel || (data.category === 'fin' ? 'Fintech / SaaS' : data.category === 'mob' ? 'Mobile App' : 'Web App / Platform'),
      themeClass,
      accentColor,
      title: data.title || 'Untitled Case Study',
      headlineQuote: data.headlineQuote || data.title || "Users couldn't achieve their primary goal.",
      lead: data.lead || data.problem || 'How this product challenge was transformed into an effortless, evidence-backed experience.',
      problem: data.problem || 'Users faced high friction and confusion during their primary journey.',
      context: data.context || 'A digital product serving growing customers with demanding workflows.',
      role: data.role || 'Lead Product Designer',
      timeline: data.timeline || '6 weeks · Problem Discovery to Launch',
      tools: data.tools && data.tools.length > 0 ? data.tools : ['Figma', 'UserTesting', 'Linear', 'Tailwind CSS'],
      goals: data.goals && data.goals.length > 0 ? data.goals : [
        'Diagnose the exact drop-off points in the flow',
        'Simplify the journey down to essential actions',
        'Ship a validated design that increases conversions'
      ],
      outcome: data.outcome || 'Increased key action completion by 35% and drastically lowered user confusion.',
      methods: data.methods && data.methods.length > 0 ? data.methods : [
        'User Observation Sessions',
        'Funnel Drop-Off Audit',
        'Information Architecture Simplification',
        'Interactive Prototyping'
      ],
      findings: data.findings && data.findings.length > 0 ? data.findings : [
        {
          title: 'Hidden Primary Action',
          desc: 'Users spent excessive time searching for where to begin.',
          note: 'Direct user testing observation'
        }
      ],
      insights: data.insights && data.insights.length > 0 ? data.insights : [
        {
          title: 'Clarity beats cleverness',
          desc: 'Clear affordances and focused visual hierarchy produce immediate confidence.'
        }
      ],
      options: data.options && data.options.length > 0 ? data.options : [
        {
          label: 'A',
          title: 'Multi-step Guided Wizard',
          desc: 'Guiding users step by step with minimal noise.'
        },
        {
          label: 'B',
          title: 'Single-screen Focused Flow (Chosen)',
          desc: 'Presenting one primary action and automatic smart defaults.',
          chosen: true
        }
      ],
      choiceReason: data.choiceReason || 'Tested fastest with 0 hesitation during prototype validation rounds.',
      decisions: data.decisions && data.decisions.length > 0 ? data.decisions : [
        {
          title: 'Simplified Layout Hierarchy',
          why: 'Gives users an immediate visual priority on what to do first.',
          tradeOff: 'Less secondary metadata visible on page load.'
        }
      ],
      beforeJourney: data.beforeJourney && data.beforeJourney.length > 0 ? data.beforeJourney : [
        'User lands on cluttered screen with competing options',
        'Hesitation and scanning without direction',
        'Drop-off or unnecessary support ticket'
      ],
      afterJourney: data.afterJourney && data.afterJourney.length > 0 ? data.afterJourney : [
        'Clear single focal point with instant value proposition',
        'Frictionless 2-step completion flow',
        'Instant confirmation and transparent reassurance'
      ],
      solutionHeadline: data.solutionHeadline || 'A focused, intuitive flow that communicates value immediately.',
      solutionCta: data.solutionCta || 'Explore Solution Architecture',
      learnings: data.learnings && data.learnings.length > 0 ? data.learnings : [
        {
          title: 'Evidence leads to consensus',
          desc: 'Showing video clips of real user struggles aligned engineering and product immediately.'
        }
      ]
    };

    setCaseStudies((prev) => ({
      ...prev,
      [newId]: newCase
    }));

    return newId;
  };

  const updateCaseStudy = (id: number, data: Partial<CaseStudy>) => {
    if (!isAdmin) {
      alert('Action unauthorized. Please log in as Admin.');
      return;
    }
    setCaseStudies((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      return {
        ...prev,
        [id]: {
          ...existing,
          ...data,
          id
        }
      };
    });
  };

  const deleteCaseStudy = (id: number): boolean => {
    if (!isAdmin) {
      alert('Action unauthorized. Please log in as Admin.');
      return false;
    }
    setCaseStudies((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    return true;
  };

  // Visual Projects Methods
  const visualProjectList = Object.values(visualProjects).sort((a, b) => b.id - a.id);

  const addVisualProject = (data: Partial<VisualProject>): number => {
    if (!isAdmin) {
      alert('Action unauthorized. Please log in as Admin.');
      return 0;
    }

    const existingIds = Object.keys(visualProjects).map(Number);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 101;

    const newProj: VisualProject = {
      id: newId,
      title: data.title || 'Untitled Visual Project',
      client: data.client || 'Client Project',
      year: data.year || new Date().getFullYear().toString(),
      category: data.category || 'web',
      categoryLabel: data.categoryLabel || (data.category === 'fin' ? 'Fintech / SaaS' : data.category === 'mob' ? 'Mobile App' : data.category === 'brand' ? 'Brand & Web' : 'Web Platform'),
      summary: data.summary || 'A crafted digital experience focused on clean interaction and visual discipline.',
      deliverables: data.deliverables && data.deliverables.length > 0 ? data.deliverables : ['UI Design', 'Responsive Layout', 'Design Tokens'],
      tools: data.tools && data.tools.length > 0 ? data.tools : ['Figma', 'Tailwind CSS'],
      externalUrl: data.externalUrl || '',
      figmaUrl: data.figmaUrl || '',
      metrics: data.metrics || 'Measurable outcome delivered',
      accentColor: data.accentColor || '#C6F34F',
      themeStyle: data.themeStyle || 'dark',
      highlights: data.highlights && data.highlights.length > 0 ? data.highlights : [
        'Built with atomic component hierarchy',
        'Validated against accessibility standards'
      ]
    };

    setVisualProjects((prev) => ({
      ...prev,
      [newId]: newProj
    }));

    return newId;
  };

  const updateVisualProject = (id: number, data: Partial<VisualProject>) => {
    if (!isAdmin) {
      alert('Action unauthorized. Please log in as Admin.');
      return;
    }
    setVisualProjects((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      return {
        ...prev,
        [id]: {
          ...existing,
          ...data,
          id
        }
      };
    });
  };

  const deleteVisualProject = (id: number): boolean => {
    if (!isAdmin) {
      alert('Action unauthorized. Please log in as Admin.');
      return false;
    }
    setVisualProjects((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    return true;
  };

  const resetAllToDefaults = () => {
    if (!isAdmin) {
      alert('Action unauthorized. Please log in as Admin.');
      return;
    }
    setCaseStudies(CASE_STUDIES);
    setVisualProjects(INITIAL_VISUAL_PROJECTS);
    try {
      localStorage.removeItem(STORAGE_CASES_KEY);
      localStorage.removeItem(STORAGE_PROJECTS_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const exportPortfolioJSON = () => {
    return JSON.stringify({ caseStudies, visualProjects }, null, 2);
  };

  const importPortfolioJSON = (jsonStr: string): boolean => {
    if (!isAdmin) {
      alert('Action unauthorized. Please log in as Admin.');
      return false;
    }
    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed === 'object' && parsed !== null) {
        if (parsed.caseStudies) setCaseStudies(parsed.caseStudies);
        if (parsed.visualProjects) setVisualProjects(parsed.visualProjects);
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  };

  return (
    <ProjectsContext.Provider
      value={{
        isAdmin,
        adminEmail: ADMIN_EMAIL,
        loginAdmin,
        logoutAdmin,
        updateAdminPasscode,

        caseStudies,
        caseList,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,

        visualProjects,
        visualProjectList,
        addVisualProject,
        updateVisualProject,
        deleteVisualProject,

        resetAllToDefaults,
        exportPortfolioJSON,
        importPortfolioJSON,

        // Backwards compatibility
        projects: caseStudies,
        projectList: caseList,
        addProject: addCaseStudy,
        updateProject: updateCaseStudy,
        deleteProject: deleteCaseStudy,
        resetToDefaults: resetAllToDefaults,
        exportJSON: exportPortfolioJSON,
        importJSON: importPortfolioJSON
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return ctx;
}
