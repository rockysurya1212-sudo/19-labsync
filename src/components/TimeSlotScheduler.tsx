import { useState } from 'react'
import {
  Calendar,
  Clock,
  Microscope,
  CheckCircle2,
  X,
  Coins,
  ShieldAlert,
  UserCheck,
  AlertCircle,
} from 'lucide-react'
import { LabEquipment, TimeSlot } from '../types'

interface TimeSlotSchedulerProps {
  equipmentList: LabEquipment[]
  selectedEquipment: LabEquipment | null
  slots: TimeSlot[]
  userTokens: number
  onSelectEquipment: (eq: LabEquipment) => void
  onBookSlot: (slotId: string, equipmentId: string, projectTitle: string, assisted: boolean) => void
}

export function TimeSlotScheduler({
  equipmentList,
  selectedEquipment,
  slots,
  userTokens,
  onSelectEquipment,
  onBookSlot,
}: TimeSlotSchedulerProps) {
  const activeEq = selectedEquipment || equipmentList[0]
  const [selectedDate, setSelectedDate] = useState('Today, Nov 12')
  const [bookingModalSlot, setBookingModalSlot] = useState<TimeSlot | null>(null)
  const [projectTitle, setProjectTitle] = useState('Nanowire Surface Topography Characterization')
  const [supervisorName, setSupervisorName] = useState('Dr. S. K. Mohapatra (CIF Faculty Advisor)')
  const [isAssisted, setIsAssisted] = useState(true)
  const [successToast, setSuccessToast] = useState<string | null>(null)

  const equipmentSlots = slots.filter(
    (s) => s.equipmentId === activeEq.id && s.date === selectedDate
  )

  const handleConfirmBooking = () => {
    if (!bookingModalSlot) return
    onBookSlot(bookingModalSlot.id, activeEq.id, projectTitle, isAssisted)
    setSuccessToast(`Slot ${bookingModalSlot.timeRange} on ${activeEq.name} booked successfully!`)
    setBookingModalSlot(null)
    setTimeout(() => setSuccessToast(null), 5000)
  }

  return (
    <div className="space-y-6">
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-200 flex items-center justify-between shadow-sm animate-in fade-in duration-300">
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

      {/* Top Filter & Equipment Switcher */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Equipment selector */}
          <div className="w-full sm:w-1/2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Select Instrument
            </label>
            <select
              value={activeEq.id}
              onChange={(e) => {
                const found = equipmentList.find((eq) => eq.id === e.target.value)
                if (found) onSelectEquipment(found)
              }}
              className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-cyan-500"
            >
              {equipmentList.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.code})
                </option>
              ))}
            </select>
          </div>

          {/* Date Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['Today, Nov 12', 'Tomorrow, Nov 13', 'Thursday, Nov 14', 'Friday, Nov 15'].map(
              (date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedDate === date
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {date}
                </button>
              )
            )}
          </div>
        </div>

        {/* Selected Instrument Specs Strip */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">{activeEq.model}</span>
            <span className="text-slate-400">•</span>
            <span className="text-cyan-600 dark:text-cyan-400">{activeEq.labLocation}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-600 dark:text-amber-400 font-semibold">
              {activeEq.hourlyRateTokens} Tokens / hr
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{activeEq.requiredTier}</span>
          </div>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {equipmentSlots.map((slot) => {
          const isAvailable = slot.status === 'available'
          const isMine = slot.status === 'my_booking'
          const isBooked = slot.status === 'booked'

          return (
            <div
              key={slot.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isMine
                  ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30'
                  : isAvailable
                  ? 'border-emerald-500/50 bg-white dark:bg-slate-900 hover:border-emerald-500 shadow-sm'
                  : 'border-slate-200/80 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/20 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">
                    {slot.shift}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isMine
                        ? 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'
                        : isAvailable
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {isMine ? 'Your Booking' : slot.status}
                  </span>
                </div>

                <div className="font-bold text-base text-slate-900 dark:text-white font-mono mb-1">
                  {slot.timeRange}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4">
                  {slot.date}
                </div>

                {isBooked && (
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-mono mb-2">
                    Occupied by: {slot.bookedByStudent} ({slot.bookedByRoll})
                  </div>
                )}
              </div>

              <div>
                {isAvailable ? (
                  <button
                    onClick={() => setBookingModalSlot(slot)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-colors"
                  >
                    Reserve Shift
                  </button>
                ) : isMine ? (
                  <div className="py-2 text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    ✓ Verified & Registered
                  </div>
                ) : (
                  <button
                    disabled
                    className="w-full py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 text-xs font-medium cursor-not-allowed"
                  >
                    Reserved by Peer
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Booking Confirmation Modal */}
      {bookingModalSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-base">
                <Microscope className="w-5 h-5" />
                <span>Confirm Research Equipment Reservation</span>
              </div>
              <button
                onClick={() => setBookingModalSlot(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">Equipment:</span>
                <span className="font-bold text-slate-900 dark:text-white">{activeEq.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reserved Shift:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                  {bookingModalSlot.timeRange} ({bookingModalSlot.date})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tariff Deducted:</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  {activeEq.hourlyRateTokens * 2} CIF Tokens (2 hr shift)
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Research Project / Thesis Title
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Faculty Supervisor Grant Approval
                </label>
                <input
                  type="text"
                  value={supervisorName}
                  onChange={(e) => setSupervisorName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Operational Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAssisted(true)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isAssisted
                        ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Operator-Assisted
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAssisted(false)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      !isAssisted
                        ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Autonomous (Self)
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-md transition-all text-center"
              >
                Confirm Booking & Allocate Shift
              </button>
              <button
                type="button"
                onClick={() => setBookingModalSlot(null)}
                className="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
