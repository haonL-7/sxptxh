/* =============================================
   陕西省体能协会 — Interactive Engine
   Vanilla JS · Zero dependencies · 60fps
   ============================================= */

(function () {
  'use strict';

  // ── Scroll Reveal ──────────────────────────
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(
      '.card, .news-item, .timeline-item, .leader-card, .partner-item, .contact-box, .section-hd'
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
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // ── Stats Counter ──────────────────────────
  function initStatsCounter() {
    const statNums = document.querySelectorAll('.stat-num');
    if (!statNums.length) return;

    const animated = new Set();

    function parseTarget(text) {
      const m = text.match(/^(\d+)\+?$/);
      return m ? parseInt(m[1], 10) : null;
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(el, target) {
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(target * eased);
        el.textContent = current + '+';
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + '+';
        }
      }

      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.has(entry.target)) {
            animated.add(entry.target);
            const target = parseTarget(entry.target.textContent.trim());
            if (target !== null) {
              animate(entry.target, target);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    statNums.forEach((el) => {
      // store original
      el.dataset.original = el.textContent.trim();
      observer.observe(el);
    });
  }

  // ── Card Glow Tracking ─────────────────────
  function initCardGlow() {
    const cards = document.querySelectorAll('.card, .news-item, .leader-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', x + 'px');
        card.style.setProperty('--glow-y', y + 'px');
        card.classList.add('glow-active');
      });

      card.addEventListener('mouseleave', function () {
        card.classList.remove('glow-active');
      });
    });
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
    // initial check
    if (window.scrollY > 10) header.classList.add('scrolled');
  }

  // ── Smooth Nav Scroll (sticky header offset) ──
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

  // ── Boot ───────────────────────────────────
  function boot() {
    initScrollReveal();
    initStatsCounter();
    initCardGlow();
    initButtonRipple();
    initHeroParallax();
    initNavScrollShadow();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
