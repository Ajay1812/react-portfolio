# Ajay Kumar — Portfolio (Next.js)

Product design ("Reliable data, engineered.") rebuilt with **Next.js 14** (static export), **shadcn-style UI components**, **GSAP** motion and **Tailwind v4**.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy (Netlify)

Push this folder to the `main` branch of `Ajay1812/react-portfolio`.
`netlify.toml` already sets build command `npm run build` and publish dir `out`.

## What's inside

- `app/` — layout, metadata, homepage
- `components/ui/` — shadcn-style Button, Badge, Card, Tabs, Separator
- `components/sections/` — Navbar, Hero, Projects, Experience, Footer, ArchModal
- `lib/motion.jsx` — GSAP Reveal / stagger / Counter helpers
- `data/` — projects.json (with `category` for the filter tabs), history.json
- `public/architecture/` — interactive architecture diagrams (theme-aware via `?theme=`)
- `public/assets/` — images, OG cover, resume PDF
