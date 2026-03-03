'use client'

import { useStore } from '@/lib/store'

export default function Tooltip() {
  const { tooltipData } = useStore()

  if (!tooltipData.visible) return null

  return (
    <div
      className="fixed z-[60] pointer-events-none bg-gray-800 text-white text-xs px-3 py-2 rounded-md shadow-xl border border-gray-600 max-w-[200px] leading-snug"
      style={{ left: tooltipData.x + 14, top: tooltipData.y - 10 }}
    >
      {tooltipData.content}
    </div>
  )
}
