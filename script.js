const products = [
  {
    id: 'moonlit-shampoo',
    name: 'Moonlit Herb Shampoo',
    price: 16,
    description: 'Gentle cleansing with rosemary and lavender.',
    accent: 'moonlit',
    glyph: '🧴',
  },
  {
    id: 'seasilk-conditioner',
    name: 'Sea Silk Conditioner',
    price: 18,
    description: 'Deep moisture with aloe and sea minerals.',
    accent: 'sea',
    glyph: '✨',
  },
  {
    id: 'ember-hair-oil',
    name: 'Ember Glow Hair Oil',
    price: 14,
    description: 'Lightweight shine blend for daily softness.',
    accent: 'ember',
    glyph: '🌿',
  },
  {
    id: 'rose-clay-mask',
    name: 'Rose Clay Scalp Mask',
    price: 20,
    description: 'Weekly detox ritual for balanced scalp care.',
    accent: 'rose',
    glyph: '🌹',
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
        <div class="product-image ${product.accent}" role="img" aria-label="${product.name}">
          <span>${product.glyph}</span>
        </div>
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
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
