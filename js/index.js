// Sélectionne 4 produits aléatoires
function getRandomProducts(count = 4) {
  const shuffled = PRODUCTS.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Affiche les ambiances (deux scènes aléatoires parmi les images secondaires)
function renderAmbiance() {
  const ambianceSection = document.getElementById('ambiance');
  // On prend 2 produits au hasard qui ont des images d'ambiance
  const productsWithScenes = PRODUCTS.filter(p => Array.isArray(p.images) && p.images.length > 1);
  const selected = productsWithScenes.slice().sort(() => 0.5 - Math.random()).slice(0, 2);
  ambianceSection.innerHTML = selected.map(product => `
    <div class="ambiance-card">
      <img src="${product.images[1]}" alt="Ambiance ${product.name}">
      <div class="ambiance-caption">
        <strong>${product.name}</strong>
        <button onclick="location.href='product.html?id=${product.id}'">Voir le produit</button>
      </div>
    </div>
  `).join('');
}

function renderRandomProducts() {
  const container = document.getElementById('random-products');
  const randomProducts = getRandomProducts(4);
  container.innerHTML = randomProducts.map(product => `
    <div class="product-card">
      <img src="${product.images ? product.images[0] : product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <div class="price">${product.price.toFixed(2)} €</div>
      <div class="desc">${product.description}</div>
      <button onclick="location.href='product.html?id=${product.id}'">Voir la fiche produit</button>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderAmbiance();
  renderRandomProducts();
});

function renderCatalogue() {
    const catalogue = document.getElementById('catalogue');
    catalogue.innerHTML = PRODUCTS.map(product => `
      <div class="product-card">
        <img src="${product.images ? product.images[0] : product.image}" alt="${product.name}">
        ${product.images && product.images[1] ? `<img class="scene-preview" src="${product.images[1]}" alt="Ambiance ${product.name}">` : ''}
        <h2>${product.name}</h2>
        <div class="price">${product.price.toFixed(2)} €</div>
        <div class="desc">${product.description}</div>
        <button onclick="location.href='product.html?id=${product.id}'">Voir la fiche produit</button>
      </div>
    `).join('');
  }
  document.addEventListener('DOMContentLoaded', renderCatalogue);
  