# Instalación Científica 🔬

Plataforma académica de reconstrucción científica 3D.  
Construida con **Next.js 14 · TypeScript · JavaScript · Node.js · Three.js**.

## Demo

> Deploy en: `https://app.tu-dominio.com`  
> (o cualquier subdominio `app-*` de tu proveedor)

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router) |
| Lenguajes | TypeScript + JavaScript |
| Runtime | Node.js |
| 3D / WebGL | Three.js |
| Estilos | Tailwind CSS |
| Deploy | Vercel |

## Inicio rápido

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy en Vercel

1. Importá el repositorio en [vercel.com/new](https://vercel.com/new)
2. En **Project Settings → Domains**, agregá `app.tu-dominio.com`
3. Configurá el CNAME en tu DNS apuntando a `cname.vercel-dns.com`
4. Hacé click en **Deploy** ✅

## Estructura

```
src/
  app/
    page.tsx          # Página principal
    viewer/page.tsx   # Visor 3D interactivo
    about/page.tsx    # Acerca del proyecto
    layout.tsx        # Layout global
  components/
    Navbar.tsx        # Barra de navegación
    SceneViewer.tsx   # Componente Three.js 3D
```

## Licencia

MIT
