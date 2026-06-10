/* =============================================
   陕西省体能协会 — Interactive Engine
   Vanilla JS · Zero dependencies · 60fps
   ============================================= */

(function () {
  'use strict';

  // ── Scroll Reveal ──────────────────────────
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(
      '.card, .news-item, .timeline-item, .leader-card, .partner-item, .contact-box, .section-hd, .stat-cell, .external-links a'
    );
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // ── Stats Counter ──────────────────────────
  function initStatsCounter() {
    const statVals = document.querySelectorAll('.stat-val');
    if (!statVals.length) return;

    const animated = new Set();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animate(el, target) {
      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        const current = Math.round(target * eased);
        el.textContent = current;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.has(entry.target)) {
            animated.add(entry.target);
            const target = parseInt(entry.target.textContent.trim(), 10);
            if (!isNaN(target)) {
              animate(entry.target, target);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    statVals.forEach((el) => observer.observe(el));
  }

  // ── Button Ripple ──────────────────────────
  function initButtonRipple() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');
      if (!btn) return;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  // ── Hero Parallax Glow ─────────────────────
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--px', (x * 30).toFixed(1) + 'px');
      hero.style.setProperty('--py', (y * 30).toFixed(1) + 'px');
    });

    hero.addEventListener('mouseleave', function () {
      hero.style.setProperty('--px', '0px');
      hero.style.setProperty('--py', '0px');
    });
  }

  // ── Nav Scroll Shadow ───────────────────────
  function initNavScrollShadow() {
    const header = document.querySelector('header');
    if (!header) return;
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 10) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    if (window.scrollY > 10) header.classList.add('scrolled');
  }

  // ── Smooth Nav Scroll ──────────────────────
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector('header')?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  // ── Mobile Menu Close on Nav Click ─────────
  function initMobileMenuClose() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('nav ul li a');
      if (!link) return;
      const nav = document.querySelector('nav ul');
      if (nav && nav.classList.contains('show')) {
        nav.classList.remove('show');
      }
    });
  }

  // ── Counter Shimmer (subtle entrance) ──────
  function initStatEntrance() {
    const statCells = document.querySelectorAll('.stat-cell');
    statCells.forEach((cell, i) => {
      cell.style.transitionDelay = (i * 0.08) + 's';
    });
  }

  // ── Scroll-triggered section header line animation ──
  function initSectionDividerReveal() {
    const dividers = document.querySelectorAll('.section-divider');
    dividers.forEach((div) => {
      div.style.transform = 'scaleX(0)';
      div.style.transformOrigin = 'left';
      div.style.transition = 'transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = 'scaleX(1)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    dividers.forEach((div) => observer.observe(div));
  }

  // ── Back to Top ────────────────────────────
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', '回到顶部');
    btn.innerHTML = '&#8593;';
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 500) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Dynamic Copyright Year ─────────────────
  function initCopyrightYear() {
    var el = document.getElementById('copyright-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ── Reading Progress Bar ───────────────────
  function initProgressBar() {
    var bar = document.createElement('div');
    bar.id = 'reading-progress';
    document.body.prepend(bar);
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollTop = window.scrollY;
          var docHeight = document.documentElement.scrollHeight - window.innerHeight;
          var pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
          bar.style.width = pct + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── 3D Card Tilt ───────────────────────────
  function initCardTilt() {
    var cards = document.querySelectorAll('.card, .news-item, .stat-cell');
    cards.forEach(function (card) {
      card.classList.add('tilt-enabled');
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 5) + 'deg) rotateX(' + (-y * 5) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
      });
    });
  }

  // ── Timeline Draw Animation ────────────────
  function initTimelineDraw() {
    var timeline = document.querySelector('.timeline');
    if (!timeline) return;

    // Replace static ::before line with animated element
    var line = document.createElement('div');
    line.className = 'timeline-line';
    timeline.style.position = 'relative';
    timeline.insertBefore(line, timeline.firstChild);

    var items = timeline.querySelectorAll('.timeline-item');
    var ticking = false;

    function updateLine() {
      if (!ticking) {
        requestAnimationFrame(function () {
          var rect = timeline.getBoundingClientRect();
          var timelineTop = rect.top;
          var viewH = window.innerHeight;
          // Start drawing when timeline top enters viewport
          var progress = Math.max(0, Math.min(1, (viewH - timelineTop) / (viewH + rect.height)));
          line.style.height = (progress * 100) + '%';
          ticking = false;
        });
        ticking = true;
      }
    }

    // Light up dots when they enter viewport
    var dotObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var dot = entry.target.querySelector('.timeline-dot');
        if (!dot) {
          dot = document.createElement('div');
          dot.className = 'timeline-dot';
          entry.target.style.position = 'relative';
          entry.target.appendChild(dot);
        }
        if (entry.isIntersecting) {
          dot.classList.add('lit');
        }
      });
    }, { threshold: 0.4 });

    items.forEach(function (item) { dotObserver.observe(item); });
    window.addEventListener('scroll', updateLine, { passive: true });
    updateLine();
  }

  // ── Page Transition ─────────────────────────
  function initPageTransition() {
    document.body.classList.add('page-entering');
    // Intercept nav clicks for transition feel
    document.querySelectorAll('nav a, .breadcrumb a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.2s ease';
        setTimeout(function () {
          window.location.href = href;
        }, 200);
      });
    });
  }

  // ── Boot ───────────────────────────────────
  function boot() {
    initCopyrightYear();
    initProgressBar();
    initScrollReveal();
    initStatsCounter();
    initButtonRipple();
    initHeroParallax();
    initNavScrollShadow();
    initSmoothScroll();
    initMobileMenuClose();
    initStatEntrance();
    initSectionDividerReveal();
    initBackToTop();
    initCardTilt();
    initTimelineDraw();
    initPageTransition();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
