import { Microscope, Zap, ShieldCheck, Coins, CheckCircle2, Award } from 'lucide-react'

interface BentoStatsProps {
  activeInstrumentsCount: number
  scheduledRunsToday: number
  userTokens: number
  currentTier: string
}

export function BentoStats({
  activeInstrumentsCount,
  scheduledRunsToday,
  userTokens,
  currentTier,
}: BentoStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Tile 1: Facility Equipment */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-cyan-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Active Research Equipment</span>
          <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {activeInstrumentsCount} / 6
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Operational
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          FE-SEM, Rigaku XRD, DGX A100 & PolyJet
        </p>
      </div>

      {/* Tile 2: Scheduled Shifts Today */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-cyan-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Scheduled Experiments</span>
          <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Microscope className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {scheduledRunsToday} Shifts
          </span>
          <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">
            94% Utilization
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Supervised operator assistance on standby
        </p>
      </div>

      {/* Tile 3: Research Tokens */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-cyan-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>CIF Research Grant Credits</span>
          <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Coins className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {userTokens}
          </span>
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            Tokens
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Faculty Guide Grant Code: TIET-DST-2024
        </p>
      </div>

      {/* Tile 4: Safety & Skill Qualification */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-cyan-500/40 transition-all">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          <span>Operator Qualification</span>
          <span className="p-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold font-mono text-slate-900 dark:text-white truncate">
            {currentTier.split(':')[0]}
          </span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Active
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Approved for FE-SEM & SmartLab XRD
        </p>
      </div>
    </div>
  )
}
