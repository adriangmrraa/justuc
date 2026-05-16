# ⚖️ Justuc — Justicia Tucumán

**Seguimiento de procesos judiciales para los ciudadanos de Tucumán.**

Plataforma web que permite a los ciudadanos realizar el seguimiento de sus causas judiciales de forma simple, transparente y accesible. Desarrollada para el Hackathon Norte Potencia.

---

## ✨ Funcionalidades

| Ruta | Descripción |
|------|-------------|
| `/dashboard` | Panel principal con resumen de casos activos |
| `/timeline` | Línea de tiempo del proceso judicial |
| `/expediente` | Detalle del expediente y documentos |
| `/denuncia` | Formulario para nueva denuncia |
| `/feedback` | Calificación del trato recibido |
| `/settings` | Configuración de la cuenta |

## 🧰 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.2.6 | Framework full-stack |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 4.x | Estilos utilitarios |
| **shadcn/ui** | latest | Componentes de UI accesibles |
| **NextAuth.js** | 5.x | Autenticación (modo demo incluido) |
| **Prisma** | latest | ORM para base de datos |

## 🚀 Primeros pasos

```bash
# Clonar el repositorio
git clone https://github.com/adriangmrraa/justuc.git

# Instalar dependencias
cd justuc
npm install

# Configurar variables de entorno
cp .env.local.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) para ver la app.

## 🌐 Despliegue en Vercel

La app está lista para desplegar en Vercel:

1. Creá un proyecto en [vercel.com](https://vercel.com) y vinculalo con el repo
2. Configurá las siguientes variables de entorno:

| Variable | Descripción |
|----------|-------------|
| `NEXTAUTH_SECRET` | Secreta para NextAuth — generá una con `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL de tu deployment (ej: `https://justuc.vercel.app`) |

> **Nota:** El MVP funciona sin base de datos — los datos son mockeados en los componentes. Google OAuth es opcional para el MVP.

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── (dashboard)/     → (obsoleto, migrado a /dashboard)
│   ├── dashboard/       → Panel de usuario con sidebar
│   │   ├── page.tsx     → Overview / resumen
│   │   ├── layout.tsx   → Sidebar + header
│   │   ├── timeline/    → Timeline del proceso
│   │   ├── expediente/  → Detalle del expediente
│   │   ├── denuncia/    → Nueva denuncia
│   │   ├── feedback/    → Calificación del trato
│   │   └── settings/    → Configuración
│   ├── login/           → Pantalla de inicio de sesión
│   ├── api/auth/        → NextAuth endpoints
│   ├── page.tsx         → Landing (redirige a /dashboard)
│   └── layout.tsx       → Layout raíz con tipografía
├── components/
│   ├── ui/              → shadcn/ui components
│   └── features/        → Componentes de funcionalidad
├── lib/
│   ├── auth.ts          → Configuración NextAuth con demo
│   └── db.ts            → Conexión a Prisma
└── styles/
    └── globals.css      → Estilos globales
```

## 👤 Modo Demo

La app incluye un modo demo que funciona sin autenticación real. Simplemente iniciá sesión con el botón **"Modo Demo"** en la pantalla de login.

---

<sub>Hecho con ❤️ para el Hackathon Norte Potencia — Equipo 6</sub>
