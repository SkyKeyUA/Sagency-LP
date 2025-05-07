window.addEventListener('load', windowLoad);
const html = document.documentElement;
const header = document.querySelector('.header');
const redLine = document.querySelector('.red-line');

function windowLoad() {
  html.classList.add('loaded');
  scrollActions();
  logoCarouselInit();
  slidersInit();

  if (header) {
    const headerHeight = (header.offsetHeight - 1) / 16;
    redLine.style.insetBlockStart = `${headerHeight}rem`;
  }
}
function scrollActions() {
  const sections = document.querySelectorAll('section');
  const headerLinks = document.querySelectorAll('header a');

  window.addEventListener('scroll', scrollAction);

  function scrollAction() {
    header?.classList.toggle('header--scroll', scrollY > 20);
  }

  if (768 >= window.innerWidth) {
    const menuToggle = document.querySelector('.icon-menu');

    menuToggle?.addEventListener('click', () => {
      html.classList.toggle('menu-open');
    });
    headerLinks?.forEach((link) => {
      link.addEventListener('click', () => {
        html.classList.remove('menu-open');
      });
    });
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return;

    e.preventDefault();

    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const header = document.querySelector('header');
      const headerHeight = header.offsetHeight;
      const targetId = href.slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }
  });

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset;
      768 <= window.innerWidth ? (offset = sec.offsetTop - 300) : (offset = sec.offsetTop - 150);
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');
      if (top >= offset && top < offset + height && id !== null) {
        headerLinks?.forEach((links) => {
          links?.classList.remove('active');
          document.querySelector('header a[href*=' + id + ']').classList.add('active');
          id === 'offer' || id === 'testimonials' || id === 'contact'
            ? redLine.classList.add('arrow-hidden')
            : redLine.classList.remove('arrow-hidden');
        });
      }
    });
  };
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.2,
  };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const currentElement = entry.target;
      if (entry.isIntersecting) {
        currentElement.classList.add('animate');
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);

  const animElements = document.querySelectorAll('[class*="--anim"]');
  animElements.forEach((animElement) => {
    observer.observe(animElement);
  });
}
function logoCarouselInit() {
  const logoItems = document.querySelectorAll('.logo-carousel__list li');
  let index = 0;

  function showNextLogo() {
    const current = logoItems[index];

    current.classList.add('active');
    setTimeout(() => {
      current.classList.remove('active');
      current.classList.add('fade-out');

      setTimeout(() => {
        current.classList.remove('fade-out');

        index = (index + 1) % logoItems.length;
        const delay = index === 0 ? 2500 : 0;

        setTimeout(showNextLogo, delay);
      }, 1500);
    }, 1800);
  }

  if (logoItems.length > 0) {
    showNextLogo();
  }
}
function slidersInit() {
  const sliderListFiveItems = new Swiper('.testimonials__swiper', {
    slidesPerView: 3,
    spaceBetween: 45,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    initialSlide: 2,
    loopedSlides: 1,
    speed: 800,
    autoHeight: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}
