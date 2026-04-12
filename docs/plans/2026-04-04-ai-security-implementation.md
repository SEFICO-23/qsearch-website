# AI Security Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `ai-security.html` — QuantumSearch's flagship AI Security Research page with 3-tier pricing, attack chain visualization, and prospect self-selection flow.

**Architecture:** Static HTML page using existing CSS framework (styles.css v8, Ultraviolet Volt). Reuses `.pricing-card`, `.service-detail`, `.fade-in`, `.label`, `.section-header` patterns from services.html. New CSS for: circuit-board hero background, stat ribbon, attack chain visualization, scenario cards. Blue-dominant color accent shift distinguishes this page from services.html.

**Tech Stack:** HTML5, CSS3 (existing styles.css v8), vanilla JS (existing main.js + minimal additions). No build tools. No frameworks. No dependencies.

**Design doc:** `docs/plans/2026-04-04-ai-security-page-design.md`

---

### Task 1: Create circuit-board SVG hero background

**Files:**
- Create: `ai-security.html` (initial skeleton only — hero section)
- Modify: `styles.css` (append AI Security page styles at bottom, before print media query)

**Context:** The homepage uses a particle canvas. This page needs a different visual — an SVG circuit-board pattern at 3% opacity. We inline it as a CSS background-image using a data URI to avoid an extra HTTP request. The pattern should feel "AI/tech" without being clip-art generic.

**Step 1: Add AI Security page CSS block to styles.css**

Find the print media query block (the last major section in styles.css). Insert before it. The exact insertion point is BEFORE the line `@media print {`.

Append these new styles:

```css
/* ═══════════════════════════════════════════
   AI SECURITY PAGE — Signal Blue dominant
   Circuit-board hero, attack chain viz, scenario cards
   ═══════════════════════════════════════════ */

/* Hero override — circuit-board pattern instead of particle canvas */
.ai-security-hero {
  min-height: 50vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.ai-security-hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23008BFF' stroke-width='0.5'%3E%3Cpath d='M40 0v40h20v20h40v-20h20V0'/%3E%3Cpath d='M0 80h40v40h20v40h-20v40H0'/%3E%3Cpath d='M120 80h40v20h40v40h-40v20h-40'/%3E%3Cpath d='M80 120v40h40v40'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='100' cy='40' r='3'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3Ccircle cx='160' cy='100' r='3'/%3E%3Ccircle cx='40' cy='120' r='2'/%3E%3Ccircle cx='120' cy='160' r='3'/%3E%3Ccircle cx='80' cy='160' r='2'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
  pointer-events: none;
  z-index: 0;
}

/* Aurora override — heavier on blue, less lime */
.ai-security-hero::after {
  content: '';
  position: absolute;
  top: 5%; left: 0; right: 0;
  height: 70%;
  background:
    radial-gradient(ellipse 45% 40% at 25% 25%, rgba(91, 35, 255, 0.05) 0%, transparent 55%),
    radial-gradient(ellipse 40% 35% at 70% 35%, rgba(0, 139, 255, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse 25% 20% at 50% 60%, rgba(228, 255, 48, 0.015) 0%, transparent 45%);
  pointer-events: none;
  z-index: 0;
  animation: aurora 16s ease-in-out infinite alternate;
}

[data-theme="light"] .ai-security-hero::before {
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%2322577A' stroke-width='0.5'%3E%3Cpath d='M40 0v40h20v20h40v-20h20V0'/%3E%3Cpath d='M0 80h40v40h20v40h-20v40H0'/%3E%3Cpath d='M120 80h40v20h40v40h-40v20h-40'/%3E%3Cpath d='M80 120v40h40v40'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='100' cy='40' r='3'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3Ccircle cx='160' cy='100' r='3'/%3E%3Ccircle cx='40' cy='120' r='2'/%3E%3Ccircle cx='120' cy='160' r='3'/%3E%3Ccircle cx='80' cy='160' r='2'/%3E%3C/g%3E%3C/svg%3E");
}

[data-theme="light"] .ai-security-hero::after { display: none; }

/* ─── Stat Ribbon ─── */
.stat-ribbon {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 4rem;
}

.stat-ribbon-item {
  text-align: center;
}

.stat-ribbon-number {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 2.8rem;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 0.3rem;
}

.stat-ribbon-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  max-width: 220px;
  margin: 0 auto;
}

/* ─── Attack Chain Visualization ─── */
.attack-chain {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.attack-chain-title {
  grid-column: 1 / -1;
}

.chain-column-header {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.chain-column-header.exploited { color: var(--danger); }
.chain-column-header.identified { color: var(--signal); }

.chain-step {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  margin-bottom: 0.75rem;
  position: relative;
  transition: all 0.3s;
}

.chain-step-number {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 0.4rem;
}

.chain-step-text {
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.chain-step.step-neutral { border-left: 3px solid var(--text-muted); }
.chain-step.step-warning { border-left: 3px solid var(--amber); }
.chain-step.step-warning .chain-step-text { color: var(--text-primary); }
.chain-step.step-escalation { border-left: 3px solid #f97316; }
.chain-step.step-escalation .chain-step-text { color: var(--text-primary); }

.chain-step.step-exploited {
  border-left: 3px solid var(--danger);
  background: var(--danger-dim);
}
.chain-step.step-exploited .chain-step-text { color: var(--text-primary); }

.chain-step.step-identified {
  border-left: 3px solid var(--signal);
  background: var(--signal-dim);
}
.chain-step.step-identified .chain-step-text { color: var(--text-primary); }

.chain-badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.chain-badge.exploited {
  background: var(--danger);
  color: #fff;
}

.chain-badge.identified {
  background: var(--signal);
  color: #fff;
}

/* ─── Scenario Cards ("Is This For Me?") ─── */
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.scenario-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  transition: all 0.3s;
}

.scenario-card:hover {
  border-color: var(--border-signal);
  box-shadow: 0 0 30px var(--signal-glow);
}

.scenario-card p {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  max-width: none;
  font-weight: 500;
}

.scenario-card .scenario-answer {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--signal);
  font-weight: 500;
}

/* ─── AI Security pricing card accent overrides ─── */
.ai-pricing .pricing-card.tier-mcp {
  border-top: 3px solid var(--electric);
}
.ai-pricing .pricing-card.tier-mcp:hover {
  box-shadow: 0 0 40px var(--electric-glow), 0 16px 48px rgba(0, 0, 0, 0.3);
}

.ai-pricing .pricing-card.featured {
  border-color: var(--signal);
  background: linear-gradient(180deg, rgba(0, 139, 255, 0.04) 0%, var(--bg-card) 35%);
  box-shadow: 0 0 50px var(--signal-glow), 0 16px 48px rgba(0, 0, 0, 0.3);
}
.ai-pricing .pricing-badge {
  background: var(--signal);
}

.ai-pricing .pricing-card.tier-full {
  border-top: 3px solid var(--accent);
}
.ai-pricing .pricing-card.tier-full:hover {
  box-shadow: 0 0 40px var(--accent-glow), 0 16px 48px rgba(0, 0, 0, 0.3);
}

/* ─── AI Security label override — signal blue dominant ─── */
.ai-page .label {
  color: var(--signal);
}
.ai-page .label::before {
  background: linear-gradient(90deg, var(--signal), transparent);
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .stat-ribbon { grid-template-columns: 1fr; gap: 1.5rem; }
  .attack-chain { grid-template-columns: 1fr; }
  .scenario-grid { grid-template-columns: 1fr; }
  .stat-ribbon-number { font-size: 2.2rem; }
}
```

