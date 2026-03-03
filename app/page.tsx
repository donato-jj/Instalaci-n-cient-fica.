'use client'

import dynamic from 'next/dynamic'
import TopBar from '@/components/ui/TopBar'
import SidePanel from '@/components/ui/SidePanel'
import FPSCounter from '@/components/ui/FPSCounter'
import Tooltip from '@/components/ui/Tooltip'
import PresentationStepper from '@/components/ui/PresentationStepper'
import AcademicPanel from '@/components/ui/AcademicPanel'

const SceneWrapper = dynamic(
  () => import('@/components/scene/SceneWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#0f0f23]">
        <div className="text-green-400 animate-pulse text-sm">
          Cargando visualización 3D…
        </div>
      </div>
    ),
  },
)

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-[#0f0f23]">
      <TopBar />
      <div className="pt-12 h-full">
        <SceneWrapper />
      </div>
      <SidePanel />
      <AcademicPanel />
      <FPSCounter />
      <Tooltip />
      <PresentationStepper />
    </main>
  )
}
