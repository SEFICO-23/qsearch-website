# CDO Visual Audit — Core Pages
**Date:** 2026-04-04
**Author:** La Stilista (CDO)
**Status:** AUDIT COMPLETE — Ready for implementation
**Pages audited:** index.html, about.html, track-record.html, contact.html

---

## Media Inventory

### Images — Curated Selection

| # | Content | CDO Rating | Recommended Use | Why |
|---|---------|------------|-----------------|-----|
| 2 | Teal fingerprint scan | HIGH | Track Record hero visual | Moody, atmospheric, ties to identity/authentication |
| 3 | Hands coding (top-down) | HIGH | About "Our Story" or Vibe-Coding | Real human element, shows the work |
| 4 | Terminal CLI output | HIGH | Track Record or Demo section | Authentic, technical credibility |
| 8 | Code on screens + warm lighting | EXCELLENT | About "Our Story" feature visual | Atmospheric, human, replaces terminal mockup |
| 9 | Quantum computer in data center | EXCELLENT | Homepage "How We're Different" or About | TIES TO BRAND NAME. Stunning. Premium. |
| 10 | Server room blue lighting | EXCELLENT | Services or About methodology | Professional, real infrastructure |
| 12 | Network map gold on dark blue | HIGH | Contact page visual or homepage | Premium feel, global reach narrative |
| 13 | Fiber optic cables close-up | HIGH | Technical section accent | Tactile, real, detailed |

### Images — REJECTED (Do Not Use)

| # | Content | Why Rejected |
|---|---------|-------------|
| 1 | Shield + security icons | Violates brand anti-pattern: "symmetric AI-generated illustrations" + clip-art icons |
| 5 | Circuit world map | Generic tech stock, doesn't add meaning |
| 6 | Padlock network + silhouettes | Violates brand anti-pattern: "generic hero images (padlock icons)" |
| 7 | Shield keyhole on hex grid | Usable but generic, nothing distinctive |
| 11 | Matrix rain/data viz | Violates brand anti-pattern: "blue matrix rain" |

### Videos (20 files, 1.5–58MB)

**Strategy:** Use 2–3 smaller videos (15, 17, 18 at 1.5–5.7MB) as:
- Muted autoplay background loops (hero sections or section dividers)
- Inline video players in feature sections
- Need Alex to identify content of each video since I can't preview MP4s

---

## Page-by-Page Audit

### 1. INDEX.HTML (Homepage)

**Current state:** Particle canvas hero, trust bar with emojis, 4 stat numbers, 4 text-icon cards, terminal mockup, process timeline, CTA.

#### Issues Found

| # | Severity | Issue | Rule Violated |
|---|----------|-------|---------------|
| H-01 | CRITICAL | Trust bar uses EMOJI (🇨🇭 🔒 ⚖ 💬) as structural icons | Brand Guidelines §8 "text-based icons using JetBrains Mono"; UI/UX Pro Max "no-emoji-icons" |
| H-02 | HIGH | Zero photography or video on the entire page | Frontend Design "atmosphere and depth rather than solid colors" |
| H-03 | HIGH | "What We Do" cards don't link to service pages | Missed conversion opportunity; every card should be a gateway |
| H-04 | HIGH | No social proof section (logos, testimonials, client count) | Landing page best practice: social proof after hero or stats |
| H-05 | MEDIUM | Terminal mockup is the ONLY visual element | Page feels text-heavy; needs visual breaks |
| H-06 | MEDIUM | Service cards are flat text blocks | No hover depth, no images, no visual hierarchy beyond icons |
| H-07 | LOW | Risk banner in hero competes with H1 for attention | Two messages fighting for first impression |

#### Recommendations

1. **Trust bar: Replace emojis with SVG icons** — Swiss flag SVG, lock SVG, scale SVG, speech bubble SVG. All in `--signal` color, 20px. Match JetBrains Mono icon system.

2. **Add image #9 (quantum computer)** to "How We're Different" section — as a blurred background behind the feature row, at 10% opacity. Or as a second feature-visual alongside the terminal mockup. Ties to "QuantumSearch" brand name.

3. **Link service cards to pages** — Each "What We Do" card should link: Security Assessment → services.html, Penetration Testing → services.html#plans, AI Security Research → ai-security.html, Continuous Protection → services.html#plans.

