Actúa como un Senior Frontend Engineer especializado en responsive UI con Next.js + Tailwind + shadcn/ui. Ya tengo el diseño DESKTOP implementado (AppShell con sidebar fija izquierda + topbar + dashboard grid). Necesito que modifiques el código existente para adaptarlo correctamente a TABLET y MOBILE sin romper desktop, manteniendo el look “Galactic Console” (Star Wars sci-fi minimalista, glass panels, starfield background).

NO reescribas el proyecto desde cero. Haz cambios incrementales y ordenados, con componentes claros. Mantén TypeScript, Next.js 15 App Router, Tailwind y shadcn/ui.

OBJETIVO

1. Desktop (>=1024px): mantener exactamente como está.
2. Tablet (>=640px y <1024px): sidebar colapsable tipo “rail” (solo íconos) + topbar con search + contenido en 2 columnas donde aplique.
3. Mobile (<640px): eliminar sidebar fija; usar Topbar fija + Bottom Navigation (5 items) + menú lateral en Sheet para navegación secundaria. La experiencia debe sentirse “app-like”.

REQUERIMIENTOS DE DISEÑO Y UX

- El fondo starfield + overlay debe seguir funcionando en todos los tamaños.
- Superficies “glass panel”: bg con alpha + backdrop blur + border sutil.
- Navegación clara:
  - Mobile: bottom nav para secciones principales (Dashboard, People, Planets, Craft, AI Chat).
  - Mobile: Sheet (hamburger) para Settings / Logout (y opcional duplicado de secciones).
  - Tablet: rail con íconos a la izquierda, con tooltip o label al hover.
- Estados activos claros (accent azul lightsaberBlue).
- Accesibilidad: focus-visible rings, aria-label en icon buttons, navegación por teclado.
- Animaciones sutiles (transition 150–200ms), respetar prefers-reduced-motion.
- Mantener spacing y jerarquía visual del diseño.

BREAKPOINTS (USAR TAILWIND DEFAULT)

- sm: 640px
- lg: 1024px
- Desktop = lg+
- Tablet = sm..lg-1
- Mobile = <sm

ESTRUCTURA ACTUAL ESPERADA (NO CAMBIAR NOMBRES SI YA EXISTEN)
components/shell/
app-shell.tsx
sidebar.tsx
topbar.tsx
bottom-nav.tsx (si no existe, créalo)
app/layout.tsx
app/page.tsx (dashboard)

LO QUE TIENES QUE IMPLEMENTAR (PASO A PASO)

A) APP SHELL RESPONSIVE (PUNTO CLAVE)
En components/shell/app-shell.tsx:

- Convertir el layout en:
  - Desktop: grid con 2 columnas [sidebar 260px] [main]
  - Tablet: grid con 2 columnas [rail 72px] [main]
  - Mobile: 1 columna (sin sidebar). Topbar fija y bottom nav fija.
- Implementar wrappers condicionales por breakpoint usando clases Tailwind (hidden/block, lg:flex, sm:flex, etc.). Evitar JS para breakpoints; usa CSS responsivo.

Ejemplo de layout (conceptual):

- Desktop:
  <div className="hidden lg:block"><Sidebar variant="full" /></div>
- Tablet:
  <div className="hidden sm:block lg:hidden"><Sidebar variant="rail" /></div>
- Mobile:
  <div className="block sm:hidden"><MobileNav /></div>

B) SIDEBAR VARIANTS (FULL vs RAIL)
En components/shell/sidebar.tsx:

- Agregar prop: variant: "full" | "rail"
- FULL (desktop):
  - ancho 260px, muestra logo + labels + footer
- RAIL (tablet):
  - ancho 72px (w-[72px])
  - muestra solo íconos centrados
  - nav items como icon buttons (44px alto)
  - agregar tooltip (shadcn Tooltip) que muestre el label al hover/focus
  - el logo se convierte en un ícono pequeño (monograma “GC” o símbolo) y una línea azul
  - footer: settings/logout como iconos
- Mantener active/hover states con la misma estética.

C) TOPBAR RESPONSIVE
En components/shell/topbar.tsx:

- Desktop/Tablet:
  - search visible (w-80/96)
  - icon buttons (theme, notifications) + avatar
