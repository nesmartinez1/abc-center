# ABC Centro Familiar Integral — Agent Context

Umbrella marketing site that hosts **four+ programs as one site** ("four websites
inside one website") for **ABC Centro Familiar Integral**, a Puerto Rican family
center. Content is in **Spanish**. Static apart from two serverless email
handlers in `api/` (see "Contact forms" below) — no CMS, no auth.

## The programs (org chart)

- **ABC Centro Familiar Integral** — umbrella / home (`/`)
  - **ABC Brilliant Brains** (`/brilliant-brains`) — **LIVE / fully built**
  - **ABC Mental Care** (`/mental-care`) — prototype
  - **ABC Foundation** (`/fundacion`) — prototype
    - **Más Que Atletas PR** (`/fundacion/mas-que-atletas`) — **LIVE / fully built**
    - **ABC Ocean Care** (`/fundacion/ocean-care`) — prototype

Two programs have real content, each ported in from its own standalone repo:
**Más Que Atletas PR** (from `../mas-que-atletas-pr`) and **ABC Brilliant Brains**
(from `../abc_brilliant_brains`). Both source repos are left untouched as backups.
Every other section is a themed **prototype** built from the reusable
`BrandLanding` template with placeholder copy — enough to visualize the structure
until real content arrives.

## Tech stack

- **React 19 + TypeScript + Vite** (same template as the MQA site).
- **react-router-dom v7** — `<BrowserRouter>` + `<Routes>`, nested routes
  generated from the brand config (no data-router/loaders).
- **Plain per-component CSS** — each component/page has a sibling `.css`. No
  CSS-in-JS, no UI/state library.
- **One exception: `src/brands/brilliant-brains/` uses Tailwind v4 + CSS
  Modules**, because it was ported wholesale from a repo built that way. Tailwind
  is deliberately confined to that subtree — read
  ["Tailwind is scoped to Brilliant Brains"](#tailwind-is-scoped-to-brilliant-brains)
  before touching any CSS.
- `@heroicons/react` — icons, used only by Brilliant Brains.

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

### Tailwind is scoped to Brilliant Brains

`src/brilliant-brains.css` is a load-bearing seam between two styling systems.
Every line in it exists to stop Tailwind leaking into the other five brands, and
each is easy to "clean up" into a bug. **Read the comments in that file before
editing it.** In short:

1. **Preflight is never imported.** It is a global reset and would restyle MQA and
   every prototype page. The equivalent, scoped to `.bb-scope`, lives in
   `src/brands/brilliant-brains/reset.css`. Its rules are written as
   `.bb-scope :where(...)` so they land at (0,1,0) — the same specificity as a
   Tailwind utility, so utilities win on source order, while still beating
   `index.css`'s element selectors at (0,0,1). Rewriting them as plain `h1 {...}`
   flips both comparisons.
2. **Utilities are imported *unlayered*,** not `layer(utilities)` as the Tailwind
   docs show. `index.css` is unlayered, and unlayered CSS beats any `@layer`, so
   layered utilities would lose to `h1 { font-size: 56px }`.
3. **Source scanning is restricted** with `source(none)` + an explicit `@source`.
   Without it Tailwind sees the site-wide `.container` class used in `index.css`,
   emits its own `.container` utility, and overrides `max-width: 1200px` on every
   page of the site.
4. **`:root` stays at `font-size: 16px`.** Tailwind's whole scale is authored in
   `rem`. The site's 18px body type is applied on `.app-shell` instead. Putting
   18px back on `:root` silently inflates every BB size by 12.5% and overflows its
   fixed-height layouts (the carousel clips its badge and CTA). None of this
   project's own CSS uses `rem`/`em`, so the split costs nothing.

Every BB page renders inside `<div className="bb-scope">`, supplied by the route
element `src/brands/brilliant-brains/Layout.tsx`. That wrapper also sets
`color-scheme: light`, because BB is designed light-only and does not follow the
site's dark mode.

### Navigation

- **`Navbar.tsx`** — brand + `Inicio` + a **"Programas" dropdown** (click to open,
  Esc / click-outside to close) rendering the `programNav` tree with Foundation's
  children nested. Non-`live` programs show a "Próximamente" badge. On mobile
  (<1024px) the hamburger panel shows the same tree as an always-expanded
  accordion. Search input is a non-functional placeholder (no CMS).
- **`SubNav.tsx`** — slim secondary nav for the active program's own `pages`.
  Only renders for brands that define `pages` (today: MQA and Brilliant Brains).
  Single-page prototypes render nothing.
- **`SocialIcons.tsx`** — reads `activeBrand.social` (passed down by `Footer.tsx`)
  and falls back to `href="#"` for any platform a program hasn't supplied. Only
  Brilliant Brains has real accounts so far.

## Structure

```
src/
  App.tsx                     nested routes from the brand config
  main.tsx                    <BrowserRouter><App/>; CSS import ORDER matters:
                              index.css, brands.css, then brilliant-brains.css
  index.css                   global neutral tokens + base type (root stays 16px)
  brands.css                  per-brand accent overrides (light + dark)
  brilliant-brains.css        Tailwind, scoped — READ ITS COMMENTS BEFORE EDITING
  config/brands.tsx           SINGLE SOURCE OF TRUTH (brands, programNav, types)
  components/
    PlaceholderImage.tsx      "Foto próximamente" box; `fill` = full-bleed hero bg
    FeatureCard.tsx           card w/ accent top border
    SocialIcons.tsx           inline FB/IG/X SVGs (module-private icon fns)
    BrandLanding.tsx          reusable prototype landing (hero + intro + cards)
    layout/
      Layout.tsx              sets data-brand; Navbar + SubNav + <Outlet/> + Footer
      Navbar.tsx              hierarchical "Programas" dropdown + mobile accordion
      SubNav.tsx              per-program contextual sub-nav (MQA + BB today)
      Footer.tsx              brand-aware footer
      useActiveBrand.ts       pathname -> active brand (longest-prefix match)
  brands/
    centro/Home.tsx           umbrella home (features the 3 top-level programs)
    brilliant-brains/          LIVE — ported from ../abc_brilliant_brains
      Layout.tsx              route element supplying the .bb-scope wrapper
      Home.tsx                hero + services carousel
      Services.tsx  Workshops.tsx  About.tsx  Contact.tsx
      HeroSection.tsx  ServicesCarousel.tsx
      HashLink.tsx            <Link> + scroll-to-anchor; replaces the source
                              repo's react-router-hash-link (no types, peer
                              range predates react-router v7)
      reset.css               Tailwind Preflight, scoped to .bb-scope
      css/*.module.css        CSS Modules carried over from the source repo
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
- **Social links**: `Brand.social` in `config/brands.tsx`. Only Brilliant Brains
  has real URLs; the rest fall back to `href="#"`.
- **Search bar / donations**: non-functional UI placeholders. (The Brilliant
  Brains contact + service-request forms are real — see below.)

## Contact forms (`api/`)

Brilliant Brains ships two Vercel-style serverless handlers, carried over from its
source repo:

- `api/contact.js` — the Contacto page form. Reads `nombre, email, telefono,
  asunto, mensaje`.
- `api/service-request.js` — the "Solicitar Servicio" modal on Servicios. Reads
  `name, email, phone, grade, message, service`.

Both send mail with **nodemailer over Gmail** and need `GMAIL_USER` +
`GMAIL_APP_PASSWORD` (a Google *App Password*, not the account password). See
`.env.example`.

Two gotchas:

- **These have never been configured.** The source repo's `.env` only held an
  unused `RESEND_API_KEY`, so both handlers fail with `Missing credentials for
  "PLAIN"` and return 500. The UI degrades correctly (shows its error state), but
  no mail is sent until the two vars are populated in the host's environment.
- **`npm run dev` does not serve `/api/*`** — plain Vite has no serverless
  runtime, so submissions 404 locally. Use `vercel dev` to exercise them.

`api/` is excluded from both `tsc` (`tsconfig.app.json` includes only `src`) and
ESLint (`globalIgnores`), since it runs on the host rather than in the browser
bundle.

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

When touching anything CSS-related, **screenshot the non-BB routes before and
after and diff the PNGs byte-for-byte** — that is the only reliable way to catch
Tailwind leaking out of `.bb-scope`. All of `/`, `/mental-care`, `/fundacion`,
`/fundacion/mas-que-atletas` (+ `/deportes`, `/noticias`) and
`/fundacion/ocean-care` should be pixel-identical in light *and* dark.
