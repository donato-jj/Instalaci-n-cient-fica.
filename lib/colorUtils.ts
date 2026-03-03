import { Base } from '@/types'

export const BASE_COLORS: Record<Base, string> = {
  A: '#ef4444',
  T: '#3b82f6',
  C: '#22c55e',
  G: '#eab308',
}

export const BASE_COLORS_HEX: Record<Base, number> = {
  A: 0xef4444,
  T: 0x3b82f6,
  C: 0x22c55e,
  G: 0xeab308,
}

export const BASE_LABELS: Record<Base, string> = {
  A: 'Adenina',
  T: 'Timina',
  C: 'Citosina',
  G: 'Guanina',
}

export function hexToThree(hex: string): number {
  return parseInt(hex.replace('#', ''), 16)
}

export function interpolateColor(color1: number, color2: number, t: number): number {
  const r1 = (color1 >> 16) & 0xff
  const g1 = (color1 >> 8) & 0xff
  const b1 = color1 & 0xff
  const r2 = (color2 >> 16) & 0xff
  const g2 = (color2 >> 8) & 0xff
  const b2 = color2 & 0xff
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return (r << 16) | (g << 8) | b
}
