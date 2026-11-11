import { LabEquipment, TimeSlot, SlotTradeRequest, ConsumableEntry } from '../types'

export const MOCK_EQUIPMENT: LabEquipment[] = [
  {
    id: 'eq-sem-01',
    name: 'FE-SEM (Field Emission Scanning Electron Microscope)',
    code: 'JEOL-JSM-IT800',
    category: 'Electron Microscopy',
    labLocation: 'Central Instrumentation Facility (CIF), Ground Floor Rm 04',
    model: 'JEOL JSM-IT800 Ultrahigh Resolution FE-SEM with Oxford EDS',
    hourlyRateTokens: 450,
    status: 'available',
    requiredTier: 'Level 2: Supervised Operator',
    operatorAssistedAvailable: true,
    maxSlotHours: 2,
    specs: ['0.7nm resolution @ 15kV', 'Oxford Ultim Max 65 EDS Detector', 'Low Vacuum Mode (10-300 Pa)', 'Stem Detector'],
    consumablesRequired: ['Gold Sputter Target', 'Conductive Carbon Tape', 'Liquid Nitrogen Cold Finger'],
    totalRunsLogged: 428,
  },
  {
    id: 'eq-xrd-01',
    name: 'High-Resolution Powder X-Ray Diffractometer',
    code: 'RIGAKU-SMARTLAB',
    category: 'X-Ray & Crystallography',
    labLocation: 'Materials Science Lab, Block D Basement',
    model: 'Rigaku SmartLab 9kW Rotating Anode XRD',
    hourlyRateTokens: 350,
    status: 'busy',
    requiredTier: 'Level 2: Supervised Operator',
    operatorAssistedAvailable: true,
    maxSlotHours: 3,
    specs: ['Cu K-alpha radiation (lambda = 1.5406 A)', 'High-temp stage up to 1200 C', 'Thin film reflectometry (XRR)', 'Hypix-3000 2D detector'],
    consumablesRequired: ['Zero-background Silicon sample holder', 'Acetone solvent', 'Mylar film'],
    totalRunsLogged: 612,
  },
  {
    id: 'eq-hpc-01',
    name: 'TIET AI Supercomputing Cluster (NVIDIA DGX A100)',
    code: 'PARAM-GANGA-THAPAR',
    category: 'High-Performance Computing',
    labLocation: 'CSED Datacenter, Server Room 2B',
    model: '8x NVIDIA A100 80GB SXM4, 2TB RAM, NVLink 600 GB/s',
    hourlyRateTokens: 120,
    status: 'available',
    requiredTier: 'Level 1: Basic Safety',
    operatorAssistedAvailable: false,
    maxSlotHours: 12,
    specs: ['5 PetaFLOPS FP16 AI compute', 'Slurm Workload Manager', 'Singularity/Docker container runtime', '100 Gbps InfiniBand'],
    consumablesRequired: ['GPU Cluster Compute Tokens (Pre-allocated)', 'Scratch NVMe Storage (100GB / job)'],
    totalRunsLogged: 1840,
  },
  {
    id: 'eq-3d-01',
    name: 'Industrial PolyJet 3D Multi-Material Printer',
    code: 'STRATASYS-J55',
    category: 'Additive Manufacturing',
    labLocation: 'TIET STEP Technology Business Incubator, Bay 01',
    model: 'Stratasys J55 Prime Multi-Material Color 3D System',
    hourlyRateTokens: 280,
    status: 'available',
    requiredTier: 'Level 2: Supervised Operator',
    operatorAssistedAvailable: true,
    maxSlotHours: 4,
    specs: ['18-micron layer thickness', 'Full CMYK color mixing', 'VeroUltraClear high transparency', 'Soluble SUP711 support'],
    consumablesRequired: ['Photopolymer Resin Cartridges', 'Wash Jet Solvent', 'Build Plate Adhesion Sheet'],
    totalRunsLogged: 340,
  },
  {
    id: 'eq-uv-01',
    name: 'UV-Vis-NIR Double-Beam Spectrophotometer',
    code: 'PERKIN-LAMBDA-1050',
    category: 'Spectroscopy & Optical',
    labLocation: 'Chemical Engineering Analytical Instrumentation Lab',
    model: 'PerkinElmer Lambda 1050+ with 150mm Integrating Sphere',
    hourlyRateTokens: 200,
    status: 'available',
    requiredTier: 'Level 1: Basic Safety',
    operatorAssistedAvailable: true,
    maxSlotHours: 2,
    specs: ['175 nm to 3300 nm wavelength range', 'Diffuse Reflectance measurement', 'Dual sample compartment', '0.05 nm resolution'],
    consumablesRequired: ['Quartz Suprasil Cuvettes', 'Spectroscopic grade baseline standard (Spectralon)'],
    totalRunsLogged: 780,
  },
  {
    id: 'eq-rheo-01',
    name: 'Modular Compact Rheometer & Dynamic Mechanical Analyzer',
    code: 'ANTON-PAAR-MCR302',
    category: 'Rheology & Mechanics',
    labLocation: 'Polymer Engineering Lab, Mechanical Block B',
    model: 'Anton Paar MCR 302 with Peltier Temperature Control',
    hourlyRateTokens: 260,
    status: 'calibrating',
    requiredTier: 'Level 3: Autonomous Researcher',
    operatorAssistedAvailable: false,
    maxSlotHours: 2,
    specs: ['Torque range: 1 nNm to 200 mNm', 'Oscillatory & Rotational modes', '-40 C to 200 C range', 'Parallel-plate & Cone geometries'],
    consumablesRequired: ['Disposable 25mm Aluminum measuring plates', 'Cleaning solvent & lint-free wipes'],
    totalRunsLogged: 215,
  },
]

