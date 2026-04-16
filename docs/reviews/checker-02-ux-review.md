# Checker 02 — UX Review

**Date:** 2026-04-13
**Reviewer:** Claude Code (CEO mandate)
**Repo:** SEFICO-23/QSearch
**Reference:** Platform Design Doc (Section 3: Two-Door Model) + Brand Guidelines v3.0

---

## Scorecard

| # | Check | Verdict | Issues | Top Priority |
|---|-------|---------|--------|-------------|
| 1 | B2B door journey | **FAIL** | 10 issues | P0 ×1, P1 ×5 |
| 2 | B2C door journey | **FAIL** | 12 issues | P0 ×1, P1 ×6 |
| 3 | Free tier "broken" UX | **PARTIAL PASS** | 3 issues | P1 ×2 |
| 4 | Mobile | **FAIL** | 3 issues | P1 ×2 |
| 5 | Accessibility | **FAIL** | 10 issues | P0 ×1, P1 ×5 |
| 6 | Loading states | **PASS** | 2 issues | P1 ×1 |
| 7 | Error states | **FAIL** | 4 issues | P0 ×1, P1 ×2 |
| 8 | Empty states | **PASS** | 1 issue | P2 ×1 |
| 9 | Pricing clarity | **FAIL** | 5 issues | P1 ×3 |
| 10 | Brand consistency | **FAIL** | 3 issues | P1 ×2 |

**Overall: 2 PASS, 1 PARTIAL, 7 FAIL — 53 issues total (4 P0, 18 P1, 31 P2)**

---

## Known Issue: `createClient()` Await Audit

**Result: ALL CLEAR — no missing `await` found.**

| Source | Signature | Call Sites | All Correct? |
|--------|-----------|------------|-------------|
| `lib/supabase/server.ts` | `async function createClient()` | 13 call sites | YES — all use `await` |
| `lib/supabase/client.ts` | `function createClient()` (sync) | 4 call sites | YES — correctly omit `await` |
| `lib/supabase/admin.ts` | `function createAdminClient()` (sync) | 0 external calls | N/A |
| `lib/supabase/middleware.ts` | No export | N/A | N/A |

---

## Item 1 — B2B Door Journey

### Flow: Landing → /scan → email verify → teaser → checkout → report

### PASS
- **Two-door hero:** Clear CTA split — "Scan Your Business" (B2B) vs "Start Free" (B2C). No ambiguity.
- **Auto-domain detection:** Email typing auto-populates the domain field from company email (scan/page.tsx:77–83). Excellent friction reduction.
- **Free-email blocking:** Client-side + server-side validation enforces company email.
- **CAPTCHA handling:** Turnstile renders, expired-callback resets token, widget resets on error.
- **Teaser realtime + polling:** Supabase Realtime + 15-second poll fallback. Progress dots (queued → scanning → done).
- **Sample finding is real data:** One visible finding with severity badge, CVSS score, category — builds credibility.
- **Teaser messaging is tier-calibrated:** Escalating urgency per risk tier (teaser.ts).

### FAIL

