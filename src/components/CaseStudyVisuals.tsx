import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  CreditCard,
  Layers,
  Smartphone,
  Activity,
  Zap,
  Lock,
  ChevronRight,
  Sliders,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

/* --------------------------------------------------------------------------
   CASE 1: FINTECH / TREASURY DASHBOARD ("TreasuryFlow")
-------------------------------------------------------------------------- */

export function FintechDashboardMockup({ variant = 'after' }: { variant?: 'before' | 'after' | 'card' }) {
  const [activeAccount, setActiveAccount] = useState<number>(0);
  const [sweepEnabled, setSweepEnabled] = useState<boolean>(true);

  if (variant === 'before') {
    return (
      <div className="w-full bg-[#18191E] text-stone-300 rounded-2xl overflow-hidden border border-red-500/30 font-mono text-xs select-none shadow-2xl">
        <div className="bg-[#121316] px-4 py-2.5 border-b border-stone-800 flex items-center justify-between text-stone-500">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block"></span>
          </div>
          <span className="text-[11px] text-red-400 font-sans flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            Legacy: 14 competing cards & 7 unprioritized metrics
          </span>
        </div>
        <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 opacity-80">
          <div className="bg-[#202228] p-3 rounded border border-stone-800">
            <span className="text-[10px] text-stone-500 block">Total Ledger</span>
            <span className="text-sm font-bold text-stone-300">$4,820,950</span>
          </div>
          <div className="bg-[#202228] p-3 rounded border border-red-500/40">
            <span className="text-[10px] text-red-400 block">Unsettled ACH</span>
            <span className="text-sm font-bold text-red-400">$340,120 !</span>
          </div>
          <div className="bg-[#202228] p-3 rounded border border-stone-800">
            <span className="text-[10px] text-stone-500 block">Yield Est.</span>
            <span className="text-sm font-bold text-stone-300">4.82%</span>
          </div>
          <div className="bg-[#202228] p-3 rounded border border-stone-800">
            <span className="text-[10px] text-stone-500 block">Pending Wires</span>
            <span className="text-sm font-bold text-stone-300">8</span>
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-6 flex flex-col gap-2">
          <div className="p-3 bg-red-950/20 border border-red-900/40 rounded text-red-300 text-[11px] font-sans">
            <b>Warning:</b> 3 secondary accounts require manual daily verification before sweeping.
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-stone-500 pt-2">
            <div className="h-10 bg-stone-800/40 rounded flex items-center justify-center">Tab A</div>
            <div className="h-10 bg-stone-800/40 rounded flex items-center justify-center">Tab B</div>
            <div className="h-10 bg-stone-800/40 rounded flex items-center justify-center">Tab C</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#111317] text-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl font-sans select-none">
      {/* Browser Topbar */}
      <div className="bg-[#17191F] px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80 inline-block"></span>
          </div>
          <span className="ml-2 font-mono text-[11px] text-stone-400 bg-black/30 px-3 py-1 rounded-full border border-white/5">
            treasuryflow.io/vault/overview
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Vault Active
          </span>
        </div>
      </div>

      {/* Main Interface Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-[360px]">
        {/* Sidebar Navigation */}
        <aside className="border-r border-white/10 p-4 bg-[#14161C] hidden md:flex flex-col justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider px-2 mb-1">Treasury</span>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--lime)] text-black font-bold text-xs shadow-sm">
              <Activity className="w-3.5 h-3.5" />
              <span>Overview</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/5 font-semibold text-xs transition-colors">
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Vaults</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/5 font-semibold text-xs transition-colors">
              <Zap className="w-3.5 h-3.5" />
              <span>Smart Sweeps</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/5 font-semibold text-xs transition-colors">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Accounts</span>
            </div>
          </div>
          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
            <span className="text-[10px] text-stone-400 block mb-0.5">Automated Yield</span>
            <span className="font-bold text-[var(--lime)] text-sm">+4.85% APY</span>
          </div>
        </aside>

        {/* Dashboard Main Canvas */}
        <main className="p-5 sm:p-7 flex flex-col gap-6 bg-[#0E1014]">
          {/* Top Hero Balance Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-white/10">
            <div>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Total Available Treasury
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  $4,820,950<span className="text-stone-500 text-xl font-normal">.40</span>
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3 h-3" /> +12.4% vs last mo
                </span>
              </div>
            </div>

            {/* Smart 1-Click Action */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setSweepEnabled(!sweepEnabled)}
                className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  sweepEnabled
                    ? 'bg-[var(--lime)] text-black shadow-md shadow-[var(--lime)]/10'
                    : 'bg-white/10 text-stone-300'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{sweepEnabled ? 'Auto-Sweep: ON' : 'Auto-Sweep: OFF'}</span>
              </button>
              <button
                type="button"
                className="py-2 px-4 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-bold transition-all"
              >
                Transfer
              </button>
            </div>
          </div>

          {/* SVG Sparkline Graph */}
          <div className="bg-[#14171E] p-4 sm:p-5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--lime)]" /> 30-Day Liquidity Trajectory
              </span>
              <div className="flex gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--lime)]/20 text-[var(--lime)] font-bold">30D</span>
                <span className="text-[10px] px-2 py-0.5 rounded text-stone-500">90D</span>
                <span className="text-[10px] px-2 py-0.5 rounded text-stone-500">1Y</span>
              </div>
            </div>

            <svg viewBox="0 0 500 100" className="w-full h-20 overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C6F34F" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#C6F34F" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,80 Q70,70 120,55 T240,40 T360,25 T500,10 L500,100 L0,100 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M0,80 Q70,70 120,55 T240,40 T360,25 T500,10"
                fill="none"
                stroke="#C6F34F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="500" cy="10" r="4.5" fill="#C6F34F" />
            </svg>
          </div>

          {/* Connected Banks Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: 'JPMorgan Chase', balance: '$2,450,000', status: 'Primary Sweeper', safe: true },
              { name: 'Silicon Valley Bank', balance: '$1,820,950', status: 'High Yield Money Market', safe: true },
              { name: 'Revolut Business', balance: '$550,000', status: 'Global Operations FX', safe: true },
            ].map((acc, idx) => (
              <div
                key={acc.name}
                onClick={() => setActiveAccount(idx)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeAccount === idx
                    ? 'bg-white/10 border-[var(--lime)] shadow-sm'
                    : 'bg-[#14171E] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{acc.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="font-display font-bold text-base text-white">{acc.balance}</div>
                <div className="text-[10px] text-stone-400 mt-1">{acc.status}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   CASE 2: SAAS / WEB PRODUCT ("PulseCraft")
-------------------------------------------------------------------------- */

export function SaaSPlatformMockup({ variant = 'after' }: { variant?: 'before' | 'after' | 'card' }) {
  const [teamSize, setTeamSize] = useState<number>(25);

  if (variant === 'before') {
    return (
      <div className="w-full bg-[#FAFAFA] text-stone-700 rounded-2xl overflow-hidden border border-red-300 font-sans text-xs select-none shadow-xl p-6">
        <div className="bg-red-50 text-red-700 p-2.5 rounded-lg border border-red-200 text-xs font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          Legacy Page: 4 competing CTAs, low contrast, no interactive value proof
        </div>
        <div className="flex flex-col gap-3 opacity-75">
          <div className="h-6 bg-stone-300 rounded w-3/4"></div>
          <div className="h-4 bg-stone-200 rounded w-1/2"></div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="py-2 px-3 bg-blue-600 text-white rounded text-xs">Request Enterprise Demo</span>
            <span className="py-2 px-3 bg-stone-200 text-stone-700 rounded text-xs">Download Whitepaper</span>
            <span className="py-2 px-3 bg-stone-200 text-stone-700 rounded text-xs">Talk to Sales</span>
            <span className="py-2 px-3 bg-stone-200 text-stone-700 rounded text-xs">Sign Up Trial</span>
          </div>
        </div>
      </div>
    );
  }

  const estimatedLift = (teamSize * 568).toLocaleString();

  return (
    <div className="w-full bg-[var(--card)] text-[var(--ink)] rounded-3xl overflow-hidden border border-[var(--line)] shadow-2xl font-sans select-none">
      {/* Browser Header */}
      <div className="bg-[var(--soft)] px-4 py-3 border-b border-[var(--line)] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-400 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-stone-400 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-stone-400 inline-block"></span>
          </div>
          <span className="ml-2 font-mono text-[11px] text-[var(--mute)] bg-[var(--card)] px-3 py-1 rounded-full border border-[var(--line)]">
            pulsecraft.design/growth
          </span>
        </div>
        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> +62% Conversion Lift
        </span>
      </div>

      {/* Hero Section */}
      <div className="p-6 sm:p-10 flex flex-col gap-6">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] text-xs font-bold mb-3">
            One Clear Promise
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-4xl text-[var(--ink)] leading-tight tracking-tight">
            Turn complex design handoff into a single, high-converting flow.
          </h3>
          <p className="text-xs sm:text-sm text-[var(--mute)] mt-2 leading-relaxed">
            Eliminated technical jargon. Replaced 4 confusing call-to-actions with one unified interactive calculator that proves ROI instantly.
          </p>
        </div>

        {/* Live Interactive ROI Calculator Widget */}
        <div className="bg-[var(--soft)] border border-[var(--line)] p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-[var(--mute)]">Engineering & Design Squad Size</span>
              <span className="text-[var(--ink)] text-sm">{teamSize} contributors</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value, 10))}
              className="w-full accent-[var(--lime)] cursor-pointer"
            />
          </div>

          <div className="bg-[var(--card)] p-4 rounded-xl border border-[var(--line)] text-center min-w-[170px] shadow-sm">
            <span className="text-[10px] font-bold text-[var(--mute)] uppercase tracking-wider block">Estimated Annual Lift</span>
            <div className="font-display font-extrabold text-2xl text-emerald-600 dark:text-emerald-400 mt-0.5">
              +${estimatedLift}
            </div>
            <span className="text-[10px] text-stone-400">based on reduced rework</span>
          </div>
        </div>

        {/* Single Primary Action + Trust Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--line)]">
          <button
            type="button"
            className="py-3 px-6 rounded-full bg-[var(--ink)] text-[var(--paper)] font-bold text-xs sm:text-sm flex items-center gap-2 hover:opacity-95 shadow-md cursor-pointer"
          >
            <span>Start 14-Day Pilot</span>
            <ArrowUpRight className="w-4 h-4 text-[var(--lime)]" />
          </button>
          <div className="flex items-center gap-2 text-xs text-[var(--mute)] font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero credit card required · Instant setup</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   CASE 3: MOBILE CHECKOUT ("NomadPay")
-------------------------------------------------------------------------- */

export function MobileCheckoutMockup({ variant = 'after' }: { variant?: 'before' | 'after' | 'card' }) {
  const [completed, setCompleted] = useState<boolean>(false);

  if (variant === 'before') {
    return (
      <div className="w-full max-w-sm mx-auto bg-stone-900 text-stone-300 rounded-[36px] overflow-hidden border border-red-500/40 p-5 font-sans text-xs select-none shadow-2xl">
        <div className="bg-red-500/20 text-red-300 p-2 rounded-xl text-[11px] font-bold mb-3 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          Legacy 6-step flow: 19 form inputs & hidden fees
        </div>
        <div className="flex flex-col gap-2 opacity-60">
          <div className="h-3 bg-stone-700 rounded w-1/3"></div>
          <div className="h-8 bg-stone-800 rounded w-full border border-stone-700"></div>
          <div className="h-8 bg-stone-800 rounded w-full border border-stone-700"></div>
          <div className="h-8 bg-stone-800 rounded w-full border border-red-500/50"></div>
          <span className="text-[10px] text-red-400">Step 3 of 6: Billing address confirmation required</span>
          <div className="h-8 bg-stone-800 rounded w-full border border-stone-700 mt-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-[#0F1115] text-white rounded-[40px] overflow-hidden border-4 border-[#252830] shadow-2xl font-sans select-none p-5 sm:p-6">
      {/* Dynamic Island Header */}
      <div className="flex justify-between items-center text-xs text-stone-400 mb-6">
        <span className="font-bold text-white text-xs">9:41</span>
        <div className="w-20 h-4 bg-black rounded-full mx-auto"></div>
        <div className="flex items-center gap-1 text-[10px]">
          <span>5G</span>
          <div className="w-4 h-2 rounded-sm border border-stone-400"></div>
        </div>
      </div>

      {/* Clean 2-Stage Progress */}
      <div className="flex items-center justify-between text-xs mb-6">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[var(--lime)] text-black font-extrabold flex items-center justify-center text-[10px]">
            1
          </span>
          <span className="font-bold text-white text-xs">Express Pay</span>
        </div>
        <span className="text-[11px] text-stone-500 font-medium">Stage 2: Receipt</span>
      </div>

      {/* Cart Summary */}
      <div className="bg-[#181B22] p-4 rounded-2xl border border-white/5 mb-5">
        <div className="flex justify-between items-center text-xs text-stone-400 mb-2">
          <span>Subtotal</span>
          <span className="text-white font-bold">$165.00</span>
        </div>
        <div className="flex justify-between items-center text-xs text-stone-400 mb-2">
          <span>Express Shipping</span>
          <span className="text-emerald-400 font-bold">FREE</span>
        </div>
        <div className="flex justify-between items-center text-xs text-stone-400 pt-2 border-t border-white/10">
          <span className="font-bold text-white text-sm">Total Guaranteed</span>
          <span className="font-display font-extrabold text-xl text-[var(--lime)]">$165.00</span>
        </div>
      </div>

      {/* Biometric One-Tap Payment Action */}
      {!completed ? (
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => setCompleted(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-white text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-stone-200 transition-all cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>Pay with Face ID (1-Tap)</span>
          </button>
          <span className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-emerald-400" />
            End-to-end encrypted biometric checkout
          </span>
        </div>
      ) : (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center animate-fade">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-1.5" />
          <span className="font-bold text-white text-sm block">Payment Confirmed in 1.2s!</span>
          <span className="text-[11px] text-stone-400">No forms filled · 52% faster flow</span>
          <button
            type="button"
            onClick={() => setCompleted(false)}
            className="text-[10px] text-[var(--lime)] font-bold mt-2 underline block mx-auto cursor-pointer"
          >
            Reset Demo
          </button>
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   VISUAL PROJECTS SHOWCASE MOCKUPS (For WorkPage.tsx)
-------------------------------------------------------------------------- */

export function VisualProjectShowcase({ project }: { project: any }) {
  // 101 Mercury Design System
  if (project.id === 101) {
    return (
      <div className="w-full bg-[#13151A] rounded-2xl p-4 sm:p-5 border border-white/10 text-white select-none shadow-inner">
        <div className="flex items-center justify-between text-[11px] text-stone-400 mb-3 pb-2 border-b border-white/10">
          <span className="font-bold text-[var(--lime)] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Design System Tokens
          </span>
          <span className="font-mono text-[10px]">140+ Components</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-stone-400 uppercase font-bold">Button Hierarchy</span>
            <button type="button" className="py-2 px-3 rounded-lg bg-[var(--lime)] text-black font-bold text-xs shadow-sm">
              Primary Active
            </button>
            <button type="button" className="py-2 px-3 rounded-lg bg-white/10 text-white font-semibold text-xs border border-white/10">
              Secondary Ghost
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-stone-400 uppercase font-bold">Color Variables</span>
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-md bg-[#C6F34F] inline-block"></span>
              <span className="text-[10px] font-mono text-stone-400">#C6F34F (Brand)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-md bg-[#101114] border border-white/20 inline-block"></span>
              <span className="text-[10px] font-mono text-stone-400">#101114 (Ink)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 102 Pulse Health Mobile
  if (project.id === 102) {
    return (
      <div className="w-full bg-[#16141D] rounded-2xl p-4 sm:p-5 border border-white/10 text-white select-none shadow-inner flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
            Biometric Sleep & Heart
          </span>
          <div className="font-display font-extrabold text-3xl text-white">92%</div>
          <span className="text-xs text-stone-400">Recovery Score Today</span>
        </div>
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
            <circle cx="32" cy="32" r="26" stroke="#FFD84A" strokeWidth="6" strokeDasharray="163" strokeDashoffset="18" strokeLinecap="round" fill="none" />
          </svg>
          <Activity className="w-5 h-5 text-amber-400 absolute" />
        </div>
      </div>
    );
  }

  // 103 Vortex Infrastructure Console
  if (project.id === 103) {
    return (
      <div className="w-full bg-[#0C121E] rounded-2xl p-4 sm:p-5 border border-white/10 text-white select-none shadow-inner font-mono text-xs">
        <div className="flex items-center justify-between text-[11px] text-stone-400 mb-3 pb-2 border-b border-white/10">
          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            cluster-us-east-1
          </span>
          <span>99.99% Uptime</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 rounded bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-300">
              node-{i + 1}
            </div>
          ))}
        </div>
        <div className="text-[10px] text-stone-400 flex justify-between pt-1">
          <span>Latency: 12ms</span>
          <span>Pods: 128 Active</span>
        </div>
      </div>
    );
  }

  // 104 Aura Minimalist E-Commerce
  return (
    <div className="w-full bg-[#181614] rounded-2xl p-4 sm:p-5 border border-white/10 text-white select-none shadow-inner">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-bold text-[var(--lime)] uppercase tracking-wider">
          Lookbook 2024
        </span>
        <span className="text-xs font-bold text-white">$240 USD</span>
      </div>
      <div className="h-16 rounded-xl bg-gradient-to-r from-stone-800 to-stone-900 border border-white/10 flex items-center justify-between px-4 mb-2">
        <span className="font-display font-bold text-sm text-stone-200">Aura Wool Overcoat</span>
        <button type="button" className="py-1.5 px-3 rounded-full bg-[var(--lime)] text-black text-xs font-bold shadow-sm">
          1-Tap Bag
        </button>
      </div>
      <div className="flex gap-1.5 text-[10px] text-stone-400 font-bold">
        <span className="py-0.5 px-2 rounded bg-white/10 text-white">S</span>
        <span className="py-0.5 px-2 rounded bg-white/10 text-white">M</span>
        <span className="py-0.5 px-2 rounded bg-[var(--lime)] text-black font-extrabold">L</span>
        <span className="py-0.5 px-2 rounded bg-white/10 text-white">XL</span>
      </div>
    </div>
  );
}
