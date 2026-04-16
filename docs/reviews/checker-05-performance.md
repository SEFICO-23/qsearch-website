# Checker 05 — Performance Audit

**Auditor:** QuantumSearch Security Research (Claude Code)
**Date:** 2026-04-13
**Repo:** https://github.com/SEFICO-23/QSearch
**Commit:** `main` (HEAD at time of audit)

---

## Summary

| # | Check | Verdict | Details |
|---|-------|---------|---------|
| 1 | Bundle size | **WARN** | Cannot run `next build` (no env vars). Dependency set is lean, but all dashboard pages are `'use client'` — entire app ships as client JS. |
| 2 | Lighthouse | **WARN** | Static analysis only (no dev server). Font FOUT risk from external Bricolage Grotesque. No `<meta name="theme-color">`. |
| 3 | Supabase queries | **FAIL** | N+1 waterfall on dashboard homepage. Missing composite indexes. |
| 4 | Fly.io cold start | **PASS** | Multi-stage Docker build. Python-slim final image. Ephemeral machines — cold start acceptable for async scan jobs. |
| 5 | Realtime subscriptions | **PASS** | Correct pattern: 1 channel per scan job, 1 for scan history, 1 for credits. All properly cleaned up on unmount. |
| 6 | Image optimization | **PASS** | No raster images in the codebase. All visuals are SVG inline or CSS gradients. Nothing to optimize. |
| 7 | Font loading | **FAIL** | Bricolage Grotesque loaded via external Google Fonts `<link>`, not `next/font`. Causes render-blocking request + FOUT. |
| 8 | Server Components | **FAIL** | Every dashboard page is `'use client'`. Zero Server Components in `/dashboard/*`. Large client bundle, wasted SSR potential. |
| 9 | API response times | **WARN** | `POST /api/scan` does 5+ sequential DB operations. `/api/scan/teaser/[token]` does 4 sequential queries. No parallelization. |
| 10 | Docker image size | **WARN** | Multi-stage build is correct, but Go builder stage compiles subfinder + nuclei + ffuf (~300MB+ of Go binaries). Final image likely 400-600MB. |
| K | `createClient()` await | **PASS** | All server calls use `await`. Auth pages correctly import sync browser client. Rename recommended to prevent future confusion. |

**Overall: 3 PASS, 4 WARN, 3 FAIL**

---

## Detailed Findings

### 1. Bundle Size — WARN

**What we checked:** Dependency list, `'use client'` directives, package.json.

**Findings:**
- Dependencies are lean: `next`, `react`, `@supabase/ssr`, `@supabase/supabase-js` — no heavyweight UI libraries (no MUI, no Chakra). Good.
- However, **27 files** carry `'use client'` including every dashboard page, all hooks, all scan components, and the entire dashboard layout.
- This means the entire dashboard is client-rendered. Next.js cannot tree-shake server-only code or stream HTML for these routes.
- Without `next build` output, we can't give exact KB numbers, but the architectural pattern guarantees larger bundles than necessary.

**Quick fix:**
- Extract data-fetching into Server Components (see Check 8).
- Move `'use client'` to leaf components that need interactivity (buttons, forms, gauges).

---

### 2. Lighthouse (Static Analysis) — WARN

**What we checked:** HTML structure, meta tags, accessibility signals, font loading.

**Findings:**
- `<html lang="en">` — present. Good.
- `suppressHydrationWarning` on `<html>` — correct for theme script. Good.
- **Missing:** `<meta name="theme-color">` — Lighthouse penalizes this.
- **Missing:** `<meta name="viewport">` — not visible in layout (Next.js may inject it, but explicit is safer).
- Bricolage Grotesque loaded via external `<link>` to fonts.googleapis.com — render-blocking (see Check 7).
- No `<noscript>` fallback anywhere.
- All SVGs are inline — no external image requests. Good for LCP.

**Quick fix:**
- Add `<meta name="theme-color" content="#0f0d18" />` to `<head>`.
- Verify viewport meta is present in rendered HTML.

---

### 3. Supabase Queries — FAIL

**What we checked:** All `.from()` calls, query patterns, migration indexes.

#### N+1 Waterfall (Critical)

**File:** `apps/web/app/(dashboard)/page.tsx` lines 49-75

The dashboard homepage fetches 3 recent scans, then for each completed scan, fires a **separate** `fetch(/api/scan/results/${scan.id})` call inside `Promise.all()`. Each of those API calls does:
1. Auth check (Supabase `getUser()`)
2. Query `scan_jobs`
3. Query `findings`
4. Query `risk_scores`
5. Compute display score

That's **3 × 5 = 15 operations** for 3 scan cards, plus the initial list query = **16 total** for the dashboard homepage.

