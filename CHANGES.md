# Portfolio updates — recruiter + SEO/mobile pass (2026-10-10)

Built on top of `main` (merge PR #3). Verified locally: `npm run build` ✅ and `npm run lint` ✅.

## Update 2 — Bold reskin (same day)

The whole site now uses the **Bold neo-brutalist style of the book cover**, replacing the clean editorial look:

- **Palette** (from `KDP-cover-FINAL-bold.png`): cream `#FFFDF5` canvas, ink `#111111`, lime `#B8E62E`, yellow `#FFC93D`, coral `#FF5C5C`, sky `#7DD3FC`. Dark mode kept, same accents on ink.
- **Signature moves**: 2–3px ink borders everywhere, hard offset shadows (`4px 4px 0`) that press in on hover, sticker badges (rotated name badge in nav, lime/yellow/sky section headings, "Open to work" sticker), numbered principle rows, diamond timeline markers.
- **Type**: Bricolage Grotesque now carries body text too (was serif), headings bumped to extrabold.
- Hero headline highlight, proof-point cards, project cards (were borderless rows), contact sidebar card, lineage diagram nodes (ink outlines + stage-colour fills), dialogs/lightbox — all restyled to match.
- Share card `og-cover.png` regenerated in the same style.

Files touched in this pass: `src/index.css`, `src/components/ui/button.jsx`, `Navbar`, `Hero`, `LineageGraph`, `Projects`, `ProjectCard`, `ProjectPreview`, `Lightbox`, `About`, `Experience`, `Contact`, `index.html` (theme-color), `public/assets/og-cover.png`.


## Run it locally

```bash
npm ci
npm run dev        # try it
npm run build      # production build into dist/
```

Then commit and push as usual — Netlify will redeploy from `main`.

## What changed

### 1. Hero rewritten for recruiters (`src/components/Hero/Hero.jsx`)
- Eyebrow line: "Ajay Kumar · Data Engineer — Noida, India" (name + role + location above the headline).
- Sub-headline now leads with proof and targeting: 1.5 years, Databricks/PySpark/Delta Lake on Azure + AWS, **open to Data Engineer and Analytics Engineer roles — Noida (hybrid/on-site) and remote India**.
- CTAs: **See the work · Read the resume · Email me · LinkedIn** (resume + LinkedIn were missing from the hero).
- Proof strip under the CTAs: `100 GB/day migrated · 50+ tables under DQ checks · 40–50% faster pipelines · 1 book`.
- Diagram hint changed from "Hover or focus…" to **"Tap, hover or focus…"** (touch-friendly).

### 2. Projects reordered + outcome lines (`src/data/projects.json`, `ProjectCard.jsx`)
- New order: **Pipeplatter → CityFlux → SkyLake → Rundown (shorts_post_agent) → RedditFlow → Airflow Docker**. Pipeplatter (Databricks/dbt lakehouse) now leads; the AI video agent no longer confuses DE recruiters in the first 10 seconds.
- Every project got a bold one-line `outcome` (metrics/scale, all taken from the existing descriptions — nothing invented).
- Projects with screenshots now show a clickable thumbnail (opens the existing lightbox) instead of hiding images behind a text link.
- **Selected work** now sits above **How I work** on the page (`App.jsx` + navbar order updated to match).

### 3. SEO / share fixes (`index.html`, `public/`)
- `og:image` is now an **absolute URL** (`https://ajaynf.netlify.app/assets/og-cover.png`, new 1200×630 share card with your photo) — the old relative path meant LinkedIn/WhatsApp shares showed no image.
- Twitter card upgraded to `summary_large_image`.
- Added: canonical URL, `og:url`, author/robots meta, light/dark `theme-color`, richer title/description with role + location keywords.
- Added **Person JSON-LD** (name, job title, location, skills, sameAs links) and a `<noscript>` summary so crawlers/no-JS visitors see real content instead of an empty shell.
- Added `public/robots.txt` and `public/sitemap.xml` (both were 404).

### 4. Mobile fixes
- **Compact contact row under the hero CTAs** (Email · Resume · LinkedIn · GitHub), visible only below the `lg` breakpoint — the full contact sidebar stacks after Experience on mobile, so recruiters no longer scroll the whole page to reach you.
- Architecture modal: added a small-screen tip ("scroll sideways, or tap Open full page") since diagrams render at 960px wide inside it.
- Contact sidebar copy updated: roles + "Noida (hybrid/on-site) or remote across India" + book credit.

### 5. Core stack tiered (`Experience.jsx`)
Was one flat 24-skill list. Now: **Primary stack** (9) → **Cloud and platform** (8) → **Also worked with** (7). Nothing removed, but the Databricks/PySpark story now reads first.

## Not changed (your call)
- **Experience gap Nov 2023 → Jun 2025** is still unexplained on the page. Recruiters will ask — add one honest line (freelance / upskilling / DataPipelineDiaries) when you're ready; I didn't invent one.
- Page weight (~407 KB JS) — fine for now; code-splitting the diagram/modal is a later optimisation.

## Files touched
`index.html` · `public/robots.txt` (new) · `public/sitemap.xml` (new) · `public/assets/og-cover.png` (new) ·
`src/components/Hero/Hero.jsx` · `src/App.jsx` · `src/components/Navbar/Navbar.jsx` ·
`src/data/projects.json` · `src/components/Projects/ProjectCard.jsx` · `src/components/Projects/ProjectPreview.jsx` ·
`src/components/Experience/Experience.jsx` · `src/components/Contact/Contact.jsx`

## Hotfix (same day) — architecture preview modal

The preview dialog rendered the diagram in a thin strip with a large blank area below: a mobile tip line had become a third grid row in the dialog, squeezing the diagram frame. Fixed — the diagram frame again fills the full dialog height on desktop and mobile.

## Update 3 — Terminal reskin (same day, replaces Bold skin)

Ajay picked the Terminal (dev console) design from the mockups in `portfolio-designs/`. Full reskin on top of Updates 1–2:

- **Theme**: near-black green-tinted console (`#0b0e0c`), terminal green `#3dff73`, amber `#ffc93d`; toggle now switches to a light "day terminal" instead of Bold-dark. Site defaults to dark.
- **Type**: JetBrains Mono everywhere (new dependency `@fontsource/jetbrains-mono`, weights 400/500/700/800).
- **Window chrome**: traffic-light dots + `ajay@databricks: ~/portfolio — zsh` + `⎇ main` tab above the navbar (scrolls away; navbar stays sticky).
- **Hero**: live `whoami` prompt with blinking caret, green/amber headline, dotted-leader output lines (`migration ......... 100 GB/day`), command CTAs (`$ view --work`, `$ cat resume.pdf`, `$ mail ajay`), stat cells incl. `exit 0`.
- **Sections**: `## selected_work`, `## how_i_work` with `rule_01:` lines, `## experience.log`; projects are bordered console panels with `$ Title` and `[ok]` outcome lines; contact is a `status: open-to-work` panel with a pulsing green dot.
- Architecture dialogs keep the hotfixed two-row layout (locally re-verified: 696px diagram frame in a 764px dialog). Share card regenerated in terminal style.

## Update 4 — Cards, wider layout, no screenshots (same day)

Per Ajay's feedback on the Terminal build:

- **Project cards**: Selected work is now a 2-column card grid (1 column on mobile) — title, description, `[ok]` outcome, bronze/silver/gold/tooling stack lines, actions pinned to the card foot. Much less scrolling.
- **Screenshots removed**: card thumbnails and the screenshot lightbox are gone (component deleted); the only visual is the **Preview architecture** button, now the solid primary action on every card that has a diagram.
- **Wider layout**: content max-width 1080px → 1280px across the window bar, navbar, and main column; contact sidebar 15rem → 17rem.
- Verified: build + lint pass; rendered output shows 6 cards, 0 project images; architecture dialog still measures 696px.
