import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-900/80 backdrop-blur border-b border-gray-800">
      <Link href="/" className="font-bold text-lg tracking-tight text-indigo-400">
        ⚗️ Instalación Científica
      </Link>
      <div className="flex gap-6 text-sm text-gray-300">
        <Link href="/" className="hover:text-white transition-colors">
          Inicio
        </Link>
        <Link href="/viewer" className="hover:text-white transition-colors">
          Visor 3D
        </Link>
        <Link href="/about" className="hover:text-white transition-colors">
          Acerca
        </Link>
      </div>
    </nav>
  );
}
