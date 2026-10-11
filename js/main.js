/* ============================================
   ÖZGÜR AKKAYA — main.js
   ============================================ */

// === Hamburger Menu ===
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  const setMenuOpen = open => {
    navLinks.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  };

  hamburger.addEventListener('click', () => {
    setMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      hamburger.focus();
    }
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('nav')) setMenuOpen(false);
  });

  window.matchMedia('(max-width: 720px)').addEventListener('change', () => setMenuOpen(false));
}

// === Active nav link on scroll ===
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

if (sections.length && navItems.length && typeof window.IntersectionObserver === 'function') {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35 }
  );
  sections.forEach(s => observer.observe(s));
}

// === Blog Category Filter ===
const filterBtns = document.querySelectorAll('.filter-btn');
const postItems  = document.querySelectorAll('.blog-post-item[data-cat]');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;

      filterBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });

      postItems.forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? 'grid' : 'none';
      });
    });
  });
}

// === Smooth appear on scroll ===
const cards = document.querySelectorAll(
  '.project-card, .blog-card, .feature-card, .contact-item, .timeline-item'
);

if (typeof window.IntersectionObserver === 'function' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(card);
  });
}

// === Gallery Lightbox ===
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryItems.length) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  const bigImg = document.createElement('img');
  overlay.appendChild(bigImg);
  document.body.appendChild(overlay);

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      bigImg.src = item.querySelector('img').src;
      bigImg.alt = item.querySelector('span').textContent;
      overlay.classList.add('open');
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target !== bigImg) overlay.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });
}