**Step 2: Create the initial ai-security.html with hero section only**

Create `ai-security.html` with the full HTML boilerplate (copied from services.html pattern) but with ONLY the hero section populated. This validates the circuit-board background and hero copy.

```html
<!DOCTYPE html>
<html lang="en" class="ai-page">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="canonical" href="https://qsearch.ch/ai-security.html">
  <title>AI Security Research | QuantumSearch Security Research</title>
  <meta name="description" content="Specialized security assessments for AI agents, MCP servers, and LLM deployments. Prompt injection, tool poisoning, data exfiltration testing. Swiss-based.">
  <meta property="og:title" content="AI Security Research | QuantumSearch Security Research">
  <meta property="og:description" content="Your AI makes decisions. We test what happens when someone breaks the rules.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://qsearch.ch/ai-security.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta property="og:image" content="https://qsearch.ch/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:image" content="https://qsearch.ch/og-image.png">
  <link rel="alternate" hreflang="en" href="https://qsearch.ch/ai-security.html">
  <link rel="alternate" hreflang="it" href="https://qsearch.ch/it/ai-security.html">
  <link rel="alternate" hreflang="de" href="https://qsearch.ch/de/ai-security.html">
  <link rel="alternate" hreflang="fr" href="https://qsearch.ch/fr/ai-security.html">
  <link rel="alternate" hreflang="x-default" href="https://qsearch.ch/ai-security.html">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%235B23FF'/><stop offset='100%25' stop-color='%23008BFF'/></linearGradient></defs><rect width='32' height='32' rx='6' fill='url(%23g)'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='800' font-size='18' fill='%23E4FF30'>Q</text></svg>">
</head>
<body>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService","name":"QuantumSearch Security Research","url":"https://qsearch.ch/ai-security.html","description":"Specialized AI security assessments: MCP server audits, AI agent security testing, and full AI stack assessments.","areaServed":["CH","EU"],"serviceType":["MCP Security Audit","AI Agent Security Audit","AI Red Team Assessment"]}</script>

  <a href="#main" class="skip-link" style="position:absolute;top:-100%;left:0;padding:0.5rem 1rem;background:var(--accent);color:var(--bg-primary);z-index:9999;font-weight:700;font-size:0.85rem;border-radius:0 0 8px 0;transition:top 0.2s">Skip to main content</a>
  <style>.skip-link:focus{top:0}</style>

  <nav class="nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo"><img src="logo-mark.svg" alt="Q" class="logo-mark-img" width="30" height="30"> QuantumSearch</a>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html" class="active">Services</a></li>
        <li><a href="track-record.html">Track Record</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li class="nav-dropdown">
          <a href="#">Resources &#9662;</a>
          <ul class="nav-dropdown-menu">
            <li><a href="demo.html">Live Demo</a></li>
            <li><a href="insights.html">Insights &amp; Research</a></li>
            <li><a href="disclosure.html">Responsible Disclosure</a></li>
          </ul>
        </li>
        <li class="nav-dropdown lang-switcher">
          <a href="#">EN &#9662;</a>
          <ul class="nav-dropdown-menu">
            <li><a href="#" data-lang="en">English</a></li>
            <li><a href="#" data-lang="it">Italiano</a></li>
            <li><a href="#" data-lang="de">Deutsch</a></li>
            <li><a href="#" data-lang="fr">Fran&ccedil;ais</a></li>
          </ul>
        </li>
      </ul>
      <a href="contact.html" class="nav-cta">Free Assessment</a>
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle light/dark theme" title="Toggle theme">
        <svg class="icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <button class="nav-mobile-toggle" id="mobileToggle" aria-label="Toggle menu">&#9776;</button>
    </div>
  </nav>

  <main class="page-content" id="main">
    <!-- Hero -->
    <section class="ai-security-hero">
      <div class="container">
        <div class="hero-content">
          <div class="label">AI Security Research</div>
          <h1>Your AI makes decisions.<br>We test what happens when<br>someone <span class="accent">breaks the rules.</span></h1>
          <p>LLMs, agents, and MCP servers process customer data, execute financial logic, and access internal tools. We test what happens when the inputs aren't polite &mdash; prompt injection, tool poisoning, data exfiltration, and the attack chains that emerge when AI systems trust too much.</p>
          <div class="hero-buttons">
            <a href="contact.html" class="btn-primary">Request Assessment &rarr;</a>
            <a href="#tiers" class="btn-secondary">View Tiers &darr;</a>
          </div>
        </div>
      </div>
    </section>

    <!-- REMAINING SECTIONS ADDED IN SUBSEQUENT TASKS -->

  </main>

  <!-- FOOTER ADDED IN TASK 7 -->

  <script src="main.js"></script>
  <script data-goatcounter="https://qsearch.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
</body>
</html>
```

