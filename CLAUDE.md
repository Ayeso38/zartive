# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Zartive is a single-page photography portfolio/booking site ("ZARTIVE Photography") built with React 18 + TypeScript + Vite. There is no backend — all "submissions" (booking form, AI assistant) are simulated client-side with `setTimeout` and canned responses.

## Commands

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server (http://localhost:5173)
- `npm run build` — type-check-free production build via `vite build`, outputs to `dist/`
- `npm run preview` — serve the production build locally
- `npm run deploy` — publish `dist/` to GitHub Pages via `gh-pages`

There is no test suite, linter, or type-check script configured (`tsc` is not wired into any npm script — `noEmit: true` in `tsconfig.json` means TypeScript is only used by the Vite/esbuild toolchain and editor, not run standalone).

## Architecture

- **Entry point**: `index.html` → `main.tsx` mounts `<App />` into `#root`. Tailwind is loaded via the CDN `<script>` tag in `index.html` (not a build-time Tailwind install) — custom theme colors (`ph-bg`, `ph-dark`, `ph-orange`, `ph-blue`, `ph-yellow`, `ph-card`) are defined inline there.
- **Single-page routing without a router**: `App.tsx` holds `currentPage` state and switches between views (`home`, `portfolio`, `pricing`, `booking`, `about`) in a `renderPage()` switch statement — there is no React Router or URL-based routing. Navigation is done by passing an `onNavigate(page: string)` callback down through props (see `Navbar`, `Hero`, `Pricing`).
- **Package selection flow**: selecting a package in `Pricing.tsx` calls `onSelectPackage(pkgId)`, which `App.tsx` uses to set `selectedPackage` state and navigate to `booking`, pre-filling `Booking.tsx`'s form via the `preselectedPackage` prop.
- **`components/`**: one file per page section/feature — `Navbar`, `Hero`, `Gallery`, `Pricing`, `Booking`, `Assistant`, `Footer`. All are self-contained function components; state is local (`useState`) with no global store or context.
- **`types.ts`**: shared TypeScript interfaces/enums (`Photo`, `PricingPackage`, `ChatMessage`, `BookingStatus`, `BookingFormData`) used across components — check here first when changing shapes of pricing packages, gallery photos, or booking data.
- **`Assistant.tsx`**: a floating chat widget with **no real AI/LLM call** — despite the `ChatMessage` type using `role: 'user' | 'model'` (a Gemini-style convention) and UI text like "Lens AI", responses come from `getLocalResponse()`, a local keyword-matching function (checks for substrings like "price", "book", "wedding", etc.) with a fake `setTimeout` "thinking" delay. If asked to add real AI responses, this is the file to change and a backend/API key strategy will need to be introduced (there is currently no `.env` handling or server proxy).
- **`Booking.tsx`**: form submission also simulates a network call via `setTimeout` and always resolves to `BookingStatus.SUCCESS` — there's no real submission endpoint.
- **`Gallery.tsx`**: photos are a hardcoded array of `picsum.photos` placeholder URLs arranged in a manual CSS-grid "bento" layout (large/tall/standard cells hardcoded by array index, not data-driven).
- **Path alias**: `@/*` maps to the repo root (configured in both `tsconfig.json` and `vite.config.ts`), though current code imports components with relative paths (`./components/...`) rather than the alias.

## Deployment

`.github/workflows/deploy.yml` auto-deploys to GitHub Pages on every push to `main`: installs deps, runs `npm run build`, and publishes `dist/` via `peaceiris/actions-gh-pages`. `vite.config.ts` sets `base: '/Zartive/'` to match the GitHub Pages project subpath — update this if the repo is renamed or deployed elsewhere.
