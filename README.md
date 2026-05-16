<p align="center">
  <img src="public/logojustuc.jpg" alt="Justuc Logo" width="120" height="120" style="border-radius: 20px;">
</p>

<h1 align="center">⚖️ Justuc — Justicia Tucumán</h1>

<p align="center">
  <strong>Seguimiento de procesos judiciales para los ciudadanos de Tucumán</strong>
  <br>
  Plataforma web accesible, transparente y mobile-first para el seguimiento de causas judiciales.
  <br>
  Desarrollada para el <strong>Hackathon Norte Potencia 2026</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/shadcn/ui-latest-000?style=flat-square" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/NextAuth.js-5.x-EA6C00?style=flat-square" alt="NextAuth">
  <img src="https://img.shields.io/badge/status-MVP-green?style=flat-square" alt="Status">
</p>

---

## ✨ Funcionalidades

| Ruta | Descripción |
|------|-------------|
| `/dashboard` | Panel principal con resumen de casos activos y acceso rápido |
| `/dashboard/timeline` | Línea de tiempo del proceso judicial |
| `/dashboard/expediente` | Expediente digital con documentos de todas las instituciones |
| `/dashboard/denuncia` | Nueva denuncia con **Declaración Jurada en Video** |
| `/dashboard/feedback` | Calificación del trato recibido ("El Buen Trato") |
| `/dashboard/settings` | Configuración de la cuenta y privacidad |

### 🆕 Novedades del MVP

- **🎥 Declaración Jurada en Video** — Grabá tu denuncia con la cámara. Sirve como declaración jurada digital y se envía simulado a las autoridades. Usa la API `MediaRecorder` del navegador.
- **🔍 Modal de detalle de caso** — Tocá cualquier caso en el dashboard para ver información completa: tipo, ubicación, funcionario a cargo, institución, y acciones rápidas.
- **📱 Diseño responsive** — Sidebar drawer con hamburguesa en mobile, todas las páginas adaptadas de 320px a 1920px.
- **🖼️ Logo expandible** — Tocá el logo para verlo en pantalla completa.

## 📸 Capturas

| Desktop | Mobile |
|---------|--------|
| Dashboard completo con sidebar fijo | Drawer sidebar con menú hamburguesa |
| _(agregá screenshots acá)_ | _(agregá screenshots acá)_ |

---

## 🧰 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.2.6 | Framework full-stack con App Router |
| **TypeScript** | 5.x | Tipado estático en toda la codebase |
| **Tailwind CSS** | 4.x | Estilos utilitarios mobile-first |
| **shadcn/ui** | latest | Componentes de UI accesibles y personalizables |
| **NextAuth.js** | 5.x | Autenticación con modo demo incorporado |
| **Prisma** | latest | ORM para base de datos (preparado para producción) |

---

## 🚀 Primeros pasos

```bash
# Clonar el repositorio
git clone https://github.com/adriangmrraa/justuc.git
cd justuc

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) para ver la app.

---

## 🌐 Despliegue en Vercel

La app está lista para deploy automático desde GitHub:

1. Creá un proyecto en [vercel.com](https://vercel.com) y vinculalo con el repo `adriangmrraa/justuc`
2. Configurá las siguientes variables de entorno:

| Variable | Descripción |
|----------|-------------|
| `NEXTAUTH_SECRET` | Secreta para NextAuth — generá una con `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL de tu deployment (ej: `https://justuc.vercel.app`) |

> **Nota:** El MVP funciona sin base de datos — los datos son mockeados en los componentes. Google OAuth es opcional para el MVP.

---

## 👤 Modo Demo

La app incluye un modo demo que funciona sin autenticación real. Simplemente iniciá sesión con el botón **"Modo Demo"** en la pantalla de login. No necesitás Google OAuth ni base de datos para probar todas las funcionalidades.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── dashboard/           → Panel de usuario con sidebar responsive
│   │   ├── page.tsx         → Overview / resumen con modal de casos
│   │   ├── layout.tsx       → Sidebar + header (drawer en mobile)
│   │   ├── timeline/        → Timeline del proceso judicial
│   │   ├── expediente/      → Expediente digital por institución
│   │   ├── denuncia/        → Denuncia con declaración jurada en video
│   │   ├── feedback/        → Calificación "El Buen Trato"
│   │   └── settings/        → Configuración y privacidad
│   ├── login/               → Pantalla de inicio de sesión
│   ├── api/auth/            → NextAuth API endpoints
│   ├── page.tsx             → Landing (redirige a /dashboard)
│   └── layout.tsx           → Layout raíz con tipografía y viewport meta
├── components/
│   ├── ui/                  → shadcn/ui components (button, card, input, etc.)
│   └── features/            → Componentes de funcionalidad
│       ├── video-declaracion.tsx  → Grabación de declaración jurada
│       ├── expandable-logo.tsx    → Logo expandible (lightbox)
│       └── modal.tsx              → Modal reutilizable
├── lib/
│   ├── auth.ts              → Configuración NextAuth con provider demo
│   └── db.ts                → Conexión a Prisma
├── styles/
│   └── globals.css          → Estilos globales con variables de tipografía
└── public/
    └── logojustuc.jpg       → Logo de la aplicación
```

---

## 🎨 Identidad visual

La identidad de **Justuc** se construye sobre los colores del logo:

- **Celeste primario** `#5BA3E6` — botones, enlaces, navegación activa
- **Azul profundo** `#0A2647` — sidebar, fondo de login
- **Azul oscuro** `#1E3A5F` — textos principales, títulos
- **Fondo claro** `#F0F7FE` — fondo de la aplicación

Tipografía:
- **Plus Jakarta Sans** — cuerpo de texto
- **Montserrat** — headings (bold, moderna)
- **JetBrains Mono** — código y tracking numbers

---

## 🧪 Rutas de la API

| Ruta | Método | Descripción |
|------|--------|-------------|
| `/api/auth/[nextauth]` | GET/POST | Endpoints de NextAuth (login, session, callback) |

---

<p align="center">
  <sub>
    Hecho con ❤️ para el <strong>Hackathon Norte Potencia 2026</strong> — Equipo 6
    <br>
    <a href="https://github.com/adriangmrraa/justuc">github.com/adriangmrraa/justuc</a>
  </sub>
</p>