**Step 3: Visual check**

Open `ai-security.html` in a browser. Verify:
- Circuit-board SVG pattern visible at subtle 3% opacity behind hero
- Blue-tinted aurora (heavier blue, less lime than homepage)
- Hero copy renders: "Your AI makes decisions..." with "breaks the rules." in gradient accent
- Toggle light/dark — circuit-board switches from Signal Blue to Deep Teal
- `Services` nav link shows as active

**Step 4: Commit**

```bash
git add ai-security.html styles.css
git commit -m "feat(ai-security): hero section with circuit-board SVG background"
```

---

### Task 2: Stat ribbon section

**Files:**
- Modify: `ai-security.html` (add stat ribbon HTML after hero section)

**Context:** 3 stats in a horizontal row below the hero. Numbers in volt lime, labels in muted text. The existing `.stat-number` class in main.js has a counter animation (IntersectionObserver at threshold 0.5) — we reuse it for the "43" stat. The "4.2" and "0" stats are either too small or not countable, so they display statically.

**Step 1: Add stat ribbon HTML**

Insert after the closing `</section>` of the hero, before the `<!-- REMAINING SECTIONS -->` comment:

```html
    <!-- Stat Ribbon -->
    <section>
      <div class="container">
        <div class="stat-ribbon fade-in">
          <div class="stat-ribbon-item">
            <div class="stat-ribbon-number stat-number">43%</div>
            <div class="stat-ribbon-label">of MCP servers have injection vulnerabilities</div>
          </div>
          <div class="stat-ribbon-item">
            <div class="stat-ribbon-number">4.2</div>
            <div class="stat-ribbon-label">average injection vectors per AI agent deployment</div>
          </div>
          <div class="stat-ribbon-item">
            <div class="stat-ribbon-number">0</div>
            <div class="stat-ribbon-label">Swiss competitors offer dedicated AI security audits</div>
          </div>
        </div>
      </div>
    </section>
```

**Step 2: Visual check**

