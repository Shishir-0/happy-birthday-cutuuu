# CutiePage.in — Commercial Blank Template (Romantic & Storytelling)

Welcome to the **Official Commercial Blank Template** for **CutiePage.in**. This repository provides a commercial-grade, editorial, personal storytelling website template ready for platform upload and end-user customization.

---

## 🌟 Product Features & Architecture

1. **Commercial Blank Template**: Designed specifically for end-users to customize with their own text, names, dates, music, theme, and media.
2. **PhotoCard System with Editorial Placeholders**:
   - Reusable `PhotoCard` components (`HeroPhotoCard`, `GalleryPhotoCard`, `PolaroidPhotoCard`, `TimelinePhotoCard`, `FinalRevealPhotoCard`).
   - Renders editorial upload placeholders (`+ Add Photo`) when no `src` is provided, keeping the site looking complete before photos are uploaded.
   - Smooth image reveal, zoom transitions, and lightbox modal support when photos ARE uploaded.
3. **Editorial & Cinematic Redesign**:
   - Typography scales and line-height rhythm inspired by Apple, Aesop, and Framer editorial designs.
   - Neutral default theme: Soft Warm Cream background (`#FAFAF9`), Charcoal text (`#1C1917`), Rose Gold accent (`#E11D48`), Stone borders (`#E7E5E4`).
4. **Single Generic Starter Configuration**:
   - Driven by `src/config/template.ts` with neutral, elegant starter text ("Your Name", "Someone Special", "A Story Worth Remembering").
5. **Runtime Validation & Resiliency**:
   - Validated at runtime via `validateCutiePageConfig` in `src/utils/validation.ts` to prevent missing fields or malformed JSON from crashing the page.
6. **Official CutiePage Packaging (.cptf)**:
   - Includes `template.json` metadata.
   - Run `npm run package` to compile and output `dist-cptf/cutiepage-romantic-cinematic-v1.0.0.cptf` ready for CutiePage.in upload.

---

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Type Check & Quality Lint
```bash
npx tsc --noEmit
npm run lint
```

---

## 📦 Packaging for CutiePage.in Platform Upload

To build the client bundle and generate the `.cptf` template artifact:

```bash
npm run package
```

*Output Location: `dist-cptf/cutiepage-romantic-cinematic-v1.0.0.cptf`*

---

## 📂 Project Structure

```text
├── template.json            # Official CutiePage template metadata
├── scripts/
│   └── package-cptf.js      # Packaging script producing .cptf bundle
├── src/
│   ├── components/          # PhotoCard system, LightboxModal, PageRenderer, MusicPlayer
│   ├── config/              # Single starter configuration (template.ts & index.ts)
│   ├── sections/            # Reusable config-driven section components
│   ├── types/               # TypeScript contracts & MediaSource interfaces
│   ├── utils/               # Runtime validator & helpers
│   ├── App.tsx              # Application entry point & theme variable injector
│   └── index.css            # Dynamic theme token bindings
```
