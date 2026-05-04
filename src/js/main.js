// Burger menu
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
mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

// Bestsellers slider
const slider = document.querySelector('.bestsellers__slider');
const list = document.querySelector('.bestsellers__list');
const items = document.querySelectorAll('.bestsellers__item');
const dots = document.querySelectorAll('.bestsellers__dot');
const prevBtn = document.querySelector('[aria-label="Previous"]');
const nextBtn = document.querySelector('[aria-label="Next"]');

let current = 0;

function getVisible() {
  if (window.innerWidth >= 1200) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function updateSlider() {
  const visible = getVisible();
  const max = items.length - visible;
  current = Math.max(0, Math.min(current, max));

  const totalWidth = slider.offsetWidth;
  const itemWidth = (totalWidth - 24 * (visible - 1)) / visible;

  items.forEach((item) => {
    item.style.width = itemWidth + 'px';
  });

  const offset = current * (itemWidth + 24);
  list.style.transform = `translateX(-${offset}px)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('bestsellers__dot--active', i === current);
  });
}

prevBtn.addEventListener('click', () => {
  current--;
  updateSlider();
});
nextBtn.addEventListener('click', () => {
  current++;
  updateSlider();
});
window.addEventListener('resize', updateSlider);
updateSlider();
// ===== FEEDBACK SLIDER =====
const feedbackSlider = document.querySelector('.feedback__slider');
const feedbackList = document.querySelector('.feedback__list');
const feedbackItems = document.querySelectorAll('.feedback__item');
const feedbackDots = document.querySelectorAll('.feedback__dot');
const feedbackPrev = document.querySelector('[aria-label="Feedback Previous"]');
const feedbackNext = document.querySelector('[aria-label="Feedback Next"]');

let feedbackCurrent = 0;

function getFeedbackVisible() {
  if (window.innerWidth >= 1200) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function updateFeedbackSlider() {
  const visible = getFeedbackVisible();
  const max = feedbackItems.length - visible;
  feedbackCurrent = Math.max(0, Math.min(feedbackCurrent, max));

  const totalWidth = feedbackSlider.offsetWidth;
  const itemWidth = (totalWidth - 24 * (visible - 1)) / visible;

  feedbackItems.forEach((item) => {
    item.style.width = itemWidth + 'px';
  });

  const offset = feedbackCurrent * (itemWidth + 24);
  feedbackList.style.transform = `translateX(-${offset}px)`;

  feedbackDots.forEach((dot, i) => {
    dot.classList.toggle('feedback__dot--active', i === feedbackCurrent);
  });
}

feedbackPrev.addEventListener('click', () => {
  feedbackCurrent--;
  updateFeedbackSlider();
});
feedbackNext.addEventListener('click', () => {
  feedbackCurrent++;
  updateFeedbackSlider();
});
window.addEventListener('resize', updateFeedbackSlider);
updateFeedbackSlider();
// ===== ORDER MODAL =====
const orderModal = document.getElementById('orderModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.querySelector('.order-modal__close');
const modalOverlay = document.querySelector('.order-modal__overlay');

document.querySelectorAll('.product-card__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    modalImage.src = btn.dataset.img;
    modalImage.alt = btn.dataset.name;
    modalName.textContent = btn.dataset.name;
    modalPrice.textContent = btn.dataset.price;
    modalDesc.textContent = btn.dataset.desc;
    modalImage.removeAttribute('aria-hidden');
    orderModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  orderModal.classList.remove('is-open');
  document.body.style.overflow = '';
}
const formModal = document.getElementById('formModal');
const formClose = document.querySelector('.form-modal__close');
const formOverlay = document.querySelector('.form-modal__overlay');
const formEl = document.querySelector('.form-modal__form');

document.querySelector('.order-modal__buy').addEventListener('click', () => {
  closeModal();
  formModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

function closeFormModal() {
  formModal.classList.remove('is-open');
  document.body.style.overflow = '';
}

formClose.addEventListener('click', closeFormModal);
formOverlay.addEventListener('click', closeFormModal);
formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  closeFormModal();
});
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
