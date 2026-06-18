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

// Store current product data
let currentProduct = {
  name: '',
  price: '',
  qty: 1
};

// Form validation helper
function validateForm() {
  const nameInput = formEl.querySelector('input[name="user-name"]');
  const phoneInput = formEl.querySelector('input[name="user-phone"]');
  const agreementInput = formEl.querySelector('input[name="agreement"]');

  const errors = [];

  if (!nameInput.value.trim()) {
    errors.push('Name is required');
    nameInput.classList.add('error');
  } else {
    nameInput.classList.remove('error');
  }

  if (!phoneInput.value.trim()) {
    errors.push('Phone is required');
    phoneInput.classList.add('error');
  } else {
    phoneInput.classList.remove('error');
  }

  if (!agreementInput.checked) {
    errors.push('You must agree to privacy policy');
    agreementInput.classList.add('error');
  } else {
    agreementInput.classList.remove('error');
  }

  return errors;
}

// Product card and bestseller item click handler
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

  // Store current product
  currentProduct = { name, price, qty: 1 };

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
    currentProduct.qty = 1;
  }
  
  openOrderModal();
});

// Update quantity
if (orderQty) {
  orderQty.addEventListener('change', (e) => {
    const value = parseInt(e.target.value) || 1;
    currentProduct.qty = Math.max(1, value);
    orderQty.value = currentProduct.qty;
  });
}

function openOrderModal() {
  orderModal.classList.add('is-open');
  orderModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  orderModal.classList.remove('is-open');
  orderModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openFormModal() {
  formModal.classList.add('is-open');
  formModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // Clear form errors
  formEl.querySelectorAll('input, textarea').forEach(el => {
    el.classList.remove('error');
  });
}

function closeFormModal() {
  formModal.classList.remove('is-open');
  formModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// "Buy now" button
document.querySelector('.order-modal__buy').addEventListener('click', () => {
  closeOrderModal();
  openFormModal();
});

// Modal close buttons and overlays
modalClose.addEventListener('click', closeOrderModal);
modalOverlay.addEventListener('click', closeOrderModal);
formClose.addEventListener('click', closeFormModal);
formOverlay.addEventListener('click', closeFormModal);

// Smooth scroll to catalog
document.querySelectorAll('[href="#catalogues"], .header-btn, .header-btn-big').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Don't prevent default for actual links with href
    if (btn.tagName === 'A' && btn.getAttribute('href') === '#catalogues') {
      e.preventDefault();
    }
    const catalogSection = document.querySelector('#catalogues');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Form submission
formEl.addEventListener('submit', e => { 
  e.preventDefault();
  
  const errors = validateForm();
  
  if (errors.length > 0) {
    console.warn('Form validation errors:', errors);
    alert('Please fill all required fields');
    return;
  }

  // Prepare form data
  const formData = {
    name: formEl.querySelector('input[name="user-name"]').value,
    phone: formEl.querySelector('input[name="user-phone"]').value,
    address: formEl.querySelector('input[name="user-address"]').value,
    message: formEl.querySelector('textarea[name="user-message"]').value,
    product: currentProduct.name,
    quantity: currentProduct.qty,
    price: currentProduct.price,
    timestamp: new Date().toISOString()
  };

  // Log order data (in real app, send to server)
  console.log('Order submitted:', formData);

  // Show success message
  const submitBtn = formEl.querySelector('.form-modal__submit');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = '✓ Order placed successfully!';
  submitBtn.disabled = true;

  // Reset form after delay
  setTimeout(() => {
    closeFormModal();
    formEl.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Keyboard navigation
document.addEventListener('keydown', e => { 
  if (e.key === 'Escape') { 
    closeOrderModal(); 
    closeFormModal(); 
  }
});

// Add input error styling
formEl.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.classList.remove('error');
  });
});