# QSearch Platform — Full Design Document

**Date:** 2026-04-10
**Author:** CEO (Alex Sebastiani) + Claude (CEO Session VII)
**Status:** CTO REVIEWED — APPROVED WITH CONDITIONS — FINAL v1 SCOPE LOCKED
**Repo:** https://github.com/SEFICO-23/QSearch

---

## 1. Vision

**"The Higgsfield of Cybersecurity"** — a self-service security scanning platform with two doors:

1. **B2B Track:** Company email → autonomous T0 scan → teaser dashboard with risk score → fear-based dynamic pricing → pay for full report or schedule engagement
2. **B2C/Pro Track:** Any email → monthly subscription → credits → passive/active scans → reports, docs, community

### Why This Exists

QuantumSearch has proven it can find real vulnerabilities (36 gate-approved findings on SharkSpinz, 109 findings across 9 targets in a single session). But the business model has two problems:
- **Bounty track:** 16 submissions, $0 accepted (lack of working PoCs)
- **Client track:** First client (SharkSpinz) saw the teaser, declined to pay

The platform solves both:
- B2B track automates client acquisition (they come to us, scan themselves, see the fire)
- B2C track creates recurring revenue independent of bounties or clients
- The scanning engine generates PoCs automatically (feeds back into bounty program quality)

---

## 2. Architecture Overview

### Three-Layer System

```
Layer 1: VERCEL (Frontend + API Routes)
  - Next.js App Router
  - Auth flows (two doors)
  - Dashboard rendering
  - Stripe webhook handling
  - Fly.io Machine orchestration
  
Layer 2: SUPABASE (Database + Auth + Realtime)
  - PostgreSQL with RLS (multi-tenant security)
  - Auth (email/password, magic links, company email detection)
  - Realtime subscriptions (live scan progress updates)
  - Row-level security (users only see their own data)

Layer 3: FLY.IO (Scanning Engine)
  - Docker containers with security tools
  - On-demand: start per scan, stop when done
  - Zero idle cost (pay per second)
  - EU regions (Amsterdam/Frankfurt) for GDPR
  - Tools: subfinder, nuclei, ffuf, testssl, python scripts
  
External Services:
  - Stripe: subscriptions + one-time payments + credit packs
  - Umami: privacy-first analytics (self-hosted on Vercel)
  - GitHub: SEFICO-23/QSearch monorepo + CI/CD
```

### Scan Flow

```
1. User/Business requests scan (via web UI)
2. Vercel API route validates: auth, credits, domain authorization, geo-compliance
3. Scan job written to Supabase `scan_jobs` table (status: 'queued')
4. Supabase webhook fires → Vercel API endpoint
5. Vercel calls Fly.io API → starts a Machine with scan parameters
6. Fly.io Machine:
   a. Reads job details from Supabase
   b. Runs scan tools (passive and/or active)
   c. Calculates R3 risk score
   d. Writes findings to Supabase (realtime updates to dashboard)
   e. Generates report
   f. Updates job status to 'completed'
   g. Stops itself
7. User sees results in real-time on dashboard
```

---

## 3. Two-Door Model

### Door 1: B2B Track (Company Email → T0 → Pay)

**Entry:** Business lands on qsearch.ch/scan → enters company email + domain
**Validation:** Email must be company domain (not gmail/hotmail/etc.)
**Process:**
1. Auto-verification: company email domain matches scan target (or is associated)
2. Autonomous T0 passive scan runs (free, no credits needed)
3. Risk Score calculated (R3: CVSS + exploitability + business context)
4. Teaser dashboard generated based on risk tier

**Dynamic Fear-Based Pricing (4 Tiers):**

