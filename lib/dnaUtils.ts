import { Base, BasePairInfo } from '@/types'

export const COMPLEMENTS: Record<Base, Base> = {
  A: 'T',
  T: 'A',
  C: 'G',
  G: 'C',
}

const BASES: Base[] = ['A', 'T', 'C', 'G']

export function generateDNASequence(length: number): Base[] {
  return Array.from({ length }, () => BASES[Math.floor(Math.random() * 4)])
}

export function getComplement(base: Base): Base {
  return COMPLEMENTS[base]
}

export function sequenceToBasePairs(sequence: Base[]): BasePairInfo[] {
  return sequence.map((base, i) => ({
    index: i,
    base,
    complement: getComplement(base),
    position: [0, 0, 0] as [number, number, number],
  }))
}

export function calculateGCContent(sequence: Base[]): number {
  const gcCount = sequence.filter((b) => b === 'G' || b === 'C').length
  return sequence.length > 0 ? gcCount / sequence.length : 0
}
