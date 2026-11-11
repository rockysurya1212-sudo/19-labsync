import { useState } from 'react'
import {
  Search,
  Microscope,
  MapPin,
  Clock,
  ShieldCheck,
  Cpu,
  Coins,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { LabEquipment, EquipmentCategory } from '../types'

interface EquipmentCatalogProps {
  equipmentList: LabEquipment[]
  onSelectForBooking: (equipment: LabEquipment) => void
  onToggleStatus?: (equipmentId: string) => void
}

const CATEGORIES: EquipmentCategory[] = [
  'Electron Microscopy',
  'X-Ray & Crystallography',
  'High-Performance Computing',
  'Additive Manufacturing',
  'Spectroscopy & Optical',
  'Rheology & Mechanics',
]

export function EquipmentCatalog({
  equipmentList,
  onSelectForBooking,
  onToggleStatus,
}: EquipmentCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredEquipment = equipmentList.filter((eq) => {
    const matchesCategory = selectedCategory === 'all' || eq.category === selectedCategory
    const matchesSearch =
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.labLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.specs.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search instruments (SEM, XRD, DGX A100, EDS detector), labs, or models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Instruments ({equipmentList.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEquipment.map((eq) => (
          <div
            key={eq.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                      {eq.name}
                    </h4>
                    <span className="font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      {eq.code}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleStatus?.(eq.id)}
                  title="Click to toggle status (Available ➔ Busy ➔ Maintenance)"
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition-all hover:scale-105 active:scale-95 ${
                    eq.status === 'available'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : eq.status === 'busy'
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  <span>{eq.status}</span>
                  <span className="text-[9px] opacity-70">↻</span>
                </button>
              </div>

              {/* Lab Location */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{eq.labLocation}</span>
              </div>

              {/* Specs Pills */}
              <div className="space-y-1 mb-4">
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">
                  Technical Specifications:
                </span>
                <div className="flex flex-wrap gap-1">
                  {eq.specs.map((sp) => (
                    <span
                      key={sp}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prerequisites & Consumables */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1.5 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Safety Level:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {eq.requiredTier}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Assisted Mode:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {eq.operatorAssistedAvailable ? 'Operator Available' : 'Self Autonomous Only'}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer with Rate and Book Action */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="font-mono text-xs">
                <span className="text-slate-400 text-[10px] block uppercase">Grant Tariff</span>
                <span className="text-slate-900 dark:text-white font-bold text-sm">
                  {eq.hourlyRateTokens} Tokens / hr
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onToggleStatus && (
                  <button
                    type="button"
                    onClick={() => onToggleStatus(eq.id)}
                    title="Toggle equipment status"
                    className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    Toggle Status
                  </button>
                )}
                <button
                  onClick={() => onSelectForBooking(eq)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <span>Book Research Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
