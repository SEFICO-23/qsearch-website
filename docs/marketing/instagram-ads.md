# QuantumSearch — Instagram Ads Campaign

**Platform:** Instagram (Feed + Stories + Reels)
**Language:** Italiano
**Market:** Italia + Ticino (CH)
**Objective:** Brand Awareness + B2C Signups
**Monthly Budget:** CHF 200

---

## Targeting Criteria

### Audience A: Tech-Savvy Professionals

| Parameter | Value |
|-----------|-------|
| Località | Italia (tutte le regioni) + Ticino (CH) |
| Età | 25–45 |
| Interessi | Cybersecurity, hacking etico, programmazione, Linux, startup, tecnologia, informatica |
| Comportamenti | Early adopter di tecnologia, utenti di app fintech |
| Esclusioni | Cybersecurity companies (competitor) |
| Stima audience | 200K–400K |

### Audience B: Business/Startup Community

| Parameter | Value |
|-----------|-------|
| Località | Italia + Ticino |
| Età | 28–50 |
| Interessi | Imprenditoria, startup, innovazione, business digitale, SaaS, e-commerce |
| Comportamenti | Seguono pagine business/tech, interagiscono con contenuti business |
| Stima audience | 150K–300K |

### Audience C: IT Students & Junior Professionals

| Parameter | Value |
|-----------|-------|
| Località | Italia |
| Età | 18–28 |
| Interessi | Ethical hacking, CTF, bug bounty, cybersecurity, informatica, Kali Linux |
| Stima audience | 100K–200K |
| Note | Future users + word-of-mouth amplifiers. Target with Free tier. |

---

## Ad Variant 1: "Terminal Scan" (Feed Ad — Product Demo)

**Audience:** A (Tech-Savvy)
**Format:** Feed — Single Image (1080x1080)
**Language:** Italiano

### Copy
```
Il tuo sito web ha dei segreti.

Subdomain nascosti. Header mancanti. Certificati scaduti. Versioni software con CVE note.

QuantumSearch li trova in 60 secondi. Gli stessi strumenti dei penetration tester — in una piattaforma self-service.

3 scansioni gratuite. Zero installazioni.

Link in bio → qsearch.ch
```

