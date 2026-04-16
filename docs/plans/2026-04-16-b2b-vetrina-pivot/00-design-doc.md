# B2B Sito Vetrina Pivot — Design Document (v0.1 — WORKING DRAFT)

**Date:** 2026-04-16
**Author:** CEO (Claude Code) + Alex Sebastiani
**Status:** WORKING DRAFT — core strategy agreed, refinement pending
**Supersedes (for near-term):** QSearch SaaS Platform Launch Strategy (2026-04-14)
**Does NOT delete:** SaaS platform code remains committed on `main`. Platform launch resumes once B2B track establishes reputation + revenue.

---

## Why This Pivot

The QSearch SaaS platform requires paying customers to generate revenue. Paying customers require trust. Trust requires proof. Proof requires engagements we've delivered. **B2B direct consulting is where near-term revenue lives** — one real engagement generates more than months of early-stage SaaS subscriptions. The SaaS platform is not wasted; it becomes the *post-reputation* product.

The website must mirror this strategic change. It stops being a SaaS product landing page and becomes a **sito vetrina** — a professional services showcase for a category-defining B2B offering.

---

## Strategic Positioning — The Single Service

### The Core Move

Most cybersecurity firms list 8-15 services (pentest, audit, compliance, IR, advisory, training, etc.) — signaling "we're a generic vendor, pick what you need." QuantumSearch goes the opposite way: **one unified service, category-defining, premium-priced, not comparable to legacy competitors.**

### Pre-working name: "Continuous Adversarial Intelligence"

Working name. Final positioning likely blends:
- **Autonomous** — our defining technical edge (AI-driven, 30+ agents, continuously updated)
- **Engineered per case** — custom payloads/playbooks per engagement (Scout + Engineer pattern)
- **Purple** — we attack AND help defend (we're not just red, we're collaborative partners)
- **Partners, not vendors** — ongoing relationship, retainer-friendly, not transaction-based
- **Continuous** — not a point-in-time audit, an always-on adversarial intelligence layer

The word-for-word tagline needs CCO refinement. Candidates to test:
- "Continuous Adversarial Intelligence"
- "Adversarial Partners"
- "Offensive Protection"
- "Continuous Threat Emulation"
- "Red Team as a Service" (DO NOT use — already commodified by competitors)

### Apple-style framing

> "We don't do pentests. We don't do audits. We don't do compliance checks.
> We do one thing — continuously, autonomously, engineered for your business.
> We're the only firm doing it this way. Everyone else is still doing what worked in 2015."

### The Subscription Glimpse

The single service has a **continuous-retainer option** after the initial engagement. This is critical — it signals "we're not leaving you behind, we're your ongoing security partner." This is our purple flavor:

- Single engagement = discovery + full-frontal adversarial assessment + deliverables
- Post-engagement retainer = continuous monitoring + quarterly re-scans + advisory on call + priority engagement slots
- Retainer price anchored as a percentage (e.g., 10-15%) of initial engagement cost, per month

---

## Pricing Strategy

### Previous (SaaS-era) — DEPRECATED
CHF 490 / 790 / 3,800 / 5,900 tiers — these were SaaS-aligned and are too low for premium B2B consulting.

### New (Premium B2B) — RESEARCH REQUIRED
Preliminary anchors, **subject to CCO + Innovation Scout market research**:
- **Engagement floor:** ~CHF 15,000 (minimum scope, single environment)
- **Typical engagement:** CHF 35,000-80,000
- **Enterprise engagement:** CHF 80,000-250,000+
- **Continuous retainer:** Starting at ~10-15% of initial engagement / month, anchored at minimum CHF 3,000/mo

### Pricing Transparency Choice (Q3): A — Show Nothing Publicly
Vetrina displays: *"Engagements are scoped and priced per environment. Contact us for a proposal."*
- Maximizes discovery calls
- Filters are applied by CCO on the call, not by a price tag on a page
- Standard premium consulting play

