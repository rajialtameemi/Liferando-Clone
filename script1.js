let cart = [];
const deliveryPrice = 2.5;

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartSubtotal = document.getElementById("cart-subtotal");
  const cartDelivery = document.getElementById("cart-delivery");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let subtotal = 0;
  let count = 0;

  cart.forEach(({ name, price, quantity }) => {
    subtotal += price * quantity;
    count += quantity;

    cartItems.innerHTML += `
      <li>
        ${name} - €${price} x ${quantity}
        <div class="cart-item-controls">
          <button onclick="updateQuantity('${name}', -1)">-</button>
          <span>${quantity}</span>
          <button onclick="updateQuantity('${name}', 1)">+</button>
          <button onclick="removeFromCart('${name}')">🗑️</button>
        </div>
      </li>`;
  });

  cartSubtotal.textContent = subtotal.toFixed(2);
  cartDelivery.textContent = deliveryPrice.toFixed(2);
  cartTotal.textContent = (subtotal + deliveryPrice).toFixed(2);
  cartCount.textContent = count;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  const item = cart.find((i) => i.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

function updateQuantity(name, change) {
  const item = cart.find((i) => i.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.name !== name);
    }
    updateCart();
  }
}

function removeFromCart(name) {
  cart = cart.filter((i) => i.name !== name);
  updateCart();
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCart();
}

function checkout() {
  if (!cart.length) {
    return alert("Ihr Warenkorb ist leer.");
  }
  alert("Bestellung erfolgreich!");
  cart = [];
  updateCart();
}

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

function toggleCart() {
  const cart = document.getElementById("cart");
  cart.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", loadCart);
