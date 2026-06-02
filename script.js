// ──────────────── THEME TOGGLE ────────────────
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');

function applyTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    themeIcon.classList.toggle('fa-sun', isDark);
    themeIcon.classList.toggle('fa-moon', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

themeBtn.addEventListener('click', () => {
    applyTheme(!document.body.classList.contains('dark'));
});

const saved = localStorage.getItem('theme');
if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    applyTheme(true);
} else {
    applyTheme(false);
}

// ──────────────── MOBILE MENU ────────────────
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('main-nav');
const navLinks = nav.querySelectorAll('a');

menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
navLinks.forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ──────────────── ACTIVE NAV ON SCROLL ────────────────
const sections = document.querySelectorAll('main section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = nav.querySelector(`a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
            history.replaceState(null, null, `#${entry.target.id}`);
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ──────────────── SCROLL REVEAL ────────────────
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ──────────────── SKILL BAR ANIMATION ────────────────
const skillFills = document.querySelectorAll('.skill-fill[data-pct]');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            fill.style.width = fill.dataset.pct + '%';
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(f => skillObserver.observe(f));

// ──────────────── SMOOTH SCROLL ────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ──────────────── CONTACT FORM ────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) return;

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        formSuccess.style.display = 'block';
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    }, 1200);
});

// ──────────────── FOOTER YEAR ────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ──────────────── BACK TO TOP ────────────────
document.getElementById('top-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
