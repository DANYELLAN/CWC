const products = [
  {
    id: 'moonlit-shampoo',
    name: 'Moonlit Herb Shampoo',
    price: 16,
    image:
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'seasilk-conditioner',
    name: 'Sea Silk Conditioner',
    price: 18,
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'ember-hair-oil',
    name: 'Ember Glow Hair Oil',
    price: 14,
    image:
      'https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'rose-clay-mask',
    name: 'Rose Clay Scalp Mask',
    price: 20,
    image:
      'https://images.unsplash.com/photo-1607006483225-5af80f16f6e7?auto=format&fit=crop&w=900&q=80',
  },
];

const cart = [];

const productGrid = document.getElementById('productGrid');
const cartButton = document.getElementById('cartButton');
const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const signupForm = document.getElementById('signupForm');
const formMessage = document.getElementById('formMessage');

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <h3>${product.name}</h3>
        <p class="price">${formatCurrency(product.price)}</p>
        <button data-id="${product.id}">Add to Cart</button>
      </article>
    `
    )
    .join('');
}

function renderCart() {
  cartItems.innerHTML = cart
    .map(
      (item) => `
      <li>
        <span>${item.name}</span>
        <span>${formatCurrency(item.price)}</span>
      </li>
    `
    )
    .join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = formatCurrency(total);
  cartCount.textContent = cart.length;
}

productGrid.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) {
    return;
  }

  const product = products.find((item) => item.id === event.target.dataset.id);
  if (!product) {
    return;
  }

  cart.push(product);
  renderCart();
});

cartButton.addEventListener('click', () => {
  cartPanel.classList.add('open');
  cartPanel.setAttribute('aria-hidden', 'false');
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('open');
  cartPanel.setAttribute('aria-hidden', 'true');
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = new FormData(signupForm).get('email');
  formMessage.textContent = `Thanks, ${email}! You're on the list.`;
  signupForm.reset();
});

renderProducts();
renderCart();