### Research Owed
Before firming pricing, CCO + Innovation Scout must benchmark:
- Swiss premium: Compass Security, SCRT, Oneconsult
- Boutique offensive (international): Trail of Bits, Doyensec, NCC Group boutique arm
- Managed threat intelligence: Mandiant advisory, CrowdStrike advisory
- Continuous pentest services: HackerOne Assessments, Bishop Fox Cosmos
- Target position: 20-40% below top tier (we are new), 3-5x above typical SMB consulting (we are premium)

---

## The Four-Level Funnel

```
LEVEL 1 — PUBLIC VETRINA
  The Site. Public. No NDA.
  What a visitor sees before committing anything.
  ├─ Homepage: "The new frontier" positioning
  ├─ Services: ONE service explained
  ├─ Track Record: redacted metrics + hero stories
  ├─ About: team, Swiss base, brand
  └─ CTA: "Request an Engagement" → discovery call booking

LEVEL 2 — REDACTED SAMPLES (NDA-GATED)
  One click from vetrina. Simple 2-page NDA click-to-accept.
  ├─ Fireblocks case study (lead — Bugcrowd-validated P2)
  ├─ SharkSpinz case study (comprehensive — 45 findings)
  └─ PayPal case study (supporting — HackerOne-paid validation)
  Content: anonymized audit excerpts, methodology, writing quality,
           business impact. Zero actionable detail.

LEVEL 3 — LIVE DEMO ON DISCOVERY CALL
  Video call. Internal admin dashboard.
  YOU enter prospect's domain → click ONE button → teaser generated live.
  The Wow-Moment. Prospect sees their own findings in front of them.
  ├─ Requires: Internal scanning dashboard (CTO task — scoped below)
  ├─ Requires: Fly.io scanner (already built in SaaS sprint — reuse)
  └─ Requires: Teaser rendering logic (already built — reuse)
  Outcome: Full-service proposal delivered same day or next day.

LEVEL 4 — THE ENGAGEMENT
  Signed. Paid. Delivered.
  ├─ Full 360° adversarial intelligence engagement
  ├─ Deep recon + authorized active testing + custom payload engineering
  ├─ Continuous monitoring component during engagement
  ├─ Executive + technical deliverables
  └─ Optional: continuous-retainer upsell at engagement close
```

---

## Hero Stories (Lead Case Studies)

Q2 answered: **Fireblocks + PayPal** lead. SharkSpinz supports.

### Fireblocks (Primary Hero)
- Cryptographic weakness in MTA protocol (Ring-Pedersen)
- Confirmed P2 by Bugcrowd (external validation)
- Elevates us: crypto research is harder than web bugs — signals elite capability
- Low legal risk: Bugcrowd disclosure framework already exists
- Case study title candidate: "Cryptographic Weakness in MPC Threshold Signing Protocol"

### PayPal (Secondary Hero)
- Payment flow invoice fraud finding
- HackerOne-paid bounty (monetary validation)
- Signals: we work on critical financial infrastructure
- Safer to reference because PayPal paid us = they acknowledged
- Case study title candidate: "Payment Flow Integrity Research on Tier-1 Fintech"

