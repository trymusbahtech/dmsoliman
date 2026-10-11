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

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  if (menuButton && nav) {
    const closeMenu = () => {
      body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    };

    menuButton.addEventListener('click', () => {
      const open = body.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (currentPage) {
    document.querySelectorAll(`[data-page-link="${currentPage}"]`).forEach((link) => {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    });
  }

  document.querySelectorAll('[data-page-link="knowledge"]').forEach((link) => {
    link.textContent = 'المقالات';
  });
  document.querySelectorAll('[data-page-link="training"]').forEach((link) => {
    link.textContent = 'RadioMind';
  });
  document.querySelectorAll('[data-page-link="events"]').forEach((link) => {
    link.textContent = 'الأخبار';
  });
  document.querySelectorAll('.site-nav').forEach((navigation) => {
    if (navigation.querySelector('a[href="videos.html"]')) return;
    const videosLink = document.createElement('a');
    videosLink.href = 'videos.html';
    videosLink.dataset.pageLink = 'videos';
    videosLink.textContent = 'الفيديوهات';
    videosLink.addEventListener('click', () => {
      body.classList.remove('menu-open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
    const eventsLink = navigation.querySelector('[data-page-link="events"]');
    navigation.insertBefore(videosLink, eventsLink || null);
    if (currentPage === 'videos') {
      videosLink.classList.add('is-active');
      videosLink.setAttribute('aria-current', 'page');
    }
  });
  document.querySelectorAll('.site-header .header-cta').forEach((link) => {
    link.textContent = 'احجز / تواصل';
  });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const heroVideo = document.querySelector('[data-hero-video]');
  const videoButton = document.querySelector('[data-video-control]');
  if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.pause();
  }
  if (heroVideo && videoButton) {
    videoButton.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoButton.textContent = 'Ⅱ';
        videoButton.setAttribute('aria-label', 'إيقاف الفيديو');
      } else {
        heroVideo.pause();
        videoButton.textContent = '▶';
        videoButton.setAttribute('aria-label', 'تشغيل الفيديو');
      }
    });
  }

  document.querySelectorAll('[data-contact-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const request = String(data.get('request') || '').trim();
      const details = String(data.get('message') || '').trim();
      const trainingRequest = /RadioMind|تدريب|مؤسسة|محاضرة|فعالية/.test(request);
      const destination = trainingRequest ? '201500552154' : '201112214183';
      const message = [
        'مرحبًا، أرسل هذا الطلب من موقع د. محمد مصطفى سليمان:',
        `الاسم: ${name}`,
        `رقم الهاتف: ${phone}`,
        `نوع الطلب: ${request}`,
        `التفاصيل: ${details}`
      ].join('\n');
      const status = form.querySelector('[data-form-status]');
      if (status) status.classList.add('is-visible');
      window.open(`https://wa.me/${destination}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    });
  });

  document.querySelectorAll('[data-expertise]').forEach((switcher) => {
    const buttons = switcher.querySelectorAll('[data-expertise-button]');
    const panels = switcher.querySelectorAll('[data-expertise-panel]');

    panels.forEach((panel) => {
      panel.setAttribute('aria-hidden', String(!panel.classList.contains('is-active')));
    });

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.expertiseButton;
        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-selected', String(active));
        });
        panels.forEach((panel) => {
          const active = panel.dataset.expertisePanel === target;
          panel.classList.toggle('is-active', active);
          panel.setAttribute('aria-hidden', String(!active));
        });
      });
    });
  });

  const socialItems = [
    {
      label: 'فيسبوك',
      href: 'https://www.facebook.com/mohamed.soliman.90260403',
      icon: '<path d="M13.6 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H6.7V13h3.1v9h3.8Z"/>'
    },
    {
      label: 'ماسنجر',
      href: 'https://m.me/mohamed.soliman.90260403',
      icon: '<path d="M12 2.2c-5.5 0-10 4.1-10 9.2 0 2.9 1.5 5.5 3.8 7.2V22l3.5-1.9c.9.3 1.8.4 2.7.4 5.5 0 10-4.1 10-9.2S17.5 2.2 12 2.2Zm1 12.4-2.6-2.8-5 2.8 5.5-5.8 2.7 2.8 4.9-2.8-5.5 5.8Z"/>'
    },
    {
      label: 'إنستجرام',
      href: 'https://www.instagram.com/MohamedSoliman1987/',
      icon: '<path d="M7.1 2h9.8A5.1 5.1 0 0 1 22 7.1v9.8a5.1 5.1 0 0 1-5.1 5.1H7.1A5.1 5.1 0 0 1 2 16.9V7.1A5.1 5.1 0 0 1 7.1 2Zm-.2 2A2.9 2.9 0 0 0 4 6.9v10.2A2.9 2.9 0 0 0 6.9 20h10.2a2.9 2.9 0 0 0 2.9-2.9V6.9A2.9 2.9 0 0 0 17.1 4H6.9Zm10.8 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>'
    },
    {
      label: 'واتساب',
      href: 'https://wa.me/201112214183',
      icon: '<path d="M12 2a9.7 9.7 0 0 0-8.3 14.8L2.3 22l5.3-1.4A9.8 9.8 0 1 0 12 2Zm0 17.6c-1.4 0-2.7-.4-3.8-1l-.3-.2-3.1.8.8-3-.2-.3A7.6 7.6 0 1 1 12 19.6Zm4.2-5.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.3 6.3 0 0 1-3-2.6c-.2-.3 0-.4.1-.5l.4-.5.2-.4c.1-.2 0-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.7.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1-.1-.1-.2-.2-.4-.3Z"/>'
    }
  ];

  const socialMarkup = socialItems.map((item) => `<a class="social-link" href="${item.href}" target="_blank" rel="noopener" aria-label="${item.label}" title="${item.label}"><svg viewBox="0 0 24 24" aria-hidden="true">${item.icon}</svg><span>${item.label}</span></a>`).join('');
  const socialDock = document.createElement('aside');
  socialDock.className = 'social-dock';
  socialDock.setAttribute('aria-label', 'روابط التواصل الاجتماعي');
  socialDock.innerHTML = socialMarkup;
  body.appendChild(socialDock);

  const footerBrand = document.querySelector('.footer-brand');
  if (footerBrand) {
    const footerSocial = document.createElement('div');
    footerSocial.className = 'footer-social';
    footerSocial.setAttribute('aria-label', 'تابع د. محمد مصطفى سليمان');
    footerSocial.innerHTML = socialMarkup;
    footerBrand.appendChild(footerSocial);
  }

  const exploreHeading = Array.from(document.querySelectorAll('.footer-col h3')).find((heading) => heading.textContent.trim() === 'استكشف');
  if (exploreHeading && !exploreHeading.parentElement.querySelector('a[href="videos.html"]')) {
    const videosLink = document.createElement('a');
    videosLink.href = 'videos.html';
    videosLink.textContent = 'الفيديوهات';
    exploreHeading.parentElement.appendChild(videosLink);
  }
})();
