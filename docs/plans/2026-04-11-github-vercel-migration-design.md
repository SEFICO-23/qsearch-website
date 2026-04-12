# qsearch.ch Website — GitHub + Vercel Migration

**Date:** 2026-04-11
**Author:** Alex Sebastiani (Founder) + Claude (CEO Session VIII)
**Status:** APPROVED — ready for execution
**Scope:** Static marketing website only (not the SaaS platform)

---

## Decision

Push the entire `quantumsearch-website/` folder to a new private GitHub repo and deploy from it via Vercel. Keep the domain and email at Infomaniak untouched.

## Why

Alex wants to work on the website from any device (primarily iPhone via Claude Code app, but also iPad and desktop). GitHub is the single source of truth any Claude session can pull from; Vercel provides zero-config previews on every branch and one-click production deploys on merge to `main`.

The site is 100% static HTML/CSS/JS — no build step, no bundler, no Node runtime at serve time. This simplicity means the migration is mechanical, not architectural.

## Separation of Concerns

| Concern | Provider | Change |
|---|---|---|
| Domain registration (`qsearch.ch`) | Infomaniak | None |
| DNS control panel | Infomaniak | Update 2 records only (A/CNAME for web) |
| MX records (email routing) | → kSuite mail servers | None |
| SPF/DKIM/DMARC | Infomaniak-managed | None |
| Email (`@qsearch.ch` addresses) | kSuite | None |
| Website hosting (HTML/CSS/JS) | **Vercel** | New — connected to GitHub |
| Source of truth | **GitHub** `SEFICO-23/qsearch-website` | New private repo |

DNS changes touch exactly **two records** out of the entire panel: the A/ALIAS record for `@` (root domain) and the CNAME for `www`. Every MX and TXT record stays as-is, so email has zero downtime during the cutover.

## Alternatives Considered

- **Option B — Infomaniak-only Git deployment via FTP:** Rejected. Infomaniak's Git-to-FTP path needs a custom GitHub Action and has no preview URLs, which defeats the "iPhone review" workflow.
- **Option C — Hybrid (Vercel preview + Infomaniak production):** Rejected. Doubles the deployment surface to solve a data-sovereignty problem that doesn't exist (the site has no user data — it's a marketing brochure, not an app). Vercel already has a Zurich edge node, so Swiss visitors hit Swiss infrastructure anyway.

## Out of Scope

- **The SaaS platform** (previously scoped as `SEFICO-23/QSearch`). That repo stays reserved for the future platform build. The website migration does NOT touch it.
- **Actor briefings and sprint files.** They remain in the vault at `90_system/sprint-qsearch/` until the platform build kicks off.
- **Marketing and competitive intel docs.** They stay in the vault for now. Only the files already inside `quantumsearch-website/docs/` travel with the repo.

## Execution Steps (high level)

1. Delete orphan `node_modules/` (20MB, untracked, not referenced by the site)
2. Create `.gitignore`
3. Initialize git locally
4. Write project `README.md` (was previously missing)
5. Replace `netlify.toml` with `vercel.json` (same security headers: CSP, X-Frame-Options, etc.)
6. `gh repo create SEFICO-23/qsearch-website --private --source=. --remote=origin --push`
7. Connect repo to Vercel (Alex does this in Vercel dashboard — one click)
8. Update 2 DNS records at Infomaniak (Alex does this, Claude walks through it)
9. Wait for DNS propagation + Vercel auto-SSL provisioning
10. Verify `https://qsearch.ch` serves from Vercel with valid certificate

## Rollback Plan

If anything breaks, reverting is a single DNS change at Infomaniak: point the A record back to the original Infomaniak or Netlify host. No data is lost because the site files exist in both the local folder and the GitHub repo.
