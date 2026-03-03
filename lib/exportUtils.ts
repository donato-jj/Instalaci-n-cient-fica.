export function captureScreenshot(canvas: HTMLCanvasElement): void {
  const link = document.createElement('a')
  link.download = 'instalacion-cientifica.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export function exportJSON(data: unknown, filename: string): void {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = filename
  link.href = url
  link.click()
  URL.revokeObjectURL(url)
}
