import Link from "next/link";
import SceneViewer from "@/components/SceneViewer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Instalación Científica{" "}
          <span className="text-indigo-400">3D</span>
        </h1>
        <p className="max-w-2xl text-gray-400 text-lg mb-8">
          Plataforma académica de reconstrucción científica tridimensional.
          Explorá modelos moleculares, datos astronómicos y simulaciones físicas
          directamente en el navegador.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/viewer"
            className="rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors px-6 py-3 font-semibold text-white"
          >
            Abrir Visor 3D
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-gray-600 hover:border-gray-400 transition-colors px-6 py-3 font-semibold text-gray-300"
          >
            Acerca del proyecto
          </Link>
        </div>
      </section>

      {/* Inline 3D preview */}
      <section className="w-full h-[480px] bg-gray-900">
        <SceneViewer />
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-indigo-700 transition-colors"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-600 text-sm border-t border-gray-800">
        Instalación Científica © {new Date().getFullYear()} — Next.js · Three.js
        · TypeScript · Node.js
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "🔬",
    title: "Reconstrucción Molecular",
    description:
      "Visualizá estructuras moleculares en 3D con geometría interactiva y datos de enlace actualizados.",
  },
  {
    icon: "🌌",
    title: "Datos Astronómicos",
    description:
      "Explorá conjuntos de datos del cosmos renderizados en tiempo real con Three.js.",
  },
  {
    icon: "⚛️",
    title: "Simulaciones Físicas",
    description:
      "Corré simulaciones de partículas y campos con WebGL acelerado por GPU.",
  },
];
