export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function smoothstep(x: number): number {
  const t = clamp(x, 0, 1)
  return t * t * (3 - 2 * t)
}

/** Returns [x, y, z] for a point on a helix at fractional position t */
export function helixPosition(
  t: number,
  radius: number,
  height: number,
  turns: number,
  angleOffset = 0,
): [number, number, number] {
  const angle = t * Math.PI * 2 * turns + angleOffset
  const y = (t - 0.5) * height
  return [Math.cos(angle) * radius, y, Math.sin(angle) * radius]
}

/** Pseudo-random noise in [0, 1] */
export function noise(x: number, y: number, z: number): number {
  const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453
  return n - Math.floor(n)
}
