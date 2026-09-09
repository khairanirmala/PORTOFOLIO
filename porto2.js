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
      image: "Dodot_s_Game.png",
      desc: "Game edukatif bertema luar angkasa yang dirancang dengan UI interaktif dan alur permainan yang menyenangkan. Saya bertanggung jawab merancang tampilan antarmuka, ikon, dan pengalaman pengguna dari awal hingga akhir."
    },
    {
      title: "Website E-Commerce",
      image: "E-Commerce.png",
      desc: "Platform e-commerce untuk produk kue lebaran premium, lengkap dengan katalog produk, keranjang belanja, dan tampilan responsif di berbagai perangkat untuk meningkatkan pengalaman berbelanja pelanggan."
    },
    {
      title: "FoodTrayker Aplication",
      image: "FT_Logo.jpeg",
      desc: "Aplikasi ini digunakan untuk mentracking pengambilan dan pengembalian Food Tray MBG oleh siswa-siswi SMK Telkom Purwokerto, guna menghindari double take pada saat pengambilan dan menertibkan pada saat pengembalian Food Tray MBG."
    }
  ];

  let currentProject = 0;

  const cardEl = document.getElementById('projectCard');
  const titleEl = document.getElementById('projectTitle');
  const descEl = document.getElementById('projectDesc');
  const imageEl = document.getElementById('projectImage');
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
    imageEl.src = p.image;
    imageEl.alt = p.title;

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