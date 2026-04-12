# LinkedIn Targeting Blueprint — QuantumSearch

**Version:** 1.0
**Date:** 2026-04-10
**Markets:** Italy + Switzerland (Italian-speaking first, then DACH expansion)

---

## 1. Primary Audiences

### Audience 1: Italian IT Decision Makers (CORE)

**LinkedIn Campaign Manager Settings:**

| Field | Value |
|-------|-------|
| Location | Italy |
| Location sub-targets | Lombardia, Piemonte, Lazio, Veneto, Emilia-Romagna |
| Profile language | Italian |
| Job titles (OR) | IT Manager, Responsabile IT, Direttore IT, CTO, Chief Technology Officer, CISO, Chief Information Security Officer, Security Manager, Responsabile Sicurezza Informatica, IT Director, Information Security Manager |
| Job functions (AND/OR) | Information Technology, Engineering |
| Seniority | Manager, Director, VP, CXO |
| Company size | 11-50, 51-200, 201-500 |
| Industries | Technology/Information/Internet, Financial Services, Insurance, Healthcare, Manufacturing, Legal Services |
| Exclude | Competitors: cybersecurity companies (add manually) |

**Estimated audience size:** 15,000–35,000
**Use for:** Campaign B (Lead Gen) — Ad Groups B1, B2

---

### Audience 2: Swiss IT/Security Professionals

**LinkedIn Campaign Manager Settings:**

| Field | Value |
|-------|-------|
| Location | Switzerland |
| Location sub-targets | Ticino, Zürich, Geneva, Basel, Bern |
| Profile language | Italian, German, English, French |
| Job titles (OR) | IT Manager, CTO, CISO, Security Analyst, IT-Leiter, Sicherheitsbeauftragter, Responsable IT, Chief Information Officer, Head of IT, Security Engineer, Compliance Officer, Data Protection Officer |
| Seniority | Manager, Director, VP, CXO |
| Company size | 11-50, 51-200, 201-500, 501-1000 |
| Industries | Financial Services, Technology/Information/Internet, Insurance, Healthcare, Pharmaceuticals, Manufacturing, Legal Services |
| Exclude | Competitors |

**Estimated audience size:** 8,000–18,000
**Use for:** Campaign A (Awareness) — Ad Group A2, Campaign B — Ad Group B3

---

### Audience 3: Startup Founders & Tech Leaders (Italy)

**LinkedIn Campaign Manager Settings:**

| Field | Value |
|-------|-------|
| Location | Italy |
| Profile language | Italian, English |
| Job titles (OR) | Founder, Co-Founder, CEO, CTO, Managing Director, Amministratore Delegato, Direttore Generale |
| Seniority | Owner, CXO, VP, Director |
| Company size | 2-10, 11-50, 51-200 |
| Industries | Technology/Information/Internet, Computer Software, Internet, Financial Services |
| Company growth rate | 10%+ YoY (if available) |
| Exclude | Competitors, consultants, freelancers |

**Estimated audience size:** 20,000–50,000
**Use for:** Campaign A (Awareness) — Ad Group A1, Campaign B — Ad Group B2

---

### Audience 4: Compliance & Risk Officers (Italy + CH)

**LinkedIn Campaign Manager Settings:**

