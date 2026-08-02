# ABC Centro Familiar Integral

One website that hosts all of ABC Centro Familiar Integral's programs — a family
of themed micro-sites under a shared shell, selectable from the **"Programas"**
dropdown menu.

## Programs

| Section | Route | Status |
| --- | --- | --- |
| ABC Centro Familiar Integral (umbrella) | `/` | prototype |
| ABC Brilliant Brains | `/brilliant-brains` | **live** |
| ABC Mental Care | `/mental-care` | prototype |
| ABC Foundation | `/fundacion` | prototype |
| &nbsp;&nbsp;↳ Más Que Atletas PR | `/fundacion/mas-que-atletas` | **live** |
| &nbsp;&nbsp;↳ ABC Ocean Care | `/fundacion/ocean-care` | prototype |

**Más Que Atletas PR** and **ABC Brilliant Brains** are fully built, each ported
in from its own standalone repo (`../mas-que-atletas-pr`, `../abc_brilliant_brains`);
both originals are kept as backups. The other sections are themed prototypes that
visualize the structure until real content arrives.

Brilliant Brains has its own pages at `/brilliant-brains/{servicios,talleres,nosotros,contacto}`.

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

The Brilliant Brains contact and service-request forms POST to the serverless
handlers in `api/`, which need `GMAIL_USER` + `GMAIL_APP_PASSWORD` (see
`.env.example`). `npm run dev` doesn't serve `/api/*`; use `vercel dev` for that.

See **`AGENTS.md`** for the full architecture, theming system, and the list of
placeholders to replace.