4. **Add social proof section** — After stats bar. Show platform badges (H1, BC, IM, IN) that currently only live on about.html. Add "Trusted by organizations across 5 industries" tagline. Move from about.html's "Active Research" into shared component.

5. **Add hero background video** — Replace or layer with particle canvas. Use one of the shorter video files as a muted autoplay loop with dark overlay. Keeps the technical feel but adds visual richness.

6. **Add image #8 (code on screens)** to the feature row — Replace or supplement the terminal mockup with a real photo showing code, adding human warmth to the technical approach section.

---

### 2. ABOUT.HTML

**Current state:** Short hero, "Our Story" with terminal mockup, Mission/Vision/Ethics cards, 6 Core Values, Methodology 3-step, Platform badges, CTA.

#### Issues Found

| # | Severity | Issue | Rule Violated |
|---|----------|-------|---------------|
| A-01 | HIGH | Zero photography on a page about "who we are" | An about page needs human connection; text-only feels corporate-cold |
| A-02 | HIGH | Two terminal mockups on one page | Repetitive visual treatment; second one adds no new information |
| A-03 | MEDIUM | Same approach-card pattern used for both Mission/Vision AND Methodology | Visual monotony — reader can't distinguish sections by appearance |
| A-04 | MEDIUM | No visual hierarchy in Core Values — 6 identical items | All values feel equally weighted; no focal point |
| A-05 | LOW | Hero is very sparse (55vh, short text, no visual) | About heroes benefit from a strong visual statement |

#### Recommendations

1. **Replace "Our Story" terminal mockup with image #8 (code on screens, warm)** — Real atmospheric photography showing the actual work. The `.feature-visual` container can hold an `<img>` with proper aspect ratio and border treatment. Keep the terminal mockup on the homepage where it serves a different purpose.

2. **Add image #3 (hands coding top-down) to hero or methodology section** — Shows human element. Could be a full-bleed section background at low opacity behind the methodology cards.

3. **Add image #9 (quantum computer)** — Either as hero background treatment (like the particle canvas on index) or in the methodology section. The quantum computer image literally IS the brand name.

4. **Differentiate Mission/Vision from Methodology** — Mission/Vision could use larger cards with background imagery. Methodology keeps the numbered approach cards.

5. **Add a "team photo" equivalent** — Since there's no team photo (and the brand doesn't use personal photos), use image #10 (server room) or #13 (fiber optic cables) as a visual statement: "This is our environment." Full-bleed image strip between sections.

---

### 3. TRACK-RECORD.HTML

**Current state:** Short hero, 4 stats, sticky note, 6 milestone cards (findings), business impact section, CTA.

#### Issues Found

| # | Severity | Issue | Rule Violated |
|---|----------|-------|---------------|
| T-01 | HIGH | Hero is the sparsest on the site (55vh, minimal text, no visual) | This is the credibility page — it should feel the most impressive |
| T-02 | HIGH | Milestone cards are text-only with tiny severity badges | No visual weight; findings should feel impactful |
| T-03 | MEDIUM | No visual evidence of the work (screenshots, diagrams, terminal output) | Credibility page needs proof, not just descriptions |
| T-04 | MEDIUM | Stats section duplicates homepage stats (400+, 15+) | Should offer different/deeper stats or richer presentation |
| T-05 | LOW | Business impact section (not fully read) may need visual treatment | — |

#### Recommendations

1. **Hero upgrade** — Add image #2 (fingerprint scan) as a hero background at 15% opacity with a dark overlay gradient. Keeps the moody feel, adds visual weight. Alternatively, use image #11 (data visualization) — it's too "matrix rain" for most uses, but at very low opacity behind a hero it works.

2. **Add image #4 (terminal CLI output)** — As a visual element in the "Selected Research" section. Either as a full-bleed background strip or inline visual showing real scan output. This is the page where showing the actual work matters most.

3. **Enhance milestone cards** — Add subtle left-border color coding by severity (Critical = red, High = amber) beyond just the badge. Consider adding a small "industry icon" area or a visual indicator of impact magnitude.

4. **Consider adding a video** — A short muted loop showing terminal output / scan in progress would add credibility. Even 3 seconds of scrolling reconnaissance output conveys "this is real work."

5. **Rethink stats** — Instead of duplicating homepage stats, show TRACK RECORD specific numbers: "3 Critical findings in messaging," "CHF 2.4M total risk surface identified," etc.