**Fix:** Create a single server-side query that joins `scan_jobs` with `risk_scores` and pre-computed severity counts. Or use a Postgres view/function.

#### Missing Indexes

Current indexes (from `009_indexes.sql`):
```sql
idx_scan_jobs_user_id      -- scan_jobs(user_id)
idx_scan_jobs_status       -- scan_jobs(status)
idx_findings_scan_id       -- findings(scan_id)
idx_credit_transactions_user_id
idx_b2b_scans_teaser_token
idx_domains_user_id
```

**Missing:**
| Table | Column(s) | Why |
|-------|-----------|-----|
| `scan_jobs` | `(user_id, created_at DESC)` | Every dashboard/scans query orders by `created_at` after filtering by `user_id`. Composite index eliminates sort. |
| `b2b_scans` | `(domain)` | B2B rate limit checks `domain` uniqueness within 30 days. Currently no index. |
| `b2b_scans` | `(verification_token)` | Used in email verification lookup. |
| `subscriptions` | `(stripe_subscription_id)` | Webhook handler looks up by Stripe ID. |
| `subscriptions` | `(stripe_customer_id)` | Checkout route looks up by customer ID. |
| `findings` | `(scan_id, severity)` | Severity counting per scan — covers the scoring engine's common query. |

**Fix:** Add a migration `011_composite_indexes.sql`:
```sql
CREATE INDEX idx_scan_jobs_user_created ON public.scan_jobs(user_id, created_at DESC);
CREATE INDEX idx_b2b_scans_domain ON public.b2b_scans(domain);
CREATE INDEX idx_b2b_scans_verification_token ON public.b2b_scans(verification_token);
CREATE INDEX idx_subscriptions_stripe_sub ON public.subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_stripe_cust ON public.subscriptions(stripe_customer_id);
CREATE INDEX idx_findings_scan_severity ON public.findings(scan_id, severity);
```

---

### 4. Fly.io Cold Start — PASS

**What we checked:** Dockerfile, fly.toml, machine lifecycle.

**Findings:**
- Multi-stage build: Go builder compiles tools, Python-slim final image. Correct pattern.
- Machines are **ephemeral** — started per scan job via Machines API, destroyed after completion.
- For async scan jobs (2-30 min runtime), cold start of 5-15 seconds is acceptable.
- `fly.toml` has no persistent services — correct for on-demand architecture.
- Region: `ams` (Amsterdam). Single region is fine for v1.

**No action needed.**

---

### 5. Realtime Subscriptions — PASS

**What we checked:** All `.channel()` and `.subscribe()` calls.

**Findings:**
- `use-scan-realtime.ts` — 1 channel per scan job (`scan-${scanId}`), listens to `scan_jobs` table updates filtered by `id=eq.${scanId}`. Correct.
- `scans/page.tsx` — 1 channel (`scan-history`), listens to all user's scan_jobs. Refetches on any change. Correct.
- `use-credits.ts` — 1 channel (`credit-balance`), listens to `credit_balances` table. Correct.
- `(b2b)/teaser/[id]/page.tsx` — 1 channel per teaser token. Correct.
- **All channels call `supabase.removeChannel(channel)` in cleanup.** No leaks.
- No per-finding subscriptions anywhere. Correct.

**No action needed.**

---

### 6. Image Optimization — PASS

**What we checked:** All `.png`, `.jpg`, `.svg`, `.webp` references, `next/image` imports.

**Findings:**
- **Zero raster images** in the entire codebase.
- All icons are inline SVGs.
- Visual effects use CSS (gradients, borders, shadows, radial-gradient dot patterns).
- No `next/image` import exists — because there are no images to optimize.
- Marketing page hero uses CSS `backgroundImage: 'radial-gradient(...)'`.

**No action needed.** When images are added later, use `next/image` with `priority` for above-the-fold.

---

### 7. Font Loading — FAIL

**What we checked:** `next/font` usage, `<link>` tags, CSS `@font-face`, `font-display`.

**Findings:**

**Good:**
- `Plus Jakarta Sans` — loaded via `next/font/google` with `display: 'swap'`. Self-hosted, no FOUT. Correct.
- `JetBrains Mono` — loaded via `next/font/google` with `display: 'swap'`. Self-hosted. Correct.

**Bad:**
- **Bricolage Grotesque** — loaded via external `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&display=swap">` in `app/layout.tsx` lines 44-54.
  - This creates a **render-blocking chain**: DNS → fonts.googleapis.com → CSS download → fonts.gstatic.com → font file download.
  - Even with `display=swap`, the CSS file itself is render-blocking.
  - Two `<link rel="preconnect">` partially mitigate but don't eliminate the problem.
  - Lighthouse will flag this as "Eliminate render-blocking resources" (~200-500ms penalty on 3G).

