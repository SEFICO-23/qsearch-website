# Design Document: ai-security.html — AI Security Research Page

> **Status:** APPROVED (CCO + CDO aligned 2026-04-04)
> **Owner:** CCO (commercial strategy) + CDO (visual execution)
> **Priority:** HIGH — flagship differentiator page

---

## 1. Purpose

Dedicated page showcasing QuantumSearch's AI security assessment services. Separate from services.html (general security). This is our first-mover positioning — no Swiss competitor offers dedicated AI security audits.

## 2. Page Structure

### 2.1 Navigation
- Same nav as all pages. "Services" link stays active.
- services.html gets a "Learn more" gateway link pointing to ai-security.html.

### 2.2 Hero Section
- **No particle canvas.** SVG circuit-board pattern at 3% opacity behind hero.
- **Label:** `AI Security Research`
- **H1:** `Your AI makes decisions. We test what happens when someone breaks the rules.`
  - "breaks the rules" in `.accent` span (volt lime)
- **Subtext:** "LLMs, agents, and MCP servers process customer data, execute financial logic, and access internal tools. We test what happens when the inputs aren't polite — prompt injection, tool poisoning, data exfiltration, and the attack chains that emerge when AI systems trust too much."
- **Min-height:** 50vh (matches services.html hero)

### 2.3 Stat Ribbon
- Positioned immediately below hero, NOT inside hero.
- 3 stats in a horizontal row (responsive: stack on mobile):
  - `43%` of MCP servers have injection vulnerabilities
  - `4.2` average injection vectors per AI agent
  - `0` Swiss competitors offer dedicated AI security audits
