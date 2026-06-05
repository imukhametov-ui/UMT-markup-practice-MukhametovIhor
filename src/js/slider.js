const slider = document.querySelector('.bestsellers__slider');
const list = document.querySelector('.bestsellers__list');
const items = Array.from(document.querySelectorAll('.bestsellers__item'));
const dotsContainer = document.querySelector('.bestsellers__dots');
const prevBtn = document.querySelector('[aria-label="Previous"]');
const nextBtn = document.querySelector('[aria-label="Next"]');

const total = items.length;
let current = 0; // page index (start position)

function getVisible() {
  if (window.innerWidth >= 1200) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function getGap() {
  const gap = getComputedStyle(list).gap;
  return parseFloat(gap) || 0;
}

function buildDots() {
  dotsContainer.innerHTML = '';
  const visible = getVisible();
  const pages = Math.max(1, total - visible + 1);
  for (let i = 0; i < pages; i++) {
    const li = document.createElement('li');
    li.className = 'bestsellers__dot' + (i === current ? ' bestsellers__dot--active' : '');
    li.addEventListener('click', () => { current = i; render(true); });
    dotsContainer.appendChild(li);
  }
}

function render(animate) {
  const visible = getVisible();
  const w = slider.clientWidth;
  const gap = getGap();
  const itemWidth = (w - gap * (visible - 1)) / visible;
  const max = Math.max(0, total - visible);
  current = Math.min(current, max);

  items.forEach(item => {
    item.style.width = itemWidth + 'px';
    item.style.flexShrink = '0';
    item.style.flexGrow = '0';
  });

  list.style.transition = animate
    ? 'transform 350ms cubic-bezier(0.4,0,0.2,1)'
    : 'none';
  list.style.transform = `translateX(-${current * (itemWidth + gap)}px)`;

  const dots = Array.from(dotsContainer.querySelectorAll('.bestsellers__dot'));
  dots.forEach((dot, i) => dot.classList.toggle('bestsellers__dot--active', i === current));
}

prevBtn.addEventListener('click', () => {
  const visible = getVisible();
  const max = Math.max(0, total - visible);
  current = current <= 0 ? max : current - 1;
  render(true);
  prevBtn.blur();
});

nextBtn.addEventListener('click', () => {
  const visible = getVisible();
  const max = Math.max(0, total - visible);
  current = current >= max ? 0 : current + 1;
  render(true);
  nextBtn.blur();
});

let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    buildDots();
    render(false);
  }, 120);
});

buildDots();
render(false);