| # | Priority | File:Line | Issue |
|---|----------|-----------|-------|
| 1 | **P0** | `teaser/[id]/page.tsx:66` | **Stripe `cancelled=true` silently ignored.** User returns from cancelled Stripe checkout, sees no feedback — the upgrade CTA reappears with no explanation. Must check `?cancelled` param and show "Payment cancelled — your report is still available." |
| 2 | **P1** | `teaser/[id]/page.tsx:417–451` | **Moderate-tier pricing options have no benefit copy.** CHF 790 vs CHF 3,800 shown as bare buttons with no explanation of what the 4.8x premium buys. Will kill conversion at the exact payment moment. Add benefit bullets or "what's included" for each option. |
| 3 | **P1** | `verify/route.ts:69` | **`scan_failed` redirect is a dead end.** Redirects to `/scan?error=scan_failed` but scan/page.tsx does not read `?error` params. User arrives at blank form with no explanation. |
| 4 | **P1** | `teaser/[id]/page.tsx:456–466` | **Post-payment state is vague.** Says "report being prepared" with no ETA. The checkout page shows "typically within 1 hour" but only on Stripe success redirect — not on the teaser page where the user actually waits. |
| 5 | **P1** | `scan/page.tsx:220–222` | **Domain field label is ambiguous.** "Domain to Scan" implies third-party scanning, but validation enforces ownership. Should read "Your company's domain." |
| 6 | **P1** | `scan/page.tsx:45–46` | **Missing Turnstile key = silent block.** If `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is unset, form silently returns with no error. |
| 7 | P2 | `page.tsx:57–61` | Hero "Start Free" (B2C) button uses same style as B2C card's "View Plans" — returning business visitors could mistake it for a B2B action. |
| 8 | P2 | `page.tsx:211–241` | No social proof anywhere (zero testimonials, client logos, scan counts). For CHF 5,900 price points, trust is critical. |
| 9 | P2 | `teaser/[id]/page.tsx` | No urgency/scarcity mechanism — no timer, no "offer expires," no "scan data valid for 7 days." Users can bookmark and forget. |
| 10 | P2 | `teaser/[id]/page.tsx:267–271` | Post-payment "paid" banner is a tiny green ribbon. No celebration moment — missed opportunity to build confidence in the purchase. |

---

## Item 2 — B2C Door Journey

### Flow: Landing → /signup → email verify → dashboard → first scan → results → upgrade

### PASS
- **Company email upsell:** Detecting company email triggers "you can run a free scan of [domain]" hint (signup/page.tsx:80–85). Smart.
- **Minimal signup form:** Email + password only. No phone, no name required upfront.
- **Onboarding empty state:** Dashboard shows scan form with "Your first 3 scans are free" (page.tsx:114–162). Best empty state in the app.
- **Scan type selector:** Radio-card design with name, description, credit cost, plan gate in one view.
- **Legal attestation checkbox:** Required before scan submission.
- **Credit balance inline:** Green/red coloring when insufficient + "Buy Credits →" link.
- **Results progress visualization:** Animated scanner, stage cycling, step pills — excellent.
- **Credits refunded on failure:** Clear and reassuring (results/[id]/page.tsx:140).

### FAIL

| # | Priority | File:Line | Issue |
|---|----------|-----------|-------|
| 1 | **P0** | `settings/page.tsx:104–109` | **Delete account is a lie.** `handleDeleteAccount` calls `signOut()` and redirects to `/`. Does NOT delete the account. Button says "Confirm Delete," warning says "Permanently delete." User believes account was deleted — GDPR compliance risk. |
| 2 | **P1** | `(dashboard)/page.tsx:194` | **"Total Scans" stat capped at 3.** Query uses `.limit(3)` and stat shows `scans.length`. User with 20 scans sees "Total Scans: 3." Actively misleading. Must query `count(*)` separately. |
| 3 | **P1** | `results/[id]/page.tsx:288–303` | **Upgrade CTA buried below the fold.** After sample finding + many blurred cards, the CTA appears at the very end. Should be sticky or appear after the first sample finding. |
| 4 | **P1** | `results/[id]/page.tsx:298` + `credits/page.tsx:135` + `(dashboard)/page.tsx:297` | **Upgrade CTA links to `/credits` instead of plan upgrade.** Three separate pages send users to credit purchase when they need plan comparison. Wrong destination. |
| 5 | **P1** | `(dashboard)/layout.tsx:10–27` | **No active nav state.** All sidebar links identical — users cannot tell which page they're on. No user identity (avatar, email, plan badge, credit count) in sidebar. |
| 6 | **P1** | `(auth)/verify/page.tsx:33` | **"Try again" → `/signup` risks duplicate account.** Should trigger Supabase resend API call instead. Also: no email address shown to confirm correct spelling. |
| 7 | **P1** | `settings/page.tsx:216–230` | **Password change has no "current password" field.** `updateUser({ password })` only requires session. Session hijack = password takeover without knowing old password. |
| 8 | P2 | `(auth)/signup/page.tsx` | No plan/pricing context before signup. No "Free tier includes X" line. No OAuth/SSO option (email+password only — unusual for developer tools). |
| 9 | P2 | `(auth)/signup/page.tsx:98` | Password requirements hidden. `minLength={8}` in placeholder only — no strength indicator, no real-time validation. Error surfaces only after Supabase rejects. |
| 10 | P2 | `(dashboard)/page.tsx:131` | "3 free scans" contradicts credit system. Free plan may have 10 credits with quick scans costing 1 = 10 scans, not 3. Messaging mismatch. |
| 11 | P2 | `auth/callback/route.ts:7` | `next` param from query string used in redirect without sanitization. Open redirect mitigated by same-origin prefix, but internal path manipulation possible. |
| 12 | P2 | `scans/new/page.tsx:176` | Locked scan types not clickable to learn more. Disabled button with `cursor-not-allowed` — user curious about "Active Deep" has no way to see details. No scan duration estimates shown. |

---

## Item 3 — Free Tier "Broken" UX

### PARTIAL PASS

**B2B teaser FOMO — STRONG (8/10):**
- Locked card grid with severity-colored skeletons is effective
- `X More Findings Detected` with lock icon is the right pattern
- Blur overlay `backdrop-blur-md bg-uv-bg/70` is well-calibrated — visible enough to tempt, hidden enough to require purchase
- Sample finding with CVSS score gives credibility

**B2C dashboard FOMO — WEAK (5/10):**
- `TeaserCard` components create blur effect on results page
- Locked count label shown ("X locked")

| # | Priority | Issue |
|---|----------|-------|
| 1 | **P1** | Upgrade CTA buried at bottom of findings list — below the fold for scans with many findings. Should be sticky or appear after first sample. |
| 2 | **P1** | Dashboard sidebar has zero upgrade prompting — prime real estate wasted. No "3 credits remaining — Upgrade" badge. |
| 3 | P2 | No social proof ("other users with your risk score paid to see this"), no time-limited offers, no personalized category hints on locked findings. |

---

## Item 4 — Mobile

### FAIL

**Working correctly:**
- Marketing pages use responsive breakpoints (`sm:`, `md:`, `lg:`)
- Dashboard sidebar is `hidden lg:flex` with full-screen overlay drawer on mobile (hamburger trigger + backdrop click-to-close)
- Stats grids collapse: `grid-cols-1 sm:grid-cols-3`
- Primary CTAs are finger-friendly: `py-3.5` ≈ 48px height

| # | Priority | File:Line | Issue |
|---|----------|-----------|-------|
| 1 | **P1** | `Navbar.tsx:68`, `ThemeToggle.tsx:30` | **Touch targets 36px (h-9 w-9), below 44px minimum.** WCAG 2.5.5 and Apple HIG require 44×44px. Fix: `h-11 w-11`. |
| 2 | **P1** | `pricing/page.tsx:321` | **B2B pricing tier rows not mobile-safe.** `flex items-center justify-between` with long descriptions causes text truncation on 320–375px screens. Needs `flex-col sm:flex-row gap-2`. |
| 3 | P2 | `(b2b)/scan/page.tsx` | B2B scan page has no layout.tsx — Turnstile CAPTCHA widget has no min-height or loading skeleton on narrow screens. |

---

## Item 5 — Accessibility

### FAIL

**Working correctly:**
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, correct heading hierarchy
- Skip link on marketing layout (globals.css handles off-screen positioning)
- `prefers-reduced-motion` media query disables all animations (globals.css:186–193)
- Navbar hamburger has `aria-label` + `aria-expanded`
- ThemeToggle has dynamic `aria-label` reflecting current mode
- Logo has `aria-label="QuantumSearch home"` on Link, `aria-hidden="true"` on SVG
- Focus states on inputs: `focus:border-uv-primary focus:ring-1`

| # | Priority | File:Line | Issue |
|---|----------|-----------|-------|
| 1 | **P0** | `checkout/page.tsx:60,82`, `scan/page.tsx:156`, `admin/page.tsx:78`, `PlanBadge.tsx:8` | **Electric Purple (#5B23FF) used as text color — 2.3:1 contrast ratio on Abyss.** Fails WCAG AA (requires 4.5:1). Brand Guidelines explicitly say "NEVER readable text." Replace with `text-uv-accent` (#008BFF = 5.2:1) or `text-uv-text-secondary`. |
| 2 | **P1** | `FindingCard.tsx:24–29` | **Accordion button missing `aria-expanded`, `aria-controls`, `aria-label`.** Screen reader users cannot determine expanded state. |
| 3 | **P1** | `RiskGauge.tsx` | **No accessible text representation.** SVG gauge and score number have zero ARIA markup. Add `role="img"` + `aria-label="Risk score: ${score} out of 100, ${label}"`. |
| 4 | **P1** | `SeverityBar.tsx` | **No accessible label.** Segments have `title` (tooltip-only) but no `role="img"` or `aria-label`. |
| 5 | **P1** | `scan/page.tsx:227`, `(dashboard)/page.tsx:148` | **Form errors not announced.** No `role="alert"`, `aria-live`, `aria-invalid`, or `aria-describedby` on any form error in the codebase. |
| 6 | **P1** | `(dashboard)/layout.tsx` | **Skip link missing from dashboard layout.** Only marketing layout has one. Dashboard keyboard users must tab through 6+ sidebar links on every page load. |
| 7 | P2 | `ThemeToggle.tsx:36,46` | SVG icons missing `aria-hidden="true"`. |
| 8 | P2 | `StatusBadge.tsx:18` | Decorative dot missing `aria-hidden="true"`. |
| 9 | P2 | `CreditDisplay.tsx:8,22` | SVG icons missing `aria-hidden="true"`. |
| 10 | P2 | All interactive elements | `focus:` used instead of `focus-visible:` — focus rings show on mouse click (minor regression, not WCAG violation). |

---

## Item 6 — Loading States

### PASS (with minor issues)

**Working correctly:**
- B2B scan form: spinner + "Submitting..." + disabled button
- Dashboard quick-scan: "Starting..." text + disabled button
- New scan page: spinner SVG + "Starting Scan..." + disabled
- Results in-progress: animated scanner icon, stage cycling every 3s, step indicator dots, auto-update copy
- Results initial fetch: `CardSkeleton` components
- Scan history: 5 `TableRowSkeleton` rows
- Credits: individual `Skeleton` for each balance card + 5 skeleton transaction rows + "Redirecting..." on buy
- Domains: 3 skeleton blocks + "Adding..."/"Checking..." button states
- Checkout: spinner ring + "Processing your payment..."
- Realtime hook: polling + Supabase `postgres_changes` channel

| # | Priority | File:Line | Issue |
|---|----------|-----------|-------|
| 1 | **P1** | `(dashboard)/page.tsx:187` | **Stats row has no loading state.** Shows 0 credits, 0 scans, 0 active while data fetches. Contradicts "Your first 3 scans are free" message. Wrap in `loading` flag with `Skeleton` components. |
| 2 | P2 | `credits/page.tsx:135` | Plan info box hidden during load but "Upgrade Plan" button visible — inconsistent partial render. |

---

## Item 7 — Error States

### FAIL

**Working correctly:**
- Global error boundary (`error.tsx`): "Try Again" + "Go Home" + error digest for support
- 404 page: clean with "Go Home" and "Dashboard" links
- Scan failed state: red icon, "credits refunded" reassurance, "Try Again" CTA
- B2B scan form errors: styled red box, captcha resets, field-level messages
- Rate limit messages: human-readable ("Daily scan limit reached. Upgrade your plan.")
- B2B rate limit: "Domain already scanned in last 30 days. Contact us for rescan."

| # | Priority | File:Line | Issue |
|---|----------|-----------|-------|
| 1 | **P0** | `credits/page.tsx:46–58` | **Stripe checkout failure is completely silent.** On `!res.ok`, spinner disappears with no error message. No `setError()` call on failure branch. User has no idea why checkout didn't open. Same pattern in all Stripe route callers. |
| 2 | **P1** | `domains/page.tsx:72` | **DNS failure message not plain-language.** Returns `"DNS lookup failed. Ensure _qsearch-verify.example.com exists."` Non-technical users won't know what to do. |
| 3 | **P1** | `api/scan/route.ts:503` | **Scan start 503: refund not confirmed to user.** Returns `"Scanner failed to start. Credits refunded."` but new-scan page only reads `data.error` inline — doesn't link to `/credits` or confirm the refund visually. |
| 4 | P2 | `results/[id]/page.tsx:130` | Scan failed view says "Something went wrong" but never surfaces `error_message` from the API status response. For persistent failures, showing the reason would help. |

---

## Item 8 — Empty States

### PASS

**All empty states are well-implemented:**
- **Dashboard (no scans):** Custom onboarding card with icon, heading, free scan copy, and inline quick-scan form
- **Scan history (empty):** `EmptyState` component with clipboard icon, "No scans yet", and "Start a Scan" CTA
- **Credits (no transactions):** `EmptyState` with receipt icon, "No transactions yet", and explanation
- **Domains (no domains):** `EmptyState` with globe icon, "No domains registered", explains passive scans don't need verification
- **Results (no findings):** Green "All Clear" box with checkmark and nudge to run deeper scan

| # | Priority | File:Line | Issue |
|---|----------|-----------|-------|
| 1 | P2 | `EmptyState.tsx:1` | `icon` prop is required with no default. If any caller forgets it, component renders silently broken. Should be optional with a default fallback icon. |

---

## Item 9 — Pricing Clarity

### FAIL

**Working correctly:**
- Five plan cards with clear CHF amounts, credits/month, and feature lists
- Credit pack displayed as "10 credits for CHF 5"
- Money-back guarantee shown
- Credit costs on new-scan page shown inline per scan type with balance in green/red
- Free-tier gate shows "Upgrade to pro →" inline
- Credit rollover only on Max/Ultra — clearly communicated

| # | Priority | File:Line | Issue |
|---|----------|-----------|-------|
| 1 | **P1** | `pricing/page.tsx:109` | **"Active scan: 5–10 credits" is ambiguous.** Actually two products: `active_light` (5 cr) and `active_deep` (10 cr). Range notation misleads. New-scan page handles this correctly by listing them separately — pricing page must match. |
| 2 | **P1** | `pricing/page.tsx:313` + `lib/pricing/b2b.ts:41` | **B2B Critical tier mismatch.** Pricing page shows "From CHF 5,900" but teaser flow shows "Schedule a Call" (type: `call`, no checkout). User expects self-service at CHF 5,900, gets a phone request. |
| 3 | **P1** | `pricing/page.tsx:316` | **Moderate Risk has two unexplained price points.** CHF 790 vs CHF 3,800 on the same tier with no feature differentiation on the pricing page. Teaser page shows them as bare buttons. |
| 4 | P2 | Pricing page | `t0_full` (15 credits) not prominently listed — buried in plan feature bullet. Users may not realize a Full T0 costs 15 credits. |
| 5 | P2 | `plans.ts` vs pricing page | Pro plan lists "Scan comparison" feature in `plans.ts:45` but this doesn't appear on the pricing page feature list. Feature lists must be a single source of truth. |

---

## Item 10 — Brand Consistency

### FAIL

**Working correctly:**
- Color token architecture in `globals.css` correctly defines the full system with dark `:root` and `[data-theme="light"]` overrides
- Bricolage Grotesque loaded via Google Fonts, mapped to all headings
- Plus Jakarta Sans for body, JetBrains Mono for code — consistent via utility classes
- Q logomark gradient: `linearGradient` from `#5B23FF` to `#008BFF` with Volt Lime Q — matches spec exactly
- Light theme remaps to Forest Gradient palette correctly
- No default shadcn/ui component imports anywhere — all custom
- `rounded-brand` (12px) and `rounded-brand-lg` (20px) used consistently

