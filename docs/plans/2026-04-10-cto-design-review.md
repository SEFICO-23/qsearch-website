# CTO Design Review -- QSearch Platform

**Date:** 2026-04-10
**Author:** CTO, QuantumSearch Security Research
**Reviewing:** `2026-04-10-qsearch-platform-design.md` (CEO + Claude, CEO Session VII)
**Status:** REVIEWED -- APPROVED WITH CONDITIONS

---

## TL;DR (30 seconds)

The vision is right. Two doors, fear-based pricing, credit system -- all smart. The tech stack (Next.js + Supabase + Fly.io) is solid and well-chosen. **BUT: the design is overscoped for a day-one sprint.** The R3 scoring engine, geo-compliance system, and attack chain detection are each month-long projects on their own. My recommendation: ship a leaner v1 that proves the business model (scan -> teaser -> pay), then layer complexity. I've also identified a critical reliability risk in the scan flow chain and several security gaps that need closing before launch.

---

## Architecture Verdict

**Stack choice: APPROVED**

Why in plain language: Next.js + Supabase + Fly.io is the right call for this project. Here's why each piece earns its spot, and why the alternatives don't win:

### Next.js (Frontend + API) -- APPROVED

| Alternative | Why It Loses |
|-------------|-------------|
| **Astro** | Great for static sites (like qsearch.ch marketing pages), but we need dynamic dashboards with real-time updates, auth flows, and API routes. Astro can do this with islands, but it's fighting the framework. Next.js was built for this. |
| **Remix** | Solid framework, but smaller ecosystem. We need Stripe libraries, Supabase client libraries, Fly.io SDK -- all have first-class Next.js examples. Remix would mean more custom wiring. |
| **SvelteKit** | Technically excellent, but the actor army we're deploying (10 Claude sessions) will all know React/Next.js patterns deeply. SvelteKit would slow every actor down. |
| **Plain React + Vite** | No SSR, no API routes, no middleware. We'd have to bolt on everything Next.js gives us for free. |

**Verdict:** Next.js App Router is the pragmatic choice. It's not the most elegant framework, but it's the one where 10 actors can be productive on day one.

### Supabase (Database + Auth + Realtime) -- APPROVED

| Alternative | Why It Loses |
|-------------|-------------|
| **Firebase** | NoSQL (Firestore) is wrong for relational data like scans/findings/credits. We need JOINs, transactions, and row-level security. Firebase Auth is good but the database isn't. |
| **Neon** | Excellent serverless Postgres, but it's JUST a database. No auth, no realtime subscriptions, no row-level security policies, no webhooks. We'd need to bolt on Auth0 + Pusher + custom middleware. That's 3 services instead of 1. |
| **PlanetScale** | MySQL, not Postgres. No RLS. No realtime. No auth. Same problem as Neon but worse. |
| **Self-hosted Postgres** | More control, more ops burden. We're a 1-person company with AI actors. Supabase handles backups, connection pooling, and auth so we don't have to. |

**Verdict:** Supabase gives us database + auth + realtime + RLS in one service. The free tier is tight (see below), but Pro at $25/mo is a no-brainer for what we get.

### Fly.io Machines (Scanner) -- APPROVED WITH CAVEAT

| Alternative | Why It Loses |
|-------------|-------------|
| **AWS Lambda** | 15-minute max timeout. Our deep scans will exceed this. Also, Lambda doesn't let us install system binaries (nuclei, subfinder, ffuf) easily -- we'd need Lambda container images, which adds complexity for no gain. |
| **Railway** | Good for always-on services, but we want on-demand (start per scan, stop when done). Railway charges for idle time. Fly.io Machines are pay-per-second with zero idle cost. |
| **Render** | Same problem as Railway -- designed for persistent services, not ephemeral compute. |
| **Modal** | Interesting for ML workloads, but overkill for running shell commands (nuclei, ffuf). Also newer and less battle-tested. |
| **Hetzner VPS** | Cheapest option, but always-on = always paying. At low volume (early days), Fly.io's pay-per-second model wins. At high volume, we can revisit. |

**Caveat:** Fly.io Machines have a cold start problem (see Risks below). The design needs a warm-up strategy.

