# My Template

A Cutiepage template package. Author it like a normal Next.js app:

    npm run dev              # live local preview at http://localhost:3000
    npx cutiepage build      # -> dist/my-template-1.0.0.cptf
    npx cutiepage validate   # check without emitting an archive

Upload the built `.cptf` at /admin/templates/upload.

## Layout

- `src/index.tsx` — the template. `defineTemplate` declares every field,
  theme token and layer the customer can touch; the manifest is generated from
  it, so there is nothing to keep in sync by hand. Tailwind classes in JSX
  work — the build compiles them in.
- `src/styles.css` — Tailwind entry + your own CSS, scoped automatically at
  build time.
- `assets/` — fonts and static images, served from the CDN (and from
  `/assets/*` in the dev server).
- `dev/` — the local Next.js preview harness. Never shipped; the package is
  built from `src/` + `assets/` only. Don't use Tailwind classes in
  `dev/` files — the build only scans `src/`.

## Rules worth knowing

- The package must type-check to build. Unlike the main app, this is not
  bypassed.
- `dangerouslySetInnerHTML` is rejected at upload, as are `eval`,
  `localStorage`, `fetch`-adjacent globals and anything that escapes the frame.
- Renaming a field id orphans customers' in-progress drafts. Ship a
  `migrations` entry when you rename, or the upload is treated as a major.
- Imports are limited to react, framer-motion, lucide-react and the SDK —
  the platform provides these at runtime; anything else gets bundled into
  your package.
