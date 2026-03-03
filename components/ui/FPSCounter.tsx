'use client'

import { useRef, useState, useEffect } from 'react'

export default function FPSCounter() {
  const [fps, setFps] = useState(0)
  const frameRef = useRef(0)
  const lastRef = useRef(performance.now())

  useEffect(() => {
    let id: number

    const tick = () => {
      frameRef.current++
      const now = performance.now()
      if (now - lastRef.current >= 1000) {
        setFps(Math.round((frameRef.current * 1000) / (now - lastRef.current)))
        frameRef.current = 0
        lastRef.current = now
      }
      id = requestAnimationFrame(tick)
    }

    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  const color =
    fps >= 55
      ? 'text-green-400'
      : fps >= 30
        ? 'text-yellow-400'
        : 'text-red-400'

  return (
    <div
      className={`fixed bottom-3 left-3 z-50 font-mono text-xs px-2 py-1 rounded bg-gray-900/70 border border-gray-700/50 ${color}`}
    >
      {fps} FPS
    </div>
  )
}
