# QSearch Platform Launch Strategy — Design Document

**Date:** 2026-04-14
**Author:** CEO (Claude Code)
**Approved by:** Alex Sebastiani (Founder)
**Status:** DESIGN APPROVED — Ready for implementation
**Approach:** B (Full Conversion Machine) with copy/framing enhancements from C

---

## Context

CTO sprint is complete (21 commits, Next.js 15 + React 19 + Server Components platform live on main branch). Deployment handled by Alex. This design covers the **strategic decisions** that affect conversion, legal safety, and the launch narrative.

**Dual-track platform:**
- **B2B:** Cybersecurity firms as partners + companies wanting continuous security checks + companies wanting "Scan My Business/Infrastructure"
- **B2C:** People running scans (our data) + scanning their vibe-coding platforms + scanning their ideas/prototypes

**Prior lessons driving design:**
- Luca Romito rules: no vulnerability details before commitment
- SharkSpinz lesson: showing too much in teaser kills conversion
- Door Rule: demonstrated exploitation, never observation alone
- 17 submissions, $50 revenue: we over-promised technical details and under-delivered impact framing

---

## Section 1: B2B Scan Flow + Domain Enforcement

### Flow
```
VISITOR → qsearch.ch
  ├─ B2C: "Start Free" → signup → dashboard → credit-based scans
  └─ B2B: "Scan My Business" → SCAN FORM (GTC checkbox + Turnstile CAPTCHA)
       → DOMAIN MATCH CHECK (server-side)
           ├─ MATCH/PARTIAL: @company.com → company.com or subsidiary.company.com
           │   → Instant free passive scan → Teaser v2 by email
           └─ MISMATCH: @gmail.com → company.com OR @company-a.com → company-b.com
               → CROSS-DOMAIN GATE
               → Stripe authorization hold CHF 790 (Moderate price)
               → PENDING REVIEW queue (24h SLA)
               → Outcomes: APPROVED (release) | REJECTED (release) | FRAUD (capture per GTC)
               → User may skip review by uploading proof of authorization
```

### Domain Match Logic
- MATCH if email_domain == scan_domain
- MATCH if email_domain ends with "." + scan_domain (subsidiary)
- MATCH if scan_domain ends with "." + email_domain (parent)
- MISMATCH if email is free provider (gmail, hotmail, etc.) or zero relationship

### Key Parameter
- **Hold amount: CHF 790** (B2B Moderate tier price)
- Stripe authorization hold (not capture) — money frozen on card, never transferred unless fraud confirmed

---

## Section 2: Teaser v2 Design

### Principles
- **Show fear, not scope:** Regulatory fines, reputational exposure, business continuity threats — NOT severity counts
- **Luca Romito rules:** Zero technical specifics. Impact only.
- **Urgency:** 7-day expiration on teaser
- **Upsell path adapts to findings** (see Upsell Logic below)
- **Track separation:** B2B teaser NEVER shows B2C subscriptions and vice versa

### Teaser Contents (FREE)
- Risk level (overall score with visual indicator)
- Regulatory exposure (GDPR, nDSG, NIS2 framings with fine ranges)
- Reputational risk (count of exposed services, missing headers — counts only, no specifics)
- Business continuity threats (config weaknesses, attack surface breadth)
- Financial exposure (industry-benchmark cost estimate)
- 7-day expiration notice
- Adaptive upsell CTA

### What the Teaser NEVER Shows
- Specific vulnerability names or types
- Affected URLs, endpoints, IPs
- Severity counts (Critical/High/Medium/Low)
- CVE numbers or reproduction steps
- Any information that lets them fix it themselves

### Upsell Logic (adaptive)
| Scenario | Suggested Tier |
|---|---|
| LOW severity only | Low (CHF 490) |
| HIGH/CRITICAL found | Expert (CHF 3,800) with Moderate (CHF 790) as alternative |
| Massive attack surface | Full Audit (CHF 5,900) |
| B2B teaser | NEVER show subscriptions |
| B2C dashboard | NEVER show B2B one-time reports |

### Tier Deliverables
| Tier | Price | Contents |
|---|---|---|
| Teaser | Free | Impact framings + risk level |
| Low | CHF 490 | + vulnerability list with severity + affected endpoints + basic remediation |
| Moderate | CHF 790 | + detailed PoCs + CVSS + regulatory mapping per finding |
| Expert | CHF 3,800 | + 30-min consultation + prioritized remediation roadmap + 30-day re-scan |
| Full Audit | CHF 5,900 | + executive summary + board-grade PDF + 3 re-scans over 90 days + dedicated contact |

