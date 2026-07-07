import { fetchReviews, createReview } from './api.js';

const feedbackSlider = document.querySelector('.feedback__slider');
const feedbackList = document.querySelector('.feedback__list');
const dotsContainer = document.querySelector('.feedback__dots');
const feedbackPrev = document.querySelector('[aria-label="Feedback Previous"]');
const feedbackNext = document.querySelector('[aria-label="Feedback Next"]');
const feedbackForm = document.querySelector('.feedback__form');

let feedbackItems = [];
let feedbackTotal = 0;
let feedbackCurrent = 0;

function createFeedbackMarkup(review) {
  return `
    <li class="feedback__item">
      <p class="feedback__text">${review.comment}</p>
      <span class="feedback__author">${review.author}</span>
    </li>
  `;
}

function getFeedbackVisible() {
  if (window.innerWidth >= 1200) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function getFeedbackGap() {
  const gap = getComputedStyle(feedbackList).gap;
  return parseFloat(gap) || 0;
}

function buildFeedbackDots() {
  dotsContainer.innerHTML = '';

  const visible = getFeedbackVisible();
  const pages = Math.max(1, feedbackTotal - visible + 1);

  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('li');
    dot.className = 'feedback__dot' + (i === feedbackCurrent ? ' feedback__dot--active' : '');

    dot.addEventListener('click', () => {
      feedbackCurrent = i;
      renderFeedback(true);
    });

    dotsContainer.appendChild(dot);
  }
}

function renderFeedback(animate) {
  const visible = getFeedbackVisible();
  const width = feedbackSlider.clientWidth;
  const gap = getFeedbackGap();
  const itemWidth = (width - gap * (visible - 1)) / visible;
  const max = Math.max(0, feedbackTotal - visible);

  feedbackCurrent = Math.min(feedbackCurrent, max);

  feedbackItems.forEach(item => {
    item.style.width = `${itemWidth}px`;
    item.style.flex = '0 0 auto';
  });

  feedbackList.style.transition = animate
    ? 'transform 350ms cubic-bezier(0.4,0,0.2,1)'
    : 'none';

  feedbackList.style.transform = `translateX(-${feedbackCurrent * (itemWidth + gap)}px)`;
  feedbackList.style.width = `${feedbackTotal * itemWidth + (feedbackTotal - 1) * gap}px`;

  const dots = Array.from(dotsContainer.querySelectorAll('.feedback__dot'));
  dots.forEach((dot, index) =>
    dot.classList.toggle('feedback__dot--active', index === feedbackCurrent)
  );
}

async function loadReviews() {
  const reviews = await fetchReviews();

  feedbackList.innerHTML = reviews.map(createFeedbackMarkup).join('');

  feedbackItems = Array.from(feedbackList.querySelectorAll('.feedback__item'));
  feedbackTotal = feedbackItems.length;
  feedbackCurrent = 0;

  buildFeedbackDots();
  renderFeedback(false);
}

feedbackPrev.addEventListener('click', () => {
  const visible = getFeedbackVisible();
  const max = Math.max(0, feedbackTotal - visible);
  feedbackCurrent = feedbackCurrent <= 0 ? max : feedbackCurrent - 1;
  renderFeedback(true);
  feedbackPrev.blur();
});

feedbackNext.addEventListener('click', () => {
  const visible = getFeedbackVisible();
  const max = Math.max(0, feedbackTotal - visible);
  feedbackCurrent = feedbackCurrent >= max ? 0 : feedbackCurrent + 1;
  renderFeedback(true);
  feedbackNext.blur();
});

let feedbackResizeTimer = null;

window.addEventListener('resize', () => {
  clearTimeout(feedbackResizeTimer);
  feedbackResizeTimer = setTimeout(() => {
    buildFeedbackDots();
    renderFeedback(false);
  }, 120);
});

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(feedbackForm);

    const reviewData = {
      author: formData.get('author').trim(),
      comment: formData.get('comment').trim(),
      rating: Number(formData.get('rating')),
    };

    await createReview(reviewData);

    feedbackForm.reset();
    await loadReviews();
  });
}

loadReviews();