| Risk Score | Teaser Shows | Paid Service | Price | Delivery |
|-----------|-------------|-------------|-------|----------|
| Low (0-30) | "Above average. X issues." | Auto in-depth + emerging threats in sector + new attack vectors + defense recommendations | CHF 190 | Automated |
| Moderate (31-60) | "Exploitable gaps found." + 2 redacted finding titles | Auto in-depth + security assessment + penetration analysis + attack paths | CHF 490-1,500 | Auto + light review |
| High (61-85) | "Attack chains identified." + chain shape (no details) | Auto in-depth + full audit + "Schedule a call" | CHF 2,500-5,000 | Human-led |
| Critical (86-100) | "[X] paths to complete compromise." | Full audit in-depth + mandatory call | CHF 6,500+ | Full engagement |

**Luca Romito Rules enforced:** Impact and severity shown, NEVER specifics. Specifics are the product.

### Door 2: B2C/Pro Track (Subscription + Credits)

**Entry:** User signs up with any email → chooses plan → gets credits
**Authorization Model (U3 Hybrid with Geo-Compliance):**
- Geo-detection via IP → apply jurisdiction's rules for passive recon
- Legal attestation at signup → liability transfer clause
- False attestation = account termination + fine (in ToS)
- Passive scans: available on any domain (within legal framework)
- Active scans: domain verification required (DNS TXT or file upload)

**Credit System:**

| Tier | Price | Credits/mo | Unlocked Features |
|------|-------|-----------|-------------------|
| Free | CHF 0 | 3 | Quick scans only. Severity counts + 1 sample finding. Rest blurred. No export. No history. |
| Plus | CHF 19/mo | 30 | Full passive scans. Full results visible. PDF export. 30-day history. |
| Pro | CHF 49/mo | 100 | Passive + active (verified domains). Full reports. 90-day history. Scan comparison. |
| Max | CHF 149/mo | 300 | Everything. Priority queue. API access. Unlimited history. 1-month credit rollover. Community + support. |

**Credit Costs:**

| Action | Credits | Available From |
|--------|---------|---------------|
| Quick scan (headers, SSL, DNS) | 1 | Free |
| Passive recon (OSINT, subdomains, tech stack, email) | 3 | Plus |
| Active scan — light (top nuclei templates) | 5 | Pro |
| Active scan — deep (full nuclei + ffuf + testssl) | 10 | Pro |
| Full T0 report (all phases + PDF) | 15 | Plus (passive) / Pro (full) |
| Extra credit pack (10 credits) | CHF 5 | Any tier |

**Money-back guarantee:** First month refundable if not satisfied.

**"Broken Free" UX:** Free tier shows just enough to create FOMO:
> "We scanned example.com: 3 Critical, 7 High, 12 Medium. Sample: SSL expires in 12 days (Medium). [21 findings locked — Upgrade to Plus →]"

---

## 4. R3 Risk Scoring Engine

**Three layers of scoring:**

### Layer 1: CVSS Math
- Sum CVSS scores across all findings
- Normalize to 0-100 scale
- Weight by finding count and severity distribution

### Layer 2: Exploitability Bonus
- Attack chain detection: if findings combine into multi-step exploitation paths, score multiplier
- Exposed credentials or secrets: +15 points
- Public-facing critical services (databases, admin panels): +20 points
- Missing basic security (no HTTPS, no headers, no CSP): +10 points

### Layer 3: Business Context (R3)
- **Industry modifier:** Finance/crypto/health = 1.5x multiplier. E-commerce = 1.3x. Blog/portfolio = 0.7x
- **Real events:** Database of recent breaches in same industry (e.g., "3 gambling platforms breached in 2025-2026")
- **Legal frameworks:** Applicable regulations (GDPR, PCI-DSS, Swiss FADP, Italian gambling law, etc.)
- **Competitor incidents:** If competitors were breached with similar vulnerabilities
- **Regulatory statements:** Relevant regulator warnings or enforcement actions

**R3 context is included in the report:** Not just "you have vulnerabilities" but "companies like yours were fined €X for this exact issue."

---

## 5. Database Schema (Supabase PostgreSQL)

