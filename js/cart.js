function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function findProductByNameOrType(input) {
  input = input.trim().toLowerCase();
  return PRODUCTS.find(p =>
    p.name.toLowerCase().includes(input) ||
    (p.category && p.category.toLowerCase().includes(input))
  );
}

function renderCart() {
  const cartContent = document.getElementById('cart-content');
  const totalAmount = document.getElementById('totalAmount');
  let cart = getCart();
  let total = 0;

  const grouped = {};
  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;
    const room = product.room || "Autres";
    if (!grouped[room]) grouped[room] = [];
    grouped[room].push({ ...item, product });
  });

  // Affichage
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="cart-empty">
        <img src="img/panier-vide.png" alt="Panier vide" class="empty-cart-img">
        <div>Votre panier est vide</div>
      </div>
    `;
    totalAmount.textContent = '0.00 €';
    return;
  }

  let html = '';
  for (const room in grouped) {
    html += `<div class="cart-category"><h2 class="cart-category-title">${room}</h2>`;
    html += `<ul class="cart-list">`;
    grouped[room].forEach(({product, qty, id}) => {
      total += product.price * qty;
      html += `
        <li class="cart-item" data-id="${id}">
          <div class="cart-item-info">
            <img src="${product.images && product.images.length ? product.images[0] : product.image}" alt="${product.name}" class="cart-item-img">
            <span class="cart-item-name">${product.name}</span>
          </div>
          <div class="cart-item-actions">
            <button class="qty-btn" data-action="decrease">-</button>
            <span class="cart-item-qty">${qty}</span>
            <button class="qty-btn" data-action="increase">+</button>
            <span class="cart-item-price">${(product.price * qty).toFixed(2)} €</span>
            <a href="product.html?id=${product.id}" class="cart-btn-fiche" title="Voir la fiche produit"><i class="fas fa-external-link-alt"></i></a>
            <button class="cart-btn-remove" title="Supprimer"><i class="fas fa-trash-alt"></i></button>
          </div>
        </li>
      `;
    });
    html += `</ul></div>`;
  }
  cartContent.innerHTML = html;
  totalAmount.textContent = total.toFixed(2) + ' €';
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  // Ajout produit via champ texte (nom ou catégorie)
  const addProductInput = document.getElementById('productNameInput');
  const addProductButton = document.getElementById('addProductButton');
  function addProductToCart() {
    const input = addProductInput.value;
    if (!input.trim()) return alert('Veuillez entrer le nom ou la catégorie du produit.');
    const product = findProductByNameOrType(input);
    if (!product) return alert('Produit non trouvé.');
    let cart = getCart();
    let item = cart.find(i => i.id === product.id);
    if (item) {
      item.qty += 1;
    } else {
      cart.push({ id: product.id, qty: 1 });
    }
    setCart(cart);
    renderCart();
    addProductInput.value = '';
  }
  addProductButton.addEventListener('click', addProductToCart);
  addProductInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addProductToCart();
    }
  });

  // Gestion des quantités et suppression
  document.getElementById('cart-content').addEventListener('click', function(e) {
    const cartItem = e.target.closest('.cart-item');
    if (!cartItem) return;
    const id = cartItem.dataset.id;
    let cart = getCart();
    let item = cart.find(i => i.id === id);

    if (e.target.classList.contains('qty-btn')) {
      const action = e.target.dataset.action;
      if (action === 'increase') item.qty++;
      if (action === 'decrease') {
        item.qty--;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
      }
      setCart(cart);
      renderCart();
    }
    if (e.target.classList.contains('cart-btn-remove') || e.target.closest('.cart-btn-remove')) {
      cart = cart.filter(i => i.id !== id);
      setCart(cart);
      renderCart();
    }
  });
});
