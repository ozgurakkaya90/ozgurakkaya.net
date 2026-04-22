/* ============================================
   ÖZGÜR AKKAYA — main.js
   ============================================ */

// === Hamburger Menu ===
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

// === Active nav link on scroll ===
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

if (sections.length && navItems.length) {
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

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      postItems.forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? 'grid' : 'none';
        if (show) item.style.animation = 'fadeIn 0.3s ease';
      });
    });
  });
}

// === Smooth appear on scroll ===
const cards = document.querySelectorAll(
  '.project-card, .blog-card, .feature-card, .contact-item, .timeline-item'
);

if ('IntersectionObserver' in window) {
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

/* ---- Extra CSS for filter buttons (injected) ---- */
const style = document.createElement('style');
style.textContent = `
  .filter-btn {
    padding: 8px 18px;
    border: 1.5px solid var(--gray-300);
    border-radius: 100px;
    background: transparent;
    font-family: var(--font);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    color: var(--gray-700);
    transition: all 0.22s ease;
  }
  .filter-btn:hover,
  .filter-btn.active {
    background: var(--red);
    border-color: var(--red);
    color: #fff;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
