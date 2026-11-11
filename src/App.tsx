import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { BentoStats } from './components/BentoStats'
import { EquipmentCatalog } from './components/EquipmentCatalog'
import { TimeSlotScheduler } from './components/TimeSlotScheduler'
import { SafetyQualificationModal } from './components/SafetyQualificationModal'
import { SlotExchangeBoard } from './components/SlotExchangeBoard'
import { ConsumablesLog } from './components/ConsumablesLog'
import {
  MOCK_EQUIPMENT,
  MOCK_SLOTS,
  MOCK_TRADE_REQUESTS,
  MOCK_CONSUMABLES_LOG,
} from './data/mockLabData'
import { LabEquipment, TimeSlot, SlotTradeRequest, ConsumableEntry, SafetyTierLevel } from './types'

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeTab, setActiveTab] = useState<'catalog' | 'scheduler' | 'qualification' | 'exchange' | 'consumables'>('catalog')
  const [equipmentList, setEquipmentList] = useState<LabEquipment[]>(MOCK_EQUIPMENT)
  const [selectedEquipment, setSelectedEquipment] = useState<LabEquipment | null>(MOCK_EQUIPMENT[0])
  const [slots, setSlots] = useState<TimeSlot[]>(MOCK_SLOTS)
  const [trades, setTrades] = useState<SlotTradeRequest[]>(MOCK_TRADE_REQUESTS)
  const [consumables, setConsumables] = useState<ConsumableEntry[]>(MOCK_CONSUMABLES_LOG)
  const [userTokens, setUserTokens] = useState<number>(1850)
  const [currentTier, setCurrentTier] = useState<SafetyTierLevel>('Level 2: Supervised Operator')

  // Dark mode class sync
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleDark = () => setIsDark((prev) => !prev)

  const handleSelectFromCatalog = (eq: LabEquipment) => {
    setSelectedEquipment(eq)
    setActiveTab('scheduler')
  }

  const handleToggleEquipmentStatus = (equipmentId: string) => {
    setEquipmentList((prev) =>
      prev.map((eq) => {
        if (eq.id !== equipmentId) return eq
        const nextStatus: LabEquipment['status'] =
          eq.status === 'available'
            ? 'busy'
            : eq.status === 'busy'
            ? 'maintenance'
            : 'available'
        return { ...eq, status: nextStatus }
      })
    )
  }

  const handleBookSlot = (
    slotId: string,
    equipmentId: string,
    projectTitle: string,
    assisted: boolean
  ) => {
    const eq = equipmentList.find((e) => e.id === equipmentId)
    const tokenCost = (eq ? eq.hourlyRateTokens : 300) * 2

    setUserTokens((prev) => Math.max(0, prev - tokenCost))
    setSlots((prev) =>
      prev.map((s) =>
        s.id === slotId
          ? {
              ...s,
              status: 'my_booking',
              bookedByStudent: 'Amanpreet Singh (You)',
              bookedByRoll: '102103492',
              supervisorApproved: true,
            }
          : s
      )
    )
  }

  const handleAcceptTrade = (tradeId: string) => {
    setTrades((prev) =>
      prev.map((t) => (t.id === tradeId ? { ...t, status: 'completed' } : t))
    )
  }

  const handleAddTradeRequest = (req: SlotTradeRequest) => {
    setTrades((prev) => [req, ...prev])
  }

  const handleAddConsumableLog = (entry: ConsumableEntry) => {
    setConsumables((prev) => [entry, ...prev])
  }

  const myBookingsCount = slots.filter((s) => s.status === 'my_booking').length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        userTokens={userTokens}
        myBookingsCount={myBookingsCount}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BentoStats
          activeInstrumentsCount={equipmentList.filter((e) => e.status === 'available').length}
          scheduledRunsToday={18}
          userTokens={userTokens}
          currentTier={currentTier}
        />

        {activeTab === 'catalog' && (
          <EquipmentCatalog
            equipmentList={equipmentList}
            onSelectForBooking={handleSelectFromCatalog}
            onToggleStatus={handleToggleEquipmentStatus}
          />
        )}

        {activeTab === 'scheduler' && (
          <TimeSlotScheduler
            equipmentList={equipmentList}
            selectedEquipment={selectedEquipment}
            slots={slots}
            userTokens={userTokens}
            onSelectEquipment={setSelectedEquipment}
            onBookSlot={handleBookSlot}
          />
        )}

        {activeTab === 'qualification' && (
          <SafetyQualificationModal
            currentTier={currentTier}
            onUpgradeTier={setCurrentTier}
          />
        )}

        {activeTab === 'exchange' && (
          <SlotExchangeBoard
            tradeRequests={trades}
            onAcceptTrade={handleAcceptTrade}
            onAddTradeRequest={handleAddTradeRequest}
          />
        )}

        {activeTab === 'consumables' && (
          <ConsumablesLog
            logs={consumables}
            onAddLog={handleAddConsumableLog}
          />
        )}
      </main>
    </div>
  )
}
