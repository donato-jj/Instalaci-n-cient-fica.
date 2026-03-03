'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/lib/store'

export default function CellAssembly() {
  const groupRef = useRef<THREE.Group>(null)
  const { animationSpeed } = useStore()

  // Deterministic ribosome positions (no Math.random in render)
  const ribosomePositions = useMemo<[number, number, number][]>(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 28)
      const theta = (i * 2.399) % (Math.PI * 2)
      const r = 1.75 + (i % 5) * 0.28
      return [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]
    })
  }, [])

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * animationSpeed * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Cell membrane (outer) */}
      <mesh>
        <sphereGeometry args={[4.8, 32, 32]} />
        <meshStandardMaterial
          color={0x22c55e}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>

      {/* Cell membrane wireframe hint */}
      <mesh>
        <sphereGeometry args={[4.82, 24, 24]} />
        <meshBasicMaterial
          color={0x22c55e}
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[1.45, 24, 24]} />
        <meshStandardMaterial
          color={0x6366f1}
          transparent
          opacity={0.85}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>

      {/* Nuclear envelope */}
      <mesh>
        <sphereGeometry args={[1.55, 24, 24]} />
        <meshBasicMaterial
          color={0x818cf8}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Nucleolus */}
      <mesh position={[0.35, 0.25, 0]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color={0x4f46e5} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Mitochondria (3 instances) */}
      {(
        [
          { pos: [2.4, 1.0, 0.2] as [number, number, number], rot: [0, 0, 0.5] as [number, number, number] },
          { pos: [-1.9, -0.8, 1.6] as [number, number, number], rot: [0.3, 1.2, 0.8] as [number, number, number] },
          { pos: [1.1, -2.0, -1.8] as [number, number, number], rot: [0.8, 0, 0.4] as [number, number, number] },
        ] as { pos: [number, number, number]; rot: [number, number, number] }[]
      ).map(({ pos, rot }, i) => (
        <mesh key={`mito-${i}`} position={pos} rotation={rot}>
          <capsuleGeometry args={[0.22, 0.75, 8, 16]} />
          <meshStandardMaterial
            color={0xf97316}
            transparent
            opacity={0.92}
            metalness={0.1}
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* Endoplasmic reticulum (curved flat tubes) */}
      {[0, Math.PI * 0.6, Math.PI * 1.2].map((offset, i) => (
        <mesh key={`er-${i}`} position={[0, 0.4, 2]} rotation={[0, offset, 0]}>
          <torusGeometry args={[1.1, 0.07, 8, 32, Math.PI * 1.4]} />
          <meshStandardMaterial
            color={0x06b6d4}
            transparent
            opacity={0.7}
            metalness={0.1}
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* Golgi apparatus (stacked flattened toruses) */}
      {[0, 0.14, 0.28, 0.42].map((off, i) => (
        <mesh
          key={`golgi-${i}`}
          position={[-1.5 + off * 0.4, 2.1 - off * 0.9, 0.5]}
          rotation={[Math.PI / 4, 0, 0.15]}
        >
          <torusGeometry args={[0.55 - i * 0.07, 0.05, 6, 28]} />
          <meshStandardMaterial
            color={0xfbbf24}
            transparent
            opacity={0.85}
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>
      ))}

      {/* Ribosomes (tiny spheres on ER & free) */}
      {ribosomePositions.map((pos, i) => (
        <mesh key={`ribo-${i}`} position={pos}>
          <sphereGeometry args={[0.065, 6, 6]} />
          <meshStandardMaterial color={0xef4444} />
        </mesh>
      ))}
    </group>
  )
}
