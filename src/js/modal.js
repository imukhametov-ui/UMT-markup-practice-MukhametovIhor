const orderModal = document.getElementById('orderModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const orderQty = document.querySelector('.order-modal__qty');
const modalClose = document.querySelector('.order-modal__close');
const modalOverlay = document.querySelector('.order-modal__overlay');
const formModal = document.getElementById('formModal');
const formClose = document.querySelector('.form-modal__close');
const formOverlay = document.querySelector('.form-modal__overlay');
const formEl = document.querySelector('.form-modal__form');

document.addEventListener('click', e => {
  const cardBtn = e.target.closest('.product-card__btn');
  const bestseller = e.target.closest('.bestsellers__item');
  const target = cardBtn || bestseller;
  if (!target) return;

  let imgEl = null;
  let name = '';
  let price = '';
  let desc = '';

  if (cardBtn) {
    imgEl = cardBtn.querySelector('img');
    name = cardBtn.dataset.name || imgEl?.alt || '';
    price = cardBtn.dataset.price || '';
    desc = cardBtn.dataset.desc || cardBtn.querySelector('.product-card__desc')?.textContent || '';
  } else if (bestseller) {
    imgEl = bestseller.querySelector('img.bestsellers__image');
    name = bestseller.querySelector('.bestsellers__name')?.textContent || imgEl?.alt || '';
    price = bestseller.querySelector('.bestsellers__price')?.textContent || '';
    desc = bestseller.querySelector('.bestsellers__desc')?.textContent || '';
  }

  if (imgEl) {
    // Use the image's resolved src (currentSrc) if available and preserve srcset for high-res displays
    modalImage.src = imgEl.currentSrc || imgEl.src || '';
    const srcset = imgEl.getAttribute('srcset');
    if (srcset) modalImage.setAttribute('srcset', srcset);
    else modalImage.removeAttribute('srcset');
    modalImage.alt = imgEl.alt || name;
  } else if (cardBtn && cardBtn.dataset.img) {
    modalImage.src = cardBtn.dataset.img;
    modalImage.removeAttribute('srcset');
    modalImage.alt = cardBtn.dataset.name || '';
  }

  modalName.textContent = name;
  modalPrice.textContent = price;
  modalDesc.textContent = desc;
  if (orderQty) {
    orderQty.value = '1';
  }
  orderModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});


function closeModal() {
  orderModal.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.querySelector('.order-modal__buy').addEventListener('click', () => {
  closeModal();
  formModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

function closeFormModal() {
  formModal.classList.remove('is-open');
  document.body.style.overflow = '';
}
document.querySelectorAll('[href="#catalogues"], .header-btn, .header-btn-big').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('#catalogues')?.scrollIntoView({ behavior: 'smooth' });
  });
});
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
formClose.addEventListener('click', closeFormModal);
formOverlay.addEventListener('click', closeFormModal);
formEl.addEventListener('submit', e => { e.preventDefault(); closeFormModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeFormModal(); } });