import { Microscope, Moon, Sun, ShieldCheck, Sparkles, Calendar, Coins, ArrowLeftRight, FileSpreadsheet } from 'lucide-react'

interface NavbarProps {
  activeTab: 'catalog' | 'scheduler' | 'qualification' | 'exchange' | 'consumables'
  setActiveTab: (tab: 'catalog' | 'scheduler' | 'qualification' | 'exchange' | 'consumables') => void
  isDark: boolean
  toggleDark: () => void
  userTokens: number
  myBookingsCount: number
}

export function Navbar({
  activeTab,
  setActiveTab,
  isDark,
  toggleDark,
  userTokens,
  myBookingsCount,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/85 dark:bg-[#090d16]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Microscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                  LabSync
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  CIF & STEP Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                TIET Patiala Specialized Research Equipment & Lab Bench Booking
              </p>
            </div>
          </div>

          {/* Tab Navigation Switcher */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'catalog'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Instruments (6)
            </button>
            <button
              onClick={() => setActiveTab('scheduler')}
              className={`px-3 py-1.5 rounded-lg transition-all relative ${
                activeTab === 'scheduler'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Slot Calendar
              {myBookingsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-600 text-white font-mono">
                  {myBookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('qualification')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'qualification'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Safety Tiers
            </button>
            <button
              onClick={() => setActiveTab('exchange')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'exchange'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Peer Slot Swap
            </button>
            <button
              onClick={() => setActiveTab('consumables')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'consumables'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Consumables Log
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            {/* Tokens Balance */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-slate-500 dark:text-slate-400 font-medium">Credits:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-100">
                {userTokens}
              </span>
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800/80 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-200/60 dark:border-slate-800/60">
          {(['catalog', 'scheduler', 'qualification', 'exchange', 'consumables'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
                  activeTab === tab
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {tab === 'catalog' && 'Equipment'}
                {tab === 'scheduler' && `Calendar (${myBookingsCount})`}
                {tab === 'qualification' && 'Safety Tiers'}
                {tab === 'exchange' && 'Slot Swap'}
                {tab === 'consumables' && 'Consumables'}
              </button>
            )
          )}
        </div>
      </div>
    </header>
  )
}
