# My Template — CPTF template

Instructions for AI coding agents working in this project.
Human docs: <https://developer.cutiepage.in>

## What you are building

A **CPTF template package**: a customisable microsite (birthday page, proposal,
anniversary…) that a customer personalises in a visual editor and publishes to a
shareable link. Your deliverable is `dist/my-template-<version>.cptf`, produced by
`npm run build`. That single archive is what gets uploaded — nothing else ships.

The template is ordinary React, but **every part the customer may change is
declared as data** in `defineTemplate`. The editor reads that declaration and
never reads your component. Anything not declared as a field is fixed forever.

## Project layout

```
src/index.tsx    the template — defineTemplate declares every editable surface
src/styles.css   Tailwind entry + your CSS, auto-scoped at build time
src/**           split into components freely; all of src/ is bundled
assets/          fonts and images shipped in the package (use useAsset())
dev/             local Next.js preview harness — NEVER shipped, never edit
```

Do not add dependencies, do not edit `dev/`, and do not create files outside
`src/` and `assets/`.

## Commands

```bash
npm run dev                        # live preview at http://localhost:3000
npx cutiepage validate --untrusted # the exact checks the upload server runs
npm run build                      # -> dist/my-template-<version>.cptf
npx cutiepage doctor               # diagnose toolchain problems
```

Iterate until `npx cutiepage build --untrusted` is green. Add `--json` to build
or validate for machine-readable output.

## Hard rules — the build fails if you break these

1. **Imports are restricted** to `react`, `react-dom`, `framer-motion`,
   `lucide-react` and `@cutiepage/template-sdk`. Anything else must be written
   into `src/` yourself.
2. **Banned APIs**: `dangerouslySetInnerHTML`, `eval`, `Function`,
   `localStorage`, `sessionStorage`, `indexedDB`, `XMLHttpRequest`,
   `WebSocket`, `EventSource`, `document.cookie`, `postMessage`,
   `window.parent` / `.top` / `.opener`, and third-party `fetch`.
3. **Nothing may touch a browser global during render.** The build runs a
   `renderToString` smoke test; `window`, `document` or `Math.random()` in a
   render path fails it (`ssr.browser_global`). Read browser APIs and seed
   randomness inside `useEffect`. Anything time- or random-dependent (clocks,
   countdowns, particles) must render nothing until a `useHydrated()`-style
   flag flips after mount — a blank countdown in the SSR HTML is CORRECT.
4. **Type-check must pass.** Never use `--skip-typecheck`.
5. **Size caps**: 50 MB archive, 2 MB `client.js`, 512 KB `styles.css`,
   3 MB per audio file.

## Rules that fail SILENTLY — read these twice

These produce a green build and a broken page. They are the expensive ones.

- **Tailwind classes are scanned from `src/` only**, and `src/styles.css` must
  keep its `@source "./";` line. A class used only in `dev/` works locally and
  vanishes in production. Never move markup into `dev/`.
- **Fonts must be theme tokens** (`type: "font"` → `--cp-fontDisplay`,
  `--cp-fontBody`) or files in `assets/` via `useAsset()`. Never reference
  `fonts.googleapis.com` — the render origin's CSP blocks it and the page
  silently falls back to a system serif with no error anywhere.
- **Entrance animations must run on mount and settle within ~400ms.** The
  platform screenshots the page for catalog previews once it goes quiet.
  **Never use `whileInView` for entrances** — it blanks every screenshot below
  the fold. Ambient loops (float, twinkle) are fine only if every frame looks
  essentially the same; bursts (confetti) must terminate and clear.
- **Repeated content is ONE multiline text field**, one item per line, `|`
  separating sub-parts, parsed in your code. The editor's content store is a
  flat `Record<string, string | boolean | null>`; it cannot render arrays of
  sub-forms, and `photoOne`/`photoTwo`/… freezes the count forever.
- **Audio**: call `play()` only after a user gesture, key the `<audio>` element
  by `src` so swapping the track reloads it, never set
  `crossOrigin="anonymous"` (the CDN sends no CORS headers for audio and the
  element fails to load), and hide the player when the field is empty.

## Declaring the template

```tsx
import { defineTemplate, Surface, Layer, Text, Img } from "@cutiepage/template-sdk";
import "./styles.css";

export default defineTemplate({
  slug: "my-template",          // must not change
  name: "My Template",
  description: "…",
  category: "birthday",

  theme: {                                 // → --cp-* vars + editor colour pickers
    background: { type: "color", label: "Background", default: "#fff7f2" },
    accent:     { type: "color", label: "Accent",     default: "#e0507a" },
  },

  fieldGroups: { hero: { label: "Opening", blockType: "hero" } },

  fields: {                                // everything the customer can edit
    recipientName: { type: "text",  label: "Their name", group: "hero",
                     required: true, maxLength: 40, default: "Priya" },
    heroPhoto:     { type: "image", label: "Main photo", group: "hero",
                     aspectRatio: "3:4" },
  },

  // Optional. A <Surface> is a fixed-aspect stage whose children are positioned
  // in percentages. Omit surfaces entirely for a normal flow layout.
  surfaces: { hero: { label: "Opening", aspect: "9:16" } },

  render: () => (
    <Surface id="hero" aspect="9:16">
      <Layer id="title" default={{ x: 8, y: 72, w: 84 }}
             customizable={{ color: true, fontSize: [0.8, 1.8], move: true }}>
        <Text field="recipientName" as="h1" className="text-4xl font-bold" />
      </Layer>
    </Surface>
  ),
});
```

**SDK exports**: `defineTemplate`, `<Surface>`, `<Layer>`, `<Text>`, `<Img>`,
`<Gallery>`, `<RichText>`, `<Audio>`, `<Video>`, `useField(id)`, `useTheme()`,
`useDesign()`, `useMode()` (`"edit" | "preview" | "published"` — pause autoplay
in edit mode), `useAsset(path)`. Read
`node_modules/@cutiepage/template-sdk/src` for exact prop types.

## Quality bar

- **Mobile first.** These pages are opened from a shared link on a phone.
  Design for a phone; treat desktop as the adaptation.
- **Every text field needs a realistic `default` and a `maxLength`** — the
  catalog screenshot is taken with defaults untouched, so the template must
  look finished before anyone edits it.
- Prefer per-section boolean fields so a buyer can hide sections they don't want.
- Check both the default render and an edited one in `npm run dev`.

## Done means

`npx cutiepage build --untrusted` exits 0 and `dist/my-template-<version>.cptf`
exists. Hand back that file — it is uploaded through the Cutiepage creator
studio as-is.
