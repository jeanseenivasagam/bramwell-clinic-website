# Bramwell Clinic — Primary Care Landing Page

A responsive, accessible healthcare landing page for **Bramwell Clinic**, a fictional independent primary care and in-house diagnostics practice in Portland, Oregon. Built as part of a multi-industry web design and front-end engineering portfolio.

**Live Demo:** https://bramwell-clinic-portland.netlify.app

---

## Overview

Bramwell Clinic was designed to feel calm, human-centered, and immediately scannable rather than clinical or generic. Every section prioritizes real patient questions: how long you wait, how much time you get with your doctor, what labs are drawn on site, which insurers are accepted, and what self-pay visits cost.

## Key Features

- **Visual-First Split Hero & Insurance Strip:** Left-aligned editorial typography (`Newsreader` + `Public Sans`), checkmark highlights, framed consultation room photography, real-time opening cards, and an accepted-insurer strip right below the fold.
- **Interactive "50-Minute Wait vs. Bramwell" Comparison:** Scenario switcher pills (`New patient visit`, `Same-week sick visit`, `Annual physical & labs`) driving proportional color-coded timeline bars and side-by-side pain vs. care cards.
- **Interactive Care Areas Bento Grid:** A 2+3 icon-badged card grid synced to an accessible `tablist`/`tabpanel` Clinical Detail Sheet showing visit coverage and on-site diagnostics.
- **Clinician Cards with Booking Pre-Selection:** Daylight editorial portraits with availability badges and one-click buttons that scroll to the booking form and pre-select the chosen clinician.
- **Transparent Fees & Portland Welcome Lounge:** Self-pay pricing table (`$0` annual membership fee callout) paired with clinic photography, transit/parking icons, and lab hours.
- **Accessible First-Visit Booking Flow:** Keyboard-friendly form with inline validation, accessible time-window toggles, and a live browser-side confirmation summary (portfolio demonstration—no personal health information is stored or transmitted).
- **Custom Scalable SVG Brand Mark:** Geometric architectural `B` monogram with a negative-space clinical cross channel, exported in full color, reversed (footer), monochrome, and browser favicon variants.

## Tech Stack

- **Build & Tooling:** Vite 6, TypeScript (strict mode)
- **Styling:** Semantic HTML5 + modular CSS with design tokens (`tokens.css`, `base.css`, `header-hero.css`, `wait-comparison.css`, `sections.css`)—zero heavy CSS frameworks
- **Iconography & Branding:** Custom inline clinical SVG icon library and audited vector brand marks (`public/brand/`)
- **Media Delivery:** Separated static photography assets under `public/media/` with immutable CDN caching headers (never bundled into JS)
- **Hosting:** Netlify continuous deployment via `netlify.toml`

## Project Structure

```text
.
├── index.html                    # Semantic HTML entry point
├── package.json                  # Vite + TypeScript scripts
├── tsconfig.json                 # Strict TypeScript config
├── vite.config.ts                # Asset & bundle configuration
├── netlify.toml                  # Netlify build & cache headers
├── public/
│   ├── brand/                    # Scalable SVG logo variants & favicon
│   └── media/                    # Separated daylight clinic & clinician photography
└── src/
    ├── main.ts                   # Application bootstrap
    ├── data/
    │   └── clinic.ts             # Typed scenarios, care tracks, clinicians, fees & insurers
    ├── lib/
    │   └── icons.ts              # Curated inline SVG icon set
    ├── sections/
    │   ├── nav.ts                # Accessible mobile drawer navigation
    │   ├── wait-comparison.ts    # Interactive 50-min wait scenario switcher & timeline bars
    │   ├── care-index.ts         # WAI-ARIA bento grid & live clinical detail sheet
    │   └── booking.ts            # Inline validation, clinician pre-selection & confirmation
    └── styles/
        ├── tokens.css            # Palette, typography, spacing & elevation tokens
        ├── base.css              # Reset, focus states, buttons & pills
        ├── header-hero.css       # Navigation, split hero & insurance strip
        ├── wait-comparison.css   # Proportional time bars & contrast cards
        └── sections.css          # Care bento, clinicians, fees, booking & footer
```

## Design System, Skills & Inspirations

- **Palette:** Daylight mineral white (`#FFFFFF` / `#FAFBFA`), warm oat-sand (`#F6F2EA`), soft eucalyptus mist (`#EBF2EE`), deep evergreen pine (`#102A24`), and diagnostic cobalt (`#165A72`).
- **Typography:** `Newsreader` for calm editorial headings paired with `Public Sans` (with `tabular-nums`) for UI clarity, visit durations, and pricing tables.
- **Visual Inspirations:** Warm, approachable healthcare hierarchy and clean visual-first card/bento contrast inspired by modern patient-centered clinic sites and HelpDesk's scannable UI layout discipline.
- **Workflow Skills Applied:** Frontend design direction, UI engineering & WCAG AA accessibility discipline, geometric SVG logo craft (`svg_audit.py` 100/100 score), and copy humanization to eliminate generic marketing clichés.

## Local Development

```bash
npm install
npm run dev      # Start local dev server
npm run build    # Type-check (tsc --noEmit) and build production bundle to dist/
npm run preview  # Preview production build locally
```