### Core Tables

```sql
-- Users & Organizations
users (id, email, role, plan, created_at, geo_country, geo_ip)
organizations (id, name, domain, industry, user_id)
domains (id, org_id, user_id, domain, verified, verification_method, verified_at)

-- Credits & Billing
credit_balances (id, user_id, balance, plan_credits, extra_credits, rollover)
credit_transactions (id, user_id, amount, type, description, scan_id, created_at)
subscriptions (id, user_id, stripe_subscription_id, plan, status, current_period_end)

-- Scans & Jobs
scan_jobs (id, user_id, domain, scan_type, status, priority, machine_id, started_at, completed_at)
  -- scan_type: enum ('quick', 'passive', 'active_light', 'active_deep', 't0_full')
  -- status: enum ('queued', 'running', 'completed', 'failed', 'cancelled')

-- Results
findings (id, scan_id, title, description, severity, cvss_score, cvss_vector, category, evidence, remediation, is_sample)
attack_chains (id, scan_id, steps, impact, finding_ids)
risk_scores (id, scan_id, cvss_raw, exploitability_bonus, industry_modifier, business_context, final_score, tier)

-- R3 Context
industry_breaches (id, industry, company, date, description, regulatory_action, source_url)
legal_frameworks (id, jurisdiction, name, description, penalties, applicable_industries)

-- B2B Track
b2b_scans (id, company_email, domain, scan_id, risk_tier, teaser_url, report_url, payment_status, stripe_session_id)

-- Reports
reports (id, scan_id, user_id, format, content_json, pdf_url, created_at)

-- Legal & Compliance
attestations (id, user_id, domain, attestation_text, ip_address, geo_country, accepted_at)
jurisdictions (id, country_code, passive_allowed, active_allowed, restrictions, legal_basis)
```

### Row-Level Security (RLS)
- Users can only read/write their own data
- B2B scan teasers are public (via signed URL)
- Admin role can read all (for support)
- Scan results isolated per user — no cross-contamination

---

## 6. Monorepo Structure

**Repository:** https://github.com/SEFICO-23/QSearch

