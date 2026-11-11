import { useState } from 'react'
import {
  ArrowLeftRight,
  Clock,
  Sparkles,
  Plus,
  CheckCircle2,
  AlertCircle,
  Check,
  User,
} from 'lucide-react'
import { SlotTradeRequest } from '../types'

interface SlotExchangeBoardProps {
  tradeRequests: SlotTradeRequest[]
  onAcceptTrade: (tradeId: string) => void
  onAddTradeRequest: (req: SlotTradeRequest) => void
}

export function SlotExchangeBoard({
  tradeRequests,
  onAcceptTrade,
  onAddTradeRequest,
}: SlotExchangeBoardProps) {
  const [showForm, setShowForm] = useState(false)
  const [equipmentName, setEquipmentName] = useState('FE-SEM (JEOL JSM-IT800)')
  const [offeredSlot, setOfferedSlot] = useState('Friday, 02:00 - 04:00 PM')
  const [desiredSlot, setDesiredSlot] = useState('Thursday Morning (09:00 - 11:00 AM)')
  const [reason, setReason] = useState('Need XRD powder diffraction completed before SEM analysis.')
  const [successToast, setSuccessToast] = useState<string | null>(null)

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const newReq: SlotTradeRequest = {
      id: `SWAP-${Math.floor(400 + Math.random() * 500)}`,
      requesterName: 'Amanpreet Singh (You)',
      requesterRoll: '102103492',
      equipmentName,
      offeredSlot,
      offeredDate: 'Nov 15',
      desiredSlot,
      desiredDate: 'Nov 14',
      urgency: 'high',
      reason,
      status: 'open',
    }

    onAddTradeRequest(newReq)
    setShowForm(false)
    setSuccessToast('Slot trade request broadcasted to all CIF research scholars!')
    setTimeout(() => setSuccessToast(null), 5000)
  }

  const handleAccept = (tradeId: string) => {
    onAcceptTrade(tradeId)
    setSuccessToast(`Slot swap confirmed! Shift transferred to your calendar.`)
    setTimeout(() => setSuccessToast(null), 5000)
  }

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <p className="font-semibold text-sm">{successToast}</p>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-xs font-semibold px-2 py-1 rounded bg-emerald-200 dark:bg-emerald-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-cyan-500" />
            Peer Waitlist Trading & Slot Exchange Board
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Can't attend your scheduled lab shift? Swap with another qualified researcher with 1-click ledger sync.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-sm flex items-center gap-2 transition-all active:scale-[0.99] whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Propose Slot Swap
        </button>
      </div>

      {/* Form Drawer */}
      {showForm && (
        <form
          onSubmit={handleCreateRequest}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-500/50 shadow-md space-y-4 animate-in slide-in-from-top duration-200"
        >
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Broadcast New Slot Exchange Request
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Equipment
              </label>
              <select
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
              >
                <option value="FE-SEM (JEOL JSM-IT800)">FE-SEM (JEOL JSM-IT800)</option>
                <option value="Powder XRD (Rigaku SmartLab)">Powder XRD (Rigaku SmartLab)</option>
                <option value="DGX A100 HPC Cluster">DGX A100 HPC Cluster</option>
                <option value="Stratasys J55 3D Printer">Stratasys J55 3D Printer</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Your Offered Slot
              </label>
              <input
                type="text"
                value={offeredSlot}
                onChange={(e) => setOfferedSlot(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Desired Replacement Slot
              </label>
              <input
                type="text"
                value={desiredSlot}
                onChange={(e) => setDesiredSlot(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Reason / Urgency Note
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs"
            >
              Post Swap Request
            </button>
          </div>
        </form>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {tradeRequests.map((trade) => (
          <div
            key={trade.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-cyan-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  {trade.id}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {trade.equipmentName}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs text-slate-500 font-mono">
                  Posted by {trade.requesterName} ({trade.requesterRoll})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Offered Slot</span>
                  <span className="font-bold text-slate-900 dark:text-white">{trade.offeredSlot}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500 block text-[10px] uppercase">Desired Replacement</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">
                    {trade.desiredSlot}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                "{trade.reason}"
              </p>
            </div>

            <div className="min-w-[140px]">
              {trade.status === 'open' ? (
                <button
                  onClick={() => handleAccept(trade.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept Swap</span>
                </button>
              ) : (
                <div className="text-xs font-bold font-mono text-emerald-500 text-center">
                  ✓ Trade Completed
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
