# ABC Centro Familiar Integral — Agent Context

Umbrella marketing site that hosts **four+ programs as one site** ("four websites
inside one website") for **ABC Centro Familiar Integral**, a Puerto Rican family
center. Content is in **Spanish**. Static apart from two serverless email
handlers in `api/` (see "Contact forms" below) — no CMS, no auth.

## The programs (org chart)

- **ABC Centro Familiar Integral** — umbrella / home (`/`)
  - **ABC Brilliant Brains** (`/brilliant-brains`) — **LIVE / fully built**
  - **ABC Mental Care** (`/mental-care`) — real copy, 5 pages, `live: false`
  - **ABC Foundation** (`/fundacion`) — real copy, 5 pages, `live: false`
    - **Más Que Atletas PR** (`/fundacion/mas-que-atletas`) — **LIVE / fully built**
    - **ABC Ocean Care** (`/fundacion/ocean-care`) — real copy, 4 pages, `live: false`
    - **ABC Nutrition** (`/fundacion/abc-nutrition`) — announced only, prototype

Two programs are fully finished, each ported in from its own standalone repo:
**Más Que Atletas PR** (from `../mas-que-atletas-pr`) and **ABC Brilliant Brains**
(from `../abc_brilliant_brains`). Both source repos are left untouched as backups.

**Centro, Mental Care, Foundation and Ocean Care now carry ABC's real copy** —
mission, vision, values, service lists, page structures — taken from the client's
questionnaire answers. They are still `live: false` because no photos, logos,
brand colours or contact details have been supplied: every image is a
`PlaceholderImage`, so the "Vista previa" badge stays until those arrive.

**ABC Nutrition** was announced with nothing but a name and uses the generic
`BrandLanding` prototype template.

`projects/abc-content-outstanding.md` is the running punch list of what ABC still
owes.

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
- `programNav` — the dropdown menu as **two labelled groups**, not a flat tree:
  *Servicios del Centro* (Brilliant Brains, Mental Care) and *ABC Foundation*
  (its `owner`), which holds MQA, Ocean Care and Nutrition. See
  ["The Foundation split"](#the-foundation-split) — the grouping is load-bearing,
  not decoration.
- `parentBrandOf(id)` — the brand owning `id`'s group, derived from `programNav`
  so the menu and the sub-nav breadcrumb can't disagree.
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

### Page copy lives in `src/content/`, and empty sections disappear

**All client-written copy lives in `src/content/<brand>.ts` as plain data — never
inline in a component.** Page components map over those arrays, and a section
whose array is empty **renders nothing at all**.

This is deliberate, not incidental. ABC approved six homepage sections
(estadísticas, testimonios, galería, eventos, FAQ, aliados) and supplied content
for none of them. Wiring them to empty arrays means the structure exists, the
page never shows an empty shell, and filling one in later is a data edit with
zero component work.

Two consequences worth knowing:

- **Don't "fix" a missing section by hardcoding sample content.** If a section
  isn't rendering, its array in `src/content/` is empty and that is correct.
- **Two lists carry ⚠️ warnings**: Mental Care's `services` and Ocean Care's
  `activities`. ABC labelled these "Ejemplo" and "Posibles actividades" — they
  are *not confirmed*. Publishing an unconfirmed clinical service list is a real
  liability for a licensed practice. Read the file headers before touching them,
  and don't flip either program to `live: true` until ABC confirms.

`src/content/types.ts` holds the shared shapes. Optional fields left blank are
omitted from the rendered card, so a half-specified offering still looks
deliberate.

### Shared section components

`PageHero` (full-bleed header, `compact` for sub-pages) and `Section` (content
band + `.section-title` + `.container`) are the two primitives every plain-CSS
page is built from. `Section.css` also owns shared helpers used across pages:
`.section-grid`, `.section-split`, `.section-note`, `.section-empty`,
`.requirement-list` and `.card-cta`.

Then: `StatGrid`, `TeamGrid`, `TestimonialList`, `FaqList`, `PartnerLogos`,
`EventList`, `Gallery`, `OfferingGrid`, `ContactForm`, `CrisisNotice`,
`DonationTiers` — all take content arrays and handle their own empty states.

**Gotcha:** if a page uses a class from `Section.css` without rendering a
`Section`, import the stylesheet explicitly. Vite bundles all CSS together in
production, so a missing import only breaks in dev — `BrandLanding.tsx` has that
import for exactly this reason.

### Two things that are deliberately not wired up

- **Donations** (`DonationTiers`, `/fundacion/donar`) — the whole flow is built
  and interactive, but `donationsEnabled` in `content/foundation.ts` is `false`
  and the submit button is disabled. ABC asked for Stripe + ATH Móvil; no
  processor account exists. Flipping the flag is *not* enough to take money — it
  also needs a real checkout integration.
- **Mental Care intake** links out to ABC's own Google Form instead of posting to
  `/api/contact`. That's on purpose twice over: it's the channel ABC already
  uses, and a plain web form is not an appropriate place to collect health
  information. **Don't replace it with an on-site form.**

`CrisisNotice` (988 + Línea PAS) renders on *every* Mental Care page via
`brands/mental-care/Layout.tsx`. ABC asked for it explicitly; don't make it
conditional.

### Logos

ABC's six logos live in **`assets-src/logos/`** (NOT `public/` — everything there
is copied verbatim into `dist/`, and the originals are 614KB of mostly blank
padding). `scripts/build-logos.py` turns them into the assets the site loads:

```bash
python3 scripts/build-logos.py    # writes public/logos/, commit the output
python3 scripts/check-logos.py    # asserts the output is correct
```

**Drop new/updated logo files in `assets-src/logos/` and re-run the script.**

Two things in that script are load-bearing:

1. **Background removal is an edge flood-fill, not a global white→transparent
   pass.** Some artwork *is* white — the A/B/C letters inside ABC Centro's
   blocks, and the text inside ABC Foundation's red pill. A global colour
   replace punches holes straight through them. `check-logos.py` samples those
   exact regions and fails if they stop being opaque; it exists because the
   damage is invisible in a thumbnail.
2. **The mark crop boxes are hand-measured and can't be derived.** The lockups
   aren't structured consistently: Centro's wordmark *arcs around* its symbol,
   Brilliant Brains' character stands *on* the letters, and Ocean Care is a
   single circular badge that can't be split at all.

Each brand gets two variants, wired through `Brand.logo` and rendered by
`components/BrandLogo.tsx` (which falls back to `PlaceholderImage`, so call
sites never check — ABC Nutrition has no logo yet):

- **`full`** — the whole lockup. Use at 100px+ only.
- **`mark`** — the cropped symbol. The *only* version legible below ~80px;
  it's what the navbar and favicon use.

**Every logo needs a light backdrop on dark surfaces.** They all have dark text
baked in — Brilliant Brains' navy wordmark, Mental Care's dark green, Ocean
Care's navy — so on a dark card or hero scrim they go from hard to read to
completely invisible. Hence `.brand-logo-chip` (hero) and the white backdrop on
`.feature-card-logo`. The card chip is pure white, which disappears against
light-mode `--bg` (also white) and becomes a visible panel in dark mode. Don't
"simplify" either away.

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

### The Foundation split

ABC Foundation is **not** a third service alongside Brilliant Brains and Mental
Care — it's ABC's community arm and runs its own initiatives. A flat menu made
all five read as peers, so the hierarchy is now expressed in three places, all
driven by `programNav`:

1. **The dropdown** — two `role="group"` blocks with labels. Foundation's group
   is `--owned`: a tinted panel with a left accent bar whose header row *is* the
   link to `/fundacion`, with its initiatives indented inside.
2. **The sub-nav** — programs with an owner get an `ABC Foundation ›` breadcrumb
   on every page of their section. Foundation itself gets none; it's the owner,
   not the owned.
3. **The homepage** — "Servicios del Centro" and a separate "ABC Foundation" band
   listing its initiatives, mirroring the menu.

**Two things to not undo:**

- **The Foundation group must never use `--accent`.** The dropdown and sub-nav
  live inside `.app-shell[data-brand]`, so `--accent` is whatever program the
  visitor is currently on — tinting with it turns Foundation teal on Mental Care
  pages and green on MQA pages, defeating the point. Use the brand-independent
  `--foundation-*` tokens at the top of `brands.css` (there's a test asserting
  the tint is identical from three different programs).
- **The descriptor deliberately avoids "sin fines de lucro".** ABC has never
  confirmed nonprofit registration (see `../abc-content-outstanding.md`), so
  that would be an unverified legal claim. It currently reads "Iniciativas
  comunitarias de ABC". Change it in `programNav` once they confirm status.

### Navigation

- **`Navbar.tsx`** — brand + `Inicio` + a **"Programas" dropdown** (click to open,
  Esc / click-outside to close) rendering the `programNav` tree with Foundation's
  children nested. Non-`live` programs show a "Próximamente" badge. On mobile
  (<1024px) the hamburger panel shows the same tree as an always-expanded
  accordion. Search input is a non-functional placeholder (no CMS).
- **`SubNav.tsx`** — slim secondary nav for the active program's own `pages`,
  prefixed with an `ABC Foundation ›` breadcrumb when the brand has an owner.
  Only renders for brands that define `pages`.
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
  content/                    ALL client copy, as plain data (no JSX)
    types.ts                  shared shapes; optional fields render only if set
    centro.ts                 misión, visión, valores, historia (+ empty arrays)
    mental-care.ts            ⚠️ services list UNCONFIRMED — read the header
    foundation.ts             donationsEnabled=false; impact arrays empty
    ocean-care.ts             ⚠️ activities list UNCONFIRMED — read the header
  components/
    PlaceholderImage.tsx      "Foto próximamente" box; `fill` = full-bleed hero bg
    FeatureCard.tsx           card w/ accent top border
    SocialIcons.tsx           inline FB/IG/X SVGs (module-private icon fns)
    BrandLanding.tsx          reusable prototype landing (hero + intro + cards)
    PageHero.tsx              full-bleed page header; `compact` for sub-pages
    Section.tsx               content band + .section-title; owns shared helpers
    StatGrid / TeamGrid / TestimonialList / FaqList / PartnerLogos /
    EventList / Gallery / OfferingGrid
                              data-driven sections; empty array = not rendered
    ContactForm.tsx           plain-CSS form -> /api/contact (Foundation, Ocean)
    CrisisNotice.tsx          988 + Línea PAS; on every Mental Care page
    DonationTiers.tsx         donation UI; submit DISABLED (no processor)
    layout/
      Layout.tsx              sets data-brand; Navbar + SubNav + <Outlet/> + Footer
      Navbar.tsx              grouped "Programas" dropdown + mobile accordion
      SubNav.tsx              per-program sub-nav + Foundation breadcrumb
      Footer.tsx              brand-aware footer
      useActiveBrand.ts       pathname -> active brand (longest-prefix match)
  brands/
    centro/Home.tsx           umbrella home; programs split Servicios/Foundation
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
    mental-care/              Layout (adds CrisisNotice) + Home, Services,
                              Team, Resources, Contact
    foundation/               Home, Initiatives, Impact, Donate, Contact
    ocean-care/               Home, Activities, Calendar, Join
    abc-nutrition/Home.tsx    prototype (BrandLanding) — name only
    mas-que-atletas/          LIVE — bespoke pages ported from the MQA repo
      Home.tsx  Sports.tsx  News.tsx  (+ .css)
```

## Placeholders to replace when real assets arrive

- **Logo**: done — ABC Centro's mark is in the navbar and the favicon. Missing:
  ABC Nutrition has no logo, and all six are JPEG exports of vector art
  (raster, so they soften when scaled up). Vector originals are on the
  outstanding list.
- **Hero/section photos**: `PlaceholderImage` boxes throughout (labeled "Foto
  próximamente"); MQA hero uses `<PlaceholderImage fill />`.
- **Brand accent colors**: `src/brands.css` (currently sensible placeholders).
- **Prototype copy**: Brilliant Brains / Mental Care / Foundation / Ocean Care use
  the generic `BrandLanding` template with placeholder text from
  `config/brands.tsx` (`blurb`, `tagline`).
- **Social links**: `Brand.social` in `config/brands.tsx`. Only Brilliant Brains
  has real URLs; the rest fall back to `href="#"`.
- **All client copy**: `src/content/*.ts`. Empty arrays are sections awaiting
  content; `TODO(ABC)` comments mark specific gaps.
- **"Agenda una cita"** on the homepage points at Mental Care's Google Form
  because no booking link or phone number was ever supplied
  (`scheduleUrl` in `content/centro.ts`).
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
