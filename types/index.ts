export type Base = 'A' | 'T' | 'C' | 'G'
export type CameraPreset = 'dna' | 'chromosome' | 'cell' | 'universe'
export type Quality = 'auto' | 'low' | 'high'
export type VoidMode = 'field' | 'particles'
export type ActiveTab =
  | 'adn'
  | 'empaquetamiento'
  | 'vacio'
  | 'einstein'
  | 'darwin'
  | 'academico'
  | 'metodologia'

export interface BasePairInfo {
  index: number
  base: Base
  complement: Base
  position: [number, number, number]
}

export interface TooltipData {
  visible: boolean
  x: number
  y: number
  content: string
}

export interface PresentationStep {
  id: number
  title: string
  description: string
  tab: ActiveTab
  cameraPreset: CameraPreset
}

export interface AppState {
  activeTab: ActiveTab
  cameraPreset: CameraPreset
  quality: Quality
  voidMode: VoidMode
  tooltipData: TooltipData
  animationSpeed: number
  currentStep: number
  isPlaying: boolean
  showAcademic: boolean
  dnaSequence: Base[]
}