| # | Priority | File:Line | Issue |
|---|----------|-----------|-------|
| 1 | **P1** | `(dashboard)/layout.tsx:93–100` | **Dashboard uses hardcoded inline logo, not shared `<Logo>` component.** Sidebar renders a `div` with CSS gradient + `<span>Q</span>` instead of the canonical SVG `<Logo>` from `components/marketing/Logo.tsx`. Visual inconsistency + maintenance burden. |
| 2 | **P1** | `scan/page.tsx:241`, `checkout/page.tsx:66`, `error.tsx:31`, `not-found.tsx:20` | **Primary CTA buttons use `bg-uv-primary` (Electric Purple) instead of Volt Lime.** Marketing pages consistently use `bg-uv-lime text-[#0f0d18]` for CTAs. The highest-conversion page (scan) deviates. White text on Electric Purple is also only ~3.9:1 contrast. |
| 3 | P2 | `layout.tsx:39–41` | ThemeScript time-of-day fallback (7am–7pm = light) may conflict with brand's dark-first positioning for marketing demos. Minor. |

---

## Priority Summary

### P0 — Blocks Launch (4 issues)

1. **Electric Purple as text color (a11y):** 2.3:1 contrast fails WCAG AA. 4 locations.
2. **Stripe checkout failure silent:** User gets no feedback when payment flow fails. All Stripe callers affected.
3. **Delete account is a lie:** `signOut()` masquerading as deletion. GDPR risk.
4. **Stripe cancel return ignored:** `?cancelled=true` on teaser page not handled.