```
QSearch/
├── apps/
│   ├── web/                      ← Next.js 14+ (App Router)
│   │   ├── app/
│   │   │   ├── (auth)/           ← Login, signup, email verification
│   │   │   │   ├── login/
│   │   │   │   ├── signup/
│   │   │   │   └── verify/
│   │   │   ├── (b2b)/            ← Business track
│   │   │   │   ├── scan/         ← Enter company email + domain
│   │   │   │   ├── teaser/[id]/  ← Risk-tiered teaser dashboard
│   │   │   │   └── checkout/     ← Stripe payment for full report
│   │   │   ├── (dashboard)/      ← Authenticated user dashboard
│   │   │   │   ├── scans/        ← Scan history, start new scan
│   │   │   │   ├── results/[id]/ ← Individual scan results
│   │   │   │   ├── domains/      ← Verified domains management
│   │   │   │   ├── credits/      ← Credit balance, buy more
│   │   │   │   └── settings/     ← Account, billing, plan
│   │   │   ├── (marketing)/      ← Public pages
│   │   │   │   ├── page.tsx      ← Landing page (hero + CTA)
│   │   │   │   ├── pricing/      ← Pricing page
│   │   │   │   └── about/        ← About QuantumSearch
│   │   │   └── api/              ← API routes
│   │   │       ├── scan/         ← Start scan, check status
│   │   │       ├── credits/      ← Credit operations
│   │   │       ├── domains/      ← Domain verification
│   │   │       ├── webhooks/     ← Stripe + Supabase webhooks
│   │   │       ├── geo/          ← Geo-detection
│   │   │       └── flyio/        ← Fly.io Machine orchestration
│   │   ├── components/           ← UI components
│   │   │   ├── ui/               ← Base components (Ultraviolet Volt)
│   │   │   ├── dashboard/        ← Dashboard-specific components
│   │   │   ├── scan/             ← Scan UI (progress, results)
│   │   │   └── marketing/        ← Landing page components
│   │   ├── lib/                  ← Utilities
│   │   │   ├── supabase/         ← Client + server Supabase clients
│   │   │   ├── stripe/           ← Stripe helpers
│   │   │   ├── flyio/            ← Fly.io API client
│   │   │   └── geo/              ← Geo-detection + jurisdiction logic
│   │   ├── tailwind.config.ts    ← Ultraviolet Volt design tokens
│   │   └── next.config.ts
│   │
│   └── scanner/                  ← Scanning Engine (Python, runs on Fly.io)
│       ├── Dockerfile            ← Scanner container image
│       ├── fly.toml              ← Fly.io Machine config
│       ├── main.py               ← Entry point: poll queue, run scan, push results
│       ├── runners/
│       │   ├── quick.py          ← Headers, SSL, DNS (1 credit)
│       │   ├── passive.py        ← OSINT, subdomains, tech stack (3 credits)
│       │   ├── active_light.py   ← Top nuclei templates (5 credits)
│       │   ├── active_deep.py    ← Full nuclei + ffuf + testssl (10 credits)
│       │   └── t0_full.py        ← Full T0 orchestrator (15 credits)
│       ├── scoring/
│       │   ├── cvss.py           ← CVSS calculation
│       │   ├── chains.py         ← Attack chain detection
│       │   └── r3_context.py     ← Industry breaches, legal frameworks, competitor intel
│       ├── reporting/
│       │   ├── teaser.py         ← Generate blurred/locked teaser
│       │   ├── full.py           ← Full report generation
│       │   └── pdf.py            ← PDF export
│       └── requirements.txt
│
├── packages/
│   ├── shared/                   ← TypeScript types shared between apps
│   │   ├── types/                ← Scan, Finding, Credit, User types
│   │   └── constants/            ← Credit costs, plan limits, tiers
│   ├── ui/                       ← Shared UI component library
│   └── supabase/                 ← Generated DB types from schema
│
├── supabase/
│   ├── migrations/               ← SQL migration files
│   ├── seed.sql                  ← Test/demo data
│   └── config.toml               ← Supabase project config
│
├── .github/
│   └── workflows/
│       ├── ci.yml                ← Lint, test, typecheck
│       ├── deploy-web.yml        ← Deploy frontend to Vercel
│       └── deploy-scanner.yml    ← Build + deploy scanner to Fly.io
│
├── turbo.json                    ← Turborepo pipeline config
├── package.json                  ← Root workspace (pnpm)
├── pnpm-workspace.yaml
├── .env.example                  ← Required env vars (never commit .env)
└── README.md
```

---

## 7. Sprint Model — Parallel Actor Architecture

### Actor Hierarchy (for build sprint)

