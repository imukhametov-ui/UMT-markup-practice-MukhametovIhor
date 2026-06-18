import { fetchBouquets } from './api.js';

// DOM Elements
const list = document.querySelector('.catalogues__list');
const loadMoreBtn = document.querySelector('.catalogues__more');
const loadingIndicator = document.getElementById('loadingIndicator');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sortBy = document.getElementById('sortBy');
const searchInput = document.getElementById('searchInput');
const resetBtn = document.querySelector('.filter-reset');
const itemsCount = document.getElementById('itemsCount');
const totalCount = document.getElementById('totalCount');
const paginationDots = document.getElementById('paginationDots');

// State
let currentPage = 1;
const pageSize = 4;
let totalBouquets = 0;
let totalPages = 0;
let filters = {
  maxPrice: 100,
  sortBy: 'name',
  sortOrder: 'asc',
  search: ''
};

function createCardMarkup(bouquet) {
  const img2x = bouquet.img.replace('@1x', '@2x');
  return `
    <li class="product-card" data-id="${bouquet.id}">
      <button
        class="product-card__btn"
        type="button"
        data-name="${bouquet.name}"
        data-price="$${bouquet.price}"
        data-img="${bouquet.img}"
        data-desc="${bouquet.desc}"
        aria-label="View ${bouquet.name} bouquet"
      >
        <img
          class="product-card__image"
          src="${bouquet.img}"
          srcset="${bouquet.img} 1x, ${img2x} 2x"
          alt="${bouquet.name} bouquet"
          width="296"
          loading="lazy"
        />
        <span class="product-card__name">${bouquet.name}</span>
        <span class="product-card__desc">${bouquet.desc}</span>
        <span class="product-card__price">$${bouquet.price}</span>
      </button>
    </li>
  `;
}

function showLoading() {
  if (currentPage === 1) {
    list.innerHTML = '';
  }
  loadingIndicator.style.display = 'flex';
  loadMoreBtn.disabled = true;
}

function hideLoading() {
  loadingIndicator.style.display = 'none';
  loadMoreBtn.disabled = false;
}

function updatePaginationDisplay() {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalBouquets);
  itemsCount.textContent = endItem;
  totalCount.textContent = totalBouquets;

  // Build pagination dots
  paginationDots.innerHTML = '';
  for (let i = 1; i <= totalPages && i <= 5; i++) {
    const dot = document.createElement('button');
    dot.className = `pagination-dot ${i === currentPage ? 'pagination-dot--active' : ''}`;
    dot.textContent = i;
    dot.setAttribute('data-page', i);
    dot.addEventListener('click', () => goToPage(i));
    paginationDots.appendChild(dot);
  }

  if (totalPages > 5) {
    const ellipsis = document.createElement('span');
    ellipsis.className = 'pagination-ellipsis';
    ellipsis.textContent = '...';
    paginationDots.appendChild(ellipsis);

    const lastDot = document.createElement('button');
    lastDot.className = 'pagination-dot';
    lastDot.textContent = totalPages;
    lastDot.setAttribute('data-page', totalPages);
    lastDot.addEventListener('click', () => goToPage(totalPages));
    paginationDots.appendChild(lastDot);
  }
}

function goToPage(page) {
  currentPage = page;
  list.innerHTML = '';
  loadBouquets();
}

function resetFilters() {
  priceRange.value = 100;
  priceValue.textContent = '$0 - $100';
  sortBy.value = 'name-asc';
  searchInput.value = '';
  filters = {
    maxPrice: 100,
    sortBy: 'name',
    sortOrder: 'asc',
    search: ''
  };
  currentPage = 1;
  list.innerHTML = '';
  loadBouquets();
}

async function loadBouquets() {
  showLoading();
  try {
    const [sortByVal, sortOrderVal] = filters.sortBy.split('-');
    
    const { data, total, pages } = await fetchBouquets({
      page: currentPage,
      limit: pageSize,
      sortBy: sortByVal,
      sortOrder: sortOrderVal,
      maxPrice: filters.maxPrice,
      search: filters.search
    });

    totalBouquets = total;
    totalPages = pages;

    if (data.length === 0 && currentPage === 1) {
      list.innerHTML = '<li class="catalogues__empty">No bouquets found. Try adjusting your filters.</li>';
      loadMoreBtn.style.display = 'none';
      paginationDots.innerHTML = '';
      itemsCount.textContent = '0';
      totalCount.textContent = '0';
      hideLoading();
      return;
    }

    // Add items to list
    const markup = data.map(createCardMarkup).join('');
    list.insertAdjacentHTML('beforeend', markup);

    // Update pagination display
    updatePaginationDisplay();

    // Show/hide "Show More" button
    if (currentPage >= totalPages) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }

    hideLoading();
  } catch (error) {
    console.error('Failed to load bouquets:', error);
    list.insertAdjacentHTML(
      'beforeend',
      '<li class="catalogues__error">Failed to load. Please try again later.</li>'
    );
    hideLoading();
  }
}

// Event Listeners
priceRange.addEventListener('input', (e) => {
  const maxPrice = parseInt(e.target.value);
  filters.maxPrice = maxPrice;
  priceValue.textContent = `$0 - $${maxPrice}`;
  currentPage = 1;
  list.innerHTML = '';
  loadBouquets();
});

sortBy.addEventListener('change', (e) => {
  const [sortByVal, sortOrderVal] = e.target.value.split('-');
  filters.sortBy = sortByVal;
  filters.sortOrder = sortOrderVal;
  currentPage = 1;
  list.innerHTML = '';
  loadBouquets();
});

searchInput.addEventListener('input', (e) => {
  filters.search = e.target.value;
  currentPage = 1;
  list.innerHTML = '';
  loadBouquets();
});

resetBtn.addEventListener('click', resetFilters);

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  loadBouquets();
});

// Initial load
loadBouquets();