**Fix options (pick one):**
1. **Best:** Download Bricolage Grotesque woff2 files, serve locally via `next/font/local`.
2. **Good:** Use `@fontsource/bricolage-grotesque` npm package (self-hosted).
3. **Acceptable:** Add `media="print" onload="this.media='all'"` trick to make it non-blocking (loses FOUT protection).

```tsx
// Option 1: next/font/local
import localFont from 'next/font/local'
const bricolage = localFont({
  src: [
    { path: '../fonts/BricolageGrotesque-Bold.woff2', weight: '700' },
    { path: '../fonts/BricolageGrotesque-ExtraBold.woff2', weight: '800' },
  ],
  variable: '--font-heading',
  display: 'swap',
})
```

---

### 8. Server Components vs Client Components — FAIL

**What we checked:** All `'use client'` directives, component tree structure.

**27 files** have `'use client'`:

| Category | Count | Files |
|----------|-------|-------|
| Dashboard pages | 8 | page, scans, scans/new, results/[id], domains, credits, settings, layout |
| Auth pages | 2 | login, signup |
| B2B pages | 3 | scan, checkout, teaser/[id] |
| Dashboard components | 3 | CreditDisplay, PlanBadge, StatusBadge (Skeleton/EmptyState are server-compatible but imported by client) |
| Scan components | 5 | FindingCard, RiskGauge, SeverityBadge, SeverityBar, TeaserCard |
| Marketing components | 2 | Navbar, ThemeToggle |
| Hooks | 4 | use-credits, use-require-auth, use-scan-realtime, use-user |
| Providers | 1 | supabase-provider |

**Problems:**
1. **Dashboard layout** (`(dashboard)/layout.tsx`) is `'use client'` — this forces EVERY dashboard child to be client-rendered even if they don't need interactivity.
2. **Pure display components** like `SeverityBadge`, `StatusBadge`, `EmptyState`, and `Skeleton` don't use hooks or browser APIs — they could be Server Components.
3. **Data-fetching pages** like `scans/page.tsx` and `credits/page.tsx` fetch data in `useEffect` — this could be a server-side `fetch` with the page as a Server Component, passing data down to a thin client wrapper.

**Impact:** Every dashboard page load ships the full React component tree as JavaScript, hydrates it, then fetches data client-side. A Server Component approach would:
- Stream HTML immediately (better FCP/LCP)
- Reduce client JS bundle by ~40-60%
- Eliminate loading spinners for initial data

**Quick fix (incremental):**
1. Remove `'use client'` from `(dashboard)/layout.tsx` — make it a Server Component that reads session server-side.
2. Create thin `ClientDashboard` wrapper for interactive sidebar/navigation only.
3. Convert `scans/page.tsx`, `credits/page.tsx`, `domains/page.tsx` to Server Components with data-fetching, passing results to client sub-components.

---

### 9. API Response Times — WARN

**What we checked:** Sequential DB operations, potential slow paths.

#### Slow Path 1: `POST /api/scan` (5+ sequential operations)

```
1. await createClient()           → Supabase server client
2. supabase.auth.getUser()        → Auth check
3. supabase.rpc('deduct_credits') → Credit deduction (Postgres function)
4. supabase.from('attestations').insert() → Legal attestation record
5. supabase.from('scan_jobs').insert()    → Create scan job
6. startScanMachine()             → Fly.io API call (external HTTP)
```

Steps 3-5 are sequential but could be parallelized (attestation + job creation are independent). Step 6 (Fly.io) is the slowest (~500-2000ms for cold machine creation).

**Fix:** Fire `startScanMachine()` without awaiting in the response path (already done in B2B verify route, but NOT in the main scan route). Return the scan_id immediately after DB writes, let the machine start in background.

#### Slow Path 2: `/api/scan/teaser/[token]` (4 sequential queries)

```
1. Query b2b_scans by teaser_token
2. Query scan_jobs by scan_id
3. Query findings by scan_id (count + sample)
4. Update b2b_scans with cached scores
```

Steps 2 and 3 could be parallel (both just need scan_id).

#### Slow Path 3: Dashboard Homepage N+1

Already documented in Check 3. This is the worst offender — up to 16 round-trips.

**Quick fix:** Parallelize independent queries with `Promise.all()` where possible. Long-term: Server Components with joined queries.

---

### 10. Docker Image Size — WARN

**What we checked:** Dockerfile stages, binary sizes, base images.

**Dockerfile analysis:**
```dockerfile
FROM golang:1.22-alpine AS builder       # ~300MB (build stage, discarded)
RUN go install subfinder@latest           # ~20MB binary
RUN go install nuclei@latest              # ~80MB binary
RUN go install ffuf@latest                # ~15MB binary

FROM python:3.12-slim                     # ~150MB base
COPY --from=builder /go/bin/*             # ~115MB of Go binaries
RUN apt-get install curl dnsutils         # ~10MB
COPY requirements.txt + pip install       # ~30MB (supabase, requests, etc.)
COPY . .                                  # ~5MB Python code
```