### Free Tier Abuse Prevention (LAUNCH scope — all in before go-live)
| Layer | What | How |
|---|---|---|
| 1 | Domain rate limit | 1 free scan per target per 30 days (DB-enforced) |
| 2 | IP rate limit | 2 free account creations per IP per 24h (Upstash Redis) |
| 3 | Turnstile CAPTCHA | Already built in sprint |
| 4 | Disposable email block | 3,000+ domain blocklist |
| 5 | **Device fingerprint** | **Canvas + WebGL + screen + timezone + fonts + audio + hardware + platform. 2 accounts per fingerprint, 3rd blocked. Cookie + DB storage.** |

### Data Collection Strategy
- **B2B:** company domain → industry, email → role, geo, scan results, teaser engagement, conversion point, fingerprint
- **B2C:** targets scanned, scan frequency, credit pattern, plan tier, feature usage, fingerprint
- **Aggregate (our IP):** industry benchmarks, regulatory failure rates, remediation cost patterns — marketing content + industry reports
- **All disclosed in GTC + Privacy Policy, cookie consent for fingerprinting**

---

## Section 3: GTC + Legal Framework

### Three Documents
1. **GTC** — The contract (accepted via checkbox)
2. **Privacy Policy** — What data we collect, why, how long (nDSG Art. 19)
3. **Acceptable Use Policy** — What users can't do (binding annex to GTC)

### GTC Key Clauses

**Clause 1: Service Description**
- Automated passive security scanning (v1)
- Results are informational, not certified audits

**Clause 2: Authorization & Domain Ownership**
- Domain-match scans: user warrants authorization via GTC acceptance
- Cross-domain scans: user warrants written authorization; CHF 790 Stripe hold; manual review; evidence upload skips queue

**Clause 3: Scanning Limitations**
- Free tier: 3 credits/account, 1 free scan per target per 30 days
- Multiple accounts to circumvent = violation
- QuantumSearch may suspend/terminate abusive accounts

**Clause 4: Intellectual Property (REVISED)**
- **All scan results/reports/teasers = QuantumSearch IP**
- Customers receive non-exclusive, non-transferable license for internal security use
- Customers may NOT: resell, redistribute, use in legal proceedings against us, share publicly without consent, claim authorship
- QuantumSearch may use anonymized data for research/marketing/product improvement
- QuantumSearch may reference engagements (without naming customer) in capability demonstrations

**Clause 5: Payment Terms**
- B2B one-time: payment before full report delivery
- B2C subscriptions: monthly recurring
- Credit packs: non-refundable, no expiration
- CHF + Swiss VAT
- 1.5% Stripe Climate contribution

**Clause 6: Liability (REVISED)**
- We ARE liable for: gross negligence or intentional misconduct (OR Art. 100 — cannot be excluded)
- We are NOT liable for: scan accuracy, damages from acting on results, third-party claims from unauthorized scanning, service availability, data loss or unauthorized access to stored results (industry-standard security implemented but not guaranteed)
- Liability cap: amount paid in preceding 12 months (OR Art. 99-100)

**Clause 7: Penalties for Fraudulent Use**
- Definitions: false authorization claims, multi-account circumvention, competitive intelligence without target's knowledge, false identity
- Escalating consequences:
  - 1st offense: suspension + warning
  - 2nd offense: termination + credit forfeiture
  - 3rd offense: deposit capture (if hold exists) + investigation costs (CHF 250/hr) + permanent ban
- Deposit capture:
  - Only on confirmed fraud (false authorization)
  - CHF 790 (hold amount)
  - 5-business-day contest window before capture
  - Documented fraud determination (audit trail)

### Privacy Policy Key Disclosures
| Data | Legal Basis | Retention |
|---|---|---|
| Account info | Contract | Until deletion + 10y (Swiss commercial law) |
| Scan results | Contract | Until customer deletes or 2y inactive |
| Device fingerprint | Legitimate interest (fraud) | 12 months |
| IP + geo | Legitimate interest (security) | 90 days raw IP, indefinite country |
| Email engagement | Consent (opt-in) | 12 months |
| Aggregate anonymized | Legitimate interest | Indefinite |
| Payment data | Stripe PCI DSS | Never stored by us |