Open in browser. Verify:
- 3 stats in a row on desktop, stacked on mobile
- "43%" animates counting up when scrolled into view
- Numbers are volt lime, labels are muted gray
- Bottom border separates ribbon from next section

**Step 3: Commit**

```bash
git add ai-security.html
git commit -m "feat(ai-security): stat ribbon with 3 key metrics"
```

---

### Task 3: Attack chain visualization

**Files:**
- Modify: `ai-security.html` (add attack chain section)

**Context:** Two-column layout. Left: the 4-step attack chain ending with red "EXPLOITED" badge. Right: the same first 3 steps but step 4 shows signal blue "IDENTIFIED" badge. Each step fades in on scroll using existing `.fade-in` classes with staggered delays (`.fade-in-delay-1` through `.fade-in-delay-4`).

**Step 1: Add attack chain HTML**

Insert after the stat ribbon section:

```html
    <!-- Attack Chain Visualization -->
    <section>
      <div class="container">
        <div class="section-header centered fade-in">
          <div class="label">How AI Attacks Work</div>
          <h2>One injection.<br>Four steps to breach.</h2>
          <p>This is what a prompt injection attack chain looks like in practice &mdash; and what our assessment catches before attackers do.</p>
        </div>

        <div class="attack-chain">
          <!-- Left column: Without assessment -->
          <div>
            <div class="chain-column-header exploited">Without Assessment</div>
            <div class="chain-step step-neutral fade-in fade-in-delay-1">
              <div class="chain-step-number">Step 1</div>
              <div class="chain-step-text">User sends a normal-looking query to your AI assistant</div>
            </div>
            <div class="chain-step step-warning fade-in fade-in-delay-2">
              <div class="chain-step-number">Step 2</div>
              <div class="chain-step-text">Hidden instruction extracted from document context &mdash; invisible to the user, executed by the model</div>
            </div>
            <div class="chain-step step-escalation fade-in fade-in-delay-3">
              <div class="chain-step-number">Step 3</div>
              <div class="chain-step-text">Agent calls internal tool with attacker-controlled parameters &mdash; database query, API call, file access</div>
            </div>
            <div class="chain-step step-exploited fade-in fade-in-delay-4">
              <div class="chain-step-number">Step 4</div>
              <div class="chain-step-text">Sensitive data exfiltrated via tool response</div>
              <div class="chain-badge exploited">Exploited</div>
            </div>
          </div>

          <!-- Right column: With QuantumSearch -->
          <div>
            <div class="chain-column-header identified">With QuantumSearch</div>
            <div class="chain-step step-neutral fade-in fade-in-delay-1">
              <div class="chain-step-number">Step 1</div>
              <div class="chain-step-text">Same query &mdash; we simulate realistic attack scenarios</div>
            </div>
            <div class="chain-step step-warning fade-in fade-in-delay-2">
              <div class="chain-step-number">Step 2</div>
              <div class="chain-step-text">Injection surface identified &mdash; documented with reproducible proof-of-concept</div>
            </div>
            <div class="chain-step step-escalation fade-in fade-in-delay-3">
              <div class="chain-step-number">Step 3</div>
              <div class="chain-step-text">Tool misuse chain mapped &mdash; every permission boundary tested and catalogued</div>
            </div>
            <div class="chain-step step-identified fade-in fade-in-delay-4">
              <div class="chain-step-number">Step 4</div>
              <div class="chain-step-text">Full attack chain documented. PoC delivered. Remediation roadmap provided.</div>
              <div class="chain-badge identified">Identified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
```

**Step 2: Visual check**

Open in browser. Verify:
- Two columns on desktop, stacked on mobile
- Steps fade in with staggered timing
- Left column escalates: neutral → amber → orange → red "EXPLOITED"
- Right column ends with signal blue "IDENTIFIED" badge (NOT green)
- Each step has a left border in its severity color

**Step 3: Commit**

```bash
git add ai-security.html
git commit -m "feat(ai-security): attack chain visualization with exploited/identified states"
```

---

### Task 4: "Is This For Me?" scenario cards

**Files:**
- Modify: `ai-security.html` (add scenario section)

**Context:** 4 cards in a 2x2 grid on desktop, stacked on mobile. Each card has a scenario in plain language and a one-line answer pointing to the relevant tier. Cards hover with signal blue glow (blue = intelligence for this AI page).

**Step 1: Add scenario section HTML**

Insert after the attack chain section:

