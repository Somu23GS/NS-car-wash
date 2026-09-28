/* ══════════════════════════════════════════════════════════════════
   NS AUTOMATIC CAR WASH — script.js
   ══════════════════════════════════════════════════════════════════

   ✏️✏️✏️  SITE SETTINGS — MEE VIVARALU IKKADA MARANDI  ✏️✏️✏️
   ─────────────────────────────────────────────────────────────────
   Phone numbers, WhatsApp numbers, address, working hours —
   website motham (top bar, header, hero, contact, booking form)
   ee okka block nunchi update avtundi.

   Example: phone1 value "+91 93465 94281" ni "+91 90000 00000"
   ga marchandi → save → site motham automatic ga update.       */
var SITE = {
  phone1: '+91 93465 94281',          // ✏️ main phone number
  phone2: '+91 94404 08803',          // ✏️ second phone / WhatsApp
  whatsappPrimary: '919346594281',    // ✏️ booking form WhatsApp (digits only)
  whatsappSecondary: '919440408803',  // ✏️ WhatsApp button number (digits only)
  address: 'Add your exact shop address here',  // ✏️ shop address
  hours: 'Call to confirm today’s slot'         // ✏️ working hours
};
/* ═══════════════ SITE SETTINGS END ═══════════════ */

(function () {
  'use strict';

  /* ══════ 1 — Apply SITE SETTINGS to the whole page ══════ */
  function applySiteSettings() {
    // Click-to-call links
    document.querySelectorAll('[data-phone]').forEach(function (el) {
      var value = SITE[el.getAttribute('data-phone')];
      if (value) el.setAttribute('href', 'tel:' + value.replace(/[^\d+]/g, ''));
    });
    // WhatsApp links
    document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
      var value = SITE[el.getAttribute('data-whatsapp')];
      if (value) el.setAttribute('href', 'https://wa.me/' + value);
    });
    // Visible phone number texts
    document.querySelectorAll('[data-phone-text]').forEach(function (el) {
      var value = SITE[el.getAttribute('data-phone-text')];
      if (value) el.textContent = value;
    });
    // Address + working hours
    var addressEl = document.querySelector('[data-address]');
    if (addressEl) addressEl.textContent = SITE.address;
    var hoursEl = document.querySelector('[data-hours]');
    if (hoursEl) hoursEl.textContent = SITE.hours;
  }
  applySiteSettings();

  /* ══════ 2 — Footer year ══════ */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════ 3 — Header, scroll progress bar, back-to-top ══════ */
  var header = document.getElementById('site-header');
  var progressBar = document.getElementById('scroll-progress-bar');
  var toTop = document.getElementById('to-top');

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function setActiveSection() {
    var pos = window.scrollY + window.innerHeight * 0.32;
    var activeId = sections.length ? sections[0].id : null;
    sections.forEach(function (section) {
      if (pos >= section.offsetTop) activeId = section.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
    });
  }

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 24);
    if (progressBar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    }
    if (toTop) toTop.classList.toggle('show', y > 600);
    setActiveSection();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ══════ 4 — Mobile navigation ══════ */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ══════ 5 — Hero wash-process slider ══════ */
  var SLIDES = [
    { title: 'FOAM APPLICATION', copy: 'Dissolving dirt without the harsh touch' },
    { title: 'TOUCHLESS RINSE', copy: 'Controlled jets, zero contact' },
    { title: 'SPOTLESS & SHINY', copy: 'Dried, checked and ready to go' }
  ];
  var sceneTitle = document.getElementById('scene-title');
  var sceneCopy = document.getElementById('scene-copy');
  var dots = Array.prototype.slice.call(document.querySelectorAll('.slide-dot'));
  var currentSlide = 0;
  var sliderTimer = null;

  function goToSlide(index) {
    if (!sceneTitle || !sceneCopy || !dots.length) return;
    currentSlide = (index + SLIDES.length) % SLIDES.length;
    var slide = SLIDES[currentSlide];
    sceneTitle.textContent = slide.title;
    sceneCopy.textContent = slide.copy;
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentSlide);
      dot.setAttribute('aria-pressed', i === currentSlide ? 'true' : 'false');
    });
  }
  function startSlider() {
    stopSlider();
    sliderTimer = setInterval(function () { goToSlide(currentSlide + 1); }, 3600);
  }
  function stopSlider() {
    if (sliderTimer) { clearInterval(sliderTimer); sliderTimer = null; }
  }
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToSlide(i);
      startSlider();
    });
  });
  goToSlide(0);
  startSlider();

  if ('IntersectionObserver' in window) {
    var hero = document.querySelector('.hero');
    if (hero) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) startSlider(); else stopSlider();
        });
      }, { threshold: 0.15 }).observe(hero);
    }
  }

  /* ══════ 6 — Reveal on scroll ══════ */
  var revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -34px 0px' });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  /* ══════ 7 — Gallery lightbox (photo zoom) ══════ */
  var lightbox = document.getElementById('lightbox');
  var lbImg = lightbox ? lightbox.querySelector('img') : null;
  var lbCap = lightbox ? lightbox.querySelector('figcaption') : null;
  var lastFocus = null;

  function openLightbox(src, caption, alt) {
    if (!lightbox || !lbImg) return;
    lastFocus = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || '';
    if (lbCap) lbCap.textContent = caption || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    var closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      if (!img) return;
      openLightbox(img.getAttribute('src'), item.getAttribute('data-caption') || '', img.alt);
    });
    item.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });
  });
  if (lightbox) {
    var lbClose = lightbox.querySelector('.lightbox-close');
    var lbBackdrop = lightbox.querySelector('.lightbox-backdrop');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeLightbox();
    });
  }

  /* ══════ 8 — Service cards prefill the booking form ══════ */
  var serviceSelect = document.querySelector('#booking-form select[name="service"]');
  document.querySelectorAll('.service-card').forEach(function (card) {
    var link = card.querySelector('.service-link');
    if (!link || !serviceSelect) return;
    link.addEventListener('click', function () {
      var value = card.getAttribute('data-service');
      Array.prototype.slice.call(serviceSelect.options).forEach(function (option) {
        if (option.value === value || option.text === value) serviceSelect.value = option.value || option.text;
      });
    });
  });

  /* ══════ 9 — Booking form → WhatsApp ══════ */
  var WHATSAPP_NUMBERS = [SITE.whatsappPrimary, SITE.whatsappSecondary];
  var form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = (form.elements.namedItem('name') || {}).value || '';
      var phone = (form.elements.namedItem('phone') || {}).value || '';
      var car = (form.elements.namedItem('car') || {}).value || '';
      var service = (form.elements.namedItem('service') || {}).value || '';
      name = name.trim(); phone = phone.trim(); car = car.trim();

      if (!name || !phone || !car || !service) return;

      var digits = phone.replace(/\D/g, '');
      var useNumber = (WHATSAPP_NUMBERS.indexOf(digits) !== -1 || digits.length < 10)
        ? SITE.whatsappPrimary
        : ('91' + digits.slice(-10));

      var message =
        'Hello NS Automatic Car Wash! I would like to book a service.\n\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Car model: ' + car + '\n' +
        'Service: ' + service + '\n\n' +
        'Please confirm my slot. Thank you!';

      showToast();
      window.open('https://wa.me/' + useNumber + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
      form.reset();
    });
  }

  /* ══════ 10 — Toast ══════ */
  var toast = document.querySelector('.toast');
  var toastTimer = null;
  function showToast() {
    if (!toast) return;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3200);
  }

  /* ══════ 11 — Hero parallax (mouse move, desktop only) ══════ */
  var heroSection = document.querySelector('.hero');
  var heroVisual = document.querySelector('.hero-visual');
  if (heroSection && heroVisual && window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
    var layers = [
      { el: document.querySelector('.orbit-one'), x: 16, y: 12 },
      { el: document.querySelector('.orbit-two'), x: -20, y: -14 },
      { el: document.querySelector('.note-top'), x: 12, y: 10 },
      { el: document.querySelector('.note-bottom'), x: -10, y: 12 }
    ];
    heroSection.addEventListener('mousemove', function (event) {
      var rect = heroSection.getBoundingClientRect();
      var cx = (event.clientX - rect.left) / rect.width - 0.5;
      var cy = (event.clientY - rect.top) / rect.height - 0.5;
      layers.forEach(function (layer) {
        if (layer.el) layer.el.style.translate = (cx * layer.x).toFixed(1) + 'px ' + (cy * layer.y).toFixed(1) + 'px';
      });
    });
    heroSection.addEventListener('mouseleave', function () {
      layers.forEach(function (layer) {
        if (layer.el) layer.el.style.translate = '0px 0px';
      });
    });
  }
})();