### P1 — Fix This Week (18 issues)

| Area | Count | Key Issues |
|------|-------|------------|
| B2B Journey | 5 | Pricing options no copy, scan_failed dead end, vague post-payment, ambiguous domain label, Turnstile silent fail |
| B2C Journey | 6 | Total scans capped at 3, upgrade CTA buried + wrong destination ×3, no active nav, verify "try again" → signup, no current password |
| FOMO | 2 | CTA below fold, sidebar zero upgrade prompting |
| Mobile | 2 | 36px touch targets, pricing rows overflow |
| Accessibility | 5 | FindingCard no aria, RiskGauge no aria, SeverityBar no aria, form errors not announced, dashboard skip link missing |
| Loading | 1 | Stats row 0-flash |
| Errors | 2 | DNS error not plain-language, scan 503 refund unconfirmed |
| Pricing | 3 | Active scan range ambiguous, Critical tier mismatch, Moderate tier unexplained |
| Brand | 2 | Hardcoded dashboard logo, Electric Purple CTAs instead of Volt Lime |

### P2 — Nice to Have (31 issues)

Includes: CTA style conflicts, missing social proof, no urgency/scarcity, no OAuth/SSO, password requirements hidden, focus-visible missing, decorative elements missing aria-hidden, EmptyState icon fallback, pricing page feature list drift, and other polish items. Full details in each section above.

---

## Appendix: createClient() Audit

**All 17 call sites are correct. No missing `await` found.**

- `lib/supabase/server.ts` (async): 13 server-side callers — all use `await` ✓
- `lib/supabase/client.ts` (sync): 4 client-side callers — correctly omit `await` ✓
- `lib/supabase/admin.ts` (`createAdminClient`, sync): 0 external callers ✓
- `lib/supabase/middleware.ts`: no `createClient` export ✓

---

*Generated by Claude Code — Checker 02 UX Review*
