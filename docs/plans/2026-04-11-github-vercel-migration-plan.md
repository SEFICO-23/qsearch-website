# qsearch.ch GitHub + Vercel Migration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move the `quantumsearch-website/` folder into a new private GitHub repo (`SEFICO-23/qsearch-website`), deploy from it via Vercel, and cut over `qsearch.ch` DNS from its current host to Vercel without touching email (kSuite) or the domain registration (Infomaniak).

**Architecture:** Static HTML/CSS/JS site with multilingual subfolders (`it/`, `de/`, `fr/`). No build step, no runtime, no database. GitHub is source of truth; Vercel serves the bytes via Zurich edge nodes; Infomaniak keeps the domain + MX records untouched.

**Tech Stack:** git, GitHub CLI (`gh`), Vercel (connected via dashboard), Infomaniak DNS panel (web UI). No Node.js runtime required — the orphan `node_modules/` is deleted, not rebuilt.

**Preconditions:**
- Working directory: `C:\BackBone\20_projects\quantumsearch-website\`
- Alex is logged into `gh` as `SEFICO-23` org member with repo creation permission
- Alex has a Vercel account (free tier is sufficient) or is ready to create one
- Alex has Infomaniak admin access to manage DNS for `qsearch.ch`

---

## Task 1: Delete orphan node_modules

**Why:** 20MB of unreferenced `sharp` binaries with no `package.json` recipe. Pushing them to GitHub would bloat the repo and slow iPhone clones.

**Files:**
- Delete: `node_modules/` (entire directory)

**Step 1: Confirm node_modules contents before deletion**

Run: `ls node_modules/ && du -sh node_modules/`
Expected: lists `@img`, `detect-libc`, `semver`, `sharp`; total ~20MB

**Step 2: Delete the directory**

Run: `rm -rf node_modules/`
Expected: silent success, exit code 0

**Step 3: Verify site files intact**

Run: `ls *.html | wc -l`
Expected: at least 14 HTML files still present (index, about, services, contact, disclosure, privacy, insights, case-study, demo, 404, ai-security, vibe-coding, track-record, services)

**Step 4: Commit (after git init in Task 3)** — deferred; this task has no commit because git doesn't exist yet

---

## Task 2: Create .gitignore

**Files:**
- Create: `.gitignore`

**Step 1: Write the file**

Create `.gitignore` with:
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build artifacts
dist/
.next/
out/

# Environment
.env
.env.local
.env.*.local

# OS metadata
.DS_Store
Thumbs.db
desktop.ini

# Editor
.vscode/
.idea/
*.swp
*~

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# Vercel
.vercel
```

**Step 2: Verify file exists**

Run: `cat .gitignore | head -5`
Expected: first lines show `# Dependencies` and `node_modules/`

---

## Task 3: Initialize git repo locally

**Files:**
- Create: `.git/` (git metadata)

**Step 1: Initialize**

Run: `git init`
Expected: "Initialized empty Git repository in .../.git/"

**Step 2: Set default branch to `main`**

Run: `git branch -M main`
Expected: silent, exit 0

**Step 3: Verify git is tracking the folder**

Run: `git status`
Expected: "On branch main" + "No commits yet" + list of untracked files (should show .htaccess, HTML files, etc. but NOT node_modules or .DS_Store)

---

## Task 4: Replace netlify.toml with vercel.json (preserve security headers)

**Why:** Current deployment config is Netlify-specific with CSP, X-Frame-Options, Permissions-Policy, and a 404 redirect. Vercel uses a different config format but supports the same headers.

**Files:**
- Read: `netlify.toml` (for current header values)
- Create: `vercel.json`
- Delete: `netlify.toml`

**Step 1: Read current netlify.toml to capture header values**

Run: `cat netlify.toml`
Expected: shows the CSP string, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and the 404 redirect rule

**Step 2: Write vercel.json with equivalent configuration**