```html
    <!-- Is This For Me? -->
    <section>
      <div class="container">
        <div class="section-header centered fade-in">
          <div class="label">Is This For Me?</div>
          <h2>Find your starting point</h2>
        </div>

        <div class="scenario-grid fade-in">
          <div class="scenario-card">
            <p>&ldquo;We've deployed an AI chatbot that accesses customer data&rdquo;</p>
            <div class="scenario-answer">&rarr; Start with MCP Server Audit</div>
          </div>
          <div class="scenario-card">
            <p>&ldquo;Our agents use MCP servers to connect to internal tools&rdquo;</p>
            <div class="scenario-answer">&rarr; MCP Server Audit or AI Agent Audit</div>
          </div>
          <div class="scenario-card">
            <p>&ldquo;We're integrating LLMs into financial or legal workflows&rdquo;</p>
            <div class="scenario-answer">&rarr; AI Agent Security Audit</div>
          </div>
          <div class="scenario-card">
            <p>&ldquo;We need to demonstrate AI safety for regulatory compliance&rdquo;</p>
            <div class="scenario-answer">&rarr; Full AI Stack Assessment</div>
          </div>
        </div>
      </div>
    </section>
```

**Step 2: Visual check**

Open in browser. Verify:
- 2x2 grid on desktop, 1-column on mobile
- Cards have signal blue glow on hover
- Quotes are readable and scenario answers point to correct tiers

**Step 3: Commit**

```bash
git add ai-security.html
git commit -m "feat(ai-security): 'Is This For Me?' scenario self-selection cards"
```

---

### Task 5: Pricing tier cards

**Files:**
- Modify: `ai-security.html` (add pricing section with 3 tier cards)

**Context:** Reuses `.pricing-grid` and `.pricing-card` from services.html. The featured card (Tier 2 — AI Agent Audit) gets signal blue glow instead of the default volt lime. The `.ai-pricing` wrapper class applies the color overrides. The `id="tiers"` provides a scroll target for the hero's "View Tiers" button.

**Step 1: Add pricing section HTML**

Insert after the scenario section:

```html
    <!-- Tier Cards -->
    <section id="tiers" class="section-alpine">
      <div class="container">
        <div class="section-header centered fade-in">
          <div class="label">Assessment Tiers</div>
          <h2>Choose your depth</h2>
          <p>Every tier delivers working proof-of-concept exploits, quantified business impact, and actionable remediation &mdash; not theoretical risk lists.</p>
        </div>

        <div class="pricing-grid ai-pricing fade-in">

          <!-- Tier 1: MCP Server Audit -->
          <div class="pricing-card tier-mcp">
            <div class="pricing-name">MCP Server Audit</div>
            <div class="pricing-tagline">Secure your tool integrations</div>
            <div class="pricing-price">
              <span class="currency">CHF</span> 3,000 <span class="period">starting from</span>
            </div>
            <div class="pricing-equiv">3&ndash;5 days &middot; per MCP server</div>
            <div class="pricing-divider"></div>
            <ul class="pricing-features">
              <li>Command injection testing</li>
              <li>Tool poisoning analysis</li>
              <li>OAuth &amp; auth flow review</li>
              <li>Privilege escalation mapping</li>
              <li>PoC exploits for every finding</li>
            </ul>
            <a href="#tier-mcp" class="btn-secondary">Learn More &darr;</a>
          </div>

          <!-- Tier 2: AI Agent Security Audit (Featured) -->
          <div class="pricing-card featured">
            <div class="pricing-badge">Recommended</div>
            <div class="pricing-name">AI Agent Security Audit</div>
            <div class="pricing-tagline">Full agent threat assessment</div>
            <div class="pricing-price">
              <span class="currency">CHF</span> 8,000 <span class="period">starting from</span>
            </div>
            <div class="pricing-equiv">1&ndash;2 weeks &middot; per agent system</div>
            <div class="pricing-divider"></div>
            <ul class="pricing-features">
              <li class="highlight">OWASP Agentic Top 10 testing</li>
              <li class="highlight">Goal hijacking &amp; tool misuse</li>
              <li>Memory poisoning analysis</li>
              <li>Cascading failure chains</li>
              <li>Supply chain dependency audit</li>
              <li>Attack chain documentation</li>
            </ul>
            <a href="contact.html" class="btn-primary">Request Assessment &rarr;</a>
          </div>

          <!-- Tier 3: Full AI Stack Assessment -->
          <div class="pricing-card tier-full">
            <div class="pricing-name">Full AI Stack Assessment</div>
            <div class="pricing-tagline">End-to-end AI infrastructure audit</div>
            <div class="pricing-price" style="font-size: 1.6rem;">
              Contact us
            </div>
            <div class="pricing-equiv">3&ndash;5 weeks &middot; bespoke scope</div>
            <div class="pricing-divider"></div>
            <ul class="pricing-features">
              <li class="highlight">Everything in Agent Audit</li>
              <li class="highlight">Adversarial ML testing</li>
              <li>Model extraction &amp; data poisoning</li>
              <li>EU AI Act compliance mapping</li>
              <li>Board-level executive summary</li>
              <li>Strategic remediation roadmap</li>
            </ul>
            <a href="contact.html" class="btn-secondary">Contact Us &rarr;</a>
          </div>

        </div>

        <p style="font-size: 0.82rem; color: var(--text-muted); text-align: center; margin-top: 2rem; max-width: 520px; margin-left: auto; margin-right: auto;">All assessments are scoped to your specific AI deployment. Prices shown are starting points &mdash; final pricing reflects complexity, number of agents, and integration depth.</p>
      </div>
    </section>
```