---

## What's Good (Keep These)

### 1. Two-Door Model -- Brilliant
The B2B "fear funnel" (scan -> teaser -> dynamic pricing) and B2C credit system are genuinely clever. This is the right business architecture. The SharkSpinz lesson (gave away too much for free) is directly addressed by the tiered teaser approach.

### 2. "Broken Free" UX -- Psychologically Sound
> "3 Critical, 7 High, 12 Medium. Sample: SSL expires in 12 days. [21 findings locked -- Upgrade]"

This is exactly how Shodan, SecurityScorecard, and BuiltWith convert. Show enough to create anxiety, lock the rest behind payment. Keep this.

### 3. Credit System -- Well-Designed
The credit costs are proportional to scan complexity. The "extra credit pack" at CHF 5/10 credits is smart -- it's an impulse buy that gets people into the payment flow. One note: credit rollover only for Max tier is a good retention mechanic.

### 4. Monorepo Structure -- Clean
Turborepo + pnpm workspaces with shared types is the right call for a project this size. The separation of `apps/web` and `apps/scanner` is correct. The `packages/shared` for types prevents drift between frontend and scanner.

### 5. Actor Hierarchy -- Smart Build Process
BUILD -> CHECK -> UPPER-CHECK -> CEO gate is a good quality pipeline. It mirrors our Judge+Nerdy model from the bounty pipeline. The Devil's Advocate checker is especially important for a security platform.

### 6. Luca Romito Rules Enforced in Code
The teaser showing impact but never specifics -- this is learned wisdom baked into the product. Good.

---

## What's Risky (Watch Out)

### RISK 1: The Scan Flow Chain Has Too Many Hops (CRITICAL)

The current flow:
```
User -> Vercel API -> Supabase INSERT -> Supabase Webhook -> Vercel API -> Fly.io API -> Fly.io Machine -> Supabase
```