```
CEO (Alex) — Business decisions, final approval
  │
  ├── CEO Claude (this session) — Coordination, final quality gate
  │
  ├── CTO Actor (1 fresh session)
  │   └── Reviews this design doc, challenges architecture,
  │       validates tech stack, identifies risks, reports in plain language
  │
  ├── BUILD LAYER (10 actors, fresh sessions)
  │   ├── Actor 1: Monorepo scaffolding + Turborepo + CI/CD
  │   ├── Actor 2: Supabase schema + migrations + RLS policies
  │   ├── Actor 3: Auth flows (signup, login, email verify, company email detection)
  │   ├── Actor 4: B2B track (scan page → teaser → Stripe checkout)
  │   ├── Actor 5: Dashboard (results, history, credits, domains)
  │   ├── Actor 6: Scanner engine (Dockerfile + runners + Fly.io config)
  │   ├── Actor 7: R3 scoring engine + industry breach database
  │   ├── Actor 8: Stripe integration (subscriptions, one-time, credits, webhooks)
  │   ├── Actor 9: Landing page + pricing page (Ultraviolet Volt design)
  │   ├── Actor 10: Geo-detection + jurisdiction logic + legal attestation
  │
  ├── CHECK LAYER (5 actors, fresh sessions — run AFTER build layer)
  │   ├── Checker 1: Security audit (auth, RLS, injection, OWASP top 10)
  │   ├── Checker 2: UX review (both doors, mobile, accessibility)
  │   ├── Checker 3: Integration test (full flow: signup → scan → results → payment)
  │   ├── Checker 4: Code quality (TypeScript strict, linting, no secrets in code)
  │   ├── Checker 5: Performance (Lighthouse, bundle size, scan queue speed)
  │
  ├── UPPER-CHECK LAYER (3 actors, fresh sessions — run AFTER check layer)
  │   ├── Judge: Cross-check all 5 checker reports, find contradictions, verify fixes
  │   ├── Devil's Advocate: Try to break the platform (as attacker, as edge-case user)
  │   ├── Business Reviewer: Does the UX actually convert? Is pricing clear? Would YOU pay?
  │
  └── CEO Claude: Final gate before merge to main
```

---

## 8. Non-Platform Actors (Also for Sprint)

These run in parallel with the platform build, on separate tracks:

### Actor A: Marketing (Facebook/LinkedIn/Instagram Ads)
- Create ad copy for Italian market
- Design ad creatives (can reference Ultraviolet Volt brand)
- Targeting strategy for cybersecurity-aware businesses in Italy/Switzerland
- Budget recommendations
- A/B test variants

### Actor B: XanthroxAI/MahexStrike Research
- Deep research on both tools (capabilities, architecture, pricing, users)
- Reverse engineering: what do they offer that we don't?
- Defensive positioning: how to protect clients against these tools
- Competitive analysis document
- Can we integrate detection/defense into the QSearch platform?

### Actor E: LinkedIn Ads Specialist
- Templates and blueprints for LinkedIn ad campaigns
- Influencer/affiliate outreach messages (Italian market first)
- Partnership pitch materials
- Content calendar for LinkedIn posts
- Due by weekend

---

## 9. Success Criteria

### MVP Launch (v1)
- [ ] B2B: company email → scan → teaser → payment works end-to-end
- [ ] B2C: signup → choose plan → scan → see results works end-to-end
- [ ] Credit system: deduction, balance tracking, upgrade prompts
- [ ] Payment: Stripe checkout processes real money
- [ ] Scanner: at least passive scans run on Fly.io
- [ ] Teaser: "broken free" UX shows blurred results with upgrade CTA
- [ ] Legal: ToS, attestation, geo-detection operational
- [ ] Mobile: responsive, works on phone

### v2+ (designed for, built later)
- [ ] Active scanning (with domain verification)
- [ ] R3 full business context (industry breaches, legal frameworks, competitor intel)
- [ ] API access for Max tier
- [ ] Community features
- [ ] PDF export
- [ ] Scan comparison over time
- [ ] Credit rollover
- [ ] SSO / Google login

---

## 10. Open Questions for CTO Review

1. Should we use Next.js App Router or Pages Router? (App Router is newer, some edge cases)
2. Fly.io Machines vs. Fly.io Apps for the scanner? (Machines = more control, Apps = simpler)
3. Supabase Edge Functions vs. Vercel API routes for webhooks? (latency vs. simplicity)
4. How to handle scan timeout? (What if a scan runs >10 minutes?)
5. Rate limiting strategy for free tier abuse?
6. How to seed the R3 industry breach database? (Manual? Automated crawling? API?)
7. Domain verification: DNS TXT vs. file upload vs. both?
8. Scanner Docker image size — nuclei + ffuf + subfinder + testssl = potentially large image
9. Supabase free tier limits vs. Pro ($25/mo) — when to upgrade?
10. CI/CD: GitHub Actions → Vercel (auto) + Fly.io (manual trigger or auto)?

