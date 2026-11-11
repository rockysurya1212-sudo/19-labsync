import { useState } from 'react'
import {
  FileSpreadsheet,
  Coins,
  Plus,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Receipt,
} from 'lucide-react'
import { ConsumableEntry } from '../types'

interface ConsumablesLogProps {
  logs: ConsumableEntry[]
  onAddLog: (entry: ConsumableEntry) => void
}

export function ConsumablesLog({ logs, onAddLog }: ConsumablesLogProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedEq, setSelectedEq] = useState('FE-SEM (JEOL JSM-IT800)')
  const [itemName, setItemName] = useState('Gold Sputter Target (10nm coating)')
  const [itemQty, setItemQty] = useState('1 stub run')
  const [itemCost, setItemCost] = useState(150)
  const [notes, setNotes] = useState('High vacuum chamber run at 15kV.')
  const [successToast, setSuccessToast] = useState<string | null>(null)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: ConsumableEntry = {
      id: `CON-${Math.floor(800 + Math.random() * 200)}`,
      equipmentName: selectedEq,
      date: 'Just now',
      studentRoll: '102103492',
      items: [
        {
          name: itemName,
          quantity: itemQty,
          unitCost: itemCost,
        },
      ],
      totalCost: itemCost,
      operatorNotes: notes,
    }

    onAddLog(newEntry)
    setShowAddModal(false)
    setSuccessToast(`Consumables logged: ${itemName} (₹${itemCost} billed to grant).`)
    setTimeout(() => setSuccessToast(null), 5000)
  }

  const grandTotalSpent = logs.reduce((acc, log) => acc + log.totalCost, 0)

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
            <FlaskConical className="w-4 h-4 text-cyan-500" />
            Specialized Consumables & Reagents Usage Log
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit trail of sputter targets, liquid nitrogen cold traps, photopolymer resins, and GPU-hours consumed.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-xs">
            <span className="text-slate-400 block text-[10px] uppercase">Total Grant Billed</span>
            <span className="font-bold text-slate-900 dark:text-white text-base">
              ₹{grandTotalSpent.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            Log Consumables Run
          </button>
        </div>
      </div>

      {/* Log Entries */}
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-cyan-600 dark:text-cyan-400">
                  {log.id}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  {log.equipmentName}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{log.date}</span>
            </div>

            {/* Items table */}
            <div className="space-y-1.5">
              {log.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg"
                >
                  <span>
                    {item.name} ({item.quantity})
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ₹{item.unitCost.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {log.operatorNotes && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                Operator Sign-off: "{log.operatorNotes}"
              </p>
            )}

            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-500">Student Roll: {log.studentRoll}</span>
              <span className="font-bold text-slate-900 dark:text-white">
                Subtotal: ₹{log.totalCost.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleSave}
            className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-cyan-500" />
              Record Lab Consumables Usage
            </h4>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Instrument
              </label>
              <select
                value={selectedEq}
                onChange={(e) => setSelectedEq(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs"
              >
                <option value="FE-SEM (JEOL JSM-IT800)">FE-SEM (JEOL JSM-IT800)</option>
                <option value="Rigaku SmartLab XRD">Rigaku SmartLab XRD</option>
                <option value="Stratasys J55 3D Printer">Stratasys J55 3D Printer</option>
                <option value="Anton Paar Rheometer">Anton Paar Rheometer</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Consumable Material
              </label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  value={itemQty}
                  onChange={(e) => setItemQty(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Cost (₹)
                </label>
                <input
                  type="number"
                  value={itemCost}
                  onChange={(e) => setItemCost(parseInt(e.target.value, 10))}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Operator Comments
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs"
              >
                Save & Bill to Grant
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
