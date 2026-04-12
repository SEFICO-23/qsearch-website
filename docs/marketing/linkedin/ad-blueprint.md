# LinkedIn Advertising Blueprint — QuantumSearch

**Version:** 1.0
**Date:** 2026-04-10
**Owner:** Marketing / CEO
**Budget:** CHF 300–500/month (Phase 1)
**Markets:** Italy (Lombardia, Piemonte, Lazio, Veneto, Emilia-Romagna) + Switzerland (Ticino, Zürich, Geneva)

---

## 1. Campaign Architecture

### Three Campaigns, One Funnel

```
┌─────────────────────────────────────────────────┐
│  CAMPAIGN A: Brand Awareness (TOFU)             │
│  Objective: Brand Awareness                     │
│  Budget: 25% (CHF 75–125/mo)                    │
│  Goal: Impressions + followers                  │
│  KPI: CPM < CHF 25, follower growth > 50/mo     │
├─────────────────────────────────────────────────┤
│  CAMPAIGN B: Lead Generation (MOFU)             │
│  Objective: Lead Gen / Website Visits            │
│  Budget: 50% (CHF 150–250/mo)                   │
│  Goal: Free scan signups                         │
│  KPI: CPL < CHF 60, CTR > 0.8%                  │
├─────────────────────────────────────────────────┤
│  CAMPAIGN C: Thought Leadership (TOFU/MOFU)     │
│  Objective: Engagement                           │
│  Budget: 25% (CHF 75–125/mo)                    │
│  Goal: Authority building + retargeting pool     │
│  KPI: Engagement rate > 2%, comment rate > 0.3%  │
└─────────────────────────────────────────────────┘
```

### Funnel Flow

```
Awareness (who is QS?) → Thought Leadership (why trust QS?) → Lead Gen (free scan CTA)
         ↓                          ↓                              ↓
    Retargeting pool ────────> Retargeting pool ────────> Scan → Teaser → Pay
```

---

## 2. Campaign Details

### Campaign A: Brand Awareness

**Objective in LinkedIn Campaign Manager:** Brand Awareness
**Ad Format:** Single Image Ads + Carousel Ads
**Placement:** LinkedIn Feed (desktop + mobile)

| Ad Group | Target | Content | Budget Split |
|----------|--------|---------|-------------|
| A1 — IT Decision Makers Italy | CTO/CISO/IT Manager, Italy, 10-1000 emp | "Chi protegge la tua azienda?" brand intro | 60% |
| A2 — Swiss Market | CTO/CISO/IT Manager, Ticino+Zürich+Geneva | Same content, DE/IT variants | 40% |

**Settings:**
- Daily budget: CHF 3–4
- Bid strategy: Maximum Delivery (auto-bid for awareness)
- Schedule: Mon–Fri, 7:00–19:00 CET
- Frequency cap: 3 impressions per member per week (manual monitoring)
- Rotation: Optimize for performance

**Expected Metrics (Cybersecurity vertical, IT/CH):**
| Metric | Expected Range |
|--------|---------------|
| CPM | CHF 18–30 |
| Impressions/month | 10,000–25,000 |
| CTR | 0.3–0.5% (awareness ads) |
| Follower growth | 30–80/month |

---

### Campaign B: Lead Generation

**Objective in LinkedIn Campaign Manager:** Lead Generation (LinkedIn Lead Gen Forms) OR Website Visits
**Ad Format:** Single Image Ads with Lead Gen Form
**Placement:** LinkedIn Feed

**Recommendation:** Use LinkedIn Lead Gen Forms (not website visits) for Phase 1. Lead Gen Forms pre-fill user data and convert 2-3x better than landing pages on LinkedIn. Switch to Website Visits once the platform scan flow is polished.

| Ad Group | Target | Content | Budget Split |
|----------|--------|---------|-------------|
| B1 — Fear-Based Italy | IT Managers, Italy, SMB 10-200 | Attack stats + "Scansione gratuita" CTA | 40% |
| B2 — Value-Based Italy | CTO/Founders, Italy, startup/tech | "60 secondi per sapere" value prop | 35% |
| B3 — Fear-Based Swiss | IT/Security, CH, finance/tech | Swiss regulatory angle + free scan | 25% |

**Lead Gen Form Fields:**
1. First Name (pre-filled)
2. Last Name (pre-filled)
3. Email (pre-filled — company email preferred)
4. Company Name (pre-filled)
5. Company Website (CUSTOM FIELD — this is the scan target)
6. Company Size (pre-filled)

**Privacy Policy URL:** qsearch.ch/privacy
**Thank You Message:** "Grazie! Riceverai il link per la tua scansione gratuita entro 24 ore. — QuantumSearch Security Research"