That's **6 hops** from user action to scan starting. Each hop is a failure point:
- Supabase webhooks are not guaranteed delivery (they're fire-and-forget, no retry by default)
- Vercel serverless functions have cold starts (500ms-2s)
- Fly.io Machine creation takes 2-5 seconds
- If any hop fails silently, the user stares at "queued" forever

**What I'd change:** Remove the Supabase webhook hop. Instead:

```
User -> Vercel API -> writes to Supabase + calls Fly.io API directly -> Fly.io Machine -> Supabase
```

This is 4 hops instead of 6. The Vercel API route does both the database write AND the Fly.io machine start in one request. Simpler, faster, fewer failure points. If the Fly.io call fails, we can retry immediately or mark the job as "failed" right there.

For v2, if we need to decouple (e.g., queue for rate limiting), we can add a proper queue (Supabase pg_cron or a lightweight queue table with polling).

### RISK 2: Fly.io Machine Cold Starts

Fly.io Machines that are stopped need to be created/started per scan. This takes 2-5 seconds for a fresh machine, sometimes longer if the Docker image is large (see Risk 5). The user clicks "Scan" and waits... and waits...

**Mitigation options:**
1. **Pre-warm 1-2 machines** in Amsterdam/Frankfurt during business hours (costs ~$0.01/hour each)
2. **Immediate UX feedback:** Show "Initializing scanner..." with a progress animation so the user doesn't think it's broken
3. **Machine pooling:** Keep 1 machine always-on as a "hot spare" for the first scan, spin up additional machines for concurrency

I'd go with option 2 for v1 (cheapest, simplest) and option 1 for v2 when we have paying customers.

### RISK 3: R3 Scoring Engine is a Project In Itself

The R3 scoring engine has three layers (CVSS math, exploitability bonus, business context) plus an industry breach database, legal framework database, and competitor incident tracking. This alone could take weeks to build properly.

**The danger:** If we try to build R3 in v1, it'll be half-baked. A mediocre risk score is worse than a simple one, because it looks authoritative but isn't.

**What I'd change for v1:**
- Layer 1 (CVSS math): YES -- this is straightforward math
- Layer 2 (Exploitability bonus): PARTIAL -- exposed creds and missing headers are easy detections. Attack chain detection is hard. Cut chains from v1.
- Layer 3 (Business context): NO for v1. This requires curated databases that don't exist yet. Ship without it, add in v2.

The v1 score should be: "Sum of CVSS + simple bonus modifiers, normalized to 0-100." That's honest and useful.

### RISK 4: Company Email Validation is Gameable

The B2B track requires a "company email" matching the scan target domain. But:
- Many small businesses use gmail/outlook
- Attackers could register `targetcompany.com` email on any free provider with custom domains
- What about companies using Google Workspace (looks like gmail but isn't)?

**Better approach for v1:** Email domain matching is a HINT, not a gate. Use it for convenience (auto-fill domain from email), but always require explicit domain authorization:
1. Send verification email to the company email address (proves ownership of the mailbox)
2. For the actual scan authorization, require DNS TXT or meta tag (proves control of the domain)
3. For the FREE T0 teaser: run it without domain verification (passive only, public data), but require email verification to VIEW results

This balances ease-of-use with security.

### RISK 5: Docker Image Size

The scanner needs: nuclei (~150MB), subfinder (~30MB), ffuf (~20MB), testssl (~5MB), Python + dependencies (~200MB). Plus the base OS image. We're looking at **500MB-1GB+** Docker image.

This affects:
- Fly.io cold start time (image pull)
- CI/CD build time
- Registry storage costs

**Mitigations:**
1. Multi-stage Docker build (build tools in one stage, copy only binaries to slim final stage)
2. Use Alpine or distroless base image
3. Pre-pull the image to Fly.io regions (Amsterdam + Frankfurt) so it's cached
4. Consider splitting: quick/passive scans use a lighter image (no nuclei/ffuf), active/deep scans use the full image

---

## What I'd Change

### Change 1: Cut Scope for v1 (STRONGLY RECOMMENDED)

**Keep in v1:**
- B2B track: email -> passive scan -> teaser -> Stripe one-time payment
- B2C track: signup -> Free/Plus plans -> passive scans -> blurred results -> upgrade
- Credit system (simplified: deduction + balance only, no rollover)
- Quick and passive scan runners
- Simple CVSS-based scoring (no R3 business context)
- Landing page + pricing page
- Stripe subscriptions + one-time payments

**Cut from v1 (build in v2):**
- Active scanning (requires domain verification infrastructure + more complex scanner)
- R3 Layer 3 (business context, industry breaches, legal frameworks)
- Attack chain detection
- PDF export
- Scan comparison over time
- API access
- Geo-detection + jurisdiction logic (use a simple "Switzerland/EU only" flag for v1)
- Credit rollover
- Community features

Why: A working B2B funnel (scan -> teaser -> pay) that processes real money is worth infinitely more than a feature-complete platform that's 80% done. Ship the funnel, iterate.

### Change 2: Simplify Auth for v1

The design has: email/password + magic links + company email detection + geo-compliance + legal attestation. That's 5 auth-adjacent systems.

**v1 auth should be:**
1. Email + password signup (Supabase Auth handles this out of the box)
2. Email verification (Supabase Auth handles this too)
3. That's it

Magic links, social login, SSO -- all v2. Company email detection can be a simple regex check (not gmail/hotmail/yahoo = "company"), not a full classification system.

### Change 3: Start on Supabase Pro Immediately

Don't even consider the free tier. At $25/month, Supabase Pro gives:
- 8GB database (free = 500MB)
- 250GB bandwidth (free = 5GB)
- 100K monthly active users (free = 50K)
- Daily backups
- No pause after 1 week of inactivity (free tier pauses your DB!)

That last point is critical. On the free tier, if no one visits for a week, the database goes to sleep and the next user waits 30+ seconds for it to wake up. For a SECURITY platform, that's unacceptable.

### Change 4: Add an Error Recovery Strategy

The design doesn't mention what happens when things fail:
- Scan fails mid-way: Does the user lose credits? (They shouldn't)
- Fly.io machine crashes: Is the scan retried? How many times?
- Stripe webhook fails: Does the user get their credits? (They must)
- Database is briefly unavailable: Does the scanner lose all progress?

**v1 needs at minimum:**
- Credit refund on scan failure (automatic)
- Scan retry (1 automatic retry, then mark as failed with explanation)
- Stripe webhook idempotency (don't double-credit)
- Scanner writes progress checkpoints to Supabase (if machine dies, partial results are saved)

### Change 5: Add Rate Limiting from Day 1

Not v2. Day 1. A security platform without rate limiting is an irony. At minimum:
- Free tier: 3 scans per day (not just 3 credits/month -- a bot could burn all credits in 3 seconds)
- API routes: 60 requests/minute per IP
- B2B track: 1 free teaser per domain per 30 days (prevents fishing for results)
- Scan queue: max 2 concurrent scans per user

Vercel has built-in rate limiting on Edge middleware. Use it.

---

## Open Questions Answered

### 1. App Router or Pages Router?

**App Router.** It's been stable since Next.js 14 (we're on 14+). The benefits are real:
- Server Components reduce client JavaScript (faster dashboards)
- Nested layouts mean the dashboard shell doesn't re-render when navigating between tabs
- Route groups `(auth)`, `(b2b)`, `(dashboard)` cleanly separate concerns

The "edge cases" the design mentions are mostly around data fetching patterns, which are well-documented now. App Router also aligns with the monorepo route group structure already in the design.

### 2. Fly.io Machines vs. Apps?

**Machines.** Absolutely. Here's the difference in plain language:

- **Apps** = always-running servers. You pay even when nothing is scanning. Good for web servers.
- **Machines** = on-demand containers. Start when needed, stop when done. Pay per second of use.

For a scanner that runs 2-15 minutes per scan, then should cost zero, Machines is the only sane choice. We get full control over lifecycle: start with scan params, poll for completion, stop and destroy.

### 3. Supabase Edge Functions vs. Vercel API Routes for webhooks?

**Vercel API routes.** Reasons:
- All our business logic is already in the Next.js app (auth checks, credit validation, Fly.io calls)
- Supabase Edge Functions are Deno-based -- a different runtime than our Next.js (Node.js). That means maintaining two sets of dependencies and two deployment pipelines
- Stripe's official Next.js integration is designed for API routes
- Supabase Edge Functions have a 150-second timeout; Vercel serverless functions have 300 seconds on Pro

The only case for Supabase Edge Functions: if we need to run code INSIDE Supabase in response to database triggers (e.g., auto-calculate credit balance after transaction insert). That's useful but can be done with Postgres functions + triggers instead.

### 4. Scan timeout handling?

**Tiered timeouts based on scan type:**

| Scan Type | Timeout | Why |
|-----------|---------|-----|
| Quick | 2 minutes | Headers/SSL/DNS is fast |
| Passive | 5 minutes | OSINT + subdomain enum needs time |
| Active Light | 10 minutes | Top nuclei templates |
| Active Deep | 20 minutes | Full nuclei + ffuf + testssl |
| T0 Full | 30 minutes | Everything, orchestrated |

**On timeout:**
1. Fly.io Machine sends "timeout" status to Supabase with partial results
2. User sees: "Scan partially completed (X of Y checks). [Y findings found so far]"
3. Credits are charged proportionally (if 60% of checks completed, charge 60% of credits, refund 40%)
4. No automatic retry on timeout (it'll just timeout again). Instead, show user: "This domain has a large attack surface. Consider upgrading to Deep scan for more thorough coverage."

### 5. Rate limiting for free tier?

Already answered above in "Change 5." Summary:
- 3 scans/day hard limit (not just 3 credits/month)
- 1 free B2B teaser per domain per 30 days
- 60 req/min per IP on all API routes
- CAPTCHA on the B2B scan form (prevents automated abuse)
- Max 2 concurrent scans per user (even paid tiers)

### 6. How to seed the R3 industry breach database?

**For v1: DON'T.** Cut R3 Layer 3 from v1 (see Change 1 above).

**For v2, the seeding strategy:**
1. **Manual curation first:** Build a JSON/CSV of the top 50 industry breaches (by sector: finance, healthcare, gambling, e-commerce, crypto). This takes 2-3 hours of research.
2. **Legal frameworks:** Swiss FADP, GDPR, PCI-DSS, Italian gambling law -- these are static documents. One-time manual entry, rarely changes.
3. **Automated enrichment (v3+):** NVD API for CVE data, Have I Been Pwned API for breach counts, regulatory feeds for enforcement actions. But this is infrastructure -- don't build it before you have paying customers.

### 7. Domain verification: DNS TXT vs. file upload vs. both?

**Both, but DNS TXT first.** Here's why:

- **DNS TXT** (`_qsearch-verify.example.com TXT "qsearch=abc123"`) -- works for any domain, even if the website is behind a CDN or WAF that blocks file uploads. This is how Google Search Console and most SaaS platforms verify domains.
- **File upload** (`example.com/.well-known/qsearch-verify.txt`) -- easier for non-technical users who have FTP access but don't know DNS.

**v1:** DNS TXT only. It's more secure (proves DNS control, not just webserver access) and simpler to implement (one API call to check vs. HTTP request that might follow redirects, return cached pages, etc.).

**v2:** Add file upload as alternative.

### 8. Scanner Docker image size?

See Risk 5 above. Target: under 500MB with multi-stage build. Detailed approach:

```dockerfile
# Stage 1: Build -- install tools
FROM golang:1.22-alpine AS builder
RUN go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
RUN go install github.com/projectdiscovery/nuclei/v3/cmd/nuclei@latest
RUN go install github.com/ffuf/ffuf/v2@latest

# Stage 2: Runtime -- slim image with just binaries + Python
FROM python:3.12-slim
COPY --from=builder /go/bin/subfinder /usr/local/bin/
COPY --from=builder /go/bin/nuclei /usr/local/bin/
COPY --from=builder /go/bin/ffuf /usr/local/bin/
RUN apt-get update && apt-get install -y --no-install-recommends testssl.sh && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app
```

This should get us to ~350-450MB. Pre-pull to AMS + FRA regions after every deploy.

### 9. Supabase free vs. Pro?

**Start on Pro ($25/month). Today. No debate.** (See Change 3 above for full reasoning.)

The free tier will actively sabotage the platform:
- DB pauses after 1 week of inactivity
- 500MB storage (one busy day of scans could fill this)
- 5GB bandwidth (a few concurrent users streaming realtime scan updates hits this fast)
- No daily backups (we're a SECURITY company -- no backups is embarrassing)

$25/month is less than one credit pack sale. This is not where we optimize costs.

### 10. CI/CD: GitHub Actions deployment strategy?

**Vercel: automatic on push to `main`. Fly.io: automatic on push to `main` if scanner files changed.**

```yaml
# .github/workflows/deploy-scanner.yml
on:
  push:
    branches: [main]
    paths:
      - 'apps/scanner/**'
      - '.github/workflows/deploy-scanner.yml'

# deploy-web.yml is unnecessary -- Vercel's GitHub integration handles this automatically
```

**Preview deployments:**
- Vercel creates preview URLs automatically for every PR (free)
- Fly.io scanner: no preview deploys needed (it's a backend container, not a website)

**Staging environment:**
- Not for v1. We deploy to production with feature flags if needed.
- For v2: separate Supabase project + Fly.io app for staging.

---

## Sprint Feasibility

### Can we build v1 in a day with 10 actors? PARTIAL

**With the FULL design as written:** No. R3, geo-compliance, active scanning, and attack chain detection each need multiple days. Trying to build everything in a day produces half-finished features everywhere.

**With the SCOPED-DOWN v1 I'm recommending:** Yes, it's achievable. Here's the revised actor plan:

### Revised Actor Assignments (Scoped v1)

| Actor | Task | Depends On | Time Estimate |
|-------|------|-----------|--------------|
| **1** | Monorepo scaffold: Turborepo + pnpm + Next.js App Router + TypeScript strict + ESLint + Prettier | Nothing | 1 hour |
| **2** | Supabase schema + migrations + RLS policies (scoped-down tables, no R3 context tables) | Nothing | 1.5 hours |
| **3** | Auth flows: signup, login, email verify. Company email detection (simple regex). Supabase Auth integration | Actor 1 (scaffold) |  2 hours |
| **4** | B2B track: scan page -> email verify -> passive scan trigger -> teaser dashboard -> Stripe one-time checkout | Actors 1, 2, 3 | 3 hours |
| **5** | B2C dashboard: scan history, results view, credit balance, domain list, settings/billing page | Actors 1, 2, 3 | 3 hours |
| **6** | Scanner engine: Dockerfile, main.py, quick.py, passive.py. Fly.io config. Supabase read/write. | Actor 2 (schema) | 3 hours |
| **7** | Scoring engine: CVSS calculation + simple bonus modifiers. Risk tier assignment. Teaser generation logic. | Actor 2 (schema) | 2 hours |
| **8** | Stripe integration: subscription plans (Free/Plus/Pro/Max), one-time B2B payments, credit pack purchases, webhooks, credit ledger | Actors 1, 2 | 2.5 hours |
| **9** | Landing page + pricing page: Ultraviolet Volt design, responsive, theme toggle, CTA buttons | Actor 1 (scaffold) | 2 hours |
| **10** | Rate limiting + error handling: Vercel Edge middleware, scan failure recovery, credit refund logic, retry logic | Actors 1, 2 | 2 hours |

### Critical Path

```
Actor 1 (scaffold) -----> Actor 3 (auth) -----> Actor 4 (B2B) -----> Integration test
         \                     \
          \---> Actor 2 --------+--> Actor 5 (dashboard)
           \       \            \--> Actor 8 (Stripe)
            \       \---> Actor 6 (scanner)
             \       \---> Actor 7 (scoring)
              \---> Actor 9 (landing)
               \--> Actor 10 (rate limiting)
```

**Actors 1 and 2 are the bottleneck.** Everything depends on the scaffold and schema. These must finish first. I recommend starting them 30 minutes before other actors, or having Actor 1 push a minimal scaffold (just the Next.js app with Tailwind + Supabase client configured) within 20 minutes so others can start.

### What to Cut If Time Runs Out (Triage Order)

Cut LAST (most critical):
1. B2B scan -> teaser -> pay flow (this IS the product)
2. Passive scan runner (without this, nothing works)
3. Stripe payment processing (without this, no revenue)

Cut FIRST (least critical for v1):
1. Settings/billing page (users can manage billing via Stripe portal)
2. Pricing page (can use landing page with pricing section)
3. Scan history (nice-to-have, users mostly care about latest scan)
4. Domain management page (single domain per scan for v1, no persistent list)

---

## Security Audit of the Design

We're building a SECURITY platform. If we ship with security holes, we're done. Reputation = everything.

### Auth Security

**Current design:** Supabase Auth (email/password + magic links).
**Verdict:** Supabase Auth is solid. It handles bcrypt hashing, JWT tokens, refresh rotation, email verification, and rate limiting on auth endpoints out of the box.

**Gaps to close:**
- Force email verification before ANY scan (even free tier). An unverified email = we can't contact the user, and it enables throwaway abuse.
- Session timeout: Set JWT expiry to 1 hour, refresh token to 7 days. Supabase defaults are fine for this.
- No admin panel in v1. All admin actions via Supabase dashboard directly. A custom admin panel is an attack surface we don't need yet.

### Data Isolation (Multi-tenancy)

**Current design:** Row-Level Security (RLS) in Supabase.
**Verdict:** RLS is the right approach for multi-tenant Postgres. But it's easy to get wrong.

**Requirements:**
- Every table that stores user data MUST have an RLS policy
- The policy must check `auth.uid() = user_id` (not just `user_id IS NOT NULL`)
- Scan results are scoped to `scan_jobs.user_id`, and `findings` are scoped through `scan_id` -> `scan_jobs.user_id`. This JOIN-based RLS is tricky -- use a Postgres function to verify ownership
- B2B teaser access: Use signed URLs with expiry (Supabase Storage has this), NOT public rows
- **TEST THIS:** The security checker (Checker 1) must attempt cross-user data access and verify it fails

### Payment Security

**Stripe-specific risks:**

1. **Credit manipulation:** A user could try to modify credit amounts in flight. All credit operations MUST happen server-side (Vercel API routes), NEVER trust client-side credit counts. The `credit_balances` table should be updated via Postgres functions, not direct client writes.

2. **Stripe webhook verification:** ALWAYS verify the webhook signature (`stripe-signature` header). Without this, anyone can POST fake "payment succeeded" events to your webhook endpoint and get free credits.

3. **Idempotency:** Stripe can send the same webhook event multiple times. Use the event ID as an idempotency key -- if you've already processed event `evt_xxx`, skip it. Otherwise, users get double credits.

4. **Price manipulation:** The client sends a scan request, the server determines the price. Never let the client specify the price. Stripe Checkout Sessions should be created server-side with server-determined amounts.

5. **Subscription downgrade abuse:** User on Max tier starts 5 concurrent scans, then immediately downgrades to Free. Credits already deducted? Scans already running? Define the rules: "Active scans complete at the tier they were started. Downgrade takes effect at next billing cycle." Stripe handles this natively if configured correctly.

### Scan Abuse Prevention

**Threats:**
1. **Weaponization:** Someone uses our scanner to enumerate targets they don't own
2. **Resource exhaustion:** Bots burn our Fly.io budget with thousands of free scans
3. **Result harvesting:** Competitor scrapes our free-tier results to build their own database

**Mitigations:**
1. **Passive scans only for unverified domains** (passive recon uses public data -- lower liability). Active scans require DNS TXT verification (proves domain control).
2. **Rate limiting** (see Change 5): 3 scans/day free, CAPTCHA on B2B form, IP-based throttling.
3. **Watermark results:** Each scan result includes a unique token tied to the user. If we see our findings scraped elsewhere, we know who leaked.
4. **Logging:** Every scan request logged with IP, user agent, timestamp, email. If abuse is detected, we have an audit trail.
5. **Domain blocklist:** Maintain a list of domains we refuse to scan (government, military, critical infrastructure we don't have authorization for). Start with a basic list, expand as needed.

### API Security

- All API routes must validate auth token (Supabase `getUser()`)
- All input must be sanitized (domain names, email addresses, scan parameters)
- No SQL injection possible if using Supabase client (it uses parameterized queries), but raw SQL in Postgres functions must use `$1` placeholders
- CORS: Lock to `qsearch.ch` and localhost (dev). No wildcard.
- API keys for Max tier (v2): Use Supabase's built-in API key management or generate UUIDs stored hashed in the database. Never store API keys in plaintext.

---

## Final Notes

### Things Not in the Design That Should Be

1. **Error pages:** 404, 500, rate-limited, scan-failed. These are the pages users see when things go wrong. They should be on-brand (Ultraviolet Volt), not default Next.js errors.
2. **Email templates:** Verification email, scan complete notification, payment receipt, teaser ready. Supabase Auth has customizable templates. Use them. Brand them.
3. **Legal pages:** Terms of Service, Privacy Policy, Acceptable Use Policy. These are not optional for a scanning platform. A lawyer should review, but we can draft v1 versions.
4. **Monitoring:** How do we know if scans are failing? If Fly.io machines are crashing? If Stripe webhooks are being missed? For v1: Vercel analytics (free) + Supabase dashboard + Fly.io logs. For v2: proper alerting.
5. **Backup and recovery:** Supabase Pro includes daily backups. But what about the scan results stored in Fly.io? They should be written to Supabase before the machine stops (the design does this, good). What if the write fails? The scanner should retry 3 times with exponential backoff before giving up.

### The One Thing That Keeps Me Up at Night

The biggest risk isn't technical. It's that we build a beautiful platform and nobody comes. The platform is the TOOL, not the PRODUCT. The product is "peace of mind that your business isn't about to be breached." The marketing actors (A, B, E) are just as important as the build actors. Don't let the build sprint consume all energy and leave marketing for "later."

### My Recommendation

1. Ship the scoped-down v1 I described above
2. Get the B2B funnel live: company email -> passive scan -> teaser -> Stripe checkout
3. Run marketing in parallel (Actors A and E)
4. First paying customer = validation. Then expand.

---

**Signed:** CTO, QuantumSearch Security Research
**Date:** 2026-04-10
**Verdict:** APPROVED WITH CONDITIONS (scope reduction required for feasible sprint)
