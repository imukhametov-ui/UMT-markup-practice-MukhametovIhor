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
  const itemWidth = (feedbackSlider.offsetWidth - 24 * (visible - 1)) / visible;
  feedbackItems.forEach(item => { item.style.width = itemWidth + 'px'; });
  feedbackList.style.transform = `translateX(-${feedbackCurrent * (itemWidth + 24)}px)`;
  feedbackDots.forEach((dot, i) => dot.classList.toggle('feedback__dot--active', i === feedbackCurrent));
}

function renderDots() {
  const visible = getVisible();
  const total = items.length - visible + 1; // реальна кількість позицій
  const container = document.querySelector('.bestsellers__dots');
  container.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const li = document.createElement('li');
    li.className = 'bestsellers__dot' + (i === current ? ' bestsellers__dot--active' : '');
    li.addEventListener('click', () => { current = i; updateSlider(); renderDots(); });
    container.appendChild(li);
  }
}
feedbackPrev.addEventListener('click', () => { feedbackCurrent--; updateFeedbackSlider();feedbackPrev.blur(); });
feedbackNext.addEventListener('click', () => { feedbackCurrent++; updateFeedbackSlider();feedbackNext.blur(); });
window.addEventListener('resize', updateFeedbackSlider);
updateFeedbackSlider();