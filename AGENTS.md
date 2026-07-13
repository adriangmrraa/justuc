<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- ============================================================ -->
<!-- MI PROCESO — DOCUMENTO MAESTRO DEL PROYECTO                  -->
<!-- ============================================================ -->

# 🏛️ Mi Proceso

> **Propuesta:** Una sección dentro del Portal del SAE (Sistema de Administración de Expedientes) del Poder Judicial de Tucumán para que la víctima pueda seguir su causa judicial sin llamar, sin ir al tribunal y sin revivir el trauma.
>
> **Este proyecto es el MVP funcional** que demuestra cómo se verían y funcionarían las 3 funcionalidades propuestas, como si ya estuvieran integradas en el SAE.
>
> **No es una plataforma nueva.** Es una propuesta de funcionalidades para integrar en el sistema existente, con un prototipo navegable que las exhibe.
>
> **Hackathon Norte Potencia 2026 — Equipo 6**

---

## 📋 Tabla de Contenidos

- [Visión General](#-visión-general)
- [Las 3 Funcionalidades](#-las-3-funcionalidades)
- [Arquitectura del MVP](#-arquitectura-del-mvp)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Stack Tecnológico](#-stack-tecnológico)
- [UX / Diseño](#-ux--diseño)
- [Flujo del Usuario](#-flujo-del-usuario)
- [Convenciones](#-convenciones)
- [Plan de Implementación](#-plan-de-implementación)

---

## 🎯 Visión General

### El Problema (en 2 tarjetas)

| Opacidad | Revictimización |
|----------|-----------------|
| Las víctimas no saben en qué estado está su causa. No hay forma simple de consultar el avance del proceso judicial sin ir personalmente al tribunal. | La víctima tiene que contar su historia repetidas veces a distintos operadores judiciales. No hay un canal único que centralice su testimonio. |

### La Solución

Tres funcionalidades simples, integradas en el portal del SAE que ya existe:

1. **Timeline Visual** — como seguir un envío de MercadoLibre
2. **Notificaciones + Google Calendar** — eventos sincronizados, mails automáticos
3. **Declaración en Video** — la víctima se filma con su celular, sin subir archivos

---

## ⚡ Las 3 Funcionalidades

### 1. 📅 Timeline Visual del Proceso

La víctima ve en una línea de tiempo clara y ordenada todos los eventos de su causa judicial: denuncia, derivaciones, audiencias, resoluciones. Como seguir un envío.

**Reglas:**
- Cada evento muestra: fecha, institución, estado, descripción corta en lenguaje ciudadano
- Los eventos se ordenan cronológicamente
- El estado actual se destaca visualmente
- La información viene del SAE — solo se redistribuye con UX clara

### 2. 🔔 Notificaciones + Google Calendar

Cada vez que hay una audiencia, un cambio de estado o un evento importante, la víctima:
- Recibe un **mail automático** con la novedad
- Se le **agrega al Google Calendar** el evento (si aplica)

**Reglas:**
- La conexión con Google es vía OAuth (el usuario autoriza el acceso a su calendar)
- Las notificaciones son unidireccionales: el sistema empuja, la víctima recibe
- No requiere que la víctima tenga la app abierta

### 3. 🎥 Declaración en Video

La víctima se filma con la cámara y el micrófono de su celular **directamente desde el navegador** (NO sube archivos adjuntos).

**Dos usos:**
- **Declaración inicial:** La víctima graba su declaración jurada una sola vez al inicio del proceso
- **Respuesta a solicitudes:** Si la justicia necesita más información, envía un mail a la víctima pidiendo que aclare X o cuente Y. La víctima ingresa a la plataforma, inicia sesión, y graba un video respondiendo. **Sin citación, sin ir al tribunal.**

**Reglas:**
- Usa la API `MediaRecorder` del navegador (cámara + micrófono en vivo)
- No se permite subir videos pre-grabados (solo captura en vivo)
- El video se almacena y queda asociado al expediente
- La víctima puede verse a sí misma antes de enviar (preview)
- Interfaz mínima: botón grabar, preview, botón enviar

---

## 🏗️ Arquitectura del MVP

### Principios

- **Single Page Application:** Toda la experiencia en una sola página, sin sidebar, sin navegación interna
- **Mobile-first:** Diseñado desde el celular, adaptado a desktop
- **Sin autenticación compleja:** Modo demo con login mínimo (usa las credenciales del SAE)
- **Datos mockeados:** El MVP funciona con datos de ejemplo — la integración real con SAE es para producción
- **Sin base de datos:** Para el MVP los datos viven en memoria/estado local

### Página Única — Las 3 Secciones

Toda la experiencia vive en **una sola página** (la ruta principal del MVP, ej. `/` o `/dashboard`), compuesta de 3 secciones visibles con scroll y cards/modales para detalle:

```
┌─────────────────────────────────────┐
│  HEADER                             │
│  Logo "Mi Proceso" + info del caso  │
├─────────────────────────────────────┤
│  SECCIÓN 1: TIMELINE                │
│  Línea de tiempo visual             │
│  Eventos ordenados cronológicamente │
│  Estado actual destacado            │
├─────────────────────────────────────┤
│  SECCIÓN 2: NOTIFICACIONES          │
│  Conexión Google (botón conectar)   │
│  Últimas notificaciones / eventos   │
│  Próximas audiencias                │
├─────────────────────────────────────┤
│  SECCIÓN 3: DECLARACIÓN EN VIDEO    │
│  Preview de cámara                  │
│  Botón grabar / detener             │
│  Botón enviar (si hay video)        │
│  Historial de videos enviados       │
├─────────────────────────────────────┤
│  FOOTER                             │
│  Hackathon Norte Potencia 2026      │
└─────────────────────────────────────┘
```

### Lo que NO tiene el MVP

- ❌ Sidebar de navegación
- ❌ Múltiples rutas/páginas internas
- ❌ Dashboard con estadísticas
- ❌ Expediente digital completo
- ❌ Asesor IA
- ❌ Sistema de feedback "Buen Trato"
- ❌ Código de seguimiento
- ❌ Autenticación con Google OAuth real
- ❌ Base de datos

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── dashboard/          → Página única con las 3 funcionalidades
│   │   └── page.tsx        → Componente principal (3 secciones + modales)
│   ├── login/              → Pantalla de inicio de sesión
│   ├── api/                → API routes (demo)
│   ├── page.tsx            → Landing (redirige a /dashboard o /login)
│   └── layout.tsx          → Layout raíz
├── components/
│   ├── ui/                 → shadcn/ui components (los que se usen)
│   └── features/
│       ├── timeline.tsx         → Timeline visual del proceso
│       ├── notificaciones.tsx   → Conexión Google + notificaciones
│       └── video-declaracion.tsx → Grabación de video con MediaRecorder
├── lib/
│   └── data.ts             → Datos mockeados del caso
├── styles/
│   └── globals.css         → Estilos globales
└── public/
    └── (logos, imágenes)
```

### Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing / redirige a `/dashboard` |
| `/login` | Login modo demo (mínimo) |
| `/dashboard` | **Página única** — Timeline + Notificaciones + Video en secciones + modales |

---

## 🧰 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.2.6 | Framework con App Router |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 4.x | Estilos utilitarios mobile-first |
| **shadcn/ui** | latest | Componentes base (button, card, badge) |
| **Lucide React** | latest | Iconos |

> El MVP NO usa: NextAuth, Prisma, Base UI, React Query, Framer Motion, Zustand, Recharts, OpenAI, react-hook-form, sonner, zod.
> Si alguna de esas dependencias está en package.json, evaluar si se necesita o se puede simplificar.

---

## 🎨 UX / Diseño

### Identidad Visual

| Color | Uso | Hex |
|-------|-----|-----|
| Celeste | Botones, enlaces, acentos | `#5BA3E6` |
| Azul profundo | Fondos de sección, headers | `#0A2647` |
| Azul oscuro | Textos principales | `#1E3A5F` |
| Fondo claro | Fondo general | `#F0F7FE` |
| Blanco | Cards, contenedores | `#FFFFFF` |

### Tipografía

- **Plus Jakarta Sans** — cuerpo de texto
- **Montserrat** — headings (bold, moderna)
- Los textos son en español, lenguaje ciudadano (sin jerga judicial)

### Principios de Diseño

1. **Una página, tres secciones** — scroll vertical, todo visible
2. **Mobile-first** — el layout se adapta de 320px hacia arriba
3. **Botones grandes y claros** — la víctima no tiene que buscar las acciones
4. **Lenguaje ciudadano** — nada de "expediente N° X", decimos "tu causa"
5. **Estados visibles** — la víctima siempre sabe qué pasó, qué pasa y qué sigue

---

## 🔄 Flujo del Usuario

```
1. LLEGA                              2. VE SU CAUSA
┌─────────────────┐                   ┌──────────────────────┐
│ Ingresa a        │                   │ Ve el timeline con   │
│ /miproceso       │ ────────────────→ │ todos los eventos    │
│ con sus claves   │                   │ de su proceso        │
│ del SAE          │                   │                      │
└─────────────────┘                   └──────────────────────┘
         │                                      │
         │                                      │
         ▼                                      ▼
┌──────────────────────┐            ┌──────────────────────┐
│ 3. RECIBE AVISOS      │            │ 4. DECLARA EN VIDEO  │
│ Conecta Google para   │            │ Se filma con su      │
│ notificaciones mail   │            │ celular para dejar   │
│ y eventos en calendar │            │ su declaración o     │
│                       │            │ responder a la       │
│                       │            │ justicia             │
└──────────────────────┘            └──────────────────────┘
```

---

## 📐 Convenciones

### Nombres

- **Proyecto:** `mi-proceso`
- **Nombre de la propuesta:** `Mi Proceso`
- **Variables en inglés** (camelCase): `timelineEvents`, `videoRecorder`, `calendarConnected`
- **Componentes en inglés** (PascalCase): `Timeline`, `VideoDeclaracion`, `Notificaciones`
- **Archivos en kebab-case:** `video-declaracion.tsx`, `notificaciones.tsx`

### Commits

Usar conventional commits:
- `feat:` para nuevas funcionalidades
- `fix:` para correcciones
- `docs:` para documentación
- `refactor:` para cambios de código que no agregan funcionalidad

### Código

- TypeScript estricto
- Componentes cliente (`"use client"`) solo donde se necesita interactividad
- Preferir Server Components donde sea posible
- Los datos mockeados viven en `lib/data.ts`

---

## 🗺️ Plan de Implementación

### Fase 1 — Base (prioridad alta)
- [ ] Limpiar rutas viejas: eliminar `/dashboard/*`, `/asesor-ia`, `/feedback`, `/settings`
- [ ] Simplificar `/dashboard` a una sola página sin sidebar, con layout de scroll vertical
- [ ] Armar estructura de 3 secciones con scroll y modales
- [ ] Remover dependencias no usadas (Prisma, NextAuth, etc.)

### Fase 2 — Timeline (prioridad alta)
- [ ] Componente Timeline con datos mockeados
- [ ] Eventos ordenados por fecha
- [ ] Estado actual destacado visualmente
- [ ] Lenguaje ciudadano en cada evento

### Fase 3 — Notificaciones + Calendar (prioridad media)
- [ ] Sección de conexión Google (mock: botón "Conectar" que simula OAuth)
- [ ] Lista de próximos eventos y notificaciones recientes
- [ ] Badge de "próxima audiencia"

### Fase 4 — Declaración en Video (prioridad media)
- [ ] Componente con preview de cámara en vivo
- [ ] Botón grabar/detener usando MediaRecorder API
- [ ] Preview del video grabado antes de enviar
- [ ] Historial de videos enviados (mock)

### Fase 5 — Pulido (prioridad baja)
- [ ] Animaciones suaves entre secciones
- [ ] Estados vacíos y de carga
- [ ] Responsive testing
- [ ] Actualizar README y documentación

---

## 🔗 Links

- **Presentación:** `docs/presentacion-hackaton.html`
- **Pitch:** `docs/presentacion-pitch.html`
- **PDF:** `docs/presentacion-miproceso.pdf`
- **Diseño en Pencil:** (pendiente)
