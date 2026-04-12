# QuantumSearch — Facebook Ads Campaign

**Platform:** Meta (Facebook + Messenger)
**Language:** Italiano
**Market:** Italia + Ticino (CH)
**Objective:** Lead Generation (B2B scans) + Traffic (B2C signups)
**Monthly Budget:** CHF 300

---

## Targeting Criteria (Shared Across All Variants)

### Audience A: Titolari PMI (Primary — B2B Track)

| Parameter | Value |
|-----------|-------|
| Località | Italia: Lombardia, Piemonte, Veneto, Emilia-Romagna, Lazio, Toscana, Ticino (CH) |
| Età | 35–60 |
| Genere | Tutti |
| Lingua | Italiano |
| Interessi | Imprenditoria, gestione aziendale, PMI, digitalizzazione, innovazione, cybersecurity |
| Comportamenti | Amministratori di pagine aziendali, decision-maker aziendali |
| Titoli di lavoro | Titolare, CEO, Amministratore delegato, Direttore generale, Fondatore |
| Dimensione azienda | 5–200 dipendenti |
| Esclusioni | Studenti, disoccupati, settore cybersecurity (competitor) |
| Stima audience | 250K–500K |

### Audience B: IT Professionals (Secondary — B2C Track)

| Parameter | Value |
|-----------|-------|
| Località | Italia (tutte le regioni) + Ticino (CH) |
| Età | 25–50 |
| Interessi | Sicurezza informatica, hacking etico, Linux, programmazione, reti informatiche, server |
| Titoli | IT Manager, System Administrator, Network Engineer, CTO, Developer |
| Esclusioni | Cybersecurity professionals (competitor audience) |
| Stima audience | 150K–300K |

### Audience C: Compliance / Legal (Tertiary)

| Parameter | Value |
|-----------|-------|
| Località | Italia + Svizzera |
| Interessi | GDPR, compliance, protezione dati, privacy, normativa, ISO 27001 |
| Titoli | DPO, Data Protection Officer, Compliance Manager, Risk Manager, Consulente privacy |
| Stima audience | 30K–80K |

---

## Ad Variant 1: "L'Attacco Silenzioso" (Fear-Based — B2B)

**Objective:** B2B Track — drive company scans
**Audience:** A (Titolari PMI)
**Format:** Single Image
**Placement:** Feed + Messenger

### Copy (Primary Text)
```
Nel 2025, il 72% degli attacchi informatici in Italia ha colpito PMI con meno di 100 dipendenti.

Non le multinazionali. Non le banche. Aziende come la tua.

Gli hacker usano strumenti automatizzati che scansionano migliaia di siti ogni giorno. Non scelgono — trovano chi è vulnerabile.

QuantumSearch fa la stessa cosa. Ma dalla tua parte.

Inserisci il dominio della tua azienda. In 60 secondi sai se sei esposto.

Nessuna installazione. Nessuna call commerciale. Solo dati.
```

### Headline
```
La tua azienda è davvero protetta?
```

### Description
```
Scansione di sicurezza gratuita — risultati in 60 secondi
```

### CTA Button
`Scopri di più` → qsearch.ch/scan?utm_source=facebook&utm_medium=paid&utm_campaign=fear-silent-attack&utm_content=v1