Create `vercel.json` with:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://gc.zgo.at; img-src 'self' data:; connect-src 'self' https://formspree.io https://qsearch.goatcounter.com" }
      ]
    }
  ],
  "redirects": [],
  "rewrites": []
}
```

**Step 3: Delete netlify.toml**

Run: `rm netlify.toml`
Expected: silent, exit 0

**Step 4: Verify only vercel.json remains**

Run: `ls vercel.json netlify.toml 2>&1`
Expected: `vercel.json` exists, `netlify.toml: No such file or directory`

---

## Task 5: Write project README.md

**Why:** The folder has no README. Any Claude session landing in the repo needs orientation: what is this, how to preview, how to deploy.

**Files:**
- Create: `README.md`

**Step 1: Write the README**

Create `README.md` with:
```markdown
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
```

**Step 2: Verify README is readable**

Run: `head -5 README.md`
Expected: first line is `# qsearch.ch — QuantumSearch Marketing Website`

---

## Task 6: First commit (baseline snapshot)

**Why:** Capture the current state of the site as a clean baseline before any deployment-related changes.

**Step 1: Stage all tracked files**

Run: `git add .`
Expected: silent, exit 0

**Step 2: Verify what's being committed**

Run: `git status --short | head -30`
Expected: lines starting with `A` for HTML files, `.gitignore`, `README.md`, `vercel.json`, `docs/plans/*.md`, `styles.css`, `main.js`, SVG logos, etc. NO `node_modules`, NO `netlify.toml`.

**Step 3: Create the commit**

Run:
```bash
git commit -m "Initial commit: qsearch.ch website baseline + Vercel config

Migrated from Infomaniak hosting to GitHub source of truth.
Includes vercel.json with production security headers (CSP, X-Frame-Options, etc).
Design doc and implementation plan at docs/plans/.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```
Expected: commit hash, file count summary (~50+ files changed)

**Step 4: Verify commit landed**

Run: `git log --oneline -1`
Expected: one line showing the commit hash and "Initial commit: qsearch.ch website baseline + Vercel config"

---

## Task 7: Create GitHub repo and push

**Why:** Make the repo live on GitHub so Vercel can connect to it.

**Preconditions:**
- `gh` CLI installed and authenticated
- Alex is member of `SEFICO-23` org with repo-create permission

**Step 1: Verify gh auth**

Run: `gh auth status`
Expected: "Logged in to github.com as ..." with the correct account

**Step 2: Create repo + push in one command**

Run:
```bash
gh repo create SEFICO-23/qsearch-website --private --source=. --remote=origin --push --description "QuantumSearch marketing website (qsearch.ch). Static HTML/CSS/JS multilingual site, deployed via Vercel."
```
Expected: output shows repo URL, remote set, push completed

**Step 3: Verify remote and push**

Run: `git remote -v && git log --oneline origin/main -1`
Expected: origin points to `github.com:SEFICO-23/qsearch-website.git`; origin/main shows the same commit as local main

**Step 4: Open the repo in the browser to verify (Alex)**

Run: `gh repo view --web`
Expected: browser opens to the new GitHub repo page; Alex visually confirms files are present

---

## Task 8: Connect repo to Vercel (Alex — manual, dashboard)

**Why:** Vercel needs to know which GitHub repo to watch. This is a one-click flow that cannot be scripted because it requires an OAuth handshake between Vercel and GitHub.

**Preconditions:**
- Alex has a Vercel account (create at `vercel.com/signup` if needed — use GitHub SSO for zero friction)

**Step 1: Navigate to Vercel import page**

Alex opens: `https://vercel.com/new`

**Step 2: Authorize GitHub (if first time)**

Click "Import Git Repository" → "Install Vercel GitHub App" → grant access to `SEFICO-23` org (repo-scoped — minimum permissions).

**Step 3: Import the repo**

Click "Import" next to `SEFICO-23/qsearch-website`.

**Step 4: Framework preset**

Vercel will auto-detect "Other" (static site). Leave framework preset as "Other". No build command. No output directory (root). No install command.

**Step 5: Click Deploy**

