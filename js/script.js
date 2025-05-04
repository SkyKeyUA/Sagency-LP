window.addEventListener('load', windowLoad);
const html = document.documentElement;

function windowLoad() {
  if (768 >= window.innerWidth) {
    document.addEventListener('click', documentActions);
  }
  html.classList.add('loaded');
  scrollActions();
  logoCarouselInit();
  slidersInit();
}
function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest('.icon-menu')) {
    html.classList.toggle('menu-open');
  }
  targetElement.closest('.menu__link') && html.classList.contains('menu-open')
    ? html.classList.remove('menu-open')
    : null;
}
function scrollActions() {
  window.addEventListener('scroll', scrollAction);

  function scrollAction() {
    const header = document.querySelector('.header');
    header?.classList.toggle('header--scroll', scrollY > 20);
  }
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