export const MOCK_SLOTS: TimeSlot[] = [
  {
    id: 'slot-1',
    equipmentId: 'eq-sem-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Today, Nov 12',
    status: 'booked',
    bookedByStudent: 'Harmanpreet Kaur',
    bookedByRoll: '102103192',
    supervisorApproved: true,
  },
  {
    id: 'slot-2',
    equipmentId: 'eq-sem-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-3',
    equipmentId: 'eq-sem-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Today, Nov 12',
    status: 'my_booking',
    bookedByStudent: 'Amanpreet Singh (You)',
    bookedByRoll: '102103492',
    supervisorApproved: true,
  },
  {
    id: 'slot-4',
    equipmentId: 'eq-sem-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-5',
    equipmentId: 'eq-sem-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Tomorrow, Nov 13',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-6',
    equipmentId: 'eq-sem-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-7',
    equipmentId: 'eq-sem-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-8',
    equipmentId: 'eq-sem-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-9',
    equipmentId: 'eq-sem-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-10',
    equipmentId: 'eq-sem-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Thursday, Nov 14',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-11',
    equipmentId: 'eq-sem-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Thursday, Nov 14',
    status: 'maintenance',
    
    
    supervisorApproved: true,
  },
  {
    id: 'slot-12',
    equipmentId: 'eq-sem-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-13',
    equipmentId: 'eq-sem-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-14',
    equipmentId: 'eq-sem-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-15',
    equipmentId: 'eq-sem-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Friday, Nov 15',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-16',
    equipmentId: 'eq-sem-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-17',
    equipmentId: 'eq-xrd-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-18',
    equipmentId: 'eq-xrd-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-19',
    equipmentId: 'eq-xrd-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-20',
    equipmentId: 'eq-xrd-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Today, Nov 12',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-21',
    equipmentId: 'eq-xrd-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-22',
    equipmentId: 'eq-xrd-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Tomorrow, Nov 13',
    status: 'maintenance',
    
    
    supervisorApproved: true,
  },
  {
    id: 'slot-23',
    equipmentId: 'eq-xrd-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-24',
    equipmentId: 'eq-xrd-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-25',
    equipmentId: 'eq-xrd-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Thursday, Nov 14',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-26',
    equipmentId: 'eq-xrd-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-27',
    equipmentId: 'eq-xrd-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-28',
    equipmentId: 'eq-xrd-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-29',
    equipmentId: 'eq-xrd-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-30',
    equipmentId: 'eq-xrd-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Friday, Nov 15',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-31',
    equipmentId: 'eq-xrd-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-32',
    equipmentId: 'eq-xrd-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-33',
    equipmentId: 'eq-hpc-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Today, Nov 12',
    status: 'maintenance',
    
    
    supervisorApproved: true,
  },
  {
    id: 'slot-34',
    equipmentId: 'eq-hpc-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-35',
    equipmentId: 'eq-hpc-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Today, Nov 12',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-36',
    equipmentId: 'eq-hpc-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-37',
    equipmentId: 'eq-hpc-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-38',
    equipmentId: 'eq-hpc-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-39',
    equipmentId: 'eq-hpc-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-40',
    equipmentId: 'eq-hpc-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Tomorrow, Nov 13',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-41',
    equipmentId: 'eq-hpc-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-42',
    equipmentId: 'eq-hpc-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-43',
    equipmentId: 'eq-hpc-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-44',
    equipmentId: 'eq-hpc-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Thursday, Nov 14',
    status: 'maintenance',
    
    
    supervisorApproved: true,
  },
  {
    id: 'slot-45',
    equipmentId: 'eq-hpc-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Friday, Nov 15',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-46',
    equipmentId: 'eq-hpc-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-47',
    equipmentId: 'eq-hpc-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-48',
    equipmentId: 'eq-hpc-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-49',
    equipmentId: 'eq-3d-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-50',
    equipmentId: 'eq-3d-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Today, Nov 12',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-51',
    equipmentId: 'eq-3d-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-52',
    equipmentId: 'eq-3d-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-53',
    equipmentId: 'eq-3d-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-54',
    equipmentId: 'eq-3d-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-55',
    equipmentId: 'eq-3d-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Tomorrow, Nov 13',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-56',
    equipmentId: 'eq-3d-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-57',
    equipmentId: 'eq-3d-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-58',
    equipmentId: 'eq-3d-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-59',
    equipmentId: 'eq-3d-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-60',
    equipmentId: 'eq-3d-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Thursday, Nov 14',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-61',
    equipmentId: 'eq-3d-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-62',
    equipmentId: 'eq-3d-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-63',
    equipmentId: 'eq-3d-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-64',
    equipmentId: 'eq-3d-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-65',
    equipmentId: 'eq-uv-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Today, Nov 12',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-66',
    equipmentId: 'eq-uv-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Today, Nov 12',
    status: 'maintenance',
    
    
    supervisorApproved: true,
  },
  {
    id: 'slot-67',
    equipmentId: 'eq-uv-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-68',
    equipmentId: 'eq-uv-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-69',
    equipmentId: 'eq-uv-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-70',
    equipmentId: 'eq-uv-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Tomorrow, Nov 13',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-71',
    equipmentId: 'eq-uv-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-72',
    equipmentId: 'eq-uv-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-73',
    equipmentId: 'eq-uv-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-74',
    equipmentId: 'eq-uv-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-75',
    equipmentId: 'eq-uv-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Thursday, Nov 14',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-76',
    equipmentId: 'eq-uv-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-77',
    equipmentId: 'eq-uv-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Friday, Nov 15',
    status: 'maintenance',
    
    
    supervisorApproved: true,
  },
  {
    id: 'slot-78',
    equipmentId: 'eq-uv-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-79',
    equipmentId: 'eq-uv-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-80',
    equipmentId: 'eq-uv-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Friday, Nov 15',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-81',
    equipmentId: 'eq-rheo-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-82',
    equipmentId: 'eq-rheo-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-83',
    equipmentId: 'eq-rheo-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-84',
    equipmentId: 'eq-rheo-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Today, Nov 12',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-85',
    equipmentId: 'eq-rheo-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Tomorrow, Nov 13',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-86',
    equipmentId: 'eq-rheo-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-87',
    equipmentId: 'eq-rheo-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Tomorrow, Nov 13',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-88',
    equipmentId: 'eq-rheo-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Tomorrow, Nov 13',
    status: 'maintenance',
    
    
    supervisorApproved: true,
  },
  {
    id: 'slot-89',
    equipmentId: 'eq-rheo-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-90',
    equipmentId: 'eq-rheo-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Thursday, Nov 14',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-91',
    equipmentId: 'eq-rheo-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-92',
    equipmentId: 'eq-rheo-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Thursday, Nov 14',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-93',
    equipmentId: 'eq-rheo-01',
    timeRange: '09:00 - 11:00 AM',
    shift: 'Morning A',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-94',
    equipmentId: 'eq-rheo-01',
    timeRange: '11:30 AM - 01:30 PM',
    shift: 'Morning B',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
  {
    id: 'slot-95',
    equipmentId: 'eq-rheo-01',
    timeRange: '02:00 - 04:00 PM',
    shift: 'Afternoon A',
    date: 'Friday, Nov 15',
    status: 'booked',
    bookedByStudent: 'Simran Virdi',
    bookedByRoll: '102103774',
    supervisorApproved: true,
  },
  {
    id: 'slot-96',
    equipmentId: 'eq-rheo-01',
    timeRange: '04:30 - 06:30 PM',
    shift: 'Evening',
    date: 'Friday, Nov 15',
    status: 'available',
    
    
    supervisorApproved: false,
  },
]

export const MOCK_TRADE_REQUESTS: SlotTradeRequest[] = [
  {
    id: 'SWAP-401',
    requesterName: 'Jasleen Chawla',
    requesterRoll: '102103554',
    equipmentName: 'FE-SEM (JEOL JSM-IT800)',
    offeredSlot: 'Thursday, 02:00 - 04:00 PM',
    offeredDate: 'Nov 14',
    desiredSlot: 'Wednesday Morning (09:00 - 11:00 AM)',
    desiredDate: 'Nov 13',
    urgency: 'high',
    reason: 'Conference camera-ready paper deadline on Wednesday night. Need EDS elemental maps.',
    status: 'open',
  },
  {
    id: 'SWAP-398',
    requesterName: 'Devansh Garg',
    requesterRoll: '102103772',
    equipmentName: 'Powder XRD (Rigaku SmartLab)',
    offeredSlot: 'Friday, 10:00 AM - 01:00 PM',
    offeredDate: 'Nov 15',
    desiredSlot: 'Thursday Afternoon',
    desiredDate: 'Nov 14',
    urgency: 'normal',
    reason: 'Sample annealing furnace will complete synthesis Thursday morning.',
    status: 'open',
  },
]

export const MOCK_CONSUMABLES_LOG: ConsumableEntry[] = [
  {
    id: 'CON-802',
    equipmentName: 'FE-SEM (JEOL JSM-IT800)',
    date: 'Yesterday, 3:30 PM',
    studentRoll: '102103492',
    items: [
      { name: 'Gold Sputter Coating (15nm film)', quantity: '1 target cycle', unitCost: 150 },
      { name: 'Liquid Nitrogen (Cold Finger trap)', quantity: '4 Liters', unitCost: 120 },
      { name: 'Double-sided Carbon Tabs', quantity: '3 tabs', unitCost: 45 },
    ],
    totalCost: 315,
    operatorNotes: 'Clean sample stubs, vacuum chamber pumped down in 4.2 mins.',
  },
  {
    id: 'CON-789',
    equipmentName: 'Stratasys J55 3D Printer',
    date: 'Nov 10, 11:00 AM',
    studentRoll: '102103492',
    items: [
      { name: 'VeroCyan & VeroYellow Photopolymer Resin', quantity: '140 grams', unitCost: 280 },
      { name: 'SUP711 Waterjet Soluble Support Material', quantity: '65 grams', unitCost: 95 },
    ],
    totalCost: 375,
    operatorNotes: 'Microfluidic lab-on-a-chip prototype printed without warping.',
  },
]
