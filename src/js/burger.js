const burgerBtn = document.querySelector('.burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-menu__close');
const mobileLinks = document.querySelectorAll('.mobile-menu__nav a');

function openMenu() {
  mobileMenu.classList.add('is-open');
  burgerBtn.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('is-open');
  burgerBtn.classList.remove('is-active');
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));