- Numbers in volt lime (#E4FF30), labels in text-muted.

### 2.4 Attack Chain Visualization
- **Concept:** 4-step animated card showing a prompt injection chain.
- **Animation:** Each step reveals on scroll using existing `.fade-in` CSS pattern.
- **Steps:**
  1. User sends normal-looking query — neutral styling
  2. Hidden instruction extracted from context — subtle warning (amber/yellow)
  3. Agent calls internal tool with attacker-controlled params — escalation (orange)
  4. Sensitive data exfiltrated via tool response — **red "EXPLOITED" badge**
- **Alternative state (right column or toggle):**
  - Step 4 shows: **signal blue "IDENTIFIED" badge** — "PoC documented, remediation delivered"
  - IMPORTANT: Signal blue (#008BFF), NOT green. We identify, we don't block. Assessment firm, not WAF.
- **Implementation:** CSS animations on scroll. No heavy JS. Minimal complexity.

### 2.5 "Is This For Me?" Section
- 4 scenario cards, each with:
  - One relatable scenario (plain language)
  - One-line answer pointing to a tier
- Scenarios:
  1. "You've deployed an AI chatbot that accesses customer data" → MCP Server Audit
  2. "Your agents use MCP servers to connect to internal tools" → MCP Server Audit or AI Agent Audit
  3. "You're integrating LLMs into financial or legal workflows" → AI Agent Security Audit
  4. "You need to demonstrate AI safety for regulatory compliance" → Full AI Stack Assessment
- Purpose: prospect self-selection. Reduces "which tier?" friction.

### 2.6 Tier Cards (Pricing)
- 3 cards using `.pricing-card` pattern from services.html.
- Horizontal on desktop, stacked on mobile.

| Tier | Card Treatment | Price | CTA |
|------|---------------|-------|-----|
| MCP Server Audit | Electric purple (#5B23FF) top-line | Starting from CHF 3,000 | Learn More → (scrolls to detail) |
| AI Agent Security Audit | **Featured** — signal blue glow, "Recommended" badge | Starting from CHF 8,000 | Request Assessment → |
| Full AI Stack Assessment | Volt lime (#E4FF30) top-line | Contact us | Contact Us → |

Each card contains:
- 3-line scope description
- 4-5 bullet deliverables
- CTA button

### 2.7 Tier Detail Sections
- Numbered `.service-detail` blocks (01, 02, 03) matching services.html pattern.
- Scroll targets from "Learn More" CTAs on cards.
- Each tier gets expanded scope, methodology, deliverables, and timeline.

#### Tier 1: MCP Server Audit (from CHF 3,000)
- Scope: Individual MCP server deployments
- Tests: Command injection, tool poisoning, OAuth/auth flaws, excessive privileges, data leakage
- Deliverables: Vulnerability report with PoCs, risk quantification, remediation guidance
- Timeline: 3-5 days

#### Tier 2: AI Agent Security Audit (from CHF 8,000)
- Scope: Deployed AI agent systems (chatbots, copilots, RAG, custom agents)
- Tests: OWASP Agentic Top 10 — goal hijacking, tool misuse, memory poisoning, cascading failures, supply chain
- Deliverables: Full assessment report, attack chain documentation, threat model, remediation roadmap
- Timeline: 1-2 weeks

#### Tier 3: Full AI Stack Assessment (Contact us)
- Scope: End-to-end AI infrastructure — models, agents, MCP servers, data pipelines, training data
- Tests: Everything in Tiers 1+2, plus adversarial ML testing, model extraction, data poisoning, EU AI Act alignment
- Deliverables: Board-level executive summary, compliance mapping, strategic remediation roadmap
- Timeline: 3-5 weeks

### 2.8 Process Timeline
- Reuse services.html "How it works" pattern (5 steps).
- Adjusted for AI security context.

### 2.9 Final CTA Section
- Strong closing CTA driving to contact.html.

### 2.10 Footer
- Standard footer, same as all pages.

## 3. Visual Design Decisions

### 3.1 Color Accent Shift
- Page leans **signal blue (#008BFF)** for section dividers, labels, card accents.
- **Volt lime (#E4FF30)** reserved for CTAs, stat numbers, and the H1 accent word.
- **Electric purple (#5B23FF)** for decorative glows and Tier 1 card.
- This creates visual distinction: services.html = balanced palette, ai-security.html = blue-dominant (blue = intelligence = AI).

### 3.2 Hero Background
- No particle canvas (homepage signature — reusing dilutes it).
- SVG circuit-board pattern at 3% opacity. Signals "AI/tech" without being generic.

### 3.3 Typography
- Same as brand system: Bricolage Grotesque (headings), Plus Jakarta Sans (body), JetBrains Mono (code/stats).

### 3.4 Light Theme
- Forest Gradient palette applies. Deep Teal (#22577A) as primary accent in light mode.

## 4. What We're NOT Building
- No comparison table (no competitors to compare against — cards invite depth-selection)
- No homepage terminal reuse (dilutes the signature element)
- No particle canvas (circuit-board SVG instead)
- No price on Tier 3 (gravitas through exclusivity)
- No green "BLOCKED" badges (we identify, we don't block — assessment firm, not WAF)

## 5. Link from services.html
- Add an "AI Security Research" card/banner on services.html with "Learn more →" linking to ai-security.html.
- Not a duplicate — a gateway. One line: "Specialized AI security assessments for LLMs, agents, and MCP servers."

## 6. Key Stats (Sourced)
- 43% of MCP servers have command injection vulnerabilities
- CVE-2025-6514 (CVSS 9.6) affected 437K+ MCP installations
- 48% of CISOs say agentic AI is #1 attack vector
- Only 34% have controls in place
- EU AI Act mandates adversarial testing (EUR 35M fines)
- OWASP Top 10 for Agentic Applications published 2026
- Average 4.2 injection vectors per AI agent deployment

## 7. Files to Create/Modify
- **CREATE:** `ai-security.html` — the page
- **MODIFY:** `services.html` — add gateway link to AI Security page
- **MODIFY:** `styles.css` — add AI security page-specific styles (circuit-board SVG, attack chain viz, scenario cards)
- **MODIFY:** `main.js` — scroll-reveal for attack chain steps (if needed beyond existing fade-in)
- **CREATE (if needed):** `circuit-board.svg` — hero background pattern

---

*Approved by CCO and CDO, 2026-04-04. Ready for implementation.*
