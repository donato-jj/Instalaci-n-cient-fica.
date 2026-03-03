import { create } from 'zustand'
import { ActiveTab, CameraPreset, Quality, VoidMode, TooltipData, Base } from '@/types'
import { generateDNASequence } from './dnaUtils'

interface StoreState {
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

  setActiveTab: (tab: ActiveTab) => void
  setCameraPreset: (preset: CameraPreset) => void
  setQuality: (quality: Quality) => void
  setVoidMode: (mode: VoidMode) => void
  setTooltip: (data: Partial<TooltipData>) => void
  hideTooltip: () => void
  setAnimationSpeed: (speed: number) => void
  setCurrentStep: (step: number) => void
  setIsPlaying: (playing: boolean) => void
  toggleAcademic: () => void
  regenerateDNA: () => void
}

export const useStore = create<StoreState>((set) => ({
  activeTab: 'adn',
  cameraPreset: 'dna',
  quality: 'auto',
  voidMode: 'field',
  tooltipData: { visible: false, x: 0, y: 0, content: '' },
  animationSpeed: 1,
  currentStep: 0,
  isPlaying: false,
  showAcademic: false,
  dnaSequence: generateDNASequence(24),

  setActiveTab: (tab) => set({ activeTab: tab }),
  setCameraPreset: (preset) => set({ cameraPreset: preset }),
  setQuality: (quality) => set({ quality }),
  setVoidMode: (mode) => set({ voidMode: mode }),
  setTooltip: (data) =>
    set((state) => ({ tooltipData: { ...state.tooltipData, ...data } })),
  hideTooltip: () =>
    set({ tooltipData: { visible: false, x: 0, y: 0, content: '' } }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  toggleAcademic: () =>
    set((state) => ({ showAcademic: !state.showAcademic })),
  regenerateDNA: () => set({ dnaSequence: generateDNASequence(24) }),
}))
