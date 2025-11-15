# scaly-wyvern

Dark-themed Vite + TypeScript playground that showcases two entry points:

- Landing page rendered by Vite's SPA entry (`index.html` → `src/main.ts`).
- Standalone grid gallery (`grid.html` → `src/grid`) with card UI.

Both pages share a responsive navbar implemented in `src/menu`.

## Development

```bash
pnpm install
pnpm run dev
```

Visit:

- `http://localhost:5173/` for the landing page.
- `http://localhost:5173/grid` for the card grid.

## Build

```bash
pnpm run build
```

Output files land in `dist/` and include both `index.html` and `grid.html` thanks to the custom `rollupOptions.input` configuration in `vite.config.ts`.

Preview the production build locally with:

```bash
pnpm run preview
```

## Deployment (GitHub Pages)

This repo ships with `.github/workflows/deploy.yml`, which:

1. Runs on pushes to `main`, pull requests targeting `main`, and manual dispatches.
2. Installs dependencies via `pnpm` and executes `pnpm run build`.
3. Uploads `dist/` as a Pages artifact and deploys it through `actions/deploy-pages@v4`.

To enable Pages:

1. Open **Settings ▸ Pages** and set the source to **GitHub Actions**.
2. Merge to `main` (or dispatch the workflow). The `main` branch build publishes to `https://stormwild.github.io/scaly-wyvern/`.

> Note: The Vite config sets `base: '/scaly-wyvern/'`. Forks should update this string to match their repository name (or remove it when hosting at the domain root).
