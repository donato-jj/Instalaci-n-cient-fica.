'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/lib/store'

const GRID_SIZE = 40
const GRID_EXTENT = 8

export default function EinsteinSpace() {
  const { animationSpeed } = useStore()

  // Single geometry shared between solid + wireframe meshes
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(GRID_EXTENT * 2, GRID_EXTENT * 2, GRID_SIZE, GRID_SIZE),
    [],
  )

  // Reference the mass sphere for animation
  const massRef = useRef<THREE.Mesh>(null)
  const orbitAngleRef = useRef(0)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const posAttr = geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    const count = posAttr.count

    // Orbiting secondary mass position
    orbitAngleRef.current += delta * animationSpeed * 0.4
    const ox = Math.cos(orbitAngleRef.current) * 2.8
    const oz = Math.sin(orbitAngleRef.current) * 2.8

    if (massRef.current) {
      massRef.current.position.set(ox, 0, oz)
    }

    for (let i = 0; i < count; i++) {
      const x = arr[i * 3]
      const y = arr[i * 3 + 1]

      // Primary mass depression at center
      const r1 = Math.sqrt(x * x + y * y)
      const depth1 = -2.8 / (1 + r1 * r1 * 0.25)

      // Secondary mass depression (orbiting)
      const dx = x - ox
      const dy = y - oz
      const r2 = Math.sqrt(dx * dx + dy * dy)
      const depth2 = -0.8 / (1 + r2 * r2 * 0.5)

      // Gravitational wave ripple
      const wave = Math.sin(r1 * 1.2 - time * animationSpeed * 2.0) * 0.08 * Math.exp(-r1 * 0.18)

      arr[i * 3 + 2] = depth1 + depth2 + wave
    }

    posAttr.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return (
    <group rotation={[-Math.PI / 3, 0, 0]}>
      {/* Solid spacetime surface */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color={0x4f46e5}
          metalness={0.2}
          roughness={0.75}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={0x818cf8}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Central massive body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color={0xfbbf24}
          metalness={0.85}
          roughness={0.15}
          emissive={0xfbbf24}
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Orbiting secondary body */}
      <mesh ref={massRef}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={0xf97316}
          metalness={0.6}
          roughness={0.3}
          emissive={0xf97316}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Orbit guide */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.018, 8, 64]} />
        <meshBasicMaterial color={0xf97316} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}
