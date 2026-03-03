# Sistema de Reconstrucción Académica en Biología y Ciencia Moderna

Una aplicación web 3D profesional y académica que reconstruye, en capas interactivas, estructuras biológicas (ADN, cromatina, célula) y modelos físicos inspirados en la relatividad general. Construida con Next.js 14, TypeScript, Three.js y React Three Fiber.

---

## 🚀 Ejecutar localmente

```bash
npm install
npm run dev
# Abrir http://localhost:3000
```

## 🏗 Build de producción

```bash
npm run build
npm start
```

## ☁️ Deploy en Vercel

1. Conectar el repositorio en [vercel.com](https://vercel.com)
2. Framework preset: **Next.js** (auto-detectado)
3. Sin variables de entorno requeridas
4. Hacer clic en **Deploy**

La app compilará y se desplegará automáticamente. No requiere configuración adicional.

---

## 🧬 Veracidad y metáfora

Esta aplicación distingue **explícitamente** entre contenido científico y metáfora visual:

### Científico (basado en consenso académico)
- **ADN**: doble hélice, backbone azúcar-fosfato, pares de bases A-T y C-G, surcos mayor y menor, reglas de complementariedad de Chargaff
- **Empaquetamiento**: ADN libre → nucleosomas (histona simplificada) → fibra de cromatina → cromosoma
- **Mutación**: sustitución de bases, representada como metáfora de variación, no como simulación evolutiva exacta

### Metáfora visual / Modelo didáctico
- **"Genoma del vacío"**: campo de fluctuaciones procedural (ruido FBM). *Nota: el término se usa como metáfora artística, no como concepto científico.*
- **Einstein / curvatura**: pozo gravitatorio visual con líneas geodésicas aproximadas. *Nota: modelo didáctico inspirado en relatividad general; no es una simulación científica exacta.*
- **Célula / bioquímica**: partículas instanciadas con fuerzas simplificadas. *Nota: modelo visual simplificado; no representa mecanismos moleculares reales.*

---

## ⚙️ Stack técnico

| Tecnología | Uso |
|---|---|
| **Next.js 14** (App Router) | Framework principal |
| **TypeScript** | Tipado fuerte en todo el proyecto |
| **React Three Fiber** | Renderizado 3D declarativo |
| **@react-three/drei** | Helpers 3D (OrbitControls, Text, etc.) |
| **Three.js** | Motor 3D subyacente |
| **Zustand** | Estado global tipado |
| **TailwindCSS** | Estilos utilitarios |

---

## 📦 Estructura del proyecto

```
app/                    # Next.js App Router
  layout.tsx            # Layout raíz
  page.tsx              # Página principal
  globals.css           # Estilos globales (Tailwind)
components/
  scene/                # Componentes 3D (R3F)
    DNAHelix.tsx        # Doble hélice paramétrica
    ChromatinPack.tsx   # Empaquetamiento de cromatina
    VoidField.tsx       # Campo del vacío (metáfora)
    EinsteinSpace.tsx   # Curvatura espacio-tiempo
    CellAssembly.tsx    # Ensamblaje celular
    SceneWrapper.tsx    # Canvas R3F con luces
  ui/                   # Componentes de interfaz
    TopBar.tsx          # Barra superior (preset, calidad, FPS)
    SidePanel.tsx       # Panel lateral de controles
    FPSCounter.tsx      # Indicador de FPS
    Tooltip.tsx         # Tooltip flotante
    PresentationStepper.tsx  # Presentación guiada
    AcademicPanel.tsx   # Panel académico (glosario, bibliografía)
lib/
  store.ts              # Estado global (Zustand)
  dnaUtils.ts           # Utilidades de secuencia ADN
  mathUtils.ts          # Matemáticas de hélice y 3D
  colorUtils.ts         # Colores por tipo de base
  exportUtils.ts        # Exportación PNG y JSON
types/
  index.ts              # Tipos TypeScript compartidos
```

---

## 🔬 Limitaciones del modelo

1. **ADN**: La geometría es una representación esquemática. Las dimensiones relativas (radio, pitch) son educativas, no a escala atómica real.
2. **Nucleosomas**: La histona se representa como un cilindro simplificado. La estructura de octámero real no está modelada.
3. **Fuerzas celulares**: Las fuerzas de atracción/repulsión son algoritmos de boids, no simulación de física molecular.
4. **Curvatura espacio-tiempo**: La deformación de la malla es visual. No resuelve las ecuaciones de campo de Einstein.
5. **"Genoma del vacío"**: Es ruido FBM procedural. No hay consenso científico sobre un "genoma del vacío"; el término es metáfora artística.

---

## ✅ Checklist QA manual

- [ ] `npm run dev` inicia sin errores en http://localhost:3000
- [ ] La escena 3D carga con doble hélice visible
- [ ] Los tabs laterales (ADN, Empaquetamiento, Vacío, Einstein, Académico) responden
- [ ] El slider de empaquetamiento (0-100) transiciona suavemente
- [ ] El botón "Capturar imagen" descarga un PNG
- [ ] El botón "Exportar reporte" descarga un JSON
- [ ] La presentación guiada avanza por los 6 pasos
- [ ] El modo examen oculta las etiquetas de bases
- [ ] La etiqueta "Modelo didáctico" aparece en la vista Einstein
- [ ] En móvil, la escena carga en modo de baja calidad

---

## 📚 Bibliografía sugerida

- Watson & Crick, *Molecular Structure of Nucleic Acids* (1953)
- Alberts et al., *Molecular Biology of the Cell* — Garland Science
- Stryer, *Biochemistry* — Freeman
- Carroll, *Spacetime and Geometry: An Introduction to General Relativity* — Addison-Wesley
- Luger et al., *Crystal structure of the nucleosome core particle* (1997), Nature

---

*Aplicación desarrollada como sistema de reconstrucción académica. Todo contenido científico está basado en consenso y las simplificaciones están declaradas explícitamente.*