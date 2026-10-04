import { useState, useRef } from 'react';
import { useProjects, VisualProject } from '../context/ProjectsContext';
import { CaseStudy } from '../data/portfolioData';
import { Lock, Unlock, Key, Plus, Trash2, Edit3, Eye, Download, Upload, ShieldCheck, ArrowRight, Camera, Image, CheckCircle2, RefreshCw } from 'lucide-react';

export function ManageProjectsPage() {
  const {
    isAdmin,
    adminEmail,
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
    importPortfolioJSON
  } = useProjects();

  // Auth form state
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [authError, setAuthError] = useState('');
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState('');

  // Main Studio state
  const [activeStudioTab, setActiveStudioTab] = useState<'cases' | 'projects' | 'profile'>('cases');
  const [isEditingCase, setIsEditingCase] = useState(false);
  const [editingCaseId, setEditingCaseId] = useState<number | null>(null);

  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  const [caseFormTab, setCaseFormTab] = useState<'basics' | 'problem' | 'research' | 'solution'>('basics');
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Photo management state
  const photoFileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [currentPhotoPreview, setCurrentPhotoPreview] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('shahin_portrait_photo') ||
        localStorage.getItem('shahin_profile_photo') ||
        '/shahin-alam.png'
      );
    }
    return '/shahin-alam.png';
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCurrentPhotoPreview(result);
          try {
            localStorage.setItem('shahin_portrait_photo', result);
            localStorage.setItem('shahin_profile_photo', result);
            window.dispatchEvent(new CustomEvent('shahin-photo-updated', { detail: result }));
            showToast('Profile photo updated across entire portfolio!');
          } catch {
            showToast('Photo updated for this session!');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhotoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrlInput.trim()) return;
    const url = photoUrlInput.trim();
    setCurrentPhotoPreview(url);
    try {
      localStorage.setItem('shahin_portrait_photo', url);
      localStorage.setItem('shahin_profile_photo', url);
      localStorage.setItem('shahin_custom_photo_url', url);
      window.dispatchEvent(new CustomEvent('shahin-photo-updated', { detail: url }));
      showToast('Profile photo URL saved and updated!');
      setPhotoUrlInput('');
    } catch {
      showToast('Photo URL updated!');
    }
  };

  const handleDownloadPhoto = () => {
    const link = document.createElement('a');
    link.href = currentPhotoPreview;
    link.download = 'shahin-alam.png';
    link.click();
    showToast('Downloaded as shahin-alam.png! Place into your public/ folder.');
  };

  const handleResetPhoto = () => {
    localStorage.removeItem('shahin_portrait_photo');
    localStorage.removeItem('shahin_profile_photo');
    localStorage.removeItem('shahin_custom_photo_url');
    setCurrentPhotoPreview('/shahin-alam.png');
    window.dispatchEvent(new CustomEvent('shahin-photo-updated', { detail: '/shahin-alam.png' }));
    showToast('Photo reset to default /shahin-alam.png');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Case Study Form State
  const initialCaseState: Partial<CaseStudy> = {
    title: '',
    headlineQuote: '',
    category: 'fin',
    categoryLabel: 'Fintech / SaaS',
    tag: '',
    themeClass: 'c1',
    accentColor: '#C6F34F',
    lead: '',
    problem: '',
    context: '',
    role: 'Lead Product Designer',
    timeline: '6 weeks · Problem Discovery to Launch',
    tools: ['Figma', 'Maze', 'UserTesting', 'Tailwind CSS'],
    outcome: '',
    goals: [
      'Pinpoint drop-off bottlenecks in user journey',
      'Reduce cognitive friction with progressive disclosure',
      'Deliver measurable conversion improvements'
    ],
    findings: [
      {
        title: 'Information Overload',
        desc: 'Too many competing options caused high hesitation.',
        note: 'Usability testing observation'
      }
    ],
    insights: [
      {
        title: 'Clear priority beats decoration',
        desc: 'Giving users one unmistakable next action increased completion.'
      }
    ],
    beforeJourney: [
      'Cluttered form with competing calls to action',
      'Confusing multi-step verification modal',
      'High rate of abandonment'
    ],
    afterJourney: [
      'Clear single action with smart defaults',
      'Instant inline verification and confirmation',
      'Zero hesitation flow'
    ],
    solutionHeadline: 'A streamlined experience focused strictly on user confidence.',
    solutionCta: 'Explore Solution Architecture'
  };

  const [caseFormData, setCaseFormData] = useState<Partial<CaseStudy>>(initialCaseState);

  // Visual Project Form State
  const initialProjectState: Partial<VisualProject> = {
    title: '',
    client: '',
    year: new Date().getFullYear().toString(),
    category: 'web',
    categoryLabel: 'Web Platform / SaaS',
    summary: '',
    deliverables: ['UI/UX Design', 'Design Tokens', 'Design System Architecture'],
    tools: ['Figma', 'Linear', 'Tailwind CSS'],
    externalUrl: '',
    figmaUrl: '',
    metrics: '',
    accentColor: '#C6F34F',
    themeStyle: 'dark',
    highlights: [
      'Responsive design tokens with dark/light mode balance',
      'Streamlined component handoff for engineering'
    ]
  };

  const [projectFormData, setProjectFormData] = useState<Partial<VisualProject>>(initialProjectState);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = loginAdmin(passcodeAttempt);
    if (success) {
      setPasscodeAttempt('');
      showToast('Welcome back, Shahin! Admin Studio unlocked.');
    } else {
      setAuthError('Incorrect admin passcode. Please verify and try again.');
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = updateAdminPasscode(oldPass, newPass);
    if (ok) {
      setPassChangeSuccess('Passcode updated successfully!');
      setTimeout(() => {
        setShowChangePassModal(false);
        setPassChangeSuccess('');
        setOldPass('');
        setNewPass('');
      }, 1500);
    } else {
      setAuthError('Incorrect current passcode or new passcode is too short (min 4 characters).');
    }
  };

  // Case Study Actions
  const handleStartAddCase = () => {
    const nextNum = caseList.length + 1;
    setCaseFormData({
      ...initialCaseState,
      tag: `Case 0${nextNum} · Product Design`,
      themeClass: nextNum % 3 === 1 ? 'c1' : nextNum % 3 === 2 ? 'c2' : 'c3'
    });
    setEditingCaseId(null);
    setIsEditingCase(true);
    setCaseFormTab('basics');
  };

  const handleStartEditCase = (c: CaseStudy) => {
    setCaseFormData(c);
    setEditingCaseId(c.id);
    setIsEditingCase(true);
    setCaseFormTab('basics');
  };

  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseFormData.title || !caseFormData.problem) {
      alert('Please fill in at least the Title and Problem statement.');
      return;
    }

    if (editingCaseId) {
      updateCaseStudy(editingCaseId, caseFormData);
      showToast(`Updated "${caseFormData.title}" successfully!`);
    } else {
      const newId = addCaseStudy(caseFormData);
      showToast(`Published Case 0${newId} successfully!`);
    }
    setIsEditingCase(false);
    setEditingCaseId(null);
  };

  const handleDeleteCase = (id: number, title: string) => {
    if (window.confirm(`Delete case study "${title}"? This cannot be undone.`)) {
      deleteCaseStudy(id);
      showToast('Case study deleted.');
      if (editingCaseId === id) setIsEditingCase(false);
    }
  };

  // Visual Project Actions
  const handleStartAddProject = () => {
    setProjectFormData({
      ...initialProjectState,
      year: new Date().getFullYear().toString()
    });
    setEditingProjectId(null);
    setIsEditingProject(true);
  };

  const handleStartEditProject = (p: VisualProject) => {
    setProjectFormData(p);
    setEditingProjectId(p.id);
    setIsEditingProject(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFormData.title || !projectFormData.client) {
      alert('Please fill in at least Project Title and Client Name.');
      return;
    }

    if (editingProjectId) {
      updateVisualProject(editingProjectId, projectFormData);
      showToast(`Updated project "${projectFormData.title}"!`);
    } else {
      const newId = addVisualProject(projectFormData);
      showToast(`Published Visual Project #${newId}!`);
    }
    setIsEditingProject(false);
    setEditingProjectId(null);
  };

  const handleDeleteProject = (id: number, title: string) => {
    if (window.confirm(`Delete visual project "${title}"?`)) {
      deleteVisualProject(id);
      showToast('Project deleted.');
      if (editingProjectId === id) setIsEditingProject(false);
    }
  };

  // Export / Import
  const handleCopyExport = () => {
    const json = exportPortfolioJSON();
    navigator.clipboard.writeText(json);
    showToast('Portfolio backup JSON copied to clipboard!');
  };

  const handleDownloadExport = () => {
    const json = exportPortfolioJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shahin-portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded portfolio JSON!');
  };

  const handleApplyImport = () => {
    if (!jsonInput.trim()) return;
    const ok = importPortfolioJSON(jsonInput);
    if (ok) {
      showToast('Portfolio data successfully restored!');
      setShowJsonModal(false);
      setJsonInput('');
    } else {
      alert('Invalid JSON structure. Please check the backup string.');
    }
  };

  /* -------------------------------------------------------------
     IF NOT ADMIN: RENDER SECURE LOGIN SCREEN
  ------------------------------------------------------------- */
  if (!isAdmin) {
    return (
      <div className="pt-28 sm:pt-36 pb-24 min-h-[85vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--lime)] text-[var(--lime-ink)] mx-auto mb-6 shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--mute)]">
              Authorized Access Only
            </span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--ink)] mt-1">
              Admin Studio Login
            </h1>
            <p className="text-xs sm:text-sm text-[var(--mute)] mt-2">
              Portfolio management is restricted to prevent unauthorized alterations or deletion of projects.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                Admin Email
              </label>
              <input
                type="email"
                disabled
                value={adminEmail}
                className="w-full py-2.5 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--soft)]/50 text-[var(--ink)] text-sm font-medium cursor-not-allowed opacity-80"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                autoFocus
                value={passcodeAttempt}
                onChange={(e) => {
                  setPasscodeAttempt(e.target.value);
                  setAuthError('');
                }}
                placeholder="Enter admin passcode"
                className="w-full py-3 px-3.5 rounded-xl border border-[var(--line2)] bg-[var(--soft)] text-[var(--ink)] text-sm font-semibold focus:border-[var(--ink)] focus:outline-none"
              />
            </div>

            {authError && (
              <p className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/30 p-2.5 rounded-lg text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 py-3.5 px-6 rounded-2xl bg-[var(--ink)] text-[var(--paper)] font-display font-bold text-sm hover:opacity-90 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4 text-[var(--lime)]" />
              <span>Unlock Admin Studio</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--line)] text-center">
            <a
              href="#/"
              className="text-xs font-bold text-[var(--mute)] hover:text-[var(--ink)] no-underline"
            >
              ← Return to Portfolio Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
     AUTHENTICATED ADMIN STUDIO
  ------------------------------------------------------------- */
  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[var(--ink)] text-[var(--paper)] py-3 px-6 rounded-2xl shadow-2xl border border-[var(--lime)] font-display font-semibold text-sm flex items-center gap-3 animate-fade">
            <span className="w-5 h-5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center text-xs font-bold">
              ✓
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Admin Bar */}
        <div className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-4 sm:px-6 sm:py-3.5 flex flex-wrap items-center justify-between gap-4 mb-8 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-[var(--ink)]">Admin Studio</span>
                <span className="bg-[var(--lime)] text-[var(--lime-ink)] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Active
                </span>
              </div>
              <span className="text-xs text-[var(--mute)]">{adminEmail}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowChangePassModal(true)}
              className="py-1.5 px-3 rounded-lg border border-[var(--line2)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--soft)] flex items-center gap-1.5 cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Change Passcode</span>
            </button>
            <button
              type="button"
              onClick={logoutAdmin}
              className="py-1.5 px-3.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock / Sign Out</span>
            </button>
          </div>
        </div>

        {/* Studio Navigation & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-5xl text-[var(--ink)] tracking-tight">
              Manage Content
            </h1>
            <p className="text-[var(--mute)] text-sm sm:text-base mt-1">
              Separate management for in-depth Case Studies (problem teardowns) and Visual Projects (portfolio showcase).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyExport}
              className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full border border-[var(--line2)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--card)] cursor-pointer"
              title="Copy portfolio JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>
            <button
              type="button"
              onClick={() => setShowJsonModal(true)}
              className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-full border border-[var(--line2)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--card)] cursor-pointer"
              title="Restore portfolio JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Restore JSON</span>
            </button>
          </div>
        </div>

        {/* SECTION TOGGLE: CASE STUDIES VS PROJECTS */}
        <div className="flex items-center gap-3 p-1.5 bg-[var(--soft)] rounded-2xl w-fit mb-8">
          <button
            type="button"
            onClick={() => {
              setActiveStudioTab('cases');
              setIsEditingCase(false);
              setIsEditingProject(false);
            }}
            className={`py-2.5 px-6 rounded-xl font-display font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeStudioTab === 'cases'
                ? 'bg-[var(--ink)] text-[var(--paper)] shadow-md'
                : 'text-[var(--ink)] hover:bg-[var(--card)]'
            }`}
          >
            <span>Deep Case Studies</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeStudioTab === 'cases' ? 'bg-[var(--lime)] text-[var(--lime-ink)]' : 'bg-[var(--line)] text-[var(--mute)]'}`}>
              {caseList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveStudioTab('projects');
              setIsEditingCase(false);
              setIsEditingProject(false);
            }}
            className={`py-2.5 px-6 rounded-xl font-display font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeStudioTab === 'projects'
                ? 'bg-[var(--ink)] text-[var(--paper)] shadow-md'
                : 'text-[var(--ink)] hover:bg-[var(--card)]'
            }`}
          >
            <span>Visual & Showcase Projects</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeStudioTab === 'projects' ? 'bg-[var(--lime)] text-[var(--lime-ink)]' : 'bg-[var(--line)] text-[var(--mute)]'}`}>
              {visualProjectList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveStudioTab('profile');
              setIsEditingCase(false);
              setIsEditingProject(false);
            }}
            className={`py-2.5 px-6 rounded-xl font-display font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeStudioTab === 'profile'
                ? 'bg-[var(--ink)] text-[var(--paper)] shadow-md'
                : 'text-[var(--ink)] hover:bg-[var(--card)]'
            }`}
          >
            <Camera className="w-4 h-4 text-[var(--lime)]" />
            <span>Profile & Portrait Photo</span>
          </button>
        </div>

        {/* -----------------------------------------------------------
            TAB A: CASE STUDIES MANAGEMENT
        ----------------------------------------------------------- */}
        {activeStudioTab === 'cases' && (
          <div>
            {/* Header + Add button */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--line)]">
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)]">
                  Case Studies ({caseList.length})
                </h2>
                <p className="text-xs text-[var(--mute)]">
                  Teardowns covering Problem Decomposition, User Research, Journey Before/After, and Business Outcomes.
                </p>
              </div>

              {!isEditingCase && (
                <button
                  type="button"
                  onClick={handleStartAddCase}
                  className="py-2.5 px-5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-display font-bold text-xs sm:text-sm hover:opacity-90 shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Case Study</span>
                </button>
              )}
            </div>

            {/* Case Study Form Drawer/Editor */}
            {isEditingCase && (
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-10 mb-12 shadow-xl animate-fade">
                <div className="flex items-center justify-between pb-6 border-b border-[var(--line)] mb-6">
                  <div>
                    <span className="text-xs font-bold text-[var(--mute)] uppercase tracking-wider">
                      {editingCaseId ? `Editing Case #${editingCaseId}` : 'New UX Case Study'}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[var(--ink)]">
                      {caseFormData.title || 'Untitled Case Study'}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingCase(false)}
                      className="py-2 px-4 rounded-full border border-[var(--line)] text-xs font-bold text-[var(--mute)]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCase}
                      className="py-2 px-6 rounded-full bg-[var(--ink)] text-[var(--paper)] font-bold text-xs hover:opacity-90"
                    >
                      {editingCaseId ? 'Update Case' : 'Publish Case'}
                    </button>
                  </div>
                </div>

                {/* Tabbed Form */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
                  {(['basics', 'problem', 'research', 'solution'] as const).map((t, idx) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setCaseFormTab(t)}
                      className={`py-1.5 px-4 rounded-xl text-xs font-bold capitalize ${
                        caseFormTab === t ? 'bg-[var(--lime)] text-[var(--lime-ink)]' : 'bg-[var(--soft)] text-[var(--ink)]'
                      }`}
                    >
                      {idx + 1}. {t}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSaveCase} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {caseFormTab === 'basics' && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                          Problem Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={caseFormData.title || ''}
                          onChange={(e) => setCaseFormData({ ...caseFormData, title: e.target.value, headlineQuote: e.target.value })}
                          placeholder="e.g. Users couldn't understand the fee structure"
                          className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm font-bold text-[var(--ink)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                          Category
                        </label>
                        <select
                          value={caseFormData.category || 'fin'}
                          onChange={(e) => {
                            const val = e.target.value as 'fin' | 'web' | 'mob';
                            const label = val === 'fin' ? 'Fintech / SaaS' : val === 'mob' ? 'Mobile App' : 'Web Platform';
                            setCaseFormData({ ...caseFormData, category: val, categoryLabel: label });
                          }}
                          className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                        >
                          <option value="fin">Fintech / SaaS</option>
                          <option value="web">Web Platform</option>
                          <option value="mob">Mobile App</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                          Badge Tag
                        </label>
                        <input
                          type="text"
                          value={caseFormData.tag || ''}
                          onChange={(e) => setCaseFormData({ ...caseFormData, tag: e.target.value })}
                          placeholder="e.g. Case 04 · B2B Flow"
                          className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                          Role
                        </label>
                        <input
                          type="text"
                          value={caseFormData.role || ''}
                          onChange={(e) => setCaseFormData({ ...caseFormData, role: e.target.value })}
                          className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                          Timeline
                        </label>
                        <input
                          type="text"
                          value={caseFormData.timeline || ''}
                          onChange={(e) => setCaseFormData({ ...caseFormData, timeline: e.target.value })}
                          className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                        />
                      </div>
                    </>
                  )}

                  {caseFormTab === 'problem' && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                          The Core Problem Statement *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={caseFormData.problem || ''}
                          onChange={(e) => setCaseFormData({ ...caseFormData, problem: e.target.value })}
                          placeholder="What wasn't working? e.g. 52% of users stalled at step 2 because..."
                          className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                          Context & Constraints
                        </label>
                        <textarea
                          rows={2}
                          value={caseFormData.context || ''}
                          onChange={(e) => setCaseFormData({ ...caseFormData, context: e.target.value })}
                          className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                        />
                      </div>
                    </>
                  )}

                  {caseFormTab === 'research' && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                          Key Usability Finding
                        </label>
                        <input
                          type="text"
                          value={caseFormData.findings?.[0]?.title || ''}
                          onChange={(e) => {
                            const f = [...(caseFormData.findings || [])];
                            f[0] = { ...f[0], title: e.target.value, desc: f[0]?.desc || '', note: 'User test' };
                            setCaseFormData({ ...caseFormData, findings: f });
                          }}
                          placeholder="Finding Title: e.g. Hidden Confirmation Step"
                          className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)] mb-2"
                        />
                        <textarea
                          rows={2}
                          value={caseFormData.findings?.[0]?.desc || ''}
                          onChange={(e) => {
                            const f = [...(caseFormData.findings || [])];
                            f[0] = { ...f[0], title: f[0]?.title || 'Finding', desc: e.target.value, note: 'User test' };
                            setCaseFormData({ ...caseFormData, findings: f });
                          }}
                          placeholder="Finding description..."
                          className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                        />
                      </div>
                    </>
                  )}

                  {caseFormTab === 'solution' && (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase text-emerald-600 mb-1">
                          Final Measurable Outcome *
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={caseFormData.outcome || ''}
                          onChange={(e) => setCaseFormData({ ...caseFormData, outcome: e.target.value })}
                          placeholder="e.g. +48% completion rate, 0 drop-offs at checkout"
                          className="w-full p-3 rounded-xl border border-emerald-500/40 bg-[var(--soft)]/50 text-sm font-semibold text-[var(--ink)]"
                        />
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-[var(--line)]">
                    <button
                      type="button"
                      onClick={() => setIsEditingCase(false)}
                      className="py-2 px-5 rounded-full border border-[var(--line)] text-xs font-bold text-[var(--mute)]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-xs hover:opacity-90 shadow-sm"
                    >
                      {editingCaseId ? 'Save Case Changes' : 'Publish Case Study'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Case Studies */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseList.map((c) => (
                <div
                  key={c.id}
                  className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="py-1 px-3 rounded-full text-xs font-bold bg-[var(--lime)] text-[var(--lime-ink)]">
                        {c.tag}
                      </span>
                      <span className="text-xs font-bold text-[var(--mute)]">Case #{c.id}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[var(--ink)] leading-snug mb-3">
                      "{c.headlineQuote}"
                    </h3>

                    <p className="text-xs text-[var(--mute)] line-clamp-3 mb-4">
                      {c.problem}
                    </p>

                    <div className="bg-[var(--soft)]/60 rounded-xl p-3 text-xs mb-5">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Outcome:</span>
                      <p className="m-0 text-[var(--ink)] line-clamp-2">{c.outcome}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
                    <a
                      href={`#/case/${c.id}`}
                      className="text-xs font-bold text-[var(--ink)] hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Live</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartEditCase(c)}
                        className="py-1.5 px-3 rounded-lg bg-[var(--soft)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--line2)] flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCase(c.id, c.title)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                        title="Delete case study"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------
            TAB B: VISUAL & SHOWCASE PROJECTS MANAGEMENT
        ----------------------------------------------------------- */}
        {activeStudioTab === 'projects' && (
          <div>
            {/* Header + Add button */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--line)]">
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)]">
                  Visual Projects ({visualProjectList.length})
                </h2>
                <p className="text-xs text-[var(--mute)]">
                  Client deliverables, design systems, UI showcases, and live product designs.
                </p>
              </div>

              {!isEditingProject && (
                <button
                  type="button"
                  onClick={handleStartAddProject}
                  className="py-2.5 px-5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-display font-bold text-xs sm:text-sm hover:opacity-90 shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Visual Project</span>
                </button>
              )}
            </div>

            {/* Project Form Editor */}
            {isEditingProject && (
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-10 mb-12 shadow-xl animate-fade">
                <div className="flex items-center justify-between pb-6 border-b border-[var(--line)] mb-6">
                  <div>
                    <span className="text-xs font-bold text-[var(--mute)] uppercase tracking-wider">
                      {editingProjectId ? `Editing Project #${editingProjectId}` : 'New Visual Project'}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[var(--ink)]">
                      {projectFormData.title || 'Untitled Project'}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProject(false)}
                      className="py-2 px-4 rounded-full border border-[var(--line)] text-xs font-bold text-[var(--mute)]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProject}
                      className="py-2 px-6 rounded-full bg-[var(--ink)] text-[var(--paper)] font-bold text-xs hover:opacity-90"
                    >
                      {editingProjectId ? 'Update Project' : 'Publish Project'}
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectFormData.title || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                      placeholder="e.g. Mercury Design System & Tokens"
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm font-bold text-[var(--ink)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Client / Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectFormData.client || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, client: e.target.value })}
                      placeholder="e.g. Mercury Financial"
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      value={projectFormData.year || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, year: e.target.value })}
                      placeholder="2024"
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Category
                    </label>
                    <select
                      value={projectFormData.category || 'web'}
                      onChange={(e) => {
                        const val = e.target.value as any;
                        const label = val === 'fin' ? 'Design System / Fintech' : val === 'mob' ? 'Mobile App' : val === 'brand' ? 'Brand & Web' : 'Web Platform';
                        setProjectFormData({ ...projectFormData, category: val, categoryLabel: label });
                      }}
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                    >
                      <option value="fin">Fintech / Design System</option>
                      <option value="web">Web Platform / SaaS</option>
                      <option value="mob">Mobile App / iOS</option>
                      <option value="brand">E-Commerce / Brand</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Key Metric / Result
                    </label>
                    <input
                      type="text"
                      value={projectFormData.metrics || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, metrics: e.target.value })}
                      placeholder="e.g. -60% sprint handoff friction"
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Summary / Description
                    </label>
                    <textarea
                      rows={2}
                      value={projectFormData.summary || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, summary: e.target.value })}
                      placeholder="Summary of what was designed and delivered..."
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Tools Used (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={projectFormData.tools?.join(', ') || ''}
                      onChange={(e) =>
                        setProjectFormData({
                          ...projectFormData,
                          tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        })
                      }
                      placeholder="Figma, Storybook, React"
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Deliverables (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={projectFormData.deliverables?.join(', ') || ''}
                      onChange={(e) =>
                        setProjectFormData({
                          ...projectFormData,
                          deliverables: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        })
                      }
                      placeholder="Design Tokens, Component Library, Figma UI Kit"
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Live / External Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={projectFormData.externalUrl || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, externalUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                      Figma Prototype / File Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={projectFormData.figmaUrl || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, figmaUrl: e.target.value })}
                      placeholder="https://figma.com/..."
                      className="w-full p-3 rounded-xl border border-[var(--line2)] bg-[var(--soft)]/50 text-sm text-[var(--ink)]"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-[var(--line)]">
                    <button
                      type="button"
                      onClick={() => setIsEditingProject(false)}
                      className="py-2 px-5 rounded-full border border-[var(--line)] text-xs font-bold text-[var(--mute)]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-xs hover:opacity-90 shadow-sm"
                    >
                      {editingProjectId ? 'Save Project Changes' : 'Publish Visual Project'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Visual Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visualProjectList.map((p) => (
                <div
                  key={p.id}
                  className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="py-1 px-3 rounded-full text-xs font-bold bg-[var(--soft)] text-[var(--ink)]">
                        {p.categoryLabel}
                      </span>
                      <span className="text-xs font-bold text-[var(--mute)]">{p.year}</span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-[var(--ink)] leading-snug mb-1">
                      {p.title}
                    </h3>
                    <span className="text-xs text-[var(--mute)] block mb-3">Client: {p.client}</span>

                    <p className="text-xs text-[var(--mute)] line-clamp-3 mb-4">
                      {p.summary}
                    </p>

                    {p.metrics && (
                      <div className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-xl p-2.5 text-xs font-semibold mb-4">
                        ✓ {p.metrics}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tools.slice(0, 3).map((tool) => (
                        <span key={tool} className="text-[11px] py-0.5 px-2 bg-[var(--soft)] text-[var(--ink)] rounded-md font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
                    <span className="text-xs text-[var(--mute)] font-mono">ID #{p.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartEditProject(p)}
                        className="py-1.5 px-3 rounded-lg bg-[var(--soft)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--line2)] flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(p.id, p.title)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                        title="Delete visual project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -----------------------------------------------------------
            TAB C: PROFILE & PORTRAIT PHOTO MANAGEMENT
        ----------------------------------------------------------- */}
        {activeStudioTab === 'profile' && (
          <div className="flex flex-col gap-8 animate-fade">
            {/* Header */}
            <div className="pb-4 border-b border-[var(--line)]">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--ink)]">
                Profile & Portrait Photo
              </h2>
              <p className="text-xs sm:text-sm text-[var(--mute)] mt-1">
                Manage your real photograph displayed on the About page, homepage portrait card, and circular navigation avatars.
              </p>
            </div>

            {/* Main Grid: Previews + Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 items-start">
              {/* Left Column: Live Previews */}
              <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
                <h3 className="font-display font-bold text-lg text-[var(--ink)] flex items-center gap-2">
                  <Image className="w-5 h-5 text-[var(--lime)]" />
                  <span>Current Live Previews</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-6 items-center">
                  {/* Portrait Preview */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--mute)]">
                      About & Home Card (4:5)
                    </span>
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[var(--line)] bg-[var(--soft)] shadow-md">
                      <img
                        src={currentPhotoPreview}
                        alt="Shahin Alam portrait preview"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/shahin-alam.png';
                        }}
                      />
                    </div>
                  </div>

                  {/* Avatar Preview */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--mute)] block mb-2">
                        Nav & Chat Avatar (1:1)
                      </span>
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--card)] shadow-[0_0_0_2px_var(--ink)] bg-[var(--soft)]">
                        <img
                          src={currentPhotoPreview}
                          alt="Shahin Alam avatar preview"
                          className="w-full h-full object-cover object-[center_20%]"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/shahin-alam.png';
                          }}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[var(--line)]">
                      <span className="text-xs font-bold text-[var(--ink)] block mb-1">
                        Active Source:
                      </span>
                      <code className="text-[11px] bg-[var(--soft)] p-1.5 rounded-lg text-[var(--mute)] break-all block">
                        {currentPhotoPreview.startsWith('data:')
                          ? 'Uploaded custom image (Data URL stored in browser)'
                          : currentPhotoPreview}
                      </code>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetPhoto}
                      className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl border border-[var(--line2)] text-xs font-semibold text-[var(--mute)] hover:text-[var(--ink)] w-fit cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset to default</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Upload, URL & Vercel Instructions */}
              <div className="flex flex-col gap-6">
                {/* Method 1: Upload from Computer */}
                <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h4 className="font-display font-bold text-base sm:text-lg text-[var(--ink)] mb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[var(--lime)]" />
                    <span>Upload Your Photo</span>
                  </h4>
                  <p className="text-xs text-[var(--mute)] mb-4">
                    Choose a photo from your computer. It instantly updates across the website in real-time.
                  </p>

                  <input
                    ref={photoFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => photoFileInputRef.current?.click()}
                      className="py-2.5 px-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-xs sm:text-sm hover:opacity-90 shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choose Photo from Computer</span>
                    </button>
                    <span className="text-xs text-[var(--mute)]">JPG, PNG, or WEBP</span>
                  </div>
                </div>

                {/* Method 2: Enter Hosted Image URL */}
                <div className="bg-[var(--card)] border border-[var(--line)] rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h4 className="font-display font-bold text-base sm:text-lg text-[var(--ink)] mb-2">
                    Or Use a Hosted Image URL
                  </h4>
                  <p className="text-xs text-[var(--mute)] mb-4">
                    Paste a link to your photo (e.g. GitHub avatar, Cloudinary, LinkedIn, or personal CDN).
                  </p>

                  <form onSubmit={handleSavePhotoUrl} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="url"
                      value={photoUrlInput}
                      onChange={(e) => setPhotoUrlInput(e.target.value)}
                      placeholder="https://avatars.githubusercontent.com/u/... or https://..."
                      className="flex-1 py-2.5 px-3.5 rounded-xl border border-[var(--line2)] bg-[var(--soft)] text-xs sm:text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
                    />
                    <button
                      type="submit"
                      className="py-2.5 px-5 rounded-xl bg-[var(--ink)] text-[var(--paper)] font-bold text-xs hover:opacity-90 cursor-pointer shrink-0"
                    >
                      Save URL
                    </button>
                  </form>
                </div>

                {/* Vercel Deployment Guide & Download Button */}
                <div className="bg-[var(--panel)] text-[var(--on-panel)] border border-[var(--panel-line)] rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="flex items-center gap-2 text-[var(--lime)] font-bold text-sm mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>How to Keep Your Photo Permanent on Vercel</span>
                  </div>

                  <p className="text-xs text-[var(--panel-mute)] leading-relaxed mb-4">
                    When deploying to Vercel, the web server looks for your image file inside your project's <code className="bg-white/10 px-1.5 py-0.5 rounded text-[var(--on-panel)] font-mono">public/</code> directory at <code className="bg-white/10 px-1.5 py-0.5 rounded text-[var(--on-panel)] font-mono">public/shahin-alam.png</code>.
                  </p>

                  <ol className="text-xs text-[var(--panel-mute)] flex flex-col gap-2 pl-4 mb-6 list-decimal">
                    <li>
                      Click the button below to download your current photo as <strong className="text-[var(--on-panel)]">shahin-alam.png</strong>.
                    </li>
                    <li>
                      Move that downloaded file into the <strong className="text-[var(--on-panel)]">public/</strong> folder in your local project root: <code className="bg-white/10 px-1.5 py-0.5 rounded text-[var(--on-panel)] font-mono">public/shahin-alam.png</code>.
                    </li>
                    <li>
                      Commit and push to GitHub: <code className="bg-white/10 px-1.5 py-0.5 rounded text-[var(--on-panel)] font-mono">git add public/shahin-alam.png && git commit -m "Add profile photo" && git push</code>.
                    </li>
                    <li>
                      Vercel will rebuild and your photo will be served permanently on your live domain!
                    </li>
                  </ol>

                  <button
                    type="button"
                    onClick={handleDownloadPhoto}
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-xs sm:text-sm hover:opacity-90 shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download as shahin-alam.png</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Change Passcode Modal */}
        {showChangePassModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[var(--card)] text-[var(--ink)] rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-[var(--line)]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-lg">Change Admin Passcode</h3>
                <button
                  type="button"
                  onClick={() => setShowChangePassModal(false)}
                  className="w-7 h-7 rounded-full bg-[var(--soft)] flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdatePassword} className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                    Current Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[var(--line2)] bg-[var(--soft)] text-xs text-[var(--ink)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[var(--mute)] mb-1">
                    New Passcode (min 4 chars)
                  </label>
                  <input
                    type="password"
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[var(--line2)] bg-[var(--soft)] text-xs text-[var(--ink)]"
                  />
                </div>

                {passChangeSuccess && (
                  <p className="text-xs text-emerald-600 font-bold">{passChangeSuccess}</p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowChangePassModal(false)}
                    className="py-2 px-4 rounded-full text-xs font-semibold text-[var(--mute)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-5 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs font-bold"
                  >
                    Save Passcode
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* JSON Import Modal */}
        {showJsonModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[var(--card)] text-[var(--ink)] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[var(--line)] animate-fade">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-xl text-[var(--ink)]">
                  Restore Portfolio Data
                </h3>
                <button
                  type="button"
                  onClick={() => setShowJsonModal(false)}
                  className="w-8 h-8 rounded-full bg-[var(--soft)] flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-[var(--mute)] mb-4">
                Paste your JSON backup below to restore all your case studies and visual projects.
              </p>

              <textarea
                rows={8}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{ "caseStudies": { ... }, "visualProjects": { ... } }'
                className="w-full py-3 px-3.5 rounded-xl border border-[var(--line2)] bg-[var(--soft)] font-mono text-xs text-[var(--ink)] mb-4 focus:outline-none"
              />

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowJsonModal(false)}
                  className="py-2 px-4 rounded-full text-xs font-semibold text-[var(--mute)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyImport}
                  className="py-2.5 px-5 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs font-bold hover:opacity-90"
                >
                  Restore Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
