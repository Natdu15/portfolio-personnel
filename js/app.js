/* ─────────────────────────────────────────────────────────
   app.js — Nathan Chapuis Portfolio
   GSAP animations · theme toggle · page transitions · navbar
───────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {

  // ── GSAP ──────────────────────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ── PAGE ENTER ────────────────────────────────────────
  const overlay = document.querySelector('.page-overlay');
  if (overlay) {
    gsap.fromTo(overlay,
      { y: 0 },
      { y: '-100%', duration: 0.75, ease: 'power3.inOut', delay: 0.05 }
    );
  }

  // Page header stagger entrance
  const eyebrow = document.querySelector('.page-header .eyebrow');
  const h1      = document.querySelector('.page-header h1');
  const subP    = document.querySelector('.page-header p:not(.eyebrow)');
  if (eyebrow) gsap.from(eyebrow, { y: 18, opacity: 0, duration: 0.55, delay: 0.5,  ease: 'power2.out' });
  if (h1)      gsap.from(h1,      { y: 28, opacity: 0, duration: 0.65, delay: 0.65, ease: 'power2.out' });
  if (subP)    gsap.from(subP,    { y: 16, opacity: 0, duration: 0.55, delay: 0.82, ease: 'power2.out' });

  // Hero sections (jeux, informatique)
  const heroContent = document.querySelector('.jeux-hero-content, .info-hero-content');
  if (heroContent) {
    gsap.from(heroContent.children, {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.15, delay: 0.5, ease: 'power2.out'
    });
  }

  // ── SCROLL REVEAL — singles ───────────────────────────
  gsap.utils.toArray('.reveal').forEach(function (el) {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.75, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // ── SCROLL REVEAL — staggered groups ─────────────────
  gsap.utils.toArray('.reveal-group').forEach(function (container) {
    const children = container.querySelectorAll('.reveal-item');
    gsap.from(children, {
      opacity: 0, y: 40, duration: 0.65, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: container, start: 'top 84%', toggleActions: 'play none none none' }
    });
  });

  // ── SKILL BARS ────────────────────────────────────────
  gsap.utils.toArray('.skill-fill').forEach(function (bar) {
    const target = bar.getAttribute('data-width') || '0%';
    gsap.to(bar, {
      width: target, duration: 1.4, ease: 'power3.out',
      scrollTrigger: { trigger: bar, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // ── TIMELINE ──────────────────────────────────────────
  gsap.utils.toArray('.timeline-item').forEach(function (item, i) {
    gsap.from(item, {
      opacity: 0, x: -30, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: item, start: 'top 87%', toggleActions: 'play none none none' }
    });
  });

  // ── PARALLAX CONTENT ─────────────────────────────────
  gsap.utils.toArray('.parallax-content').forEach(function (el) {
    gsap.from(el, {
      opacity: 0, y: 40, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' }
    });
  });

  // ── NAVBAR SCROLL ────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    ScrollTrigger.create({
      start: 60,
      onEnter:     function () { navbar.classList.add('scrolled'); },
      onLeaveBack: function () { navbar.classList.remove('scrolled'); }
    });
  }

  // ── MOBILE BURGER ────────────────────────────────────
  const burger   = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      burger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        burger.classList.remove('active');
      });
    });
  }

  // ── THEME TOGGLE ─────────────────────────────────────
  const themeBtn = document.querySelector('.theme-toggle');

  function updateThemeIcon() {
    if (!themeBtn) return;
    const theme = document.documentElement.getAttribute('data-theme');
    const icon  = themeBtn.querySelector('i');
    if (icon) icon.className = (theme === 'light') ? 'fas fa-moon' : 'fas fa-sun';
  }
  updateThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next    = (current === 'light') ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('nc-theme', next);
      updateThemeIcon();
      gsap.from(themeBtn, { rotation: 180, duration: 0.4, ease: 'back.out(1.7)' });
    });
  }

  // ── PAGE LEAVE TRANSITIONS ───────────────────────────
  document.querySelectorAll('a[href]').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel')) return;

    link.addEventListener('click', function (e) {
      e.preventDefault();
      const dest = this.href;
      const ov   = document.querySelector('.page-overlay');
      if (ov) {
        gsap.fromTo(ov,
          { y: '100%' },
          { y: '0%', duration: 0.5, ease: 'power3.in',
            onComplete: function () { window.location.href = dest; }
          }
        );
      } else {
        window.location.href = dest;
      }
    });
  });

  // ── ACTIVE NAV LINK ──────────────────────────────────
  const current = window.location.pathname.split('/').pop() || 'home.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  // ── CARD HOVER GLOW (cards on home + passions) ───────
  document.querySelectorAll('.home-card, .passion-card, .platform-card, .project-card, .contact-card, .comp-block').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, { scale: card.classList.contains('home-card') || card.classList.contains('passion-card') ? 1.01 : 1, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });

});
