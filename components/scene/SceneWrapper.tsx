'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useStore } from '@/lib/store'
import DNAHelix from './DNAHelix'
import ChromatinPack from './ChromatinPack'
import VoidField from './VoidField'
import EinsteinSpace from './EinsteinSpace'
import CellAssembly from './CellAssembly'

function SceneContent() {
  const { activeTab } = useStore()

  return (
    <>
      {/* Ambient + directional lighting */}
      <ambientLight intensity={0.45} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[0, 12, 0]} intensity={0.4} color="#22c55e" />

      {activeTab === 'adn' && <DNAHelix />}
      {activeTab === 'empaquetamiento' && <ChromatinPack />}
      {activeTab === 'vacio' && <VoidField />}
      {activeTab === 'einstein' && <EinsteinSpace />}
      {(activeTab === 'darwin' ||
        activeTab === 'academico' ||
        activeTab === 'metodologia') && <CellAssembly />}

      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        minDistance={2}
        maxDistance={30}
      />
    </>
  )
}

export default function SceneWrapper() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 55 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#0f0f23', width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
