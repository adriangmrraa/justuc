<p align="center">
  <span style="font-size: 48px;">📋</span>
</p>

<h1 align="center">🏛️ Mi Proceso</h1>

<p align="center">
  <strong>Una propuesta para que la víctima sepa, desde su celular, en qué estado está su causa judicial.</strong>
  <br>
  Propuesta de funcionalidades para integrar en el Portal del SAE del Poder Judicial de Tucumán.
  <br>
  Desarrollado para el <strong>Hackathon Norte Potencia 2026</strong> — Equipo 6.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/shadcn/ui-latest-000?style=flat-square" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/status-Propuesta-blue?style=flat-square" alt="Status">
</p>

---

## ✨ Las 3 Funcionalidades

| # | Funcionalidad | Descripción |
|---|---------------|-------------|
| 1 | **📅 Timeline Visual** | La víctima ve todos los eventos de su causa ordenados cronológicamente. Como seguir un envío. |
| 2 | **🔔 Notificaciones + Google Calendar** | Audiencias y cambios de estado se sincronizan al calendario de la víctima. Mails automáticos. |
| 3 | **🎥 Declaración en Video** | La víctima se filma con su celular desde el navegador. Sin subir archivos. Declaración inicial o respuesta a la justicia. |

> **No es una plataforma nueva.** Es una propuesta para agregar estas funcionalidades al Portal del SAE existente, en la ruta `/miproceso`.

---

## 🧰 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.2.6 | Framework con App Router |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 4.x | Estilos utilitarios mobile-first |
| **shadcn/ui** | latest | Componentes base (button, card, badge) |
| **Lucide React** | latest | Iconos |

---

## 📁 Estructura

```
src/
├── app/
│   ├── miproceso/page.tsx   → Página única (Timeline + Notif. + Video)
│   ├── login/                → Login modo demo
│   └── page.tsx              → Landing (redirige)
├── components/features/
│   ├── timeline.tsx
│   ├── notificaciones.tsx
│   └── video-declaracion.tsx
├── lib/data.ts               → Datos mockeados
└── styles/globals.css
```

---

## 🚀 Primeros pasos

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) para ver la app.

---

## 📄 Documentación

- Presentación: [`docs/presentacion-hackaton.html`](docs/presentacion-hackaton.html)
- Pitch: [`docs/presentacion-pitch.html`](docs/presentacion-pitch.html)
- Documento maestro: [`AGENTS.md`](AGENTS.md)

---

<p align="center">
  <sub>
    Hecho con ❤️ para el <strong>Hackathon Norte Potencia 2026</strong> — Equipo 6
  </sub>
</p>
