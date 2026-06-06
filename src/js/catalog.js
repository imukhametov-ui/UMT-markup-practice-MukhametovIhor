import { fetchBouquets } from './api.js';

const list = document.querySelector('.catalogues__list');
const loadMoreBtn = document.querySelector('.catalogues__more');

let page = 1;
const limit = 4;
let total = 0;

function createCardMarkup(bouquet) {
  const img2x = bouquet.img.replace('@1x', '@2x');
  return `
    <li class="product-card">
      <button
        class="product-card__btn"
        type="button"
        data-name="${bouquet.name}"
        data-price="$${bouquet.price}"
        data-img="${bouquet.img}"
        data-desc="${bouquet.desc}"
      >
        <img
          class="product-card__image"
          src="${bouquet.img}"
          srcset="${bouquet.img} 1x, ${img2x} 2x"
          alt="${bouquet.name} bouquet"
          width="296"
        />
        <span class="product-card__name">${bouquet.name}</span>
        <span class="product-card__desc">${bouquet.desc}</span>
        <span class="product-card__price">$${bouquet.price}</span>
      </button>
    </li>
  `;
}

async function loadBouquets() {
  try {
    loadMoreBtn.disabled = true;

    const { data, total: totalCount } = await fetchBouquets({ page, limit });
    total = totalCount;

    if (data.length === 0 && page === 1) {
      list.innerHTML = '<li class="catalogues__empty">No bouquets found.</li>';
      loadMoreBtn.style.display = 'none';
      return;
    }

    const markup = data.map(createCardMarkup).join('');
    list.insertAdjacentHTML('beforeend', markup);

    if (page * limit >= total) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.disabled = false;
    }
  } catch (error) {
    console.error('Failed to load bouquets:', error);
    list.insertAdjacentHTML(
      'beforeend',
      '<li class="catalogues__error">Failed to load. Please try again later.</li>'
    );
  }
}

loadMoreBtn.addEventListener('click', () => {
  page += 1;
  loadBouquets();
});

loadBouquets();