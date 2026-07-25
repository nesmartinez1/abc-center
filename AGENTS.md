# ABC Centro Familiar Integral — Agent Context

Umbrella marketing site that hosts **four+ programs as one site** ("four websites
inside one website") for **ABC Centro Familiar Integral**, a Puerto Rican family
center. Content is in **Spanish**. Static — no backend, no CMS, no auth.

## The programs (org chart)

- **ABC Centro Familiar Integral** — umbrella / home (`/`)
  - **ABC Brilliant Brains** (`/brilliant-brains`) — prototype
  - **ABC Mental Care** (`/mental-care`) — prototype
  - **ABC Foundation** (`/fundacion`) — prototype
    - **Más Que Atletas PR** (`/fundacion/mas-que-atletas`) — **LIVE / fully built**
    - **ABC Ocean Care** (`/fundacion/ocean-care`) — prototype

Only **Más Que Atletas PR** has real content (ported from the standalone
`../mas-que-atletas-pr` repo). Every other section is a themed **prototype**
built from the reusable `BrandLanding` template with placeholder copy — enough to
visualize the structure until real content arrives.

## Tech stack

- **React 19 + TypeScript + Vite** (same template as the MQA site).
- **react-router-dom v7** — `<BrowserRouter>` + `<Routes>`, nested routes
  generated from the brand config (no data-router/loaders).
- **Plain per-component CSS** — each component/page has a sibling `.css`. No
  Tailwind, no CSS Modules, no CSS-in-JS, no UI/state library.

## Running it (IMPORTANT env gotcha)

`node`/`npm` are **not on PATH by default** — source nvm first in every shell:

```bash
export NVM_DIR="$HOME/.nvm"; \. "$NVM_DIR/nvm.sh"; nvm use v24.17.0
```

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (strict: `noUnusedLocals`/
  `noUnusedParameters`)
- `npm run lint` — ESLint flat config. Note `react-refresh/only-export-components`:
  keep non-component exports out of files that default-export a component.

## Architecture — the multi-brand system

Everything flows from one config: **`src/config/brands.tsx`**.

- `brands` (record keyed by `BrandId`) — each program's name, `path`, tagline,
  blurb, `live` flag, and optional `pages` (contextual sub-nav).
- `programNav` — the dropdown-menu hierarchy (Foundation nests MQA + Ocean Care).
- Add/adjust a program by editing this file **and** adding a matching theme block
  in `src/brands.css`.

### Routing — `src/App.tsx`

Nested `<Route>`s under a single `<Layout>` so the nav/footer shell is shared.
Paths mirror the org chart (MQA lives under `/fundacion/mas-que-atletas`).

### Per-brand theming (how each section "feels like its own site")

- `src/index.css` `:root` holds **neutral** tokens (bg/text/border) + base type,
  with a `@media (prefers-color-scheme: dark)` override — global, so light/dark
  works everywhere.
- `src/brands.css` holds **per-brand accent** overrides keyed by
  `[data-brand="<id>"]` (light + a dark media query): `--accent`, `--accent-bg`,
  `--accent-border`, and `--on-ink-accent` (the accent that reads on the
  always-dark navbar/footer).
- `Layout.tsx` sets `data-brand={activeBrand.id}` on the `.app-shell` wrapper.
  `useActiveBrand()` resolves the current URL to a brand by **longest matching
  `path` prefix** (so `/fundacion/mas-que-atletas` beats `/fundacion`; `centro`
  at `/` is the fallback).
- Accents: Centro indigo · Brilliant Brains amber · Mental Care teal · Foundation
  violet · MQA green (unchanged) · Ocean Care blue. **Placeholders — swap for real
  ABC brand colors when they arrive.**

### Navigation

- **`Navbar.tsx`** — brand + `Inicio` + a **"Programas" dropdown** (click to open,
  Esc / click-outside to close) rendering the `programNav` tree with Foundation's
  children nested. Non-`live` programs show a "Próximamente" badge. On mobile
  (<1024px) the hamburger panel shows the same tree as an always-expanded
  accordion. Search input is a non-functional placeholder (no CMS).
- **`SubNav.tsx`** — slim secondary nav for the active program's own `pages`.
  Only renders for brands that define `pages` (today: MQA). Single-page prototypes
  render nothing.

## Structure

```
src/
  App.tsx                     nested routes from the brand config
  main.tsx                    <BrowserRouter><App/>; imports index.css + brands.css
  index.css                   global neutral tokens + base type
  brands.css                  per-brand accent overrides (light + dark)
  config/brands.tsx           SINGLE SOURCE OF TRUTH (brands, programNav, types)
  components/
    PlaceholderImage.tsx      "Foto próximamente" box; `fill` = full-bleed hero bg
    FeatureCard.tsx           card w/ accent top border
    SocialIcons.tsx           inline FB/IG/X SVGs (module-private icon fns)
    BrandLanding.tsx          reusable prototype landing (hero + intro + cards)
    layout/
      Layout.tsx              sets data-brand; Navbar + SubNav + <Outlet/> + Footer
      Navbar.tsx              hierarchical "Programas" dropdown + mobile accordion
      SubNav.tsx              per-program contextual sub-nav (MQA only today)
      Footer.tsx              brand-aware footer
      useActiveBrand.ts       pathname -> active brand (longest-prefix match)
  brands/
    centro/Home.tsx           umbrella home (features the 3 top-level programs)
    brilliant-brains/Home.tsx prototype (BrandLanding)
    mental-care/Home.tsx      prototype
    foundation/Home.tsx       landing featuring MQA + Ocean Care
    ocean-care/Home.tsx       prototype
    mas-que-atletas/          LIVE — bespoke pages ported from the MQA repo
      Home.tsx  Sports.tsx  News.tsx  (+ .css)
```

## Placeholders to replace when real assets arrive

- **Logo**: `.navbar-logo` placeholder in `Navbar.tsx`.
- **Hero/section photos**: `PlaceholderImage` boxes throughout (labeled "Foto
  próximamente"); MQA hero uses `<PlaceholderImage fill />`.
- **Brand accent colors**: `src/brands.css` (currently sensible placeholders).
- **Prototype copy**: Brilliant Brains / Mental Care / Foundation / Ocean Care use
  the generic `BrandLanding` template with placeholder text from
  `config/brands.tsx` (`blurb`, `tagline`).
- **Social links**: `href="#"` placeholders in `SocialIcons.tsx`.
- **Search bar / forms / donations**: non-functional UI placeholders (no backend).

## Deployment note

`BrowserRouter` needs **SPA fallback** — the host must rewrite unknown paths to
`index.html`, or deep loads (e.g. `/fundacion/mas-que-atletas/noticias`) 404 in
production.

## Verifying changes

`npm run build` + `npm run lint` must be clean. For visual checks, run the dev
server and drive headless Chromium via Playwright (`npm install --no-save
playwright && npx playwright install chromium`). Check each brand route in light
**and** dark mode (confirm the accent changes per program), the "Programas"
dropdown (open/close, keyboard, click-outside), the mobile hamburger accordion
(<1024px), and a direct deep-link load.