**Estimated final image: ~310-400MB** — likely under 500MB. PASS on the 500MB threshold.

**But could be smaller:**
- `python:3.12-slim` → `python:3.12-alpine` saves ~70MB (but may need musl compatibility testing)
- Go binaries are statically compiled — no runtime deps needed
- Consider `--no-install-recommends` already present. Good.
- Consider pinning exact versions of subfinder/nuclei/ffuf instead of `@latest` for reproducible builds

**Quick fix:** Pin Go tool versions. Optionally switch to Alpine Python base.

---

### Known Issue: `createClient()` await Verification — FAIL

**What we checked:** Every `createClient()` call site against the function signatures.

There are **two** `createClient()` functions:
1. `lib/supabase/client.ts` — `function createClient()` (synchronous, returns `createBrowserClient(...)`) — for `'use client'` components
2. `lib/supabase/server.ts` — `async function createClient()` (async, `await cookies()`) — for Server Components and API routes

#### Correct Usage (with `await`)
| File | Line | Import | Correct? |
|------|------|--------|----------|
| `app/layout.tsx` | 31 | `server.ts` | `await createClient()` — OK |
| `app/admin/page.tsx` | 25 | `server.ts` | `await createClient()` — OK |
| `app/api/credits/route.ts` | 10 | `server.ts` | `await createClient()` — OK |
| `app/api/domains/route.ts` | 10, 35 | `server.ts` | `await createClient()` — OK |
| `app/api/domains/verify/route.ts` | 11 | `server.ts` | `await createClient()` — OK |
| `app/api/scan/route.ts` | 24 | `server.ts` | `await createClient()` — OK |
| `app/api/scan/status/[id]/route.ts` | 8 | `server.ts` | `await createClient()` — OK |
| `app/api/scan/results/[id]/route.ts` | 27 | `server.ts` | `await createClient()` — OK |
| `app/api/stripe/checkout/route.ts` | 12 | `server.ts` | `await createClient()` — OK |
| `app/api/stripe/credit-pack/route.ts` | 11 | `server.ts` | `await createClient()` — OK |
| `app/api/stripe/portal/route.ts` | 11 | `server.ts` | `await createClient()` — OK |
| `app/auth/callback/route.ts` | 10 | `server.ts` | `await createClient()` — OK |

#### Browser Client (synchronous — no await needed)
| File | Line | Import | Correct? |
|------|------|--------|----------|
| `supabase-provider.tsx` | 21 | `client.ts` | `createClient()` — OK (browser, sync) |

#### Verified — No Bug
| File | Line | Import | Correct? |
|------|------|--------|----------|
| `app/(auth)/login/page.tsx` | 24 | `@/lib/supabase/client` | OK — browser client, sync. |
| `app/(auth)/login/page.tsx` | 47 | `@/lib/supabase/client` | OK — browser client, sync. |
| `app/(auth)/signup/page.tsx` | 25 | `@/lib/supabase/client` | OK — browser client, sync. |

All three files are `'use client'` and correctly import from `lib/supabase/client.ts` (the synchronous browser client). **No bug exists.**

**Recommendation:** To prevent future confusion, add a lint rule or TypeScript strict check to prevent accidental import of the server client in `'use client'` files. Consider renaming:
- `lib/supabase/client.ts` → exports `createBrowserClient()`
- `lib/supabase/server.ts` → exports `createServerClient()`

This eliminates the ambiguity entirely.

---

## Priority Fix List

| Priority | Fix | Impact | Effort |
|----------|-----|--------|--------|
| **P0** | Fix N+1 waterfall on dashboard homepage | 16 → 2 queries | Medium |
| **P0** | Verify auth page `createClient()` imports | Potential silent auth failure | 5 min |
| **P1** | Self-host Bricolage Grotesque via `next/font/local` | -200-500ms render-blocking | 30 min |
| **P1** | Convert dashboard layout to Server Component | -40% client JS | Medium |
| **P1** | Add composite indexes (migration 011) | Query perf for all filtered queries | 15 min |
| **P2** | Parallelize scan route DB operations | -200ms on scan submission | 30 min |
| **P2** | Convert pure display components to Server Components | Smaller bundle | 1 hour |
| **P3** | Pin Go tool versions in Dockerfile | Reproducible builds | 10 min |
| **P3** | Add `<meta name="theme-color">` | Lighthouse score | 2 min |
| **P3** | Rename createClient exports for clarity | Prevent future bugs | 20 min |

---

*Audited by QuantumSearch Security Research — 2026-04-13*
