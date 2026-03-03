'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/lib/store'

const PARTICLE_COUNT = 800

export default function VoidField() {
  const pointsRef = useRef<THREE.Points>(null)
  const { animationSpeed } = useStore()

  // Pre-computed base positions and random phases (stable across renders)
  const { basePositions, phases } = useMemo(() => {
    const basePositions = new Float32Array(PARTICLE_COUNT * 3)
    const phases = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Deterministic distribution using index-based trig
      const theta = (i / PARTICLE_COUNT) * Math.PI * 2 * 37 // golden-ratio-ish spread
      const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT)
      const r = 3 + ((i * 7919) % 1000) / 250 // pseudo-random radius 3–7
      basePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      basePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      basePositions[i * 3 + 2] = r * Math.cos(phi)
      phases[i] = (i * 2.399) % (Math.PI * 2) // golden angle
    }
    return { basePositions, phases }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(basePositions.slice(), 3),
    )
    return geo
  }, [basePositions])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ph = phases[i]
      const flicker = Math.sin(time * 3.1 + ph) * 0.12
      arr[i * 3] = basePositions[i * 3] + flicker
      arr[i * 3 + 1] =
        basePositions[i * 3 + 1] + Math.cos(time * 2.3 + ph) * 0.12
      arr[i * 3 + 2] = basePositions[i * 3 + 2] + flicker
    }
    posAttr.needsUpdate = true
    pointsRef.current.rotation.y = time * animationSpeed * 0.05
  })

  return (
    <group>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.06}
          color={0x8b5cf6}
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Central void sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={0x1e1b4b}
          transparent
          opacity={0.85}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Glow rings representing virtual particle creation/annihilation */}
      {[1.6, 2.6, 3.8].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.35, 0, i * 0.6]}>
          <torusGeometry args={[r, 0.018, 8, 64]} />
          <meshBasicMaterial
            color={0x8b5cf6}
            transparent
            opacity={0.28 - i * 0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