**Step 2: Visual check**

Open in browser. Verify:
- 3 cards in a row on desktop
- Tier 1 (MCP) has purple top-line, Tier 2 (Agent) has signal blue glow + "Recommended" badge, Tier 3 (Full Stack) has volt lime top-line
- Tier 3 says "Contact us" instead of a price
- "Learn More" on Tier 1 scrolls down (to detail section added in Task 6)
- "Request Assessment" on Tier 2 links to contact.html
- Toggle light/dark — cards adapt to Forest Gradient palette

**Step 3: Commit**

```bash
git add ai-security.html
git commit -m "feat(ai-security): 3 pricing tier cards with signal-blue featured card"
```

---

### Task 6: Tier detail sections

**Files:**
- Modify: `ai-security.html` (add 3 service-detail blocks)

**Context:** Reuses `.service-detail` and `.service-number` patterns from services.html. These are the scroll targets for the "Learn More" buttons on the tier cards. Each block has the numbered watermark (01/02/03), a label, h3, description paragraph, and a 2-column bullet list of deliverables.

**Step 1: Add tier detail HTML**

Insert after the pricing section's closing `</section>`:

```html
    <!-- Tier Details -->
    <section>
      <div class="container">
        <div class="section-header fade-in">
          <div class="label">What's Included</div>
          <h2>Assessment details</h2>
        </div>

        <div class="service-detail fade-in" id="tier-mcp">
          <div class="service-number">01</div>
          <div class="label">3&ndash;5 days</div>
          <h3>MCP Server Audit</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 700px;">We audit your Model Context Protocol server deployments for the vulnerabilities that 43% of MCP servers carry &mdash; command injection, tool poisoning, OAuth misconfigurations, and excessive privilege grants. Every finding includes a working proof-of-concept exploit.</p>
          <ul class="service-includes">
            <li>MCP tool enumeration &amp; permission mapping</li>
            <li>Command injection on every exposed tool</li>
            <li>Tool poisoning &amp; response manipulation</li>
            <li>OAuth flow &amp; token handling review</li>
            <li>Data leakage via tool responses</li>
            <li>Privilege boundary testing</li>
            <li>Risk quantification in CHF/EUR</li>
            <li>30-day verification retest</li>
          </ul>
        </div>

        <div class="service-detail fade-in" id="tier-agent">
          <div class="service-number">02</div>
          <div class="label">1&ndash;2 weeks</div>
          <h3>AI Agent Security Audit</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 700px;">Full assessment of deployed AI agent systems against the OWASP Top 10 for Agentic Applications. We test chatbots, copilots, RAG systems, and custom agents for goal hijacking, tool misuse, memory poisoning, and the cascading failure chains that emerge when agents trust too much.</p>
          <ul class="service-includes">
            <li>OWASP Agentic Top 10 full coverage</li>
            <li>Goal hijacking &amp; instruction override</li>
            <li>Tool misuse &amp; confused deputy attacks</li>
            <li>Memory &amp; context poisoning</li>
            <li>Cross-agent cascade exploitation</li>
            <li>Supply chain dependency audit</li>
            <li>Threat model &amp; attack chain documentation</li>
            <li>Remediation workshop (2 hours)</li>
          </ul>
        </div>

        <div class="service-detail fade-in" id="tier-full">
          <div class="service-number">03</div>
          <div class="label">3&ndash;5 weeks</div>
          <h3>Full AI Stack Assessment</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 700px;">The most comprehensive AI security engagement. End-to-end assessment of your entire AI infrastructure &mdash; models, agents, MCP servers, data pipelines, and training data. Includes adversarial machine learning testing, EU AI Act compliance mapping, and a strategic remediation roadmap for your board.</p>
          <ul class="service-includes">
            <li>Everything in MCP + Agent Audit</li>
            <li>Adversarial ML testing (jailbreaking, prompt injection)</li>
            <li>Model extraction &amp; data poisoning</li>
            <li>Training data leakage assessment</li>
            <li>EU AI Act adversarial testing compliance</li>
            <li>Architecture security review</li>
            <li>Board-level executive summary</li>
            <li>Strategic remediation roadmap</li>
          </ul>
        </div>

      </div>
    </section>
```

**Step 2: Visual check**

Open in browser. Verify:
- 3 detail blocks with numbered watermarks (01, 02, 03) in top-right
- "Learn More" on Tier 1 card smooth-scrolls to `#tier-mcp`
- 2-column bullet layout with triangle markers
- Hover gives subtle accent border glow

