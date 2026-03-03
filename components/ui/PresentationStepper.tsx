'use client'

import { useStore } from '@/lib/store'
import { PresentationStep, ActiveTab, CameraPreset } from '@/types'

const STEPS: PresentationStep[] = [
  {
    id: 0,
    title: 'Estructura del ADN',
    description:
      'La doble hélice de Watson y Crick (1953): dos cadenas antiparalelas unidas por puentes de hidrógeno entre pares de bases complementarios.',
    tab: 'adn',
    cameraPreset: 'dna',
  },
  {
    id: 1,
    title: 'Empaquetamiento Cromatínico',
    description:
      '~147 pb de ADN se enrollan 1.65 vueltas alrededor de un octámero de histonas formando el nucleosoma, unidad básica de la cromatina.',
    tab: 'empaquetamiento',
    cameraPreset: 'chromosome',
  },
  {
    id: 2,
    title: 'Vacío Cuántico',
    description:
      'El principio de incertidumbre de Heisenberg prohíbe energía cero en campos cuánticos; las fluctuaciones de punto cero son mensurables (efecto Casimir).',
    tab: 'vacio',
    cameraPreset: 'dna',
  },
  {
    id: 3,
    title: 'Curvatura del Espacio-Tiempo',
    description:
      'La relatividad general de Einstein: la masa-energía curva la geometría del espacio-tiempo; los cuerpos siguen geodésicas en ese espacio curvo.',
    tab: 'einstein',
    cameraPreset: 'universe',
  },
  {
    id: 4,
    title: 'Célula Eucariota y Evolución',
    description:
      'La teoría endosimbiótica de Margulis explica el origen de mitocondrias y cloroplastos, integrando la evolución darwiniana a escala celular.',
    tab: 'darwin',
    cameraPreset: 'cell',
  },
]

export default function PresentationStepper() {
  const { currentStep, setCurrentStep, setActiveTab } = useStore()
  const step = STEPS[currentStep]

  const goTo = (i: number) => {
    setCurrentStep(i)
    setActiveTab(STEPS[i].tab)
  }

  const handlePrev = () => goTo((currentStep - 1 + STEPS.length) % STEPS.length)
  const handleNext = () => goTo((currentStep + 1) % STEPS.length)

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[min(520px,calc(100vw-8rem))] bg-gray-900/92 backdrop-blur rounded-xl border border-gray-700/60 p-4 shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm leading-tight">
            {step.title}
          </h4>
          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
            {step.description}
          </p>
        </div>
        <span className="text-gray-600 text-xs font-mono shrink-0">
          {currentStep + 1}/{STEPS.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-3">
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Paso ${i + 1}`}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              i === currentStep
                ? 'bg-green-400'
                : i < currentStep
                  ? 'bg-green-700'
                  : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          className="px-4 py-1.5 text-xs text-gray-400 border border-gray-600 rounded-lg hover:border-gray-400 hover:text-gray-200 transition-all"
        >
          ← Anterior
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-1.5 text-xs text-white bg-green-500/20 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-all font-medium"
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
