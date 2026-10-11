(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const currentPage = body.dataset.page;

  const brandMarkup = `
    <img class="brand__mark" src="assets/logo-mark-v2.svg" alt="">
    <span class="brand__copy"><strong>د. محمد مصطفى سليمان</strong><small>استشاري الأشعة التشخيصية والتداخلية</small></span>`;

  document.querySelectorAll('.site-header .brand').forEach((brand) => {
    brand.classList.add('brand--new');
    brand.setAttribute('aria-label', 'الصفحة الرئيسية');
    brand.innerHTML = brandMarkup;
  });

  document.querySelectorAll('.footer-brand').forEach((footerBrand) => {
    let brand = footerBrand.querySelector('.brand');
    const legacyImage = footerBrand.querySelector(':scope > img');
    if (!brand) {
      brand = document.createElement('a');
      brand.href = 'index.html';
      brand.className = 'brand brand--new brand--footer';
      footerBrand.insertBefore(brand, footerBrand.firstChild);
    }
    brand.classList.add('brand--new', 'brand--footer');
    brand.innerHTML = brandMarkup;
    legacyImage?.remove();
  });

  const closeMenu = () => {
    body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };

  const syncHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = body.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  document.querySelectorAll('[data-page-link="knowledge"]').forEach((link) => { link.textContent = 'المقالات'; });
  document.querySelectorAll('[data-page-link="training"]').forEach((link) => { link.textContent = 'RadioMind'; });
  document.querySelectorAll('[data-page-link="events"]').forEach((link) => { link.textContent = 'الأخبار'; });

  document.querySelectorAll('.site-nav').forEach((navigation) => {
    if (!navigation.querySelector('a[href="videos.html"]')) {
      const link = document.createElement('a');
      link.href = 'videos.html';
      link.dataset.pageLink = 'videos';
      link.textContent = 'الفيديوهات';
      link.addEventListener('click', closeMenu);
      navigation.insertBefore(link, navigation.querySelector('[data-page-link="events"]'));
    }
  });

  if (currentPage) {
    document.querySelectorAll(`[data-page-link="${currentPage}"]`).forEach((link) => {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    });
  }

  document.querySelectorAll('.site-header .header-cta').forEach((link) => { link.textContent = 'احجز / تواصل'; });
  document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -35px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (reducedMotion) {
    document.querySelectorAll('video[autoplay]').forEach((video) => video.pause());
  }

  document.querySelectorAll('[data-expertise]').forEach((switcher) => {
    const buttons = [...switcher.querySelectorAll('[data-expertise-button]')];
    const panels = [...switcher.querySelectorAll('[data-expertise-panel]')];

    const activate = (button) => {
      const target = button.dataset.expertiseButton;
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        const active = panel.dataset.expertisePanel === target;
        panel.classList.toggle('is-active', active);
        panel.setAttribute('aria-hidden', String(!active));
      });
    };

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activate(button));
      button.addEventListener('keydown', (event) => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const direction = ['ArrowDown', 'ArrowLeft'].includes(event.key) ? 1 : -1;
        const next = buttons[(index + direction + buttons.length) % buttons.length];
        activate(next);
        next.focus();
      });
    });
    activate(buttons.find((button) => button.classList.contains('is-active')) || buttons[0]);
  });

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const request = String(data.get('request') || '').trim();
      const details = String(data.get('message') || '').trim();
      const isTraining = /RadioMind|تدريب|مؤسسة|محاضرة|فعالية/.test(request);
      const destination = isTraining ? '201500552154' : '201112214183';
      const message = [
        'مرحبًا، أرسل هذا الطلب من موقع د. محمد مصطفى سليمان:',
        `الاسم: ${name}`,
        `رقم الهاتف: ${phone}`,
        `نوع الطلب: ${request}`,
        `التفاصيل: ${details}`
      ].join('\n');
      form.querySelector('[data-form-status]')?.classList.add('is-visible');
      window.open(`https://wa.me/${destination}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
  });
})();