Vercel builds (no build step — just uploads files) and returns a `*.vercel.app` URL within ~60 seconds.

**Expected:** A URL like `qsearch-website-abcd1234.vercel.app` that serves the site exactly as it will appear on `qsearch.ch`.

**Step 6: Smoke test the preview URL**

Alex opens the Vercel-provided URL in a browser. Expected: sees the homepage with full styling, all pages reachable via nav, IT/DE/FR variants load.

---

## Task 9: Update DNS at Infomaniak (Alex — manual, web UI)

**Why:** Point the domain's web traffic to Vercel instead of Infomaniak hosting. Email (MX) and domain registration stay with Infomaniak.

**CRITICAL — Pre-change safety:**
- Take a screenshot of the current DNS panel BEFORE editing. If anything breaks, this is your rollback reference.
- Do NOT touch MX records. Do NOT touch TXT records (SPF/DKIM/DMARC).
- Lower the TTL to 300 seconds a few hours in advance if possible, so if you need to roll back, propagation is fast.

**Preconditions:**
- Vercel has provisioned the preview URL (Task 8)
- Alex is logged into `manager.infomaniak.com`

**Step 1: Navigate to DNS panel**

Alex opens: `manager.infomaniak.com` → Domains → `qsearch.ch` → DNS Zone

**Step 2: Find and note the current A record for `@` (root)**

Write down the current value so we can roll back if needed. It will be an IP like `84.16.x.x` (Infomaniak hosting) or similar.

**Step 3: Update the A record for `@`**

Change the A record for `@` (root domain):
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's anycast IP)
- TTL: 300 (5 minutes) for fast rollback, can raise to 3600 later

**Step 4: Update the CNAME for `www`**

Change the CNAME for `www`:
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 300

**Step 5: Save and wait for propagation**

Infomaniak saves; DNS propagates in ~5-15 minutes globally.

**Step 6: Add custom domain in Vercel**

In Vercel dashboard → Project → Settings → Domains → Add `qsearch.ch` and `www.qsearch.ch`. Vercel detects the DNS is pointing at it and auto-provisions SSL via Let's Encrypt (~60 seconds).

---

## Task 10: Verify production cutover

**Step 1: DNS resolution check**

Run: `nslookup qsearch.ch`
Expected: resolves to `76.76.21.21` (or a Vercel anycast IP)

**Step 2: HTTPS + content check**

Run: `curl -I https://qsearch.ch`
Expected: `HTTP/2 200` with `server: Vercel` in headers

**Step 3: Security headers check**

Run: `curl -I https://qsearch.ch | grep -i -E "x-frame|content-security|x-content-type"`
Expected: sees `x-frame-options: DENY`, `x-content-type-options: nosniff`, `content-security-policy: ...`

**Step 4: Email smoke test (safety check)**

Alex sends a test email to an external address (e.g., personal Gmail) from his `@qsearch.ch` kSuite account. Expected: email delivered, no bounce. Confirms MX records are untouched and email path is unchanged.

**Step 5: Multi-language spot check**

Alex opens in a browser:
- `https://qsearch.ch/` (en)
- `https://qsearch.ch/it/`
- `https://qsearch.ch/de/`
- `https://qsearch.ch/fr/`

Expected: all four render correctly with styling and localized text.

---

## Post-Migration Cleanup (separate session, non-blocking)

- Remove `netlify.toml` references from any docs/memory that mention Netlify hosting.
- Update the CTO org-chart note about Infomaniak hosting → change to "Infomaniak domain + email; Vercel hosting".
- Consider lowering Vercel's DNS TTL in dashboard from 300 back to 3600 once the cutover has held for 24 hours.

---

## Rollback Procedure (if production breaks)

1. Open Infomaniak DNS panel
2. Revert A record for `@` to the value from Task 9 Step 2 (saved screenshot)
3. Revert CNAME for `www` to its original value
4. Wait 5 minutes for propagation
5. Verify `curl -I https://qsearch.ch` returns the old host

**Email is never affected by rollback** because MX records are never touched during this migration.
