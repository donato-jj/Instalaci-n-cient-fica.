import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Instalación Científica — BioSim 3D',
  description:
    'Sistema de reconstrucción biológica académica con visualización 3D interactiva',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