**Settings:**
- Daily budget: CHF 5–8
- Bid strategy: Cost Cap (set CPL target: CHF 50)
- If CPL exceeds CHF 80 for 3 consecutive days, pause and adjust targeting
- Schedule: Mon–Fri, 8:00–18:00 CET
- A/B test: Run 2 ad creatives per ad group, kill loser after 1,000 impressions

**Expected Metrics:**
| Metric | Expected Range |
|--------|---------------|
| CTR | 0.6–1.2% |
| CPC | CHF 6–12 |
| CPL (Lead Gen Form) | CHF 35–65 |
| Leads/month | 4–12 |
| Lead-to-Scan conversion | 40–60% |
| Scan-to-Paid conversion | 5–15% |

---

### Campaign C: Thought Leadership

**Objective in LinkedIn Campaign Manager:** Engagement
**Ad Format:** Sponsored Content (boost top organic posts)
**Placement:** LinkedIn Feed

| Ad Group | Target | Content | Budget Split |
|----------|--------|---------|-------------|
| C1 — AI Threat Content | IT/Security professionals, IT/CH | AI threat landscape posts | 50% |
| C2 — Case Study Teasers | IT Decision Makers, IT/CH | Anonymized findings, social proof | 50% |

**Strategy:** Write organic posts on the company page first. Boost only posts that get >2% organic engagement rate in the first 24 hours. This ensures budget goes to already-proven content.

**Settings:**
- Daily budget: CHF 2.50–4
- Bid strategy: Maximum Delivery
- Schedule: Always-on (thought leadership works weekends too)
- Boost threshold: Only boost posts with >2% organic engagement in first 24h

**Expected Metrics:**
| Metric | Expected Range |
|--------|---------------|
| Engagement rate | 2–5% |
| CPC (engagement) | CHF 3–6 |
| CPM | CHF 15–25 |
| Retargeting pool growth | 200–500 engaged users/month |

---

## 3. Bidding Strategy

### Phase 1 (Month 1–2): Learning

| Campaign | Strategy | Rationale |
|----------|----------|-----------|
| A (Awareness) | Maximum Delivery | Let LinkedIn optimize reach during learning phase |
| B (Lead Gen) | Cost Cap @ CHF 50 | Control CPL while algorithm learns |
| C (Thought Leadership) | Maximum Delivery | Maximize engagement volume |

### Phase 2 (Month 3+): Optimization

| Campaign | Strategy | Trigger to Switch |
|----------|----------|-------------------|
| A | Manual CPC | Once CPM baseline is established, cap it |
| B | Target Cost @ actual avg CPL | Once 50+ leads collected, switch to predictable costs |
| C | Manual CPC | Once best content types are identified |

---

## 4. Budget Allocation & Scale Triggers

### Phase 1: CHF 300/month

| Campaign | Monthly | Daily | % |
|----------|---------|-------|---|
| A — Awareness | CHF 75 | CHF 2.50 | 25% |
| B — Lead Gen | CHF 150 | CHF 5.00 | 50% |
| C — Thought Leadership | CHF 75 | CHF 2.50 | 25% |

### Phase 2: CHF 500/month (trigger: first paid scan conversion)

| Campaign | Monthly | Daily | % |
|----------|---------|-------|---|
| A — Awareness | CHF 100 | CHF 3.30 | 20% |
| B — Lead Gen | CHF 300 | CHF 10.00 | 60% |
| C — Thought Leadership | CHF 100 | CHF 3.30 | 20% |

### Scale Triggers (increase budget when ALL conditions are met)

| Trigger | Threshold | Action |
|---------|-----------|--------|
| CPL is profitable | CPL < CHF 60 AND scan-to-paid > 8% | Increase B budget by 50% |
| Engagement is building | Follower growth > 100/mo | Increase A budget by 30% |
| Content is resonating | Organic reach > 5K/post avg | Shift 20% from A to C (boost winners) |
| Revenue covers ads | Monthly ad-attributed revenue > 2x ad spend | Double total budget |

### Kill Triggers (pause or restructure)

| Signal | Threshold | Action |
|--------|-----------|--------|
| CPL too high | CPL > CHF 100 for 2 weeks | Pause B, revise targeting/creative |
| No conversions | 0 scan-to-paid after 30 leads | Audit funnel, not ads |
| Low engagement | CTR < 0.3% across all ads | Refresh all creatives |

---

## 5. Tracking & Attribution

### LinkedIn Insight Tag

Install on ALL qsearch.ch pages:

