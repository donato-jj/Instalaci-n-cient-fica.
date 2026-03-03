'use client'

import { useStore } from '@/lib/store'
import { ActiveTab } from '@/types'

interface TabConfig {
  id: ActiveTab
  label: string
  icon: string
}

const TABS: TabConfig[] = [
  { id: 'adn', label: 'ADN', icon: '🧬' },
  { id: 'empaquetamiento', label: 'Empaquetamiento', icon: '📦' },
  { id: 'vacio', label: 'Vacío Cuántico', icon: '⚛️' },
  { id: 'einstein', label: 'Einstein', icon: '🌌' },
  { id: 'darwin', label: 'Darwin', icon: '🦋' },
  { id: 'academico', label: 'Académico', icon: '📚' },
  { id: 'metodologia', label: 'Metodología', icon: '🔬' },
]

export default function TopBar() {
  const { activeTab, setActiveTab } = useStore()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur border-b border-gray-700/60">
      <div className="flex items-center justify-between px-4 py-1.5 gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-green-400 font-bold text-base leading-none">🔬</span>
          <span className="text-white font-semibold text-sm hidden sm:block">
            BioSim
          </span>
          <span className="text-gray-500 text-xs hidden md:block">
            Instalación Científica
          </span>
        </div>

        {/* Tabs */}
        <nav className="flex gap-0.5 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/60 border border-transparent'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right spacer */}
        <div className="w-8 shrink-0" />
      </div>
    </div>
  )
}
