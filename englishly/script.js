const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
const isEnglishPage = document.documentElement.lang === 'en';
const assetPrefix = isEnglishPage ? '../assets/' : 'assets/';
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="${assetPrefix}icons.svg#${name}"></use></svg>`;

document.querySelectorAll('.topbar-list a').forEach((link) => {
  if (link.querySelector('.icon')) return;
  const name = link.href.startsWith('tel:') ? 'phone' : link.href.startsWith('mailto:') ? 'mail' : '';
  if (name) link.insertAdjacentHTML('afterbegin', icon(name));
});

let whatsappButton = document.querySelector('.whatsapp-float');
if (!whatsappButton) {
  whatsappButton = document.createElement('a');
  whatsappButton.className = 'whatsapp-float';
  whatsappButton.href = 'https://wa.me/201035671419';
  whatsappButton.setAttribute('aria-label', isEnglishPage ? 'WhatsApp' : 'تواصل على واتساب');
  document.body.append(whatsappButton);
}
whatsappButton.innerHTML = icon('whatsapp');

document.querySelectorAll('.footer-grid > :first-child').forEach((column) => {
  if (column.querySelector('.social-links')) return;
  const socialLinks = document.createElement('div');
  socialLinks.className = 'social-links';
  socialLinks.innerHTML = `<a href="https://www.facebook.com/Englishly.me" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a><a href="mailto:hello@englishly.me" aria-label="Email">${icon('mail')}</a><a href="https://wa.me/201035671419" aria-label="WhatsApp">${icon('whatsapp')}</a>`;
  column.append(socialLinks);
});

const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));

const contactForm = document.querySelector('[data-whatsapp-form]');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const message = isEnglishPage
    ? `Hello Englishly, I would like to ask about the right program.\nName: ${data.get('name')}\nAge: ${data.get('age')}\nProgram: ${data.get('program')}\nBranch: ${data.get('branch')}\nMessage: ${data.get('message') || '-'}`
    : `مرحبًا Englishly، أريد الاستفسار عن البرنامج المناسب.\nالاسم: ${data.get('name')}\nالعمر: ${data.get('age')}\nالبرنامج: ${data.get('program')}\nالفرع: ${data.get('branch')}\nالرسالة: ${data.get('message') || '-'}`;
  window.open(`https://wa.me/201035671419?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
