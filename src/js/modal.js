const orderModal = document.getElementById('orderModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.querySelector('.order-modal__close');
const modalOverlay = document.querySelector('.order-modal__overlay');
const formModal = document.getElementById('formModal');
const formClose = document.querySelector('.form-modal__close');
const formOverlay = document.querySelector('.form-modal__overlay');
const formEl = document.querySelector('.form-modal__form');

document.addEventListener('click', e => {
  const btn = e.target.closest('.product-card__btn');
  if (!btn) return;
    modalImage.src = btn.dataset.img;
    modalImage.alt = btn.dataset.name;
    modalName.textContent = btn.dataset.name;
    modalPrice.textContent = btn.dataset.price;
    modalDesc.textContent = btn.dataset.desc;
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