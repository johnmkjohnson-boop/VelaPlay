// ═══════════════════════════════════════════════════
// VeloPlay — Main JS (scroll animations, mobile nav)
// ═══════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── Mobile menu toggle ───
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // ─── Header shrink on scroll ───
  const header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ─── Scroll-triggered animations ───
  var animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    animatedEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Animated HUD numbers (subtle random flicker) ───
  var hudVals = document.querySelectorAll('.hud-val');

  function flickerHud() {
    hudVals.forEach(function (el) {
      var base = parseInt(el.textContent, 10);
      if (!el.dataset.base) el.dataset.base = base;
      var b = parseInt(el.dataset.base, 10);
      var jitter = Math.floor(Math.random() * 5) - 2;
      el.textContent = b + jitter;
    });
  }

  if (hudVals.length > 0) {
    setInterval(flickerHud, 1500);
  }
})();
