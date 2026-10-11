(() => {
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const currentPage = body.dataset.page;
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
  const assetPrefix = isEnglish ? '../' : '';
  const copy = isEnglish ? {
    home: 'Home',
    doctor: 'Dr. Mohamed Mostafa Soliman',
    specialty: 'Consultant of Diagnostic & Interventional Radiology',
    about: 'About',
    services: 'Expertise',
    training: 'RadioMind',
    knowledge: 'Articles',
    videos: 'Videos',
    events: 'News',
    contact: 'Book / Contact',
    explore: 'Explore',
    contactHeading: 'Contact',
    appointment: 'Request an appointment or ask a question',
    newsEvents: 'News & events',
    facebook: 'Facebook ↗',
    socialLabel: 'Dr. Mohamed’s official profiles',
    whatsappLabel: 'Contact Smart Scan on WhatsApp',
    whatsappText: 'Smart Scan WhatsApp'
  } : {
    home: 'الصفحة الرئيسية',
    doctor: 'د. محمد مصطفى سليمان',
    specialty: 'استشاري الأشعة التشخيصية والتداخلية',
    about: 'عن الدكتور',
    services: 'التخصصات',
    training: 'RadioMind',
    knowledge: 'المقالات',
    videos: 'الفيديوهات',
    events: 'الأخبار',
    contact: 'احجز / تواصل',
    explore: 'استكشف',
    contactHeading: 'تواصل',
    appointment: 'طلب موعد أو استفسار',
    newsEvents: 'الأخبار والفعاليات',
    facebook: 'فيسبوك ↗',
    socialLabel: 'حسابات د. محمد الرسمية',
    whatsappLabel: 'تواصل عبر واتساب مع Smart Scan',
    whatsappText: 'واتساب Smart Scan'
  };

  if (!document.head.querySelector(`link[rel="alternate"][hreflang="${isEnglish ? 'ar' : 'en'}"]`)) {
    const alternate = document.createElement('link');
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    alternate.rel = 'alternate';
    alternate.hreflang = isEnglish ? 'ar' : 'en';
    alternate.href = isEnglish ? `../${currentFile}` : `en/${currentFile}`;
    document.head.appendChild(alternate);
  }

  const brandMarkup = `
    <img class="brand__mark" src="${assetPrefix}assets/logo-mark-v2.svg" alt="">
    <span class="brand__copy"><strong>${copy.doctor}</strong><small>${copy.specialty}</small></span>`;

  document.querySelectorAll('.site-header .brand').forEach((brand) => {
    brand.classList.add('brand--new');
    brand.setAttribute('aria-label', copy.home);
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
    body.classList.toggle('has-scrolled', window.scrollY > 160);
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

  document.querySelectorAll('[data-page-link="home"]').forEach((link) => { link.textContent = isEnglish ? 'Home' : 'الرئيسية'; });
  document.querySelectorAll('[data-page-link="about"]').forEach((link) => { link.textContent = copy.about; });
  document.querySelectorAll('[data-page-link="services"]').forEach((link) => { link.textContent = copy.services; });
  document.querySelectorAll('[data-page-link="knowledge"]').forEach((link) => { link.textContent = copy.knowledge; });
  document.querySelectorAll('[data-page-link="training"]').forEach((link) => { link.textContent = copy.training; });
  document.querySelectorAll('[data-page-link="events"]').forEach((link) => { link.textContent = copy.events; });

  document.querySelectorAll('.site-nav').forEach((navigation) => {
    if (!navigation.querySelector('a[href="videos.html"]')) {
      const link = document.createElement('a');
      link.href = 'videos.html';
      link.dataset.pageLink = 'videos';
      link.textContent = copy.videos;
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

  document.querySelectorAll('.site-header .header-cta').forEach((link) => { link.textContent = copy.contact; });
  document.querySelectorAll('.site-header .nav-wrap').forEach((wrap) => {
    if (wrap.querySelector('.language-switch')) return;
    const switcher = document.createElement('a');
    const fileName = window.location.pathname.split('/').pop() || 'index.html';
    switcher.className = 'language-switch';
    switcher.href = isEnglish ? `../${fileName}` : `en/${fileName}`;
    switcher.lang = isEnglish ? 'ar' : 'en';
    switcher.hreflang = isEnglish ? 'ar' : 'en';
    switcher.setAttribute('aria-label', isEnglish ? 'عرض الموقع بالعربية' : 'View the website in English');
    switcher.textContent = isEnglish ? 'العربية' : 'EN';
    wrap.insertBefore(switcher, wrap.querySelector('.header-cta'));
  });
  document.querySelectorAll('.site-footer .footer-col').forEach((column) => {
    const heading = column.querySelector('h3')?.textContent.trim();
    if (heading === 'استكشف' || heading === 'Explore') {
      column.innerHTML = `<h3>${copy.explore}</h3><a href="about.html">${copy.about}</a><a href="services.html">${copy.services}</a><a href="training.html">RadioMind</a><a href="knowledge.html">${copy.knowledge}</a><a href="videos.html">${copy.videos}</a>`;
    }
    if (heading === 'تواصل' || heading === 'Contact') {
      column.innerHTML = `<h3>${copy.contactHeading}</h3><a href="contact.html">${copy.appointment}</a><a href="events.html">${copy.newsEvents}</a><a href="https://www.facebook.com/mohamed.soliman.90260403" target="_blank" rel="noopener">${copy.facebook}</a>`;
    }
  });

  const icon = (name) => {
    const paths = {
      facebook: '<path d="M14.3 8.2h3.2V4.4c-.6-.1-2.4-.2-4.5-.2-4.4 0-7.4 2.7-7.4 7.6v4.2H.8v4.3h4.8V31h5.8V20.3h4.8l.8-4.3h-5.6v-3.8c0-1.3.4-2.2 2.9-2.2v-1.8Z" transform="translate(4 -5) scale(.8)"/>',
      instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.6" cy="6.6" r="1.1"/>',
      youtube: '<path d="M21.3 7.1a2.9 2.9 0 0 0-2-2C17.5 4.6 12 4.6 12 4.6s-5.5 0-7.3.5a2.9 2.9 0 0 0-2 2A30.2 30.2 0 0 0 2.2 12a30.2 30.2 0 0 0 .5 4.9 2.9 2.9 0 0 0 2 2c1.8.5 7.3.5 7.3.5s5.5 0 7.3-.5a2.9 2.9 0 0 0 2-2 30.2 30.2 0 0 0 .5-4.9 30.2 30.2 0 0 0-.5-4.9ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"/>',
      linkedin: '<path d="M5.3 7.7H1.7V21h3.6V7.7ZM3.5 2A2.1 2.1 0 1 0 3.5 6.2 2.1 2.1 0 0 0 3.5 2ZM21.5 13.4c0-4-2.1-5.9-5-5.9a4.3 4.3 0 0 0-3.9 2.2v-2H9V21h3.6v-6.6c0-1.7.3-3.4 2.5-3.4 2.1 0 2.2 2 2.2 3.5V21h3.6l.6-7.6Z" transform="translate(.4 .5) scale(.93)"/>',
      whatsapp: '<path d="M20.5 3.5A11.7 11.7 0 0 0 12.1 0 11.9 11.9 0 0 0 1.8 17.8L0 24l6.4-1.7A11.9 11.9 0 0 0 24 11.9c0-3.2-1.2-6.1-3.5-8.4Zm-8.4 18.4c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.7 9.7 0 1 1 8.5 4.7Zm5.3-7.2c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1a7.9 7.9 0 0 1-2.3-1.4 8.7 8.7 0 0 1-1.6-2c-.2-.3 0-.5.1-.7l.5-.6.3-.6c.1-.2 0-.5 0-.6l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9 0 1.7 1.3 3.4 1.4 3.6.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.6-.4Z"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
  };

  const profileLinks = [
    { name: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/mohamed.soliman.90260403' },
    { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/MohamedSoliman1987/' },
    { name: 'youtube', label: 'YouTube', href: 'https://youtube.com/@MohamedSoliman87' },
    { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-soliman-949976137' }
  ];

  document.querySelectorAll('.footer-brand').forEach((footerBrand) => {
    if (footerBrand.querySelector('.social-links')) return;
    const links = document.createElement('div');
    links.className = 'social-links social-links--footer';
    links.setAttribute('aria-label', copy.socialLabel);
    links.innerHTML = profileLinks.map((profile) => `<a href="${profile.href}" target="_blank" rel="noopener" aria-label="${profile.label}">${icon(profile.name)}</a>`).join('');
    footerBrand.appendChild(links);
  });

  document.querySelectorAll('.official-links a').forEach((link) => {
    const profile = profileLinks.find((item) => link.href.includes(new URL(item.href).hostname.replace('www.', '')));
    if (!profile || link.querySelector('svg')) return;
    link.classList.add('social-profile-link');
    link.insertAdjacentHTML('afterbegin', icon(profile.name));
  });

  const whatsapp = document.createElement('a');
  whatsapp.className = 'whatsapp-float';
  whatsapp.href = 'https://wa.me/201112214183';
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener';
  whatsapp.setAttribute('aria-label', copy.whatsappLabel);
  whatsapp.innerHTML = `<span>${copy.whatsappText}</span><i>${icon('whatsapp')}</i>`;
  body.appendChild(whatsapp);

  const chapterMap = isEnglish ? {
    about: ['01', 'Professional profile'],
    services: ['02', 'Clinical expertise'],
    training: ['03', 'Medical training'],
    knowledge: ['04', 'Articles & guidance'],
    videos: ['05', 'Video library'],
    events: ['06', 'News & events'],
    contact: ['07', 'Contact & appointments']
  } : {
    about: ['01', 'الملف المهني'],
    services: ['02', 'التخصصات الطبية'],
    training: ['03', 'التدريب الطبي'],
    knowledge: ['04', 'المقالات والإرشادات'],
    videos: ['05', 'المكتبة المرئية'],
    events: ['06', 'الأخبار والفعاليات'],
    contact: ['07', 'التواصل والمواعيد']
  };
  const pageHero = document.querySelector('.page-hero');
  if (pageHero && chapterMap[currentPage]) {
    pageHero.dataset.chapter = chapterMap[currentPage][0];
    pageHero.dataset.chapterLabel = chapterMap[currentPage][1];
  }

  if (document.querySelector('.article-masthead')) {
    const progress = document.createElement('span');
    progress.className = 'article-progress';
    progress.setAttribute('aria-hidden', 'true');
    body.appendChild(progress);
    const updateReadingProgress = () => {
      const article = document.querySelector('.article-body');
      if (!article) return;
      const start = article.getBoundingClientRect().top + window.scrollY;
      const distance = article.offsetHeight - window.innerHeight;
      const value = Math.max(0, Math.min(1, (window.scrollY - start + 140) / Math.max(distance, 1)));
      progress.style.setProperty('--reading-progress', `${value * 100}%`);
    };
    updateReadingProgress();
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
  }
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

  document.querySelectorAll('[data-featured-video]').forEach((player) => {
    const video = player.querySelector('[data-featured-video-media]');
    const playButton = player.querySelector('[data-featured-video-play]');
    if (!video || !playButton) return;

    playButton.addEventListener('click', async () => {
      video.muted = false;
      video.volume = 1;
      try {
        await video.play();
        playButton.hidden = true;
      } catch {
        video.controls = true;
      }
    });
    video.addEventListener('play', () => { playButton.hidden = true; });
    video.addEventListener('ended', () => { playButton.hidden = false; });
  });

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
      const isTraining = /RadioMind|training|institution|lecture|event|تدريب|مؤسسة|محاضرة|فعالية/i.test(request);
      const destination = isTraining ? '201500552154' : '201112214183';
      const message = isEnglish ? [
        'Hello, I am sending this request from Dr. Mohamed Mostafa Soliman’s website:',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Request: ${request}`,
        `Details: ${details}`
      ].join('\n') : [
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
