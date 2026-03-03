import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca del Proyecto | Instalación Científica",
  description: "Información sobre la plataforma de reconstrucción científica 3D",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6 text-indigo-400">
        Acerca del proyecto
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">¿Qué es Instalación Científica?</h2>
        <p className="text-gray-300 leading-relaxed">
          Instalación Científica es una plataforma académica de reconstrucción
          y visualización científica tridimensional. Permite explorar modelos
          moleculares, datos astronómicos y simulaciones físicas directamente en
          el navegador, sin necesidad de software adicional.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Stack tecnológico</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>
            <strong className="text-white">Next.js 14</strong> — Framework React
            con App Router para SSR/SSG
          </li>
          <li>
            <strong className="text-white">TypeScript + JavaScript</strong> —
            Tipado estático y compatibilidad universal
          </li>
          <li>
            <strong className="text-white">Node.js</strong> — Runtime del
            servidor y scripts de build
          </li>
          <li>
            <strong className="text-white">Three.js</strong> — Renderizado 3D
            acelerado por WebGL
          </li>
          <li>
            <strong className="text-white">Tailwind CSS</strong> — Diseño
            responsivo utility-first
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Deploy</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          La app está configurada para deploy en Vercel. Para desplegar en un
          dominio propio como <code className="text-indigo-300">https://app.tu-dominio.com</code>,
          seguí estos pasos:
        </p>
        <ol className="list-decimal list-inside text-gray-300 space-y-2">
          <li>
            Importá el repositorio en{" "}
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              vercel.com/new
            </a>
          </li>
          <li>
            En <em>Project Settings → Domains</em>, agregá{" "}
            <code className="text-indigo-300">app.tu-dominio.com</code>
          </li>
          <li>Configurá el registro DNS CNAME apuntando a Vercel</li>
          <li>
            Hacé click en <strong className="text-white">Deploy</strong> — listo
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Licencia</h2>
        <p className="text-gray-300">
          Proyecto de uso académico y libre distribución bajo{" "}
          <a
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            MIT License
          </a>
          .
        </p>
      </section>
    </div>
  );
}
