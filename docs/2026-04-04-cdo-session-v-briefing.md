# CDO Session V Briefing — Synsol-Style Visual Integration

**Written by:** La Stilista (CDO), end of Session IV
**For:** The next Claude session
**Status:** READY TO EXECUTE

---

## The Task

Alex wants BOTH:
1. **Apply synsol.ch approach to homepage hero** — mask-image fade on video, dark overlay instead of opacity
2. **Add contained images to key pages** — rounded glass panels (about, track-record) like synsol pillars

## Reference: synsol.ch Approach

Analyzed from https://www.synsol.ch/:

### Hero Treatment
```css
/* synsol uses mask-image to fade the image naturally */
mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
-webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
```
- Image is FULL STRENGTH (no low opacity)
- Dark overlay ON TOP (`bg-background/80` = 80% background color)
- Animated gradient orbs (`blur-[120px]`) for depth
- Image fades to transparent at the bottom via mask, not via a gradient overlay div

### Section Images
- Images in ROUNDED GLASS PANELS (`rounded-3xl`, glass-panel, shadow-2xl)
- Images are CONTENT alongside text in grids
- Not background textures — real `<img>` elements
- Clear separation between image and text blocks

### Decorative Depth
- Blurred gradient orbs behind content sections
- `blur-[80px]`, `blur-[120px]` on colored circles
- Creates atmosphere WITHOUT images

## Current State of qsearch.ch

- Homepage: video hero (hero-bg.mp4 at 15% opacity, muted autoplay loop)
- All other pages: NO images, pure typography/color
- Trust bar: SVG icons
- Service cards: linked to pages
- Social proof badges on homepage
- Contact form: AI Security + Vibe-Coding options
- Light mode: Forest-tinted cards (#f2f8f5)
- Typing cursor: follows the word
- All 4 languages synced

## Media Available on FTP (already deployed)

| File | Size | Best Use |
|------|------|----------|
| hero-bg.mp4 | 1.5MB | Homepage hero video |
| quantum-computer.webp | 165KB | Homepage feature / About |
| code-screens.webp | 79KB | About "Our Story" glass panel |
| server-room.webp | 77KB | Services / About methodology |
| hands-coding.webp | 61KB | About methodology glass panel |
| fingerprint-scan.webp | 59KB | Track Record section |
| terminal-output.webp | 113KB | Track Record / Demo |
| network-map.webp | 119KB | Contact visual |
| fiber-optic.webp | 94KB | Section divider if needed |

Source images: `C:\BackBone\20_projects\quantumsearch-images-videos\`
20 more videos in `VIDEO-MP4/` (1.5-58MB)

## Implementation Plan

### Step 1: Homepage Hero — Synsol Treatment
Replace the current `opacity: 0.15` approach:
```css
.hero-video-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
  /* Full strength video, darkened by overlay, faded by mask */
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}
/* Dark overlay for text readability */
.hero-overlay {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 13, 24, 0.75);
  z-index: 0;
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}
```

### Step 2: Glass Panel Images on Key Pages
About page — "Our Story" section:
```html
<div class="glass-panel rounded-3xl p-2 shadow-2xl">
  <img src="media/code-screens.webp" class="rounded-2xl" style="width: 100%; height: auto;">
</div>
```

Track Record — after milestone grid:
```html
<div class="glass-panel rounded-3xl p-2 shadow-2xl">
  <img src="media/terminal-output.webp" class="rounded-2xl" style="width: 100%; height: auto;">
</div>
```

### Step 3: Decorative Gradient Orbs
Add to hero sections for depth:
```html
<div style="position: absolute; top: 20%; left: 10%; width: 300px; height: 300px; background: rgba(91, 35, 255, 0.05); border-radius: 50%; filter: blur(120px); z-index: 0;"></div>
<div style="position: absolute; bottom: 10%; right: 15%; width: 250px; height: 250px; background: rgba(0, 139, 255, 0.05); border-radius: 50%; filter: blur(80px); z-index: 0;"></div>
```

## Critical Rules
- `.accent` gradient-text: always re-declare background-clip in light mode
- Theme toggle: OUTSIDE nav-links ul
- Nav: Services is a DROPDOWN
- `[data-theme="light"] .hero::before { display: none; }` exists in styles.css — avoid ::before for images on .hero
- Translate ALL changes to IT/DE/FR
- Deploy to FTP after changes
- FTP: Host: qsearch.ch | User: 8y0ize_QSearch_CTO | Pass: !up00plIGur6QM!

## Brand Quick Reference
- Dark: Abyss #0f0d18, Electric Purple #5B23FF, Signal Blue #008BFF, Volt Lime #E4FF30
- Light: Deep Teal #22577A, Teal #38A3A5, Green #57CC99, Light Green #80ED99
- Fonts: Bricolage Grotesque (display), Plus Jakarta Sans (body), JetBrains Mono (code)
- Guidelines: `C:\BackBone\20_projects\quantumsearch-brand\BRAND-GUIDELINES.md` (v3)
