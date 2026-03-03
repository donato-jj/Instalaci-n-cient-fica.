'use client'

import { useStore } from '@/lib/store'

export default function SidePanel() {
  const {
    animationSpeed,
    setAnimationSpeed,
    quality,
    setQuality,
    voidMode,
    setVoidMode,
    activeTab,
    regenerateDNA,
    dnaSequence,
  } = useStore()

  return (
    <div className="fixed right-3 top-14 z-40 w-56 bg-gray-900/90 backdrop-blur rounded-lg border border-gray-700/60 p-3 flex flex-col gap-3">
      <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
        Controles
      </h3>

      {/* Animation speed */}
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-gray-400 text-xs">Velocidad</label>
          <span className="text-green-400 text-xs font-mono">
            {animationSpeed.toFixed(1)}×
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={3}
          step={0.1}
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          className="w-full accent-green-400 cursor-pointer"
        />
      </div>

      {/* Quality */}
      <div>
        <label className="text-gray-400 text-xs block mb-1.5">Calidad</label>
        <div className="flex gap-1">
          {(['auto', 'low', 'high'] as const).map((q) => (
            <button
              key={q}
              onClick={() => setQuality(q)}
              className={`flex-1 py-1 text-xs rounded border transition-all ${
                quality === q
                  ? 'bg-green-500/20 text-green-400 border-green-500/50'
                  : 'text-gray-500 border-gray-600 hover:border-gray-500 hover:text-gray-300'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Void mode (only on vacío tab) */}
      {activeTab === 'vacio' && (
        <div>
          <label className="text-gray-400 text-xs block mb-1.5">
            Modo Vacío
          </label>
          <div className="flex gap-1">
            {(['field', 'particles'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setVoidMode(m)}
                className={`flex-1 py-1 text-xs rounded border transition-all ${
                  voidMode === m
                    ? 'bg-quantum/20 text-purple-400 border-purple-500/50'
                    : 'text-gray-500 border-gray-600 hover:border-gray-500 hover:text-gray-300'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* DNA info + regenerate */}
      {activeTab === 'adn' && (
        <div className="space-y-2">
          <div className="bg-gray-800/60 rounded p-2">
            <p className="text-gray-400 text-xs mb-0.5">Secuencia</p>
            <p className="text-green-400 font-mono text-xs break-all leading-snug">
              {dnaSequence.join('')}
            </p>
          </div>
          <button
            onClick={regenerateDNA}
            className="w-full py-1.5 bg-green-500/15 text-green-400 border border-green-500/40 rounded text-xs hover:bg-green-500/25 transition-all"
          >
            🔄 Regenerar secuencia
          </button>
        </div>
      )}

      {/* Legend */}
      {activeTab === 'adn' && (
        <div className="space-y-1">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Bases</p>
          {(
            [
              { base: 'A', label: 'Adenina', color: 'text-red-400' },
              { base: 'T', label: 'Timina', color: 'text-blue-400' },
              { base: 'C', label: 'Citosina', color: 'text-green-400' },
              { base: 'G', label: 'Guanina', color: 'text-yellow-400' },
            ] as const
          ).map(({ base, label, color }) => (
            <div key={base} className="flex items-center gap-2">
              <span className={`font-mono text-xs font-bold ${color}`}>
                {base}
              </span>
              <span className="text-gray-500 text-xs">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
