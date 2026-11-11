import { useState } from 'react'
import {
  ShieldCheck,
  Award,
  CheckCircle,
  FileCheck,
  AlertTriangle,
  UploadCloud,
  ChevronRight,
} from 'lucide-react'
import { SafetyTierLevel } from '../types'

interface SafetyQualificationModalProps {
  currentTier: SafetyTierLevel
  onUpgradeTier: (newTier: SafetyTierLevel) => void
}

export function SafetyQualificationModal({
  currentTier,
  onUpgradeTier,
}: SafetyQualificationModalProps) {
  const [activeStep, setActiveStep] = useState<number>(2)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [successToast, setSuccessToast] = useState<string | null>(null)

  const handleRunQuiz = () => {
    setQuizSubmitted(true)
    setTimeout(() => {
      onUpgradeTier('Level 3: Autonomous Researcher')
      setSuccessToast('Congratulations! Level 3 Autonomous Researcher certification verified.')
      setTimeout(() => setSuccessToast(null), 5000)
    }, 1200)
  }

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <p className="font-semibold text-sm">{successToast}</p>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-sm">
        <div className="flex items-center gap-2 text-cyan-200 text-xs font-mono uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          TIET CIF Laboratory Safety & Accreditation System
        </div>
        <h3 className="text-2xl font-bold">Research Instrument Operator Tiers</h3>
        <p className="text-cyan-100/90 text-xs max-w-xl mt-1 leading-relaxed">
          To preserve multi-crore specialized instrumentation (FE-SEM, Rigaku XRD, DGX A100), all researchers must hold verified safety credentials before booking solo slots.
        </p>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Tier 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Tier 1
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              COMPLETED
            </span>
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Basic Lab Safety</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            HazMat disposal, chemical fume hoods, electrical isolation, emergency eyewash stations.
          </p>
          <div className="pt-2 text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            ✓ Eligible for HPC Cluster & UV-Vis Spectrophotometer
          </div>
        </div>

        {/* Tier 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-500 shadow-sm ring-1 ring-cyan-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
              Tier 2
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
              ACTIVE STATUS
            </span>
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Supervised Operator</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Vacuum chamber staging, gold sputtering, X-ray radiation interlocks, sample mounting SOP.
          </p>
          <div className="pt-2 text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            ✓ Approved for FE-SEM & SmartLab XRD with Lab Scientist
          </div>
        </div>

        {/* Tier 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-slate-400">
              Tier 3
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
              {currentTier.includes('Level 3') ? 'ACCREDITED' : 'ELIGIBLE FOR TEST'}
            </span>
          </div>
          <h4 className="font-bold text-base text-slate-900 dark:text-white">Autonomous Researcher</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Independent solo operation, beam alignment, rheometer torque calibration, overnight shifts.
          </p>
          <div className="pt-2 text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            {currentTier.includes('Level 3') ? (
              <span className="text-emerald-500 font-bold">✓ Full Solo Access Granted</span>
            ) : (
              <button
                onClick={handleRunQuiz}
                disabled={quizSubmitted}
                className="w-full py-1.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs transition-colors"
              >
                {quizSubmitted ? 'Verifying SOP Quiz...' : 'Take Autonomous Operator Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
