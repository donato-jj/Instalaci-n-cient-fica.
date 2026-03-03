import type { Metadata } from "next";
import SceneViewer from "@/components/SceneViewer";

export const metadata: Metadata = {
  title: "Visor 3D | Instalación Científica",
  description: "Visor interactivo de modelos científicos tridimensionales",
};

export default function ViewerPage() {
  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 65px)" }}>
      <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Visor 3D Interactivo</h1>
        <span className="text-xs text-gray-500 font-mono">
          Three.js · WebGL
        </span>
      </div>
      <div className="flex-1 bg-gray-950">
        <SceneViewer />
      </div>
    </div>
  );
}
