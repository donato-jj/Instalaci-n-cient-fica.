'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/lib/store'

interface NucleosomeProps {
  position: [number, number, number]
  rotation: [number, number, number]
}

function Nucleosome({ position, rotation }: NucleosomeProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Histone octamer disc */}
      <mesh>
        <cylinderGeometry args={[0.38, 0.38, 0.22, 16]} />
        <meshStandardMaterial color={0xfbbf24} metalness={0.3} roughness={0.5} />
      </mesh>
      {/* DNA wrapped ~1.65 turns */}
      <mesh>
        <torusGeometry args={[0.48, 0.055, 8, 48, Math.PI * 1.65 * 2]} />
        <meshStandardMaterial color={0x22c55e} metalness={0.15} roughness={0.6} />
      </mesh>
    </group>
  )
}

export default function ChromatinPack() {
  const groupRef = useRef<THREE.Group>(null)
  const { animationSpeed } = useStore()

  const nucleosomes = useMemo<NucleosomeProps[]>(() => {
    const count = 12
    return Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1)
      const angle = t * Math.PI * 3
      const radius = 2.5
      const y = (t - 0.5) * 6
      return {
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [0, angle, Math.PI / 2] as [number, number, number],
      }
    })
  }, [])

  const linkerCurves = useMemo(() => {
    return Array.from({ length: nucleosomes.length - 1 }, (_, i) => {
      const [x1, y1, z1] = nucleosomes[i].position
      const [x2, y2, z2] = nucleosomes[i + 1].position
      // deterministic midpoint offset using index
      const ox = Math.sin(i * 1.3) * 0.4
      const oz = Math.cos(i * 1.7) * 0.4
      return new THREE.CatmullRomCurve3([
        new THREE.Vector3(x1, y1, z1),
        new THREE.Vector3((x1 + x2) / 2 + ox, (y1 + y2) / 2, (z1 + z2) / 2 + oz),
        new THREE.Vector3(x2, y2, z2),
      ])
    })
  }, [nucleosomes])

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * animationSpeed * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {nucleosomes.map((n, i) => (
        <Nucleosome key={i} position={n.position} rotation={n.rotation} />
      ))}
      {linkerCurves.map((curve, i) => (
        <mesh key={`linker-${i}`}>
          <tubeGeometry args={[curve, 20, 0.04, 6, false]} />
          <meshStandardMaterial color={0x22c55e} metalness={0.15} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}
