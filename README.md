# ABC Centro Familiar Integral

One website that hosts all of ABC Centro Familiar Integral's programs — a family
of themed micro-sites under a shared shell, selectable from the **"Programas"**
dropdown menu.

## Programs

| Section | Route | Status |
| --- | --- | --- |
| ABC Centro Familiar Integral (umbrella) | `/` | prototype |
| ABC Brilliant Brains | `/brilliant-brains` | prototype |
| ABC Mental Care | `/mental-care` | prototype |
| ABC Foundation | `/fundacion` | prototype |
| &nbsp;&nbsp;↳ Más Que Atletas PR | `/fundacion/mas-que-atletas` | **live** |
| &nbsp;&nbsp;↳ ABC Ocean Care | `/fundacion/ocean-care` | prototype |

Only **Más Que Atletas PR** is fully built. The other sections are themed
prototypes that visualize the structure until real content arrives.

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

See **`AGENTS.md`** for the full architecture, theming system, and the list of
placeholders to replace.
