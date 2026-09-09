document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     MOBILE NAV TOGGLE
     ========================================================= */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // close mobile menu after choosing a link
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* =========================================================
     ACTIVE NAV LINK ON SCROLL
     ========================================================= */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks)
    .map(link => document.getElementById(link.dataset.target))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.target === id);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }
  // default active state on load
  setActiveLink('home');

  /* =========================================================
     PROJECT CAROUSEL — "Some of my project"
     ========================================================= */
  const projects = [
    {
      title: "Dodot\u2019s Space Journey Game",
      label: "Game",
      desc: "Game edukatif bertema luar angkasa yang dirancang dengan UI interaktif dan alur permainan yang menyenangkan. Saya bertanggung jawab merancang tampilan antarmuka, ikon, dan pengalaman pengguna dari awal hingga akhir.",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FFB823" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2.5 2 4 5.5 4 9 0 2-1 4-1 4h-6s-1-2-1-4c0-3.5 1.5-7 4-9z"/><circle cx="12" cy="9" r="1.6"/><path d="M9 15l-2.5 5M15 15l2.5 5M10.5 19h3"/></svg>'
    },
    {
      title: "Website E-Commerce",
      label: "Website",
      desc: "Platform e-commerce untuk produk kue lebaran premium, lengkap dengan katalog produk, keranjang belanja, dan tampilan responsif di berbagai perangkat untuk meningkatkan pengalaman berbelanja pelanggan.",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FFB823" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l-1 12H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>'
    },
    {
      title: "FoodTrayker Aplication",
      label: "Aplikasi",
      desc: "Aplikasi manajemen pemesanan makanan yang membantu UMKM kuliner mengelola pesanan, stok, dan pengiriman secara efisien melalui satu dashboard yang mudah digunakan.",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#FFB823" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v7a2 2 0 0 0 2 2v9M5 3v7M7.5 3v7M10 3v7a2 2 0 0 1-2 2M18 3c-2 1-3 3-3 6 0 2 1 3 3 3v9"/></svg>'
    }
  ];

  let currentProject = 0;

  const cardEl = document.getElementById('projectCard');
  const titleEl = document.getElementById('projectTitle');
  const descEl = document.getElementById('projectDesc');
  const labelEl = document.getElementById('projectLabel');
  const iconEl = document.getElementById('projectIcon');
  const dotsWrap = document.getElementById('carouselDots');

  // build dots
  projects.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Lihat proyek ${i + 1}`);
    dot.addEventListener('click', () => goToProject(i));
    dotsWrap.appendChild(dot);
  });

  function renderProject() {
    const p = projects[currentProject];
    titleEl.textContent = p.title;
    descEl.textContent = p.desc;
    labelEl.textContent = p.label;
    iconEl.innerHTML = p.icon;

    dotsWrap.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentProject);
    });
  }

  function goToProject(index) {
    if (index === currentProject) return;
    currentProject = (index + projects.length) % projects.length;

    cardEl.classList.add('is-switching');
    window.setTimeout(() => {
      renderProject();
      cardEl.classList.remove('is-switching');
    }, 180);
  }

  document.getElementById('nextProject').addEventListener('click', () => {
    goToProject(currentProject + 1);
  });
  document.getElementById('prevProject').addEventListener('click', () => {
    goToProject(currentProject - 1);
  });

  renderProject();
});