| Field | Value |
|-------|-------|
| Location | Italy, Switzerland |
| Profile language | Italian, English, German |
| Job titles (OR) | Compliance Officer, Risk Manager, Data Protection Officer, DPO, Privacy Officer, Responsabile Compliance, Responsabile Protezione Dati, Internal Auditor, Legal Counsel, Compliance Manager |
| Job functions | Legal, Finance |
| Seniority | Manager, Director, VP |
| Company size | 51-200, 201-500, 501-1000 |
| Industries | Financial Services, Insurance, Healthcare, Legal Services, Banking |
| Exclude | Law firms (they're not buyers) |

**Estimated audience size:** 5,000–12,000
**Use for:** Campaign C (Thought Leadership) — NIS2/GDPR content

---

### Audience 5: Thought Leadership — Broad IT/Security (Engagement)

**LinkedIn Campaign Manager Settings:**

| Field | Value |
|-------|-------|
| Location | Italy, Switzerland |
| Profile language | Italian, English |
| Job functions (OR) | Information Technology, Engineering |
| Skills (OR) | Cybersecurity, Information Security, Network Security, Penetration Testing, GDPR, ISO 27001, Risk Management, Cloud Security |
| Seniority | Entry, Senior, Manager, Director |
| Company size | Any |
| Industries | Any |

**Estimated audience size:** 80,000–150,000
**Use for:** Campaign C (Thought Leadership) — broad reach, retargeting pool building

---

## 2. Retargeting Audiences

### Setup: LinkedIn Insight Tag Required

Install the LinkedIn Insight Tag on qsearch.ch (see ad-blueprint.md Section 5). Once installed, create these matched audiences:

### Retarget 1: Website Visitors (Hot)

| Field | Value |
|-------|-------|
| Source | Website Retargeting |
| URL rules | Visited qsearch.ch (any page) |
| Lookback | 90 days |
| Minimum size | 300 members |
| Exclude | Already converted (visited /dashboard or /thank-you) |

**Use for:** All campaigns — overlay as ad group

---

### Retarget 2: Scan Starters (Very Hot)

| Field | Value |
|-------|-------|
| Source | Website Retargeting |
| URL rules | Visited qsearch.ch/scan |
| Lookback | 30 days |
| Minimum size | 300 members |
| Exclude | Completed scan (visited /results or /dashboard) |

**Use for:** Campaign B — dedicated "You started a scan — finish it" ad group

---

### Retarget 3: Engaged LinkedIn Users

| Field | Value |
|-------|-------|
| Source | Lead Gen Form Retargeting OR Engagement Retargeting |
| Criteria | Opened OR submitted a Lead Gen Form in past 90 days, OR engaged with any QuantumSearch ad (like, comment, share, click) |
| Lookback | 90 days |

**Use for:** Campaign B — move engaged users toward conversion

---

### Retarget 4: Video Viewers (Future)

| Field | Value |
|-------|-------|
| Source | Video Retargeting |
| Criteria | Watched 50%+ of any QuantumSearch video ad |
| Lookback | 90 days |

**Use for:** Phase 2 when video content is available

---

## 3. Lookalike Audiences

### When to Create (NOT immediately — need seed data first)

| Lookalike | Seed Audience | Minimum Seed | When to Create |
|-----------|--------------|-------------|----------------|
| Look-1 | Lead Gen Form submitters | 300 | After 300 form submissions |
| Look-2 | Website visitors who converted | 300 | After 300 scan completions |
| Look-3 | Company page followers | 300 | After 300 followers |

**Settings for all lookalikes:**
- Location: Italy + Switzerland
- Similarity: Start with most similar (1-3%), expand to 5% if volume is low
- Exclude: Seed audience members (avoid paying to reach people you already have)

---

## 4. Exclusion Lists

### Always Exclude

| Exclusion | How | Why |
|-----------|-----|-----|
| Current customers | Upload email list → Matched Audiences | Don't pay to advertise to paying users |
| Competitors | Company name list: CrowdStrike, Rapid7, Swascan, Cyberoo, InfoGuard, Dreamlab, Tinexta | Don't fund competitor intel |
| QuantumSearch employees | Company name: QuantumSearch | Don't waste impressions |
| Job seekers | Exclude member trait "Open to work" | Low conversion intent |
| Students | Seniority: Unpaid, Training | Not buyers |

### Upload Format for Email Exclusion

CSV file with columns: `email` (one per row). LinkedIn matches ~30-50% of business emails.

---

## 5. Audience Testing Strategy

### Month 1: Broad → Narrow

Start with broader audiences (Audience 1 + 3 for Italy, Audience 2 for CH). After 2 weeks of data:

1. Check LinkedIn Campaign Manager's "Demographics" tab
2. Identify top-performing:
   - Job titles (which convert?)
   - Company sizes (which respond?)
   - Industries (which engage?)
   - Locations (which regions?)
3. Create refined audiences based on winners

### Month 2: Refine + Retarget

1. Narrow primary audiences to winning demographics
2. Launch retargeting audiences (Retarget 1 + 3)
3. Test Compliance audience (Audience 4) with NIS2 content

### Month 3: Scale + Lookalike

1. Create first lookalike (if seed is large enough)
2. Expand geography: add Toscana, Campania (Italy), Bern, Lugano (CH)
3. Test German-language variant for Zürich audience

---

## 6. Geographic Strategy

### Phase 1: Italian-Speaking Markets (Month 1-3)

| Market | Priority | Language | Budget % |
|--------|----------|----------|----------|
| Lombardia (Milano) | P0 | Italian | 30% |
| Ticino (Lugano) | P0 | Italian | 15% |
| Piemonte (Torino) | P1 | Italian | 10% |
| Lazio (Roma) | P1 | Italian | 15% |
| Veneto (Padova, Verona) | P1 | Italian | 10% |
| Emilia-Romagna (Bologna) | P2 | Italian | 10% |
| Zürich | P2 | English/German | 10% |

### Phase 2: DACH Expansion (Month 4+)

| Market | Language | Trigger |
|--------|----------|---------|
| Zürich (scale) | German/English | When Italian CPL is stable |
| Geneva | French/English | When French ad templates are ready |
| Basel | German | When German ad templates are ready |
| Munich | German | Only if Swiss ROI is proven |

---

## 7. Industry Prioritization

Based on cybersecurity spend propensity and NIS2/GDPR exposure:

| Priority | Industry | Why | Expected CPL |
|----------|----------|-----|-------------|
| P0 | Financial Services | Regulated, high spend, data-sensitive | CHF 45-65 |
| P0 | Technology/Software | Understands security, fast buyers | CHF 35-55 |
| P1 | Insurance | Regulated, emerging cyber insurance market | CHF 50-70 |
| P1 | Healthcare | GDPR + patient data + NIS2 expansion | CHF 55-75 |
| P2 | Manufacturing | NIS2 newly covered, low awareness = high fear | CHF 40-60 |
| P2 | Legal Services | Client confidentiality, GDPR obligations | CHF 50-70 |
| P3 | E-commerce | PCI-DSS, payment data, seasonal urgency | CHF 35-50 |

---

## 8. Campaign Manager — Step-by-Step Setup

### Creating an Audience in LinkedIn Campaign Manager

1. Go to **Campaign Manager** → **Plan** → **Audiences**
2. Click **Create audience**
3. Select **LinkedIn audience**
4. Under **Who is your target audience?**:
   - **Locations:** Add each country/region individually
   - **Language:** Select profile language(s)
5. Under **Audience attributes**:
   - Click **Job Experience** → **Job Titles** → Type and select each title
   - Click **Job Experience** → **Job Seniority** → Select levels
   - Click **Company** → **Company Size** → Select ranges
   - Click **Company** → **Industries** → Select industries
6. Under **Exclude**:
   - Click **Exclude** → Add competitor companies, job seekers
7. Check **Forecasted Results** panel on the right:
   - Target audience size should be 10,000–100,000 for sponsored content
   - If <5,000: broaden titles or remove industry restrictions
   - If >200,000: add seniority or industry filters
8. Click **Save audience** → Name it clearly (e.g., "IT-DM-Italy-SMB-2026Q2")

### Creating a Retargeting Audience

1. Go to **Plan** → **Audiences** → **Create audience**
2. Select **Matched audience**
3. Choose **Website** → Select your Insight Tag
4. Set URL rules (e.g., "URL contains /scan")
5. Set lookback window (30 or 90 days)
6. Name and save

---

*QuantumSearch Security Research — Targeting Blueprint v1.0*