### SharkSpinz (Supporting Evidence)
- 45 findings, comprehensive audit
- Strongest volume/depth demonstration
- Client lost (didn't pay) but WORK remains ours — Clause 4 IP ownership in GTC
- Case study title candidate: "End-to-End Security Assessment of Scale-Stage Fintech"

### Redaction Standard
- No company names → generic industry descriptors ("Tier-1 Fintech", "European Crypto Exchange", "Scale-Stage Fintech")
- No specific product versions
- No URLs, IPs, or identifiable infrastructure
- No exploit payloads or reproduction steps
- Kept: methodology, finding CLASS, business impact, writing quality, CVSS distribution
- Standard: a junior consultant at a prospect company must NOT be able to Google the finding and identify the source

---

## The Level 3 Live-Demo Dashboard (CTO Task)

### Scope — Smaller Than SaaS Platform
This is NOT the full SaaS platform. It's a **private internal sales tool**.

- Auth-gated admin URL (single user: Alex)
- No signup, no payments, no user accounts, no public dashboard
- Input: domain name
- Action: fires the existing Fly.io passive scanner (already built in sprint)
- Output: teaser report rendered live in-browser during the call
- Shareable link option: after call, a unique URL can be sent to the prospect with the teaser

### Why It Matters
During a discovery call, the prospect says their domain. You click one button. They see their own regulatory exposure, reputational risk, and attack surface appear on screen in real-time. This collapses every "but will this find anything for US?" objection before they form it.

### Deliverables (CTO will brief)
- Private admin dashboard (simple React page behind auth)
- Integration with existing Fly.io scanner
- Teaser rendering identical to the public teaser design
- Optional: shareable link for post-call follow-up

### Explicitly NOT in Scope Yet
- Public signup flow
- Payment integration
- Multi-user accounts
- Stripe deposit holds (the B2B cross-domain hold mechanism we designed)
- These come back when the SaaS platform resumes

---

## Ship Dependencies (No Time Estimates — Per Time-Bias Rule)

The vetrina pivot ships when ALL of these are complete:

- [ ] Services page rewritten (CDO task, strip SaaS, install "one service" framing)
- [ ] Homepage CTAs changed (SaaS CTAs → "Request Engagement" CTA)
- [ ] Pricing research completed (CCO + Innovation Scout briefing)
- [ ] At least ONE Level 2 redacted sample live behind NDA gate (Fireblocks = lead)
- [ ] Level 3 live-demo dashboard built and tested by Alex
- [ ] New messaging framework v3 approved by Alex
- [ ] Tagline + single-service name finalized
- [ ] GTC updated (B2B services clauses replace SaaS platform clauses)

Marketing launch fires **after** all the above are complete AND after the external marketing company engagement begins (end of April 2026 per Alex's hire). SmartEgo outreach fires **after** marketing launch (beginning of May 2026).

---

## Open Questions For Refinement (Not Blocking the Save)

1. **Final tagline/service name** — needs CCO refinement session
2. **Exact retainer structure** — percentage anchor vs flat tiers
3. **How prominently to feature Swiss brand** — full lead position or tertiary?
4. **Language strategy** — EN-only launch? IT + DE + FR per current qsearch.ch?
5. **Redaction sign-off process** — Alex reviews each case study before it goes behind the NDA gate? Lawyer review for Fireblocks (Bugcrowd disclosed content)?
6. **NDA gate mechanism** — click-to-accept (fastest) vs form-fill + email verification (safer)?
7. **What happens to the existing SaaS landing copy** — archive on a `/legacy` URL or delete entirely?

---

## Cross-References

- Superseded (near-term) by this: `2026-04-14-platform-launch-strategy/00-design-doc.md`
- SaaS platform code: `SEFICO-23/QSearch` GitHub repo (kept, paused)
- Portfolio dashboard already live: `qsearch.ch/portfolio/?key=QS2026` (becomes the heart of the new vetrina)
- Fireblocks engagement: `10_engagements/Fireblocks-*/`
- PayPal engagement: `10_engagements/PayPal-*/`
- SharkSpinz engagement: `10_engagements/SharkSpinz-*/`
- Time-Bias Rule: `memory/feedback_no_time_bias.md`
- Door Rule: `memory/feedback_door_rule.md`

---

## Changelog

| Version | Date | Notes |
|---------|------|-------|
| v0.1 | 2026-04-16 | Initial draft. Strategy locked: single service, Apple-style, continuous retainer glimpse, 4-level funnel, Fireblocks+PayPal heroes, Option A pricing transparency, Level 3 live-demo approved |

---

*QuantumSearch Security Research — CEO Division*
*Design in progress: April 16, 2026*
*Next step: Refine service name/tagline with CCO, then brief CTO for live-demo dashboard*