### Acceptable Use Policy Rules
1. Only scan domains you own or have written authorization for
2. Do not use results to harm, extort, or publicly shame
3. Do not share teaser/report contents publicly without consent
4. Do not reverse-engineer methodology or extract tooling
5. Do not resell results or build competing products from our data
6. Rate limits are service-level, not suggestions

### Cookie Banner
- Required for device fingerprinting (non-essential tracking under nDSG/GDPR)
- Opt-in required; opt-out falls back to IP-only rate limiting

### IMPORTANT
These are structured starting documents. Before going live with real money/users, a Swiss lawyer MUST review — especially deposit capture clause, liability limitation, and IP ownership.

---

## Section 4: Social Proof Engine

### Element 1: Platform Recognition Bar
**Logos:** PayPal, Fireblocks, Uber (drop Opera as rejected, Telegram as pending)

**Contextual wording:**
- Landing page hero: "Security contributions recognized by" (safest)
- B2B teaser footer + pricing page: "Trusted by security teams at" (stronger)
- NEVER: "Our clients include"

### Element 2: Live Scan Counter
- Real DB query: `SELECT COUNT(*) FROM scan_jobs WHERE status = 'completed'`
- **Counts ALL scans:** B2C credits, B2B reports, Watchdog/Hunter internal operations
- A T0→T1→T2→T3 pipeline = 4 scans counted
- Realtime update or 5-min cache
- "+X today" daily volume
- **Under 50 total scans:** replace with "Now accepting early access scans — be among the first" framing

### Element 3: Capability Statement (ENHANCED)
```
Swiss-based autonomous security platform

30+ specialized security agents
76+ vulnerability playbooks
13 attack methodology categories
Passive scanning — zero disruption

★ Continuously updated: playbooks refreshed whenever Scout surfaces new intel
★ Target-specific weapons: custom payloads engineered per engagement
★ Always current: monitoring CVE databases, conferences, security research in real-time

1.5% of every transaction funds verified carbon removal via Stripe Climate
```

### Element 4: Trust Badges + Data Narrative Retention
Badges: Swiss Made 🇨🇭 | GDPR Compliant | Stripe Climate | Passive Only | No Data Stored*

*"No Data Stored" refers to scanned target's content/data — scan metadata (findings, results, evidence) is QuantumSearch IP and retained indefinitely for our analysis and aggregate intelligence

**Data narrative database record per scan:**
- Full scan output (not just summary)
- All probe responses (headers, TLS, DNS)
- Timing, tools, playbooks applied
- Raw evidence per finding
- Stored indefinitely, queryable
- Customer-facing "No Data Stored*" covers target's data only

### Element 5: Limited Early Pricing (REINSTATED)
- SharkSpinz-comparable engagement: ~CHF 60,000 market value → our CHF 5,900 = ~10x cheaper
- Landing banner:
  ```
  ⚡ LAUNCH PRICING — These rates reflect early access.
  Industry-comparable engagements typically start at CHF 30,000+.
  Full pricing takes effect July 1, 2026.
  ```
- Real future date creates genuine deadline; after July 1, raise prices or reframe

### Element 6: Industry Benchmarking (LAUNCH scope)
- Aggregate data from Watchdog/Hunter ops already exists
- Teaser + dashboard show peer comparison from launch
- Creates immediate competitive pressure: "You're in bottom 40% of Swiss fintech security posture"

---

## Section 5: Stripe Deposit/Hold Mechanism

### Core: PaymentIntents with Manual Capture
- `capture_method: 'manual'` freezes money on card without transferring
- 7-day Stripe auto-expire (hard safety net)
- No Stripe fees on cancellation (vs. ~3% lost on charge-then-refund)
- No refund delay for customer

### Flow Summary
```
Cross-domain scan submitted
→ Stripe PaymentIntent created (manual capture, CHF 790)
→ DB: scan_holds record (status='pending_review', expires +7d)
→ Admin reviews within 24h
→ Decision:
    APPROVED: stripe.paymentIntents.cancel → release + scan runs
    REJECTED: stripe.paymentIntents.cancel → release + user notified
    FRAUD: 5-day contest window → if no valid contest: capture
→ Cron (every 6h): warn admin if hold >6 days old
```

### Database: `scan_holds` Table
Columns: id, scan_id, user_id, payment_intent_id, amount, currency, status (enum), target_domain, user_email, reason, contest_deadline, contest_evidence (jsonb), created_at, updated_at, resolved_at, resolved_by