---

## 11. CTO REVIEW OUTCOMES (2026-04-10)

**CTO Review:** `2026-04-10-cto-design-review.md` — APPROVED WITH CONDITIONS

### Accepted CTO Conditions

1. **Scope cut for v1:** R3 Layer 3 (business context), geo-compliance, active scanning, attack chains, PDF export, API access, credit rollover, community — ALL moved to v2
2. **Scan flow simplified:** 6 hops → 4 hops. Remove Supabase webhook. Vercel API calls Fly.io directly.
3. **Supabase Pro ($25/mo) from day 1.** Free tier pauses DB after inactivity = unacceptable.
4. **Rate limiting day 1:** 3 scans/day free, CAPTCHA on B2B, 60 req/min/IP, max 2 concurrent scans/user
5. **Error recovery:** Credit refund on scan failure, 1 auto-retry, partial result saving, Stripe webhook idempotency
6. **DNS TXT only** for domain verification in v1
7. **Multi-stage Docker build** to keep scanner image under 500MB
8. **Supabase Edge Functions avoided** — all logic in Vercel API routes for single runtime consistency
9. **App Router confirmed** for Next.js

### CEO Pushbacks (Additions to CTO Review)

1. **Simple admin page kept in v1:** `/admin` behind hardcoded email check. Shows: total users, scans, revenue, recent failures. 30 min of work.
2. **Scan history kept in v1:** Not cut. Essential for subscription retention. Simple list query.
3. **Server-side result filtering:** "Broken free" blurring MUST be server-side (never send locked findings to client). CSS blur = security embarrassment.
4. **Email on scan complete:** "Your scan found 3 Critical issues. View results →" via Resend or Supabase.
5. **Onboarding UX:** Empty dashboard shows "Start your first scan" guided prompt. Not a blank page.

### v1 SCOPE — LOCKED

**IN v1:**
- B2B: company email → passive scan → teaser → Stripe one-time payment
- B2C: signup → Free/Plus/Pro/Max → credits → passive scans → blurred results → upgrade
- Credit system (deduction + balance, no rollover)
- CVSS + simple bonus scoring (R2 lite, no R3 business context)
- Landing page + pricing page (Ultraviolet Volt)
- Stripe subscriptions + one-time + credit packs + webhooks
- Rate limiting + CAPTCHA + error recovery + credit refund on failure
- "Broken free" server-side result filtering
- Scan history
- Simple admin metrics page
- Email notification on scan complete
- Onboarding UX ("Start your first scan")
- Fly.io on-demand passive scanner (Docker, multi-stage build)
- DNS TXT domain verification (for future active scans)
- Supabase Pro, Vercel, GitHub Actions CI/CD

**CUT TO v2:**
- Active scanning
- R3 business context (industry breaches, legal frameworks, competitor intel)
- Attack chain detection
- PDF export
- Geo-detection / jurisdiction-specific compliance
- API access for Max tier
- Credit rollover
- Community features
- SSO / social login / magic links
- Scan comparison over time
- File upload domain verification

### Simplified Scan Flow (v1)

```
User clicks "Scan" → Vercel API route:
  1. Validates auth + credits + rate limits
  2. Writes scan job to Supabase (status: 'queued')
  3. Calls Fly.io API → starts Machine with scan params
  4. Returns scan ID to frontend

Fly.io Machine:
  1. Reads job from Supabase
  2. Runs passive scan tools
  3. Calculates CVSS + bonus score → assigns risk tier
  4. Writes findings to Supabase (realtime → dashboard updates live)
  5. Sends scan-complete event
  6. Stops itself

Vercel (on scan-complete):
  1. Sends email notification to user
  2. If B2B: generates teaser with tier-based pricing
```

---

**STATUS: DESIGN LOCKED — READY FOR BUILD SPRINT**
