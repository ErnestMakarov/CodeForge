let cart = JSON.parse(localStorage.getItem('cart')) || [];


function updateCartIcon() {
  const cartElement = document.querySelector('.Cart');
  if (!cartElement) return;

  let counter = cartElement.querySelector('.cart-count');
  if (!counter) {
    counter = document.createElement('div');
    counter.classList.add('cart-count');
    cartElement.appendChild(counter);
  }

  
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  counter.textContent = totalCount;
}

function setupAddToCart() {
  const addToCartButtons = document.querySelectorAll('.product-buttons button:last-child');
  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const name = card.querySelector('h2')?.textContent || 'Unnamed';
      const price = card.querySelector('.price')?.textContent || '$0';
      const img = card.querySelector('img')?.src || '';

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, img, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartIcon();
      alert(`${name} added to cart`);
    });
  });
}


function showCart() {
  const cartModal = document.getElementById('cartModal');
  const cartItemsContainer = document.getElementById('cartItems');

  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    let total = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');

      const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      const itemTotal = numericPrice * item.quantity;
      total += itemTotal;

      itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>Price: ${item.price}</p>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="decrease" data-index="${index}">−</button>
            <span>${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.style.marginTop = '15px';
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartItemsContainer.appendChild(totalDiv);
  }

  cartModal.style.display = 'flex';


  document.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      cart[index].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      showCart();
      updateCartIcon();
    });
  });

  document.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      showCart();
      updateCartIcon();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartIcon();
  setupAddToCart();

  const cartIcon = document.querySelector('.Cart');
  const cartModal = document.getElementById('cartModal');
  const closeCartBtn = document.getElementById('closeCart');

  if (cartIcon) {
    cartIcon.addEventListener('click', showCart);
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      cartModal.style.display = 'none';
    });
  }
});
