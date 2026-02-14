let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  alert(`${name} adicionado ao carrinho!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const totalPrice = document.getElementById('total-price');

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<li style="color: #999; text-align: center; padding: 20px;">Carrinho vazio</li>';
    totalPrice.textContent = '0.00';
    return;
  }

  let html = '';
  let total = 0;

  cart.forEach((item, index) => {
    html += `<li style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #333;">
      <span>${item.name} - R$ ${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})" style="background: transparent; border: none; color: red; cursor: pointer;">✕</button>
    </li>`;
    total += item.price;
  });

  cartItems.innerHTML = html;
  totalPrice.textContent = total.toFixed(2);
}

function toggleCart() {
  const cartElement = document.getElementById('cart');
  cartElement.classList.toggle('active');
}


document.querySelectorAll('.gaveta-title').forEach(title => {
  title.addEventListener('click', function() {
    const content = this.nextElementSibling;
    content.style.display = content.style.display === 'flex' ? 'none' : 'flex';
  });
});


function closeCart() {
  const cartElement = document.getElementById('cart');
  if (cartElement) cartElement.classList.remove('active');
}


document.addEventListener('click', function(event) {
  const cartEl = document.getElementById('cart');
  if (!cartEl) return;
  if (!cartEl.classList.contains('active')) return;
  const clickedInsideCart = event.target.closest('.cart');
  const clickedOnCartIcon = event.target.closest('.cart-icon');
  if (!clickedInsideCart && !clickedOnCartIcon) {
    closeCart();
  }
});


document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') closeCart();
});