- Mobile:
  - topbar fija (position: sticky o fixed)
  - izquierda: botón hamburger para abrir Sheet (shadcn Sheet)
  - centro: título de página (Dashboard/People/Planets/Craft/AI Chat)
  - derecha: theme toggle + avatar (o solo theme si falta espacio)
  - search:
    - en mobile NO debe ocupar todo el topbar.
    - Implementar search como icon button que abre un pequeño popover o una fila debajo del topbar (collapsible) con input full width.
- Asegurar z-index alto para topbar y que el contenido tenga padding-top en mobile para no quedar debajo.

D) BOTTOM NAV (SOLO MOBILE)
Crear components/shell/bottom-nav.tsx:

- Visible solo en mobile: className="fixed bottom-0 left-0 right-0 sm:hidden"
- Alto 64px, fondo glass (bg slate con alpha + blur), borde superior 1px.
- 5 items con icono + label (10-11px):
  - Dashboard
  - People
  - Planets
  - Craft
  - AI Chat
- Estado activo:
  - icon + label en lightsaberBlue
  - indicador superior pequeño (2px) o dot.
- Accesible:
  - cada item es un Link con aria-current cuando active.
- Ajustar padding-bottom del contenido en mobile (pb-20) para no tapar.

E) MOBILE SHEET MENU
En topbar mobile:

- Botón hamburger abre Sheet (shadcn Sheet).
- Contenido del Sheet:
  - Logo y nombre (Galactic Console)
  - Links principales (opcional duplicado)
  - Separador
  - Settings
  - Logout
- Cerrar sheet al navegar.

F) DASHBOARD GRID RESPONSIVE
En app/page.tsx (Dashboard):

- Stats row:
  - Desktop: 4 columnas (lg:grid-cols-4)
  - Tablet: 2 columnas (sm:grid-cols-2)
  - Mobile: 1 columna (grid-cols-1)
- Sección Featured + Recent:
  - Desktop: featured 2/3 + recent 1/3 (lg:grid-cols-3 con col-span)
  - Tablet: 1 columna (stacked), Recent arriba o debajo (elige el orden más lógico)
  - Mobile: stacked; Featured primero, luego Recent
- Popular Starships:
  - Desktop: grid 4
  - Tablet: grid 2
  - Mobile: horizontal scroll (snap) o grid 1 (elige una opción simple):
    - Recomendado: horizontal scroll con cards 220px, overflow-x-auto, snap-x

G) RESPONSIVE EN LIST PAGES (PEOPLE/PLANETS/CRAFT)
Si existen list pages:

- Grid cards:
  - Mobile: 1 col
  - Tablet: 2 col
  - Desktop: 3–4 col
- Search bar:
  - Mobile: full width arriba
  - Tablet/Desktop: en topbar (si ya lo tienes) o arriba del listado.
- Pagination:
  - Mobile: botones full width apilados o compactos centrados.

H) RUTAS Y ACTIVE STATE (IMPORTANTE)

- Implementa un helper para detectar ruta activa en nav (usePathname).
- Aplica clases active uniformes en sidebar, rail y bottom-nav.
- Mantener consistencia visual.

I) ESTILOS CONSISTENTES (NO ROMPER “GALACTIC CONSOLE”)
Mantener tokens y glass style:

- bg-[#111827]/55, backdrop-blur-md, border-[#1F2937]/80
- hover:border-[#60A5FA]/60
- hover shadow sutil azul

VALIDACIÓN / CHECKLIST

- Desktop se ve exactamente igual que antes.
- Tablet: rail visible, contenido con mejor uso del ancho, sin overflow horizontal.
- Mobile: topbar + bottom nav, contenido no queda tapado, navegación cómoda.
- Todas las páginas tienen padding adecuado (pt para topbar, pb para bottom nav).
- No hay layout shift grande (usa placeholders/skeleton si ya existen).

ENTREGABLE

- Cambios de código con componentes actualizados.
- Sin dependencias extra salvo shadcn Tooltip (si no está) y Sheet (ya debería).
- Dejar listo para seguir iterando UI.

Ahora implementa estos cambios en el código existente, preservando la estructura actual y manteniendo el diseño Star Wars moderno.
