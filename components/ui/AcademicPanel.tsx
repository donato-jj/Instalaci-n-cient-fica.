'use client'

import { useStore } from '@/lib/store'
import { ActiveTab } from '@/types'

interface Section {
  heading: string
  text: string
}

interface Content {
  title: string
  sections: Section[]
}

const CONTENT: Record<ActiveTab, Content> = {
  adn: {
    title: 'ADN — Ácido Desoxirribonucleico',
    sections: [
      {
        heading: 'Estructura molecular',
        text: 'Dos cadenas polinucleotídicas antiparalelas unidas por puentes de hidrógeno: A–T (2 puentes) y C–G (3 puentes). Radio helicoidal ≈1 nm, paso ≈3.4 nm, 10.5 pb/vuelta (ADN-B).',
      },
      {
        heading: 'Descubrimiento',
        text: 'Watson & Crick (1953) propusieron el modelo de doble hélice basándose en la cristalografía de rayos X de Rosalind Franklin y los datos de Erwin Chargaff.',
      },
      {
        heading: 'Función central',
        text: 'El ADN almacena la información genética; la transcripción produce ARNm y la traducción sintetiza proteínas, siguiendo el dogma central de la biología molecular.',
      },
    ],
  },
  empaquetamiento: {
    title: 'Empaquetamiento del ADN',
    sections: [
      {
        heading: 'Nucleosoma',
        text: '~147 pb de ADN se enrollan 1.65 vueltas en torno a un octámero de histonas (H2A×2, H2B×2, H3×2, H4×2), formando la unidad básica de la cromatina.',
      },
      {
        heading: 'Niveles de compactación',
        text: 'ADN (2 nm) → collar de nucleosomas (10 nm) → fibra de 30 nm → lazos de 300 nm → dominio de 700 nm → cromátida (1 400 nm). Factor total ≈10 000×.',
      },
      {
        heading: 'Regulación epigenética',
        text: 'La modificación de histonas (acetilación, metilación) y la metilación del ADN controlan la accesibilidad del genoma sin alterar la secuencia, regulando la expresión génica.',
      },
    ],
  },
  vacio: {
    title: 'Vacío Cuántico',
    sections: [
      {
        heading: 'Fluctuaciones de punto cero',
        text: 'El principio de incertidumbre ΔE·Δt ≥ ℏ/2 impide que un campo tenga energía exactamente nula. El vacío cuántico bulle con partículas virtuales creadas y aniquiladas espontáneamente.',
      },
      {
        heading: 'Efecto Casimir',
        text: 'Dos placas conductoras paralelas separadas ≈1 μm experimentan una presión atractiva medible ≈1.3×10⁻³ N/m², confirmando experimentalmente la energía de punto cero (Casimir, 1948; medido por Lamoreaux, 1997).',
      },
      {
        heading: 'Energía oscura',
        text: 'La densidad de energía del vacío cuántico podría relacionarse con la constante cosmológica Λ, aunque existe una discrepancia de ≈120 órdenes de magnitud entre teoría y observación (el "problema de la constante cosmológica").',
      },
    ],
  },
  einstein: {
    title: 'Relatividad General',
    sections: [
      {
        heading: 'Ecuaciones de campo de Einstein',
        text: 'G_μν + Λg_μν = (8πG/c⁴)T_μν. La curvatura del espacio-tiempo (G_μν) es proporcional al contenido de energía-momento (T_μν). Publicadas en noviembre de 1915.',
      },
      {
        heading: 'Geodésicas y gravedad',
        text: 'En ausencia de fuerzas no gravitacionales, los cuerpos siguen geodésicas (caminos de longitud extrema) en el espacio-tiempo curvo; lo que percibimos como gravedad es curvatura geométrica.',
      },
      {
        heading: 'Verificaciones experimentales',
        text: 'Precesión del perihelio de Mercurio (+43″/siglo), deflexión de luz por el Sol (Eddington, 1919), corrimiento gravitacional al rojo, GPS, ondas gravitacionales (LIGO, 2015).',
      },
    ],
  },
  darwin: {
    title: 'Evolución y Biología Celular',
    sections: [
      {
        heading: 'Selección natural',
        text: 'Darwin (1859): individuos con variaciones heredables ventajosas dejan más descendencia. A escala molecular, las mutaciones en el ADN proveen la variación sobre la que actúa la selección.',
      },
      {
        heading: 'Teoría endosimbiótica',
        text: 'Lynn Margulis (1967) propuso que mitocondrias y cloroplastos son descendientes de α-proteobacterias y cianobacterias respectivamente, engullidas pero no digeridas por células ancestrales.',
      },
      {
        heading: 'Evolución molecular',
        text: 'Relojes moleculares basados en tasas de sustitución nucleotídica permiten fechar divergencias evolutivas. La filogenia de 16S rRNA (Woese, 1977) reorganizó el árbol de la vida en tres dominios.',
      },
    ],
  },
  academico: {
    title: 'Marco Académico',
    sections: [
      {
        heading: 'Objetivo de la instalación',
        text: 'Integrar biología molecular, física cuántica y relatividad general en una experiencia visual 3D interactiva para educación académica universitaria.',
      },
      {
        heading: 'Diseño instruccional',
        text: 'Cada módulo combina visualización 3D paramétrica en tiempo real con texto académico contextualizado, siguiendo el modelo de aprendizaje multimodal (Mayer, 2009).',
      },
      {
        heading: 'Referencias principales',
        text: 'Watson & Crick (1953), Heisenberg (1927), Einstein (1915), Margulis (1967), Casimir (1948), Alberts et al. "Molecular Biology of the Cell" (7ª ed.).',
      },
    ],
  },
  metodologia: {
    title: 'Metodología Computacional',
    sections: [
      {
        heading: 'Stack tecnológico',
        text: 'Next.js 14 (App Router) + TypeScript para el framework web; Three.js + @react-three/fiber para renderizado WebGL 3D; Zustand para estado global; TailwindCSS para estilos.',
      },
      {
        heading: 'Modelos 3D',
        text: 'Las geometrías se generan algorítmicamente en tiempo real mediante parámetros biológicos reales: radio helicoidal 1.2 nm, 2.5 vueltas, 24 pares de bases; nucleosomas con radio histone 0.38 nm.',
      },
      {
        heading: 'Rendimiento',
        text: 'Buffer geometry con Float32Array y needsUpdate para animaciones de partículas; useMemo para geometrías estables; dpr={[1,2]} para adaptar resolución al hardware.',
      },
    ],
  },
}

export default function AcademicPanel() {
  const { activeTab, showAcademic, toggleAcademic } = useStore()
  const content = CONTENT[activeTab]

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggleAcademic}
        className="fixed left-3 top-14 z-50 bg-gray-900/90 backdrop-blur border border-gray-700/60 rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:text-white hover:border-gray-500 transition-all"
      >
        📚 {showAcademic ? 'Ocultar' : 'Info'}
      </button>

      {/* Panel */}
      {showAcademic && (
        <div className="fixed left-3 top-[5.5rem] z-40 w-72 bg-gray-900/95 backdrop-blur rounded-xl border border-gray-700/60 p-4 shadow-2xl max-h-[72vh] overflow-y-auto">
          <h3 className="text-white font-bold text-sm mb-3 leading-tight">
            {content.title}
          </h3>
          <div className="space-y-3.5">
            {content.sections.map((section, i) => (
              <div key={i}>
                <h4 className="text-green-400 text-xs font-semibold mb-1">
                  {section.heading}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
