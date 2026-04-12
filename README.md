# qsearch.ch — QuantumSearch Marketing Website

Static marketing site for **QuantumSearch Security Research** (`qsearch.ch`).
Owner: Alex Sebastiani | Brand: QuantumSearch | Repo: SEFICO-23/qsearch-website (private)

## What This Is

A multilingual static marketing site (English + Italian + German + French) built with plain HTML, CSS, and vanilla JavaScript. No build step, no bundler, no runtime — just files served directly from an edge CDN.

## Tech Stack

| Layer | Tech |
|---|---|
| HTML | Hand-written, one file per page |
| CSS | `styles.css` — Ultraviolet Volt (dark) + Forest Gradient (light) design tokens |
| JS | `main.js` — vanilla, no framework |
| Analytics | GoatCounter (privacy-first, self-hosted) |
| Contact form | Formspree |
| Languages | `en` (root), `it/`, `de/`, `fr/` |

## Infrastructure

| Concern | Provider | Notes |
|---|---|---|
| Domain registrar | Infomaniak | Managed at `manager.infomaniak.com` |
| DNS | Infomaniak DNS panel | A/CNAME for web points to Vercel |
| Email (`@qsearch.ch`) | kSuite | MX records untouched |
| Hosting | **Vercel** | Auto-deploys from `main` branch |
| Source of truth | GitHub `SEFICO-23/qsearch-website` | Private |

## Local Preview

No install needed. Any static server works:

```bash
# Python (built-in, works everywhere)
python -m http.server 8000

# Node (if installed)
npx serve .
```

Then open `http://localhost:8000`.

## Deployment

Push to `main` → Vercel auto-deploys to production (`qsearch.ch`).
Open a PR → Vercel auto-creates a preview URL (`*.vercel.app`) for review.

**Do not edit files directly on Vercel.** All changes go through git.

## Brand

- **Dark theme:** Ultraviolet Volt — `#0f0d18` bg, `#5B23FF` primary, `#008BFF` accent, `#E4FF30` lime
- **Light theme:** Forest Gradient — `#22577A` deep, `#38A3A5` teal, `#57CC99` mint, `#80ED99` light
- **Signing:** All external text signs as "QuantumSearch Security Research" — never personal names

## Rules

1. No credentials in code. Ever. `.env` is `.gitignored`.
2. No client engagement data. That stays in the operator's private vault.
3. Sign everything as "QuantumSearch Security Research".
4. Multilingual parity — changes to `index.html` should be mirrored in `it/`, `de/`, `fr/`.

## Design Docs

- Migration design: `docs/plans/2026-04-11-github-vercel-migration-design.md`
- Full migration plan: `docs/plans/2026-04-11-github-vercel-migration-plan.md`