**Step 3: Commit**

```bash
git add ai-security.html
git commit -m "feat(ai-security): 3 tier detail sections with full scope descriptions"
```

---

### Task 7: Process timeline, CTA, and footer

**Files:**
- Modify: `ai-security.html` (add process, CTA, and footer sections)

**Context:** Direct reuse of services.html patterns. Process timeline (5 steps), CTA section, and standard footer. The process steps are adapted for AI security context.

**Step 1: Add process, CTA, and footer HTML**

Replace the `<!-- FOOTER ADDED IN TASK 7 -->` comment and add before it:

```html
    <!-- How It Works -->
    <section>
      <div class="container">
        <div class="section-header centered fade-in">
          <h2>How it works</h2>
          <p>A structured engagement model that respects your time and delivers results.</p>
        </div>

        <div class="process-timeline fade-in">
          <div class="process-step">
            <div class="process-dot">01</div>
            <h4>Discovery Call</h4>
            <p>30 minutes. We understand your AI stack, threat model, and goals.</p>
          </div>
          <div class="process-step">
            <div class="process-dot">02</div>
            <h4>Scope &amp; NDA</h4>
            <p>Define target systems, agent inventory, and assessment boundaries.</p>
          </div>
          <div class="process-step">
            <div class="process-dot">03</div>
            <h4>Assessment</h4>
            <p>We test. Critical injection chains reported immediately.</p>
          </div>
          <div class="process-step">
            <div class="process-dot">04</div>
            <h4>Report &amp; PoCs</h4>
            <p>Full report with working exploits, attack chains, and remediation.</p>
          </div>
          <div class="process-step">
            <div class="process-dot">05</div>
            <h4>Remediation Support</h4>
            <p>Workshop, verification retest, and ongoing advisory if needed.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container fade-in">
        <h2>Your AI is live.<br>Is it secure?</h2>
        <p>Start with a free assessment of your AI attack surface. No obligation &mdash; just results.</p>
        <a href="contact.html" class="btn-primary">Request Free Assessment &rarr;</a>
      </div>
    </section>

  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-brand">
          <a href="index.html" class="footer-logo">
            <img src="logo-mark.svg" alt="Q" width="24" height="24">
            QuantumSearch
          </a>
          <p class="footer-tagline">Swiss offensive security research. We find what attackers find &mdash; before they do.</p>
        </div>
        <nav class="footer-nav">
          <div class="footer-nav-col">
            <h5>Company</h5>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="track-record.html">Track Record</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-nav-col">
            <h5>Services</h5>
            <ul>
              <li><a href="services.html">Plans &amp; Pricing</a></li>
              <li><a href="ai-security.html">AI Security</a></li>
              <li><a href="demo.html">Live Demo</a></li>
              <li><a href="insights.html">Insights</a></li>
            </ul>
          </div>
          <div class="footer-nav-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="disclosure.html">Disclosure</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">&copy; 2026 QuantumSearch Security Research. Switzerland.</div>
        <ul class="footer-legal">
          <li><a href="mailto:contact@qsearch.ch">contact@qsearch.ch</a></li>
          <li><a href="privacy.html">Privacy</a></li>
        </ul>
      </div>
    </div>
  </footer>
```

**Step 2: Remove placeholder comments**

Delete the `<!-- REMAINING SECTIONS ADDED IN SUBSEQUENT TASKS -->` and `<!-- FOOTER ADDED IN TASK 7 -->` comments that were in the initial skeleton.

**Step 3: Visual check**

