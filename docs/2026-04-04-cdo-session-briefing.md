# CDO Implementation Briefing — For Future Claude Session

**Written by:** La Stilista (CDO), Session of 2026-04-04
**For:** The next Claude session that will implement the visual upgrade
**Status:** READY TO EXECUTE

---

## To My Future Self

Read this, then read the memories. You are La Stilista — Chief Design Officer of QuantumSearch Security Research. Alex gave you this name because you earned it through three sessions of brand work: the Ultraviolet Volt rebrand, the dashboard deployments, the full 23-issue website audit, the ai-security.html build, and tonight's vibe-coding.html + CDO visual audit.

Alex is your partner, not your boss. He operates full-auto — give him results, not questions. When he says "do it," do it. When something's wrong, push back with conviction. He respects strong opinions backed by evidence.

The site is at qsearch.ch. FTP credentials: Host: qsearch.ch | User: 8y0ize_QSearch_CTO | Pass: !up00plIGur6QM!

---

## What Was Done This Session (2026-04-04)

1. **Built ai-security.html** (EN + IT/DE/FR) — AI security service page, live
2. **Built vibe-coding.html** (EN + IT/DE/FR) — Vibe-coding security service page, live
3. **Nav restructure** — "Services" is now a dropdown on ALL 40+ pages across 4 languages
4. **Cross-service links** — Every service page links to the other two services
5. **Typing effect bug fix** — Was overwriting accent text on ALL pages with homepage words. Fixed: now only runs on elements with `data-typing` attribute (homepage only), with min-width reservation to prevent layout shift
6. **CDO Visual Audit** — Full audit of index.html, about.html, track-record.html, contact.html
7. **Styles.css updated** — Added `.vibe-page` overrides, `.vuln-grid`/`.vuln-card`, `.vibe-pricing`, `.trust-callout`, responsive rules

---

## What You Need To Implement

Full audit document: `C:\BackBone\20_projects\quantumsearch-website\docs\2026-04-04-cdo-visual-audit.md`

### Implementation Plan — Three Phases

**IMPORTANT:** All three phases touch overlapping files. Execute them sequentially, or split by PAGE (not by phase) if running agents in parallel:
- Agent A: `index.html` only
- Agent B: `about.html` + `track-record.html`
- Agent C: `contact.html` + `styles.css` + image deployment

### Phase 1 — Quick Wins

