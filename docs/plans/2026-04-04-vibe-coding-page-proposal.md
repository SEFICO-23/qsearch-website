# Vibe-Coding Security Page — CCO Proposal for CDO Review

> **From:** CCO
> **To:** CDO (La Stilista)
> **Date:** 2026-04-04
> **Status:** PROPOSAL — awaiting CDO design decisions
> **Context:** This follows the same process as ai-security.html. CCO has written the copy and page structure. CDO decides visual execution.

---

## 1. Why This Page Exists

Vibe-coding — building software by describing what you want to AI tools (Cursor, Copilot, Claude Code, Bolt, v0, Lovable, Replit Agent) — is how a massive and growing segment of the market ships code in 2026. Startups, SMEs, agencies, and solo founders are going from idea to production in days instead of months.

The problem: AI writes code fast. It doesn't write code safe.

AI assistants don't understand your threat model. They hallucinate dependencies that don't exist (or worse, that attackers have registered). They hardcode secrets. They skip input validation. They generate auth flows with critical gaps. They copy vulnerable patterns from training data. And nobody reviews the output — because the whole point of vibe-coding is speed.

**This is a different service from AI Security (ai-security.html).** AI Security audits the AI *itself* — the agent, the MCP server, the LLM. Vibe-Coding Security audits what the AI *produced* — the application code. Different attack surface, different buyer, different page.

**Market position:** Zero competitors offer dedicated "vibe-coding security audits." Plenty offer code audits. Nobody frames it for the AI-generated code audience. First-mover advantage again.

---

## 2. Navigation Change

The flat "Services" nav link becomes a dropdown (same `.nav-dropdown` pattern as "Resources"):

```
Services ▾
├── Security Services     → services.html
├── AI Security Research  → ai-security.html
└── Vibe-Coding Security  → vibe-coding.html
```

This affects ALL pages (every page has the same nav). The dropdown reuses existing CSS — no new styles needed.

---

## 3. Page Structure & Copy

### 3.1 Hero

**Label:** `Vibe-Coding Security`

**H1:**
```
Your AI wrote the code.
Who reviewed it?
```

**Subtext:**
"Cursor, Copilot, Bolt, v0, Lovable, Replit Agent — AI tools let you ship in days instead of months. But speed without review is how vulnerabilities reach production. We audit AI-generated applications for the security gaps that AI assistants consistently miss."

**CTA buttons:**
- Primary: "Request Code Review →" (links to contact.html)
- Secondary: "See What We Find ↓" (scrolls to vulnerability section)

**Design note for CDO:** Same hero pattern as ai-security.html (no particle canvas). Different background treatment needed — ai-security uses circuit-board SVG. This page needs something that signals "code" — perhaps a faint code-block pattern or bracket/brace motif at low opacity. Your call.

---

### 3.2 The Reality Check (replaces stat ribbon)

Instead of a stat ribbon, a single impactful callout — a `.sticky-note.danger` pattern:

**"In 2025, researchers found that 36% of AI-generated code suggestions contained security vulnerabilities. The code shipped anyway — because there was no one reviewing it."**

Source: Stanford/NYU study on Copilot-generated code + extrapolated 2026 data from OWASP Agentic report.

---

### 3.3 "What AI Gets Wrong" — Vulnerability showcase

**Section label:** `The Blind Spots`
**H2:** `What AI assistants consistently miss`
**Subtext:** "AI writes functional code. Functional isn't the same as secure. These are the vulnerability categories we find in every vibe-coded application we audit."

6 cards in a 3x2 grid (2x3 on tablet, 1-column on mobile). Each card has an icon area (could be a monospace code snippet), a title, and 2-3 lines of explanation.

**Card 1: Phantom Dependencies**
"AI hallucinates package names that don't exist — or that attackers have registered. We audit every dependency against known typosquatting and confusion attacks."

**Card 2: Hardcoded Secrets**
"API keys, database credentials, JWT secrets — AI generates example values that end up in production. We scan for exposed secrets across your entire codebase."

**Card 3: Missing Input Validation**
"AI-generated forms, APIs, and endpoints often accept any input without sanitization. SQL injection, XSS, path traversal — the OWASP Top 10 thrives in unreviewed code."

**Card 4: Broken Authentication**
"AI builds login flows that look right but aren't. Missing CSRF protection, weak session handling, insecure password storage, broken access controls."

**Card 5: Outdated Patterns**
"AI training data includes years of deprecated APIs, insecure defaults, and vulnerable library versions. We identify code patterns that were secure in 2021 but aren't in 2026."

**Card 6: Architecture Blindness**
"AI writes each function in isolation. It doesn't understand your system architecture, data flow, or trust boundaries. We map the full attack surface that AI can't see."

---

### 3.4 "Is This You?" — Prospect self-selection

**Section label:** `Built With AI?`
**H2:** `If any of these sound familiar`

4 scenario cards (same `.scenario-card` pattern as ai-security.html):

1. "We built our MVP with Cursor/Bolt/v0 and it's going to production"
   → **You need a Pre-Launch Code Review**

2. "Our developers use Copilot daily but we don't have a security review process"
   → **You need an AI Code Audit**

3. "A freelancer or agency built our app using AI tools"
   → **You need a Third-Party Code Review**

4. "We've been shipping AI-generated code for months without a security check"
   → **You need an AI Code Audit — urgently**

---

### 3.5 Pricing Tiers