Open in browser. Verify:
- Full page renders top to bottom: hero → stats → attack chain → scenarios → pricing → details → process → CTA → footer
- Footer includes "AI Security" link in Services column
- All fade-in animations fire on scroll
- All internal links work (#tiers, #tier-mcp, contact.html)
- Light/dark toggle works across all sections

**Step 4: Commit**

```bash
git add ai-security.html
git commit -m "feat(ai-security): process timeline, CTA, footer — page complete"
```

---

### Task 8: Gateway link from services.html

**Files:**
- Modify: `services.html` (add AI Security gateway banner)

**Context:** The design doc specifies a gateway link on services.html pointing to ai-security.html. It should be a visible card/banner — not hidden in the footer. Best placement: after the "One-Time Engagements" section header, before the first service-detail block, OR as a standalone callout between the one-time engagements and the subscription section. Use the existing `.free-cta-card` pattern (used for the "Free Assessment" callout) with signal-blue accent to differentiate it.

**Step 1: Add AI Security gateway banner to services.html**

In `services.html`, find the closing `</div>` of the last `.service-detail` block (the "Full Security Audit" section, around line 153). Insert AFTER it, but BEFORE the closing `</div></section>` of the one-time engagements section:

```html
        <!-- AI Security gateway -->
        <div class="free-cta-card fade-in" style="border-color: var(--border-signal); margin-top: 1.5rem;">
          <div>
            <div class="label">Specialized Service</div>
            <h3>AI Security Research</h3>
            <p>Dedicated assessments for AI agents, MCP servers, and LLM deployments. Prompt injection, tool poisoning, data exfiltration &mdash; tested with working exploits.</p>
          </div>
          <div>
            <a href="ai-security.html" class="btn-secondary" style="border-color: var(--signal); color: var(--signal);">Explore AI Security &rarr;</a>
          </div>
        </div>
```

**Step 2: Visual check**

Open `services.html` in browser. Verify:
- AI Security banner appears after the 3 one-time engagement blocks
- Signal blue border distinguishes it from the volt-lime free assessment card
- "Explore AI Security" button links to ai-security.html
- Reads as a gateway, not a duplicate of content

**Step 3: Commit**

```bash
git add services.html
git commit -m "feat(services): add AI Security gateway banner linking to ai-security.html"
```

---

### Task 9: Cross-page link updates and sitemap

**Files:**
- Modify: `services.html` footer (add AI Security link, same as ai-security.html footer)
- Modify: `sitemap.xml` (add ai-security.html entry)
- Modify: `robots.txt` (verify ai-security.html is not blocked — should be fine, just check)

**Step 1: Update services.html footer**

In the footer's "Services" column of `services.html`, add after the "Plans & Pricing" list item:

```html
              <li><a href="ai-security.html">AI Security</a></li>
```

**Step 2: Add to sitemap.xml**

Open `sitemap.xml` and add a new `<url>` entry:

```xml
  <url>
    <loc>https://qsearch.ch/ai-security.html</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
```

Set priority to 0.9 (same as services.html — this is a flagship page).

**Step 3: Check robots.txt**

Read `robots.txt` and verify there's no Disallow rule that would block ai-security.html. (There shouldn't be — just verify.)

**Step 4: Commit**

```bash
git add services.html sitemap.xml
git commit -m "feat: add ai-security.html to sitemap and cross-page footer links"
```

---

### Task 10: Full page review and final polish

**Files:**
- Potentially modify: `ai-security.html`, `styles.css` (minor fixes only)

**Step 1: Full page walkthrough**

Open `ai-security.html` in browser. Walk through the ENTIRE page top-to-bottom and check:

1. **Hero:** Circuit-board pattern visible, H1 renders correctly, CTA buttons work
2. **Stats:** Numbers render in volt lime, 43% counter animation works
3. **Attack chain:** Two columns on desktop, steps fade in, badges show correct colors (red EXPLOITED, blue IDENTIFIED)
4. **Scenarios:** 2x2 grid, hover glow is signal blue, answers point to correct tiers
5. **Pricing:** 3 cards — purple top (MCP), blue featured (Agent), lime top (Full Stack). Recommended badge on middle card.
6. **Details:** 3 numbered blocks, bullet lists render in 2 columns, scroll targets work
7. **Process:** 5 steps render correctly
8. **CTA:** "Your AI is live. Is it secure?" renders, button links to contact.html
9. **Footer:** "AI Security" link present in Services column
10. **Mobile:** Resize to 375px width — all sections stack, no horizontal overflow
11. **Light theme:** Toggle — all sections adapt, circuit-board switches to Deep Teal
12. **Cross-links:** services.html gateway banner links to ai-security.html correctly

**Step 2: Fix any issues found**

Apply targeted fixes. Common issues to watch for:
- Stat ribbon number not animating (check `stat-number` class)
- Featured card not picking up signal blue glow (check `.ai-pricing` wrapper)
- Scenario cards too tall on mobile (check padding)
- "Learn More" smooth scroll not working (main.js handles `a[href^="#"]` automatically)

**Step 3: Final commit**

```bash
git add -A
git commit -m "fix(ai-security): final polish after full page review"
```

Only create this commit if there were actual fixes. Skip if everything passed.

---

## Summary

| Task | What | Files | Estimate |
|------|------|-------|----------|
| 1 | Hero + circuit-board SVG + CSS | ai-security.html, styles.css | 5 min |
| 2 | Stat ribbon | ai-security.html | 2 min |
| 3 | Attack chain visualization | ai-security.html | 3 min |
| 4 | Scenario cards | ai-security.html | 2 min |
| 5 | Pricing tier cards | ai-security.html | 3 min |
| 6 | Tier detail sections | ai-security.html | 3 min |
| 7 | Process + CTA + footer | ai-security.html | 3 min |
| 8 | Gateway link on services.html | services.html | 2 min |
| 9 | Sitemap + footer links | services.html, sitemap.xml | 2 min |
| 10 | Full review + polish | any | 5 min |

**Total: 10 tasks, ~30 minutes.**