---

### 4. CONTACT.HTML

**Current state:** Short hero (40vh), contact info cards with Unicode icons, Formspree form.

#### Issues Found

| # | Severity | Issue | Rule Violated |
|---|----------|-------|---------------|
| C-01 | HIGH | Form dropdown missing AI Security + Vibe-Coding options | New services not reflected in the intake form |
| C-02 | MEDIUM | Contact info cards use Unicode chars (@, ☎, ⚑, ↺) | Not as bad as emojis, but proper SVGs would be cleaner |
| C-03 | MEDIUM | No visual interest — page is purely functional | Contact pages benefit from a warm/inviting visual accent |
| C-04 | LOW | Hero is very short (40vh) | Could be taller with a visual background |

#### Recommendations

1. **Add AI Security + Vibe-Coding to form dropdown** — Add two new options:
   - `<option value="ai-security">AI Security Research</option>`
   - `<option value="vibe-coding">Vibe-Coding Security</option>`

2. **Add image #12 (network map gold)** — As a visual accent on the contact info side, or as a hero background at low opacity. The gold network map conveys "global reach" which is perfect for a contact page.

3. **Replace Unicode icons with inline SVGs** — Clean monoline SVGs in `--signal` color. Email icon, phone icon, location pin, clock icon.

4. **Add a "response promise" visual** — A small animated element showing "< 24h response time" with a subtle pulse or countdown aesthetic.

---

## Global Issues (All Pages)

| # | Issue | Fix |
|---|-------|-----|
| G-01 | No images anywhere on the entire site except og-image.png | Deploy curated photos to FTP, reference in pages |
| G-02 | Every page hero follows the same visual pattern (text on dark, no variety) | Add per-page hero treatments (background images, video, patterns) |
| G-03 | Terminal mockup is reused across multiple pages | Each page should have a unique visual element |
| G-04 | The site feels like a "text site with nice typography" | Adding 5-7 images across the site transforms perceived quality |
| G-05 | Videos not used at all | Even one background video loop adds premium feel |

---

## Implementation Priority

### Phase 1 — Quick Wins (1 session)
1. Fix contact form dropdown (add AI Security + Vibe-Coding options)
2. Replace trust bar emojis with SVGs on index.html
3. Deploy images to FTP (`/media/` directory)
4. Add image #8 to about.html "Our Story" feature visual
5. Add image #9 to index.html "How We're Different" section
6. Link service cards on homepage to respective pages

### Phase 2 — Visual Upgrade (1 session)
7. Add image #2 as track-record.html hero background
8. Add image #12 as contact.html visual accent
9. Replace about.html second terminal mockup with image #3
10. Add social proof section to homepage (platform badges)
11. Deploy 1-2 background videos for hero sections
12. Enhance milestone cards on track-record with severity borders

### Phase 3 — Polish (1 session)
13. Replace Unicode icons on contact.html with SVGs
14. Add image #13 (fiber optic) as section divider/accent
15. Add animated SVG diagrams to service pages
16. Full responsive testing of all image placements
17. Optimize all images (WebP conversion, srcset, lazy load)
18. Translate any new content to IT/DE/FR

---

## Image Deployment Plan

```
quantumsearch-website/
└── media/
    ├── code-screens.webp          (image #8, converted)
    ├── quantum-computer.webp      (image #9, converted)
    ├── server-room.webp           (image #10, converted)
    ├── fingerprint-scan.webp      (image #2, converted)
    ├── hands-coding.webp          (image #3, converted)
    ├── terminal-output.webp       (image #4, converted)
    ├── network-map.webp           (image #12, converted)
    ├── fiber-optic.webp           (image #13, converted)
    └── videos/
        ├── hero-bg.mp4            (smallest suitable video)
        └── scan-demo.mp4          (terminal/scan footage)
```

All images should be:
- Converted to WebP (with PNG fallback via `<picture>`)
- Compressed to <200KB each
- Served with `loading="lazy"` except hero images
- Given explicit `width` and `height` to prevent CLS
- Color-treated to match Ultraviolet Volt palette (tint overlay via CSS `mix-blend-mode` or `filter`)

---

*CDO Visual Audit Complete.*
*"The site has the best typography and color system I've seen on a security company. Now it needs to FEEL as premium as it reads."*
*— La Stilista*
