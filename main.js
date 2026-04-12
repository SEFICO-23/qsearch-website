/* QuantumSearch — Main JavaScript v8 — Ultraviolet Volt + Forest Gradient */

// ─── Theme Engine (runs BEFORE DOMContentLoaded to prevent flash) ───
(function() {
  // Tiered theme resolution: localStorage > system > time-of-day > dark default
  function resolveTheme() {
    var stored = localStorage.getItem('qs-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    var hour = new Date().getHours();
    if (hour >= 7 && hour < 19) return 'light';
    return 'dark';
  }
  var theme = resolveTheme();
  if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

document.addEventListener('DOMContentLoaded', () => {

  // ─── Theme toggle button handler ───
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      if (next === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem('qs-theme', next);
    });
  }

  // ─── SVG Language Flags ───
  // Flags are created using safe DOM methods (createElementNS) to avoid innerHTML/XSS risks
  function createFlag(lang) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '12');
    svg.style.borderRadius = '2px';
    svg.style.verticalAlign = 'middle';
    svg.style.marginRight = '4px';
    svg.style.flexShrink = '0';

    if (lang === 'en') {
      svg.setAttribute('viewBox', '0 0 60 30');
      var bg = document.createElementNS(ns, 'rect');
      bg.setAttribute('width', '60'); bg.setAttribute('height', '30'); bg.setAttribute('fill', '#012169');
      svg.appendChild(bg);
      // Diagonal white stripes
      var d1 = document.createElementNS(ns, 'path');
      d1.setAttribute('d', 'M0 0L60 30M60 0L0 30'); d1.setAttribute('stroke', '#fff'); d1.setAttribute('stroke-width', '6');
      svg.appendChild(d1);
      // Diagonal red stripes (offset for proper Union Jack)
      var d2 = document.createElementNS(ns, 'path');
      d2.setAttribute('d', 'M0 0L60 30M60 0L0 30'); d2.setAttribute('stroke', '#C8102E'); d2.setAttribute('stroke-width', '2');
      svg.appendChild(d2);
      // White cross
      var cross1 = document.createElementNS(ns, 'path');
      cross1.setAttribute('d', 'M30 0v30M0 15h60'); cross1.setAttribute('stroke', '#fff'); cross1.setAttribute('stroke-width', '10');
      svg.appendChild(cross1);
      // Red cross
      var cross2 = document.createElementNS(ns, 'path');
      cross2.setAttribute('d', 'M30 0v30M0 15h60'); cross2.setAttribute('stroke', '#C8102E'); cross2.setAttribute('stroke-width', '6');
      svg.appendChild(cross2);
    } else if (lang === 'it') {
      svg.setAttribute('viewBox', '0 0 3 2');
      ['#009246','#fff','#CE2B37'].forEach(function(c, i) {
        var r = document.createElementNS(ns, 'rect');
        r.setAttribute('x', i); r.setAttribute('width', '1'); r.setAttribute('height', '2'); r.setAttribute('fill', c);
        svg.appendChild(r);
      });
    } else if (lang === 'de') {
      svg.setAttribute('viewBox', '0 0 5 3');
      ['#000','#DD0000','#FFCC00'].forEach(function(c, i) {
        var r = document.createElementNS(ns, 'rect');
        r.setAttribute('y', i); r.setAttribute('width', '5'); r.setAttribute('height', '1'); r.setAttribute('fill', c);
        svg.appendChild(r);
      });
    } else if (lang === 'fr') {
      svg.setAttribute('viewBox', '0 0 3 2');
      ['#002395','#fff','#ED2939'].forEach(function(c, i) {
        var r = document.createElementNS(ns, 'rect');
        r.setAttribute('x', i); r.setAttribute('width', '1'); r.setAttribute('height', '2'); r.setAttribute('fill', c);
        svg.appendChild(r);
      });
    }
    return svg;
  }

  document.querySelectorAll('[data-lang]').forEach(function(link) {
    var flag = createFlag(link.dataset.lang);
    if (flag.childNodes.length > 0) {
      link.insertBefore(flag, link.firstChild);
    }
  });

  // ─── Fade-in on scroll ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in').forEach(el => observer.observe(el));

  // ─── Mobile nav toggle ───
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.textContent = navLinks.classList.contains('open') ? '\u2715' : '\u2630';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.textContent = '\u2630';
      });
    });
  }

  // ─── Mobile dropdown tap support + ARIA ───
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(dd => {
    const trigger = dd.querySelector(':scope > a');
    const menu = dd.querySelector('.nav-dropdown-menu');
    if (trigger && menu) {
      // ARIA attributes
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      menu.setAttribute('role', 'menu');
      menu.querySelectorAll('a').forEach(a => a.setAttribute('role', 'menuitem'));

      // Tap handler for mobile
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const wasOpen = dd.classList.contains('dropdown-open');
          dropdowns.forEach(d => { d.classList.remove('dropdown-open'); d.querySelector(':scope > a').setAttribute('aria-expanded', 'false'); });
          if (!wasOpen) { dd.classList.add('dropdown-open'); trigger.setAttribute('aria-expanded', 'true'); }
        }
      });
    }

    // Desktop: update aria-expanded on hover
    dd.addEventListener('mouseenter', () => { const t = dd.querySelector(':scope > a'); if (t) t.setAttribute('aria-expanded', 'true'); });
    dd.addEventListener('mouseleave', () => { const t = dd.querySelector(':scope > a'); if (t) t.setAttribute('aria-expanded', 'false'); });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      dropdowns.forEach(d => { d.classList.remove('dropdown-open'); const t = d.querySelector(':scope > a'); if (t) t.setAttribute('aria-expanded', 'false'); });
    }
  });

  // ─── Navbar scroll state ───
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ─── Language switcher ───
  const langSwitcher = document.querySelector('.lang-switcher');
  if (langSwitcher) {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const knownLangs = ['it', 'de', 'fr'];

    // Detect current language and page
    let currentLang = 'en';
    let pageName = 'index.html';

    if (segments.length > 0 && knownLangs.includes(segments[0])) {
      currentLang = segments[0];
      pageName = segments[1] || 'index.html';
    } else if (segments.length > 0) {
      pageName = segments[segments.length - 1] || 'index.html';
    }

    // Ensure pageName ends with .html
    if (!pageName.endsWith('.html')) pageName = 'index.html';

    // Update trigger label to show current language
    const trigger = langSwitcher.querySelector(':scope > a');
    if (trigger) {
      const langLabel = currentLang.toUpperCase();
      trigger.textContent = '';
      trigger.append(langLabel + ' \u25BE');
    }

    // Set correct href for each language link
    langSwitcher.querySelectorAll('[data-lang]').forEach(link => {
      const lang = link.dataset.lang;
      if (lang === 'en') {
        link.href = '/' + pageName;
      } else {
        link.href = '/' + lang + '/' + pageName;
      }
      // Highlight current language
      if (lang === currentLang) {
        link.style.color = 'var(--accent)';
        link.style.fontWeight = '600';
      }
    });
  }

  // ─── Popup helper ───
  function showPopup(id) {
    const popup = document.getElementById(id);
    if (popup) popup.classList.add('active');
  }

  function hidePopup(id) {
    const popup = document.getElementById(id);
    if (popup) popup.classList.remove('active');
  }

  // Close popup buttons
  const popupClose = document.getElementById('popupClose');
  if (popupClose) {
    popupClose.addEventListener('click', () => hidePopup('successPopup'));
  }

  // Close popup on overlay click
  const popupOverlay = document.getElementById('successPopup');
  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) hidePopup('successPopup');
    });
  }

  // Close popup on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hidePopup('successPopup');
  });

  // ─── Contact form handler ───
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const resp = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' },
        });

        if (resp.ok) {
          btn.textContent = originalText;
          btn.disabled = false;
          form.reset();
          showPopup('successPopup');
        } else {
          btn.textContent = 'Error \u2014 please try again';
          btn.style.background = '#ef4444';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        }
      } catch (err) {
        btn.textContent = 'Network error \u2014 please try again';
        btn.style.background = '#ef4444';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }
    });
  }

  // ─── Stat counter animation ───
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);

        if (!isNaN(num) && num > 0) {
          let current = 0;
          const increment = Math.ceil(num / 35);
          const suffix = text.replace(String(num), '');
          el.textContent = '0' + suffix;
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
            if (current >= num) el.classList.add('counted');
          }, 25);
        }
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  // ─── Analytics (GoatCounter — free, no cookies, GDPR compliant) ───
  // Setup: Create account at goatcounter.com, replace SITENAME below
  // Tracks: pageviews, referrers, browsers, countries, screen sizes
  (function() {
    var gc = document.createElement('script');
    gc.async = true;
    gc.dataset.goatcounter = 'https://qsearch.goatcounter.com/count';
    gc.src = '//gc.zgo.at/count.js';
    document.head.appendChild(gc);
  })();

  // ─── Expandable article accessibility ───
  document.querySelectorAll('.card[onclick]').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expand = card.querySelector('.article-expand');
        if (expand) expand.classList.toggle('open');
      }
    });
  });

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Interactive Particle Network (Hero Canvas) ───
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    // Disable on mobile for performance, reduce on tablets
    const isMobile = window.innerWidth < 768;
    if (isMobile) { canvas.style.display = 'none'; }
  }
  if (canvas && window.innerWidth >= 768) {
    const isTablet = window.innerWidth < 1024;
    const ctx = canvas.getContext('2d');
    let w, h, particles, mouse = { x: -999, y: -999 };
    const PARTICLE_COUNT = isTablet ? 25 : 60;
    const CONNECT_DIST = isTablet ? 100 : 140;
    const MOUSE_RADIUS = 180;

    function resize() {
      const hero = canvas.parentElement;
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.8 + 0.8,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Theme-aware particle colors
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const connRGB = isLight ? '34, 87, 122' : '220, 255, 80';       // Deep Teal / Volt Lime
      const mouseRGB = isLight ? '56, 163, 165' : '229, 255, 122';    // Teal / Warm Lime
      const dotRGB = isLight ? '34, 87, 122' : '220, 255, 80';        // Deep Teal / Volt Lime

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * (isLight ? 0.25 : 0.15);
            ctx.strokeStyle = 'rgba(' + connRGB + ', ' + alpha + ')';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles + mouse interaction
      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = (MOUSE_RADIUS - mDist) / MOUSE_RADIUS * 0.02;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;

          // Draw mouse connections
          const mAlpha = (1 - mDist / MOUSE_RADIUS) * (isLight ? 0.35 : 0.25);
          ctx.strokeStyle = 'rgba(' + mouseRGB + ', ' + mAlpha + ')';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + dotRGB + ', ' + (isLight ? p.opacity * 1.5 : p.opacity) + ')';
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    // Mouse tracking on hero
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = -999;
      mouse.y = -999;
    });
    canvas.parentElement.style.pointerEvents = 'auto';

    window.addEventListener('resize', () => { resize(); createParticles(); });
    resize();
    createParticles();
    draw();
  }

  // ─── Typing effect — ONLY on elements with data-typing attribute ───
  var typingEl = document.querySelector('.hero h1 .accent[data-typing]');
  if (typingEl) {
    var typingWords = typingEl.getAttribute('data-typing').split(',');
    if (typingWords.length > 1) {
      var twIdx = 0, tcIdx = 0, twDel = false;

      // Reserve width for longest word to prevent layout shift
      typingEl.style.display = 'inline-block';
      var measure = document.createElement('span');
      measure.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit';
      typingEl.parentNode.appendChild(measure);
      var maxW = 0;
      typingWords.forEach(function(w) { measure.textContent = w; maxW = Math.max(maxW, measure.offsetWidth); });
      measure.remove();
      typingEl.style.minWidth = maxW + 'px';

      // Place cursor INSIDE the accent span so it follows the text
      var twTextNode = document.createTextNode(typingEl.textContent);
      typingEl.textContent = '';
      typingEl.appendChild(twTextNode);
      var twCursor = document.createElement('span');
      twCursor.className = 'typing-cursor';
      typingEl.appendChild(twCursor);

      function twLoop() {
        var cur = typingWords[twIdx];
        if (!twDel) {
          twTextNode.textContent = cur.substring(0, tcIdx + 1);
          tcIdx++;
          if (tcIdx === cur.length) { twDel = true; setTimeout(twLoop, 2200); return; }
          setTimeout(twLoop, 80 + Math.random() * 40);
        } else {
          twTextNode.textContent = cur.substring(0, tcIdx - 1);
          tcIdx--;
          if (tcIdx === 0) { twDel = false; twIdx = (twIdx + 1) % typingWords.length; setTimeout(twLoop, 400); return; }
          setTimeout(twLoop, 40);
        }
      }
      setTimeout(twLoop, 1800);
    }
  }

  // ─── Stat pulse glow after counting ───
  statNumbers.forEach(el => {
    const origObserve = statObserver;
    el.addEventListener('animationend', () => el.classList.remove('counted'));
  });

});