```html
<!-- LinkedIn Insight Tag -->
<script type="text/javascript">
_linkedin_partner_id = "YOUR_PARTNER_ID";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script>
<script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.ltr-js-sdk/sdk.min.js";
s.parentNode.insertBefore(b,s);})(window.lintrk);
</script>
```

### Conversion Events to Configure

| Event | Trigger | Value |
|-------|---------|-------|
| Page View | Any qsearch.ch page | — |
| Sign Up | Account creation | CHF 0 |
| Free Scan | Scan initiated | CHF 5 (proxy value) |
| Paid Scan | Payment completed | Actual CHF value |
| Subscription | Plan activated | Monthly plan value |

### UTM Parameters

All LinkedIn ads MUST use these UTM parameters:

```
?utm_source=linkedin
&utm_medium=paid
&utm_campaign={campaign_name}
&utm_content={ad_name}
&utm_term={ad_group}
```

Example: `qsearch.ch/scan?utm_source=linkedin&utm_medium=paid&utm_campaign=leadgen-fear-it&utm_content=43pct-attacked&utm_term=it-managers-italy`

---

## 6. Creative Guidelines

### Image Specs

| Format | Dimensions | File Size | Ratio |
|--------|-----------|-----------|-------|
| Single Image | 1200 x 627 px | < 5 MB | 1.91:1 |
| Carousel Card | 1080 x 1080 px | < 10 MB | 1:1 |
| Video | 1920 x 1080 px | < 200 MB | 16:9 |

### Brand Compliance

- Background: Abyss (#0f0d18) or near-black
- Accent: Volt Lime (#E4FF30) for key stats, CTAs
- Text: #eeedf5 (light on dark)
- Font: Bricolage Grotesque for headlines, Plus Jakarta Sans for body
- Logo: Q monogram in bottom-right corner, 10% of image area
- NO stock photos, NO hooded hackers, NO padlock icons, NO matrix rain
- Terminal-style code blocks for technical credibility
- Data visualizations > generic imagery

### Copy Rules

- Headlines: Max 70 characters
- Introductory text (above fold): Max 150 characters
- Body (below fold): Max 300 characters for sponsored, 1300 for organic
- CTA: Action-oriented, Italian for IT market ("Scansiona ora", "Scopri di più")
- Tone: Authoritative, precise, restrained. Swiss restraint — no exclamation marks.
- Sign as: QuantumSearch Security Research (NEVER personal names)

---

## 7. A/B Testing Protocol

### Month 1: Creative Testing

| Test | Variable | Variants | Winner Criteria |
|------|----------|----------|----------------|
| 1 | Headline | Fear stat vs. value prop | Higher CTR after 1,000 impressions |
| 2 | Image | Dark terminal vs. data visualization | Higher CTR |
| 3 | CTA | "Scansiona gratis" vs. "Scopri il tuo rischio" | Higher conversion rate |
| 4 | Language | Italian vs. English (Swiss market only) | Higher engagement rate |

### Month 2: Audience Testing

| Test | Variable | Variants | Winner Criteria |
|------|----------|----------|----------------|
| 5 | Job title | CTO vs. IT Manager vs. Founder | Lower CPL |
| 6 | Company size | 10-50 vs. 51-200 vs. 201-1000 | Higher scan-to-paid rate |
| 7 | Industry | Tech vs. Finance vs. Manufacturing | Lower CPL |

### Rules

- Run only ONE test per ad group at a time
- Minimum 1,000 impressions before declaring winner
- Winner takes 100% of budget; loser is paused (not deleted — archive for reference)
- Document all test results in this file under Appendix A

---

## 8. Competitor Landscape (LinkedIn Ads in IT Cybersecurity)

| Competitor | Positioning | LinkedIn Activity | Our Edge |
|-----------|-------------|-------------------|----------|
| Swascan (IT) | Enterprise scanner, Italian market | Active ads, 10K+ followers | We're Swiss-based (trust premium), self-service |
| Cyberoo (IT) | Italian MDR/SOC | Organic posts, moderate | We automate, they consult |
| InfoGuard (CH) | Swiss enterprise security | Strong Swiss presence | We target SMB, they target enterprise |
| Dreamlab (CH) | Swiss cyber consultancy | Limited LinkedIn ads | We're digital-first, they're consulting-first |

**Our positioning:** "Swiss precision security scanning for Italian businesses. Self-service. 60 seconds. Proof-driven."

---

## Appendix A: Test Results Log

| Date | Test # | Variable | Variant A | Variant B | Winner | Metric | Notes |
|------|--------|----------|-----------|-----------|--------|--------|-------|
| — | — | — | — | — | — | — | — |

---

*QuantumSearch Security Research — LinkedIn Ad Blueprint v1.0*