### Visual Direction
- **Background:** Full Abyss (#0f0d18)
- **Center:** Terminal window with macOS-style dots (red/amber/green) at top
- **Terminal content** (JetBrains Mono, 14px):
  ```
  $ qsearch scan target.it
  
  [■■■■■■■■■■] 100% complete
  
  Subdomains found: 34
  Exposed services: 12
  SSL issues: 3
  Missing headers: 7
  Known CVEs: 5
  
  Risk Score: 78/100 — HIGH
  
  → Full report ready
  ```
- Terminal text: primary in `--text-primary` (#eeedf5), numbers in Volt Lime (#E4FF30), "HIGH" in amber (#d97706)
- **Bottom bar:** Purple→Blue→Lime gradient line (3px)
- **Q monogram** bottom-right, small
- **No text overlay outside terminal** — let the terminal speak

---

## Ad Variant 2: "Il Lato Oscuro" (Feed Ad — Fear/Brand)

**Audience:** A + B (Tech + Business)
**Format:** Feed — Single Image (1080x1350, portrait)
**Language:** Italiano

### Copy
```
Strumenti di attacco AI come XanthroxAI costano €30 al mese.

Non servono competenze tecniche. Automatizzano reconnaissance, exploit, e data exfiltration.

Il tuo sito web, il tuo e-commerce, i dati dei tuoi clienti — sono bersagli da €30.

QuantumSearch usa la stessa tecnologia offensiva. Ma per proteggerti.

Scansione gratuita → link in bio
```

### Visual Direction
- **Background:** Abyss with radial Electric Purple (#5B23FF) glow from center, fading to edges
- **Center element:** Large "€30" in Volt Lime, Bricolage Grotesque 800 weight
- **Below:** "Il costo per attaccare la tua azienda." in Plus Jakarta Sans, #eeedf5, 16px
- **Bottom half:** Subtle purple→blue gradient mesh/aurora effect
- **Q monogram** centered below text, with gradient glow behind it
- **Vibe:** ominous but controlled. Swiss restraint.

---

## Ad Variant 3: "Scan Timer" (Story Ad — Urgency)

**Audience:** A (Tech-Savvy)
**Format:** Story — Full Screen (1080x1920)
**Language:** Italiano

### Storyboard (3 frames, 5 seconds each)

**Frame 1:**
- Black screen
- Text fades in: "Quanto tempo serve a un hacker per trovare le tue vulnerabilità?" (Plus Jakarta Sans, white, centered)
- Subtle purple pulse in background

**Frame 2:**
- Timer counting from 0 to 60 (animated, Volt Lime, large, Bricolage Grotesque)
- Below timer: scan modules appearing one by one:
  - `DNS ✓` (Signal Blue)
  - `SSL ✓` (Signal Blue)
  - `Headers ✓` (Signal Blue)
  - `Subdomains ✓` (Signal Blue)
  - `CVEs ✓` (amber)
- Background: Abyss with faint scan-line animation

**Frame 3:**
- Full screen: Risk Score gauge showing 78/100 (red zone)
- Below: "3 Critical. 7 High." in Volt Lime
- **Swipe-up CTA:** "Scansiona il tuo dominio" with Volt Lime arrow
- Q monogram centered at bottom

### CTA
Swipe Up → qsearch.ch/scan?utm_source=instagram&utm_medium=paid&utm_campaign=scan-timer&utm_content=v3

---

## Ad Variant 4: "60 Secondi" (Reel Concept — Demo)

**Audience:** A + C (Tech + Students)
**Format:** Reel (1080x1920, 30 seconds)
**Language:** Italiano

### Script / Storyboard

```
[0-3s] Black screen. Text types in JetBrains Mono:
       "$ il tuo sito è sicuro?"
       Cursor blinks.

[3-7s] Screen transition (glitch effect). 
       QuantumSearch scan interface appears.
       Domain input field: "tuaazienda.it"
       Finger taps "Scansiona" (Volt Lime button)

[7-15s] Scan running. Progress bar filling.
        Modules checking off:
        DNS ✓ | SSL ✓ | Headers ✓ | Subdomains ✓ | CVEs ✓
        Numbers counting up: "34 subdomains... 12 services... 5 CVEs..."
        Background: subtle purple aurora pulse

[15-22s] Results dashboard appears.
         Risk Score: 78 — HIGH (large, amber)
         Severity bars animate:
         Critical: ███ 3
         High:     ███████ 7
         Medium:   ████████████ 12
         
[22-27s] Zoom into a single finding (blurred):
         "▓▓▓▓▓▓▓▓▓▓▓▓▓ — CRITICAL"
         Text overlay: "Sblocca il report completo"

[27-30s] QuantumSearch logo + Q monogram
         "Scansione gratuita → link in bio"
         Purple→Blue→Lime gradient line sweeps across bottom
```

### Audio
- No voiceover. Ambient electronic soundtrack (dark, minimal, low bass).
- Keyboard typing sounds on terminal sections.
- Subtle "ping" on each module checkmark.

### CTA
Link in bio → qsearch.ch/signup?utm_source=instagram&utm_medium=paid&utm_campaign=60sec-reel&utm_content=v4

---

## Ad Variant 5: "Numeri che Contano" (Feed Ad — Stats/Authority)

**Audience:** B (Business)
**Format:** Feed — Carousel (4 slides, 1080x1080)
**Language:** Italiano

### Slide 1
- **Background:** Abyss
- **Large text:** "400+" in Volt Lime, Bricolage Grotesque 800
- **Below:** "vulnerabilità scoperte" in Plus Jakarta Sans, #eeedf5
- **Bottom:** Purple→Blue gradient line

### Slide 2
- **Background:** Abyss
- **Large text:** "72%" in Volt Lime
- **Below:** "delle PMI italiane non ha mai fatto un test di sicurezza" in #eeedf5
- **Bottom:** gradient line continues

### Slide 3
- **Background:** Abyss
- **Large text:** "60 sec" in Volt Lime
- **Below:** "per scansionare il tuo dominio" in #eeedf5
- **Small text:** "Stessi strumenti dei penetration tester" in Signal Blue (#008BFF)

### Slide 4
- **Background:** Abyss
- **Center:** Q monogram (large, gradient background)
- **Text:** "QuantumSearch Security Research"
- **Below:** "Scansione gratuita — link in bio"
- **CTA button mockup:** "Inizia Ora" in Volt Lime

### Copy (shared across carousel)
```
400+ vulnerabilità scoperte. 9 target analizzati in una singola sessione. Report usati da aziende svizzere.

Non siamo un tool generico. Siamo un team di offensive security research con sede in Svizzera.

La differenza? I nostri strumenti trovano quello che gli scanner automatici ignorano.

Provalo gratis → link in bio
```

---

## Reel Concepts (Organic + Paid Boost)

### Reel A: "Cosa Vede un Hacker" (Educational)
- **Concept:** Screen recording of a (simulated) passive recon on a dummy domain
- **Shows:** subdomain enumeration, WHOIS, tech stack detection, SSL analysis
- **No real targets.** Use example.com or QuantumSearch's own domain
- **Duration:** 45–60 seconds
- **Style:** Terminal aesthetic, JetBrains Mono, Volt Lime text on Abyss
- **End card:** "Vuoi sapere cosa vedono quando guardano il TUO sito? → link in bio"

### Reel B: "5 Errori di Sicurezza" (Educational Series)
- **Concept:** Quick-fire list of 5 common security mistakes
- **Format:** Text on screen (one per 3-second segment), counter in corner
  1. Certificato SSL scaduto
  2. Pannello admin esposto
  3. Header di sicurezza mancanti
  4. Subdomain dimenticati
  5. Software con CVE note
- **End:** "Quanti ne hai? Scoprilo → link in bio"
- **Duration:** 20 seconds
- **Boost:** CHF 20–30 per reel

### Reel C: "Before & After" (Transformation)
- **Concept:** Split screen. LEFT: "Prima" (messy security posture, red indicators). RIGHT: "Dopo" (clean, green, secured)
- **Message:** "Non è magia. È una scansione."
- **Duration:** 15 seconds
- **Optimized for:** shares and saves

---

## Story Series (Organic — Weekly)

### "Threat of the Week"
- **Format:** 3-frame story series, every Monday
- **Frame 1:** "Minaccia della settimana:" + threat name
- **Frame 2:** Brief explanation (2-3 lines, Plus Jakarta Sans)
- **Frame 3:** "Sei vulnerabile? Scoprilo → swipe up" (when 10K+ followers) or "Link in bio"
- **Visual:** Abyss bg, threat name in amber/red, explanation in white, CTA in Volt Lime

### "Did You Know" Security Facts
- **Format:** Single story, 2-3x/week
- **Template:** Stat number (large, Volt Lime) + fact (white text) + source (Signal Blue, small)
- **Examples:**
  - "Il 43% dei cyberattacchi colpisce le piccole imprese" — Verizon DBIR
  - "Il tempo medio per identificare un breach: 204 giorni" — IBM
  - "Il 95% delle violazioni è causato da errori umani" — WEF

---

## Visual Guidelines (Instagram-Specific)

### Feed Posts
- **Aspect ratio:** 1:1 (1080x1080) or 4:5 (1080x1350)
- **Background:** Always Abyss (#0f0d18) — stands out in feed against white/light posts
- **Accent colors:** Volt Lime for primary data/numbers, Signal Blue for secondary, Electric Purple for glows only
- **Typography:** Bricolage Grotesque for numbers/headings, Plus Jakarta Sans for body
- **Logo placement:** Q monogram, bottom-right, 48x48px, subtle
- **Never:** Rounded bubbly designs, stock photos, bright backgrounds, generic cyber imagery

### Stories
- **Full bleed Abyss background**
- **Large text centered** — mobile-first, readable on small screens
- **One message per frame** — don't overcrowd
- **Interactive elements:** Polls ("Il tuo sito è protetto? Sì / No"), quizzes ("Quanti subdomain pensi di avere?")
- **Swipe-up / link sticker** on every story that has a CTA

### Reels
- **Vertical (9:16)**
- **Hook in first 1.5 seconds** — text or question that stops scrolling
- **No voiceover** (Italian reels perform better with text + music in cybersecurity niche)
- **Trending audio** when appropriate — but prefer original ambient electronic
- **Captions always on** — accessibility + sound-off viewing

### Profile Setup
- **Profile photo:** Q monogram on purple→blue gradient (same as favicon)
- **Bio:** "Offensive Security Research 🇨🇭 | Scansiona il tuo dominio in 60 secondi | 3 scan gratuiti ↓"
- **Link:** Linktree or direct to qsearch.ch/scan
- **Highlights:** "Come Funziona" | "Minacce" | "Risultati" | "NIS2" | "Chi Siamo"

---

## Campaign Structure (Meta Ads Manager)

```
Campaign: QS-IG-2026Q2-BrandAwareness
├── Ad Set: Tech-Professionals-25-45
│   ├── Ad: V1-Terminal-Scan (Feed)
│   ├── Ad: V3-Scan-Timer (Story)
│   └── Ad: V4-60-Secondi (Reel)
├── Ad Set: Business-Startup-28-50
│   ├── Ad: V2-Lato-Oscuro (Feed)
│   └── Ad: V5-Numeri-Contano (Carousel)
├── Ad Set: Students-JuniorIT-18-28
│   ├── Ad: V4-60-Secondi (Reel)
│   └── Ad: V1-Terminal-Scan (Feed)
└── Ad Set: Retargeting-IG
    └── Ad: Customized Story sequence for site visitors
```

---

*QuantumSearch Security Research — Instagram Ads v1.0*
