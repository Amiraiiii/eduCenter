// =====================================================
// EduCenter — Main JavaScript v2.0
// Particles · Navbar · Counters · Filters · Reveals
// =====================================================

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initCourseFilter();
  initActiveNavLinks();
  initParticles();
  initCourseCardEvents();
  initHeroTyped();
});

/* =====================================================
   NAVBAR — scroll glass effect
   ===================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const update = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 32);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* =====================================================
   HAMBURGER
   ===================================================== */
function initHamburger() {
  const btn = document.getElementById('hamburger-btn');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  const close = () => {
    nav.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(l => l.addEventListener('click', close));

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* =====================================================
   ACTIVE NAV LINKS
   ===================================================== */
function initActiveNavLinks() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-68px 0px -40% 0px' });

  sections.forEach(s => io.observe(s));
}

/* =====================================================
   SCROLL REVEAL — stagger by position
   ===================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -56px 0px' });

  reveals.forEach(el => io.observe(el));
}

/* =====================================================
   ANIMATED COUNTERS
   ===================================================== */
function initCounters() {
  // Hero counters
  countWhenVisible('counter-students', 15000, 2200, v => v.toLocaleString('ru') + '+');
  countWhenVisible('counter-employment', 94,    1600, v => v + '%');

  // Stats section
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    countWhenVisible(el, +el.dataset.target, 2000, v => {
      const s = el.dataset.suffix || '';
      return (v >= 1000 ? (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + 'K' : String(v)) + s;
    });
  });
}

function countWhenVisible(elOrId, target, duration, fmt) {
  const el = typeof elOrId === 'string' ? document.getElementById(elOrId) : elOrId;
  if (!el) return;

  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animateCount(el, target, duration, fmt);
      io.disconnect();
    }
  }, { threshold: 0.6 });

  io.observe(el);
}

function animateCount(el, target, duration, fmt) {
  const start = performance.now();
  const step = time => {
    const t = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
    el.textContent = fmt(Math.round(eased * target));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* =====================================================
   COURSE FILTER
   ===================================================== */
function initCourseFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.course-card');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animationDelay = `${i * 0.05}s`;
          card.style.animation = 'fadeInUp 0.4s var(--ease-out) both';
        }
      });
    });
  });
}

/* =====================================================
   COURSE CARD EVENTS — open AI on card btn click
   ===================================================== */
function initCourseCardEvents() {
  document.querySelectorAll('.course-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.course-card');
      const title = card?.querySelector('.course-title')?.textContent || 'курс';

      // Button pop
      btn.style.transform = 'scale(0.93)';
      setTimeout(() => (btn.style.transform = ''), 140);

      // Open AI chat
      document.dispatchEvent(new CustomEvent('eduOpenAI', {
        detail: { message: `Расскажи подробнее о курсе "${title}"` }
      }));
    });
  });
}

/* =====================================================
   HERO TYPED ANIMATION
   ===================================================== */
function initHeroTyped() {
  const el = document.querySelector('.hero-title .typed-word');
  if (!el) return;

  const words = ['карьеру', 'будущее', 'профессию', 'путь'];
  let wi = 0, ci = 0, deleting = false;

  const tick = () => {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 60 : 100);
  };

  setTimeout(tick, 800);
}

/* =====================================================
   CANVAS PARTICLES
   ===================================================== */
function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let W, H, particles;

  const COLORS = ['rgba(124,58,237,', 'rgba(6,182,212,', 'rgba(167,139,250,', 'rgba(56,189,248,'];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles(n = 70) {
    return Array.from({ length: n }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 2 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a:  Math.random() * 0.6 + 0.15,
      c:  COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    drawLines();

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + p.a + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    requestAnimationFrame(draw);
  }

  resize();
  particles = createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    particles = createParticles();
  });

  // Mouse interaction
  canvas.parentElement?.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    particles.forEach(p => {
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.8;
        p.vx -= (dx / dist) * force;
        p.vy -= (dy / dist) * force;
        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) { p.vx = (p.vx / speed) * 2; p.vy = (p.vy / speed) * 2; }
      }
    });
  });
}

/* =====================================================
   FAQ ACCORDION (contacts page)
   ===================================================== */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-question');
  if (!q) return;

  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
