export type EquipmentCategory =
  | 'Electron Microscopy'
  | 'X-Ray & Crystallography'
  | 'High-Performance Computing'
  | 'Additive Manufacturing'
  | 'Spectroscopy & Optical'
  | 'Rheology & Mechanics'

export type SafetyTierLevel = 'Level 1: Basic Safety' | 'Level 2: Supervised Operator' | 'Level 3: Autonomous Researcher'

export interface LabEquipment {
  id: string
  name: string
  code: string
  category: EquipmentCategory
  labLocation: string
  model: string
  hourlyRateTokens: number
  status: 'available' | 'busy' | 'maintenance' | 'calibrating'
  requiredTier: SafetyTierLevel
  operatorAssistedAvailable: boolean
  maxSlotHours: number
  specs: string[]
  consumablesRequired: string[]
  totalRunsLogged: number
}

export interface TimeSlot {
  id: string
  equipmentId: string
  timeRange: string
  shift: 'Morning A' | 'Morning B' | 'Afternoon A' | 'Evening' | 'Overnight'
  date: string
  status: 'available' | 'booked' | 'maintenance' | 'my_booking'
  bookedByStudent?: string
  bookedByRoll?: string
  supervisorApproved: boolean
}

export interface SlotTradeRequest {
  id: string
  requesterName: string
  requesterRoll: string
  equipmentName: string
  offeredSlot: string
  offeredDate: string
  desiredSlot: string
  desiredDate: string
  urgency: 'high' | 'normal'
  reason: string
  status: 'open' | 'completed' | 'cancelled'
}

export interface ConsumableEntry {
  id: string
  equipmentName: string
  date: string
  studentRoll: string
  items: {
    name: string
    quantity: string
    unitCost: number
  }[]
  totalCost: number
  operatorNotes: string
}