Indexes: (status, created_at) for queue; (user_id) for fraud history

### Admin Review UI
Shows pending holds with: scan details, user details, fingerprint history, IP + geo, uploaded evidence. Actions: REVIEW EVIDENCE | APPROVE | REJECT | FRAUD.

### Notifications (via Resend)
- User: hold placed, decision email, fraud flag with contest link, hold expiring warning, final outcome
- Admin: new hold, expiring in 24h, user contested fraud, daily digest

### Key Parameters
| Parameter | Value |
|---|---|
| Hold amount | CHF 790 |
| Review SLA | 24 business hours |
| Stripe auto-expire | 7 days |
| Auto-release warning | 6 days (cron) |
| Fraud contest window | 5 business days |
| Accepted evidence | PDF uploads, pentest agreement, NDA, written consent |

---

## Section 6: POST-LAUNCH Hardening Roadmap (Trigger-Based)

### Hardening Items
| # | Item | Trigger | Owner |
|---|---|---|---|
| 1 | A/B Testing Framework | 50+ completed scans | 1 actor |
| 2 | Behavioral Fraud Detection | First confirmed fraud incident | 1 actor |
| 3 | Automated Domain Verification (DNS TXT / webmaster email) | 10+ B2B signups | 1 actor |
| 4 | Industry Benchmark Engine | 30+ scans in same industry | 1 actor |
| 5 | Teaser Engagement Tracking | First 10 teasers delivered | CTO actor |
| 6 | Stripe Webhook Hardening | First webhook failure logged | CTO actor |
| 7 | Admin Queue SLA Monitor | First pending hold logged | CTO actor |
| 8 | Active Scanning v2 (auth required) | 100+ passive scans | 3-5 actors |
| 9 | Subscription Upgrade Nudges | 20+ B2C Free users | 1 actor |
| 10 | Referral Program | First paying customer | 1 actor |

### Deliberately Deferred
- Native mobile app (B2B desktop-first)
- API access for customers (no demand yet)
- White-label/reseller (requires stable product)
- Multi-language on platform (qsearch.ch already multi-lang; platform starts EN)
- SOC 2 / ISO 27001 (6-month+ process; defer until recurring revenue)

### LAUNCH Signal Infrastructure (enables POST-LAUNCH triggers)
- Every scan logged with full metadata
- Every admin action logged with timestamp
- Every email tracked (delivery + open + click via Resend)
- Every page view (GoatCounter)
- Conversion funnel dashboard
- Automated trigger notifications (e.g., "scan_count > 50 → A/B testing ready")
- **All triggers fire from disk-persisted state** — not cron. Vercel scheduled functions used only for external deadline monitors (Stripe hold expiration warning). Local-machine cron never.

---

## Implementation Handoff

This design is ready for the writing-plans skill to produce a detailed implementation plan with specific actor briefings.

### High-Level Implementation Order
1. GTC + Privacy + AUP documents (1 actor)
2. Cookie banner + fingerprinting (1 actor)
3. Disposable email blocklist + domain rate limits + IP rate limits (1 actor)
4. Cross-domain detection + Stripe hold mechanism + scan_holds table (2 actors)
5. Admin review UI + notification flows (1 actor)
6. Teaser v2 redesign with adaptive upsell (1 CDO actor + 1 backend actor)
7. Social proof components (recognition bar, counter, capability, badges, pricing banner, benchmark widget) (1 CDO actor)
8. Signal infrastructure (scan logging, admin action logging, email tracking dashboard) (1 actor)
9. Post-launch trigger notifications (CTO actor, triggered by disk-state thresholds)

### Critical Dependencies
- Swiss lawyer review of GTC Clause 6 (liability) + Clause 7 (penalties) + Clause 4 (IP) BEFORE going live with paying customers
- Cookie consent must be implemented BEFORE fingerprinting activates
- Stripe account must have manual capture permissions enabled (usually default, verify)

### Out of Scope for This Plan
- Deployment (Alex handles solo)
- Marketing launch (separate CCO plan)
- SmartEgo outreach (separate CCO workflow)
- Blockchain.com hunt (separate parallel track)

---

## Changelog
| Version | Date | Notes |
|---------|------|-------|
| v1.0 | 2026-04-14 | Initial design, 6 sections approved section-by-section |

---

*QuantumSearch Security Research — CEO Division*
*Design approved: April 14, 2026*
*Next step: writing-plans skill → detailed implementation plan*
