# ABC Centro Familiar Integral

One website that hosts all of ABC Centro Familiar Integral's programs — a family
of themed micro-sites under a shared shell, selectable from the **"Programas"**
dropdown menu.

## Programs

| Section | Route | Status |
| --- | --- | --- |
| ABC Centro Familiar Integral (umbrella) | `/` | real copy · vista previa |
| ABC Brilliant Brains | `/brilliant-brains` | **live** |
| ABC Mental Care | `/mental-care` | real copy · vista previa |
| ABC Foundation | `/fundacion` | real copy · vista previa |
| &nbsp;&nbsp;↳ Más Que Atletas PR | `/fundacion/mas-que-atletas` | **live** |
| &nbsp;&nbsp;↳ ABC Ocean Care | `/fundacion/ocean-care` | real copy · vista previa |
| &nbsp;&nbsp;↳ ABC Nutrition | `/fundacion/abc-nutrition` | announced only |

**Más Que Atletas PR** and **ABC Brilliant Brains** are fully built, each ported
in from its own standalone repo (`../mas-que-atletas-pr`, `../abc_brilliant_brains`);
both originals are kept as backups. The other sections are themed prototypes that
visualize the structure until real content arrives.

The four "vista previa" sections carry ABC's real mission, vision, values and
page structures, but stay behind a preview badge until photos, logos, brand
colours and contact details arrive. See
[`../abc-content-outstanding.md`](../abc-content-outstanding.md) for what's still
needed.

All client-written copy lives in `src/content/*.ts` as plain data — updating the
site's words never means editing a component. Sections whose data array is empty
render nothing, so approved-but-unwritten sections can ship as structure.

## Getting started

`node`/`npm` live under nvm — source it first:

```bash
export NVM_DIR="$HOME/.nvm"; \. "$NVM_DIR/nvm.sh"; nvm use v24.17.0

npm install
npm run dev        # dev server
npm run build      # tsc -b && vite build
npm run lint       # eslint
```

## How it's organized

Built with React 19 + TypeScript + Vite + react-router-dom v7. Each program is a
route subtree with its own accent theme, driven by a single config
(`src/config/brands.tsx`) + per-brand CSS (`src/brands.css`).

Styling is plain per-component CSS **except** `src/brands/brilliant-brains/`, which
uses Tailwind v4 + CSS Modules carried over from its source repo. Tailwind is
deliberately scoped to that subtree — see `src/brilliant-brains.css` and the
"Tailwind is scoped to Brilliant Brains" section of `AGENTS.md` before editing any
CSS.

The contact forms (Brilliant Brains, Foundation, Ocean Care) POST to the
serverless handlers in `api/`, which need `GMAIL_USER` + `GMAIL_APP_PASSWORD`
(see `.env.example`). Those are unset, so **the forms do not currently send
mail**. `npm run dev` doesn't serve `/api/*` either; use `vercel dev`.

Donations on `/fundacion/donar` are designed but **not connected to a payment
processor** — the submit button is deliberately disabled.

See **`AGENTS.md`** for the full architecture, theming system, and the list of
placeholders to replace.