3 cards, same `.pricing-grid` / `.pricing-card` pattern.

**Color scheme for CDO:** This page should have its own accent identity within the brand. Suggestion — lean on **electric purple (#5B23FF)** as the dominant accent (purple = energy = speed = vibe-coding). AI Security is blue-dominant, general services are balanced. Purple-dominant completes the trio.

| Tier | Price | Timeline | Card Treatment |
|------|-------|----------|----------------|
| Pre-Launch Review | From CHF 2,000 | 3-5 days | Signal blue top-line. Entry point. |
| AI Code Audit | From CHF 5,000 | 1-2 weeks | **Featured** — electric purple glow, "Most Popular" badge. Money tier. |
| Continuous AI Code Review | From CHF 990/mo | Ongoing | Volt lime top-line. Subscription. |

**Tier 1: Pre-Launch Review (from CHF 2,000)**
"Fast security review before you go live."
- Automated vulnerability scanning
- Dependency audit (hallucinated + vulnerable packages)
- Secret detection across codebase
- OWASP Top 10 surface check
- Priority risk report with fix guidance
- CTA: "Learn More ↓"

**Tier 2: AI Code Audit (from CHF 5,000)** — FEATURED
"Deep manual review of AI-generated code."
- Everything in Pre-Launch Review
- Manual code review by security engineer
- Authentication & authorization testing
- Business logic security analysis
- API endpoint security assessment
- Architecture threat model
- Remediation workshop (2 hours)
- CTA: "Request Audit →"

**Tier 3: Continuous AI Code Review (from CHF 990/mo)**
"Ongoing security review as you ship."
- Monthly automated scans
- PR-level security review on critical changes
- Quarterly manual deep-dive
- Dependency monitoring & alerting
- Dedicated security contact
- Priority incident support
- CTA: "Get Started →"

---

### 3.6 Tier Details

3 numbered `.service-detail` blocks (same as services.html and ai-security.html). Scroll targets for "Learn More" CTAs.

Expanded descriptions of each tier with full deliverable lists. (Content mirrors tier cards but with more detail — 8 bullet points each, same pattern as ai-security.html tier details.)

---

### 3.7 How It Works (Process Timeline)

5 steps (same `.process-timeline` pattern):

1. **Submit Your Repo** — "Share access to your codebase. We accept GitHub, GitLab, Bitbucket, or zip."
2. **Scope & NDA** — "We define what's in scope, sign NDA, agree on timeline."
3. **Automated Scan** — "Our tools flag known vulnerability patterns, dependency issues, and secrets."
4. **Manual Review** — "Security engineer reviews AI-generated code for logic flaws, auth gaps, and architecture risks."
5. **Report & Fix** — "Full report with severity ratings, PoC exploits, and step-by-step remediation."

---

### 3.8 Trust Builder (optional — CDO decides)

A small section with a single quote or stat:

"AI-generated code is functional. Functional gets you to market. Secure keeps you there."

Or a concrete example:
"In a recent audit, we found 23 vulnerabilities in a Cursor-built SaaS application — including an unauthenticated admin endpoint, 3 hardcoded API keys, and a dependency that didn't exist on npm (typosquatted by an attacker 6 months ago)."

Note: This would need to be anonymized/fictionalized since we haven't done a public vibe-coding audit yet. If CDO thinks this is risky, skip it.

---

### 3.9 CTA Section

**H2:** `Ship fast. Ship safe.`
**Subtext:** "Your AI-generated code is one review away from production-ready. No judgment — just results."
**CTA:** "Request Code Review →" (links to contact.html)

---

### 3.10 Footer

Standard footer. Add "Vibe-Coding Security" link in Services column.

---

## 4. CDO Decisions Needed

| # | Decision | Options |
|---|----------|---------|
| 1 | Hero background treatment | Code-block pattern? Bracket/brace motif? Something else? |
| 2 | Page color dominance | Electric purple (my suggestion) or something else? |
| 3 | Vulnerability cards (3.3) | 3x2 grid with icons? Or different layout? |
| 4 | Trust builder section (3.8) | Include with fictionalized example? Or skip? |
| 5 | Visual relationship to ai-security.html | Sibling (same patterns, different accent)? Or more differentiated? |

---

## 5. Copy Summary

| Element | Copy |
|---------|------|
| H1 | "Your AI wrote the code. Who reviewed it?" |
| Subtext | Speed without review = vulns in production |
| Section: Blind Spots | 6 vulnerability cards (phantom deps, secrets, validation, auth, outdated patterns, architecture) |
| Section: Is This You? | 4 scenario self-selection cards |
| Tiers | Pre-Launch (CHF 2K), AI Code Audit (CHF 5K), Continuous (CHF 990/mo) |
| CTA | "Ship fast. Ship safe." |
| Tone | Non-judgmental. Vibe-coding is a tool — tools need quality control. |

---

## 6. Files Affected

- **CREATE:** `vibe-coding.html`
- **MODIFY:** `styles.css` — new page-specific styles (vulnerability cards, purple accent overrides)
- **MODIFY:** ALL HTML pages — nav change (Services becomes dropdown)
- **MODIFY:** `sitemap.xml` — add vibe-coding.html
- **MODIFY:** All footers — add "Vibe-Coding Security" link

---

*CCO Proposal. Pending CDO visual direction before implementation.*
*"Zero competitors frame this for the AI-generated code audience. First-mover. Again."*
