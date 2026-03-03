'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/lib/store'
import { BASE_COLORS_HEX } from '@/lib/colorUtils'
import { getComplement } from '@/lib/dnaUtils'
import { Base } from '@/types'

const HELIX_RADIUS = 1.2
const HELIX_HEIGHT = 10
const TURNS = 2.5
const PAIRS = 24

interface BasePairProps {
  base: Base
  complement: Base
  angle: number
  y: number
}

function BasePairMesh({ base, complement, angle, y }: BasePairProps) {
  const x1 = Math.cos(angle) * HELIX_RADIUS
  const z1 = Math.sin(angle) * HELIX_RADIUS
  const x2 = -x1
  const z2 = -z1

  const quaternion = useMemo(() => {
    const start = new THREE.Vector3(x1, y, z1)
    const end = new THREE.Vector3(x2, y, z2)
    const dir = end.clone().sub(start).normalize()
    const q = new THREE.Quaternion()
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
    return q
  }, [x1, y, z1, x2, z2])

  const len = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2)
  const mid: [number, number, number] = [(x1 + x2) / 2, y, (z1 + z2) / 2]

  return (
    <group>
      <mesh position={[x1, y, z1]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial
          color={BASE_COLORS_HEX[base]}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[x2, y, z2]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial
          color={BASE_COLORS_HEX[complement]}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <mesh position={mid} quaternion={quaternion}>
        <cylinderGeometry args={[0.025, 0.025, len, 6]} />
        <meshStandardMaterial color={0x94a3b8} transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

export default function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const { animationSpeed, dnaSequence } = useStore()
  const pairs = Math.min(dnaSequence.length, PAIRS)

  const { strand1Curve, strand2Curve } = useMemo(() => {
    const s1: THREE.Vector3[] = []
    const s2: THREE.Vector3[] = []
    const segments = pairs * 8
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = t * Math.PI * 2 * TURNS
      const y = (t - 0.5) * HELIX_HEIGHT
      const x = Math.cos(angle) * HELIX_RADIUS
      const z = Math.sin(angle) * HELIX_RADIUS
      s1.push(new THREE.Vector3(x, y, z))
      s2.push(new THREE.Vector3(-x, y, -z))
    }
    return {
      strand1Curve: new THREE.CatmullRomCurve3(s1),
      strand2Curve: new THREE.CatmullRomCurve3(s2),
    }
  }, [pairs])

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * animationSpeed * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Strand 1 backbone */}
      <mesh>
        <tubeGeometry args={[strand1Curve, pairs * 8, 0.055, 8, false]} />
        <meshStandardMaterial color={0x4ade80} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Strand 2 backbone */}
      <mesh>
        <tubeGeometry args={[strand2Curve, pairs * 8, 0.055, 8, false]} />
        <meshStandardMaterial color={0x60a5fa} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Base pairs */}
      {Array.from({ length: pairs }).map((_, i) => {
        const t = (i + 0.5) / pairs
        const angle = t * Math.PI * 2 * TURNS
        const y = (t - 0.5) * HELIX_HEIGHT
        const base = dnaSequence[i] ?? 'A'
        return (
          <BasePairMesh
            key={i}
            base={base}
            complement={getComplement(base)}
            angle={angle}
            y={y}
          />
        )
      })}
    </group>
  )
}