### Creative Direction
- **Background:** Abyss (#0f0d18)
- **Visual:** Terminal-style interface showing a simulated scan output with redacted company names. Lines of text in JetBrains Mono, some in Volt Lime (#E4FF30), some in Signal Blue (#008BFF). Final line: `[3 CRITICAL] [7 HIGH] [12 MEDIUM] — Report ready.`
- **Logo:** Q monogram bottom-right corner
- **No:** Stock photos, hooded hackers, padlock icons, matrix rain

---

## Ad Variant 2: "60 Secondi" (Value-Based — B2C)

**Objective:** B2C Track — drive free signups
**Audience:** B (IT Professionals)
**Format:** Carousel (3 slides)
**Placement:** Feed + Instagram (cross-post)

### Copy (Primary Text)
```
Quanto tempo serve per sapere se il tuo sito è vulnerabile?

60 secondi.

QuantumSearch analizza il tuo dominio con gli stessi strumenti usati dai penetration tester professionisti — subdomain enumeration, analisi header, SSL, tecnologie esposte.

3 scansioni gratuite. Nessuna carta di credito. Risultati immediati.

Se vuoi di più: da CHF 19/mese hai accesso completo.
```

### Slide 1
- **Headline:** `Inserisci il dominio`
- **Visual:** Clean input field mockup on Abyss background, Volt Lime border, text "example.com"

### Slide 2
- **Headline:** `Scansione in corso...`
- **Visual:** Animated progress bar (static image showing 67%), scan modules listed: DNS ✓ SSL ✓ Headers ✓ Subdomains...

### Slide 3
- **Headline:** `3 Critical. 7 High. 12 Medium.`
- **Visual:** Dashboard mockup showing risk score gauge (red zone), severity breakdown bars, blurred findings list with "Sblocca tutto →" CTA

### CTA Button
`Iscriviti` → qsearch.ch/signup?utm_source=facebook&utm_medium=paid&utm_campaign=value-60seconds&utm_content=v2

### Creative Direction
- All slides use Ultraviolet Volt dark palette
- Typography: Bricolage Grotesque headings, Plus Jakarta Sans body, JetBrains Mono for technical elements
- Consistent Q monogram watermark
- Slide transitions suggest a flow: input → processing → results

---

## Ad Variant 3: "NIS2 Countdown" (Compliance Fear — B2B)

**Objective:** B2B Track — compliance-motivated scans
**Audience:** A + C (Titolari + Compliance)
**Format:** Single Image
**Placement:** Feed

### Copy (Primary Text)
```
La direttiva NIS2 è in vigore.

Le aziende che gestiscono servizi essenziali o importanti devono dimostrare misure di sicurezza adeguate. Le sanzioni arrivano fino a €10 milioni o il 2% del fatturato globale.

Non sai se sei conforme? Inizia da qui.

QuantumSearch ti mostra esattamente dove sei esposto — con un report che puoi presentare al tuo auditor, al tuo DPO, o al tuo consiglio di amministrazione.

Scansione gratuita. Report professionale. Standard svizzero.
```

### Headline
```
NIS2: sei conforme? Scoprilo in 60 secondi.
```

### Description
```
Report di sicurezza pronto per l'auditor — gratis
```

### CTA Button
`Scopri di più` → qsearch.ch/scan?utm_source=facebook&utm_medium=paid&utm_campaign=compliance-nis2&utm_content=v3

### Creative Direction
- **Background:** Abyss with subtle red danger gradient at top
- **Visual:** Large "NIS2" text in Bricolage Grotesque (800 weight), Signal Blue color. Below: countdown-style element (not a real countdown — a visual metaphor). Bottom: severity bar showing red/amber/green zones
- **Typography:** "€10.000.000" in Volt Lime, large, impossible to miss
- **Tone:** Urgent but not panicky. Swiss restraint.

---

## Ad Variant 4: "Gli Strumenti Esistono" (XanthroxAI Counter — Fear)

**Objective:** Brand awareness + B2B scans
**Audience:** A + B (Titolari + IT)
**Format:** Single Image
**Placement:** Feed + Right Column

### Copy (Primary Text)
```
Strumenti come XanthroxAI permettono a chiunque di lanciare attacchi informatici automatizzati. Nessuna competenza tecnica richiesta.

Il costo? Poche decine di euro al mese.

Il tuo sito web, il tuo e-commerce, i dati dei tuoi clienti — sono tutti bersagli potenziali.

Non puoi impedire che questi strumenti esistano. Ma puoi sapere se sei vulnerabile prima che lo scopra qualcun altro.

QuantumSearch usa la stessa tecnologia offensiva — ma per proteggere, non per attaccare.
```

### Headline
```
L'intelligenza artificiale attacca. Tu sei pronto?
```

### Description
```
Stessi strumenti degli hacker. Dalla tua parte.
```

### CTA Button
`Scopri di più` → qsearch.ch/scan?utm_source=facebook&utm_medium=paid&utm_campaign=fear-xanthrox&utm_content=v4

### Creative Direction
- **Background:** Deep Abyss with Electric Purple (#5B23FF) glow emanating from center
- **Visual:** Split screen concept — LEFT side: terminal with red text (simulated attack commands, blurred). RIGHT side: terminal with Volt Lime text (QuantumSearch scan, clear). Dividing line: purple→blue gradient
- **Text overlay:** "Stessi strumenti. Lato diverso." in Bricolage Grotesque
- **Q monogram** centered on the dividing line

---

## Ad Variant 5: "Caso Reale" (Social Proof — B2B)

**Objective:** B2B Track — trust-building
**Audience:** A (Titolari PMI)
**Format:** Single Image
**Placement:** Feed

### Copy (Primary Text)
```
Un'azienda svizzera con 45 dipendenti.

Il loro sito web era online da 3 anni. Nessun problema apparente. Nessun incidente.

La nostra scansione ha trovato:
→ 3 vulnerabilità critiche
→ 7 ad alto rischio
→ 12 di media gravità

Un certificato SSL scaduto, un pannello di amministrazione esposto, e una versione di WordPress con 4 CVE note.

Non sapevano nulla.

Ora tu puoi sapere. In 60 secondi.
```

### Headline
```
45 dipendenti. 22 vulnerabilità. Zero consapevolezza.
```

### Description
```
Scopri cosa gli hacker vedono quando guardano la tua azienda.
```

### CTA Button
`Inizia la scansione` → qsearch.ch/scan?utm_source=facebook&utm_medium=paid&utm_campaign=social-proof&utm_content=v5

### Creative Direction
- **Background:** Abyss
- **Visual:** Simplified dashboard mockup showing a risk score gauge hitting "Critical" zone. Below: three severity bars (Critical: 3, High: 7, Medium: 12) in appropriate semantic colors (red, amber, Volt Lime)
- **Typography:** The numbers "3 · 7 · 12" large in Bricolage Grotesque, Volt Lime
- **Note:** The case is generalized from real QuantumSearch findings — never identify real clients
- **Watermark:** "QuantumSearch Security Research" in JetBrains Mono, small, bottom-left

---

## Retargeting Strategy

### Retargeting Audience 1: Website Visitors (No Scan)

| Parameter | Value |
|-----------|-------|
| Source | Meta Pixel — visited qsearch.ch but did NOT start a scan |
| Window | 3–14 days |
| Ad | Variant 2 (value-based, softer CTA) |
| Budget | 15% of total Facebook budget |

### Retargeting Audience 2: Scan Started, Not Completed

| Parameter | Value |
|-----------|-------|
| Source | Meta Pixel — started scan but abandoned |
| Window | 1–7 days |
| Ad | "Il tuo report è quasi pronto. Completa la scansione." + dashboard preview |
| Budget | 10% of total Facebook budget |

### Retargeting Audience 3: Teaser Viewed, Not Paid

| Parameter | Value |
|-----------|-------|
| Source | Meta Pixel — viewed teaser dashboard but didn't checkout |
| Window | 1–14 days |
| Ad | "Hai visto i rischi. Sblocca il report completo." + urgency element |
| Budget | 15% of total Facebook budget |

---

## Campaign Structure (Meta Ads Manager)

```
Campaign: QS-IT-LeadGen-2026Q2
├── Ad Set: Titolari-PMI-NordItalia
│   ├── Ad: V1-Attacco-Silenzioso
│   ├── Ad: V3-NIS2-Countdown
│   └── Ad: V5-Caso-Reale
├── Ad Set: IT-Professionals-Italia
│   ├── Ad: V2-60-Secondi (carousel)
│   └── Ad: V4-XanthroxAI-Counter
├── Ad Set: Compliance-Italia-CH
│   └── Ad: V3-NIS2-Countdown
└── Ad Set: Retargeting-AllVisitors
    ├── Ad: RT1-Website-NoScan
    ├── Ad: RT2-Scan-Abandoned
    └── Ad: RT3-Teaser-NoPay
```

---

*QuantumSearch Security Research — Facebook Ads v1.0*
