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
  const itemWidth = (slider.offsetWidth - 24 * (visible - 1)) / visible;
  items.forEach(item => { item.style.width = itemWidth + 'px'; });
  list.style.transform = `translateX(-${current * (itemWidth + 24)}px)`;
  dots.forEach((dot, i) => dot.classList.toggle('bestsellers__dot--active', i === current));
}

prevBtn.addEventListener('click', () => { current--; updateSlider(); });
nextBtn.addEventListener('click', () => { current++; updateSlider(); });
window.addEventListener('resize', updateSlider);
updateSlider();