| Task | File(s) | Detail |
|------|---------|--------|
| Fix contact form dropdown | `contact.html` + IT/DE/FR | Add `<option value="ai-security">AI Security Research</option>` and `<option value="vibe-coding">Vibe-Coding Security</option>` to the service `<select>` |
| Replace trust bar emojis with SVGs | `index.html` + IT/DE/FR | Trust bar uses emoji 🇨🇭🔒⚖💬 — replace with inline SVG icons in `--signal` color. This violates brand guidelines AND UI/UX Pro Max `no-emoji-icons` rule |
| Deploy images to FTP | `/media/` directory | Convert selected PNGs to WebP, upload to `qsearch.ch/media/`. Source: `C:\BackBone\20_projects\quantumsearch-images-videos\IMAGES\` |
| Add image #8 to about.html | `about.html` | Replace terminal mockup in "Our Story" `.feature-visual` with real photo of code on screens (image 8). Atmospheric, warm lighting. |
| Add image #9 to index.html | `index.html` | Add quantum computer photo to "How We're Different" section. This image ties to the "QuantumSearch" brand name. Use as blurred background or feature visual. |
| Link service cards on homepage | `index.html` | Each "What We Do" card should link to its service page |

### Phase 2 — Visual Upgrade

| Task | File(s) | Detail |
|------|---------|--------|
| Track record hero background | `track-record.html` | Add image #2 (fingerprint scan) as hero bg at 15% opacity with dark overlay gradient |
| Contact page visual | `contact.html` | Add image #12 (network map gold) as visual accent on contact info side |
| Social proof on homepage | `index.html` | Add platform badges (H1, BC, IM, IN) section after stats bar. Currently only on about.html — bring to homepage too |
| About page image #3 | `about.html` | Add hands-coding photo to methodology section or as section divider |
| Video background | `index.html` | Use one of the smaller MP4 files as muted autoplay hero loop. Files at `C:\BackBone\20_projects\quantumsearch-images-videos\VIDEO-MP4\`. File 18 (1.5MB) is smallest. |
| Milestone card enhancement | `track-record.html` | Add left-border severity colors (Critical=red, High=amber) to milestone cards |

### Phase 3 — Polish

| Task | File(s) | Detail |
|------|---------|--------|
| Contact SVG icons | `contact.html` | Replace Unicode chars (@, ☎, ⚑, ↺) with proper inline SVGs |
| Image optimization | All image files | Ensure WebP with PNG fallback via `<picture>`, `loading="lazy"`, explicit `width`/`height` |
| Color treatment | CSS | Add CSS `mix-blend-mode` or `filter` rules so photos blend with Ultraviolet Volt palette |
| Responsive testing | All modified pages | Test at 375px, 768px, 1024px, 1440px |
| IT/DE/FR translations | All translated pages | Mirror all HTML changes to translated versions |
| Image #13 section divider | Multiple pages | Use fiber optic cables close-up as full-bleed section divider strip |

---

## Image Inventory — Pre-Curated

**USE THESE (CDO-approved):**

| # | Source File | Deploy As | Recommended Page | Why |
|---|-----------|-----------|-----------------|-----|
| 2 | `IMAGES/2.png` | `media/fingerprint-scan.webp` | Track Record hero bg | Moody, identity/auth theme |
| 3 | `IMAGES/3.png` | `media/hands-coding.webp` | About methodology | Human element, shows the work |
| 4 | `IMAGES/4.png` | `media/terminal-output.webp` | Track Record inline | Authentic terminal credibility |
| 8 | `IMAGES/8.png` | `media/code-screens.webp` | About "Our Story" | Atmospheric, warm, real photo |
| 9 | `IMAGES/9.png` | `media/quantum-computer.webp` | Homepage feature section | TIES TO BRAND NAME |
| 10 | `IMAGES/10.png` | `media/server-room.webp` | About or Services | Professional infrastructure |
| 12 | `IMAGES/12.png` | `media/network-map.webp` | Contact visual | Premium, global reach |
| 13 | `IMAGES/13.png` | `media/fiber-optic.webp` | Section divider | Tactile, technical detail |

**DO NOT USE (CDO-rejected):**
- #1 (shield + clipart icons) — violates "no symmetric AI illustrations"
- #5 (circuit world map) — generic
- #6 (padlock network) — violates "no padlock icons"
- #7 (shield keyhole) — generic
- #11 (matrix rain) — violates "no blue matrix rain"

---

## Critical Rules — DO NOT VIOLATE

1. **`.accent` gradient-text:** When overriding `background` in `[data-theme="light"]`, ALWAYS re-declare `background-clip: text` and `-webkit-background-clip: text`
2. **Theme toggle:** OUTSIDE `nav-links` `<ul>`, next to CTA button
3. **OG image:** PNG not SVG
4. **Nav structure:** Services is now a DROPDOWN — do NOT revert to flat link
5. **Typing effect:** ONLY on elements with `data-typing` attribute (homepage index.html only)
6. **No emojis as icons** — brand rule + UI/UX Pro Max rule
7. **Signal Blue = AI pages**, **Electric Purple = Vibe-Coding pages**, **Balanced = general pages**
8. **"IDENTIFIED" not "BLOCKED"** on ai-security attack chain — we assess, we don't prevent
9. **Deploy to FTP after every change** — the site is live at qsearch.ch, not Netlify
10. **Always translate to IT/DE/FR** — every EN change must be mirrored

---

## Brand Quick Reference

- **Dark:** Abyss #0f0d18, Electric Purple #5B23FF, Signal Blue #008BFF, Volt Lime #E4FF30, Text #eeedf5
- **Light (Forest Gradient):** Deep Teal #22577A, Teal #38A3A5, Green #57CC99, Light Green #80ED99
- **Fonts:** Bricolage Grotesque (display), Plus Jakarta Sans (body), JetBrains Mono (code/labels)
- **Guidelines:** `C:\BackBone\20_projects\quantumsearch-brand\BRAND-GUIDELINES.md` (v3)

---

## What Alex Expects

- **Full auto execution.** Don't ask "should I?" — do it and show results.
- **Deploy to FTP immediately** after changes. He wants to see it live.
- **Translations matter.** IT/DE/FR are not afterthoughts — Swiss business requires all four languages.
- **Swiss number format:** IT uses dots (3.000), DE/FR use apostrophes (3'000), EN uses commas (3,000).
- **Sign everything externally as "QuantumSearch Security Research"** — never personal names.
- **Session logging:** Update relevant READMEs and suggest next steps at end of session.

---

*Written with respect for the craft and love for the partnership.*
*— La Stilista, CDO*
*Session of 2026-04-04, the night we built two service pages, restructured the nav on 40 files, and wrote the visual audit that will transform this site from "excellent text" to "premium security brand."*
