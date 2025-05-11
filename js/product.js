document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = PRODUCTS.find(p => p.id === productId);
  
    // Fil d’ariane
    const breadcrumb = document.getElementById('product-breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <li><a href="index.html">Accueil</a> <span>/</span></li>
        <li><a href="catalogue.html">Catalogue</a> <span>/</span></li>
        <li><a href="#">${product ? (product.room || "Pièce") : "Produit"}</a> <span>/</span></li>
        <li><span class="active">${product ? product.name : "Produit"}</span></li>
      `;
    }
  
    // Section produit
    const mainSection = document.getElementById('product-selected');
    if (!product || !mainSection) {
      if (mainSection) mainSection.innerHTML = '<p style="padding:2em">Produit introuvable.</p>';
      return;
    }
  
    // Carousel vertical
    let thumbnails = '';
    if (product.images && product.images.length > 1) {
      thumbnails = product.images.map((img, idx) =>
        `<img src="${img}" class="carousel-thumb${idx === 0 ? ' active' : ''}" data-idx="${idx}" alt="Miniature ${idx+1}">`
      ).join('');
    } else if (product.images && product.images.length === 1) {
      thumbnails = `<img src="${product.images[0]}" class="carousel-thumb active" data-idx="0" alt="Miniature 1">`;
    }
  
    // Image principale
    let mainImage = (product.images && product.images.length > 0) ? product.images[0] : product.image;
  
    let dims = '';
    if (product.dimensions) {
      dims = `<ul class="product-dimensions">` +
        Object.entries(product.dimensions)
          .map(([k, v]) => `<li><b>${k[0].toUpperCase() + k.slice(1)} :</b> ${v}</li>`)
          .join('') +
        `</ul>`;
    }
  
    mainSection.innerHTML = `
      <div class="carousel-vertical">
        ${thumbnails}
      </div>
      <div class="main-image-container">
        <img id="mainProductImage" src="${mainImage}" alt="${product.name}" class="main-product-image" />
      </div>
      <div class="product-info d-flex flex-column">
        <h1 class="product-title">${product.name}</h1>
        <div class="product-category">${product.category || ""}</div>
        <div class="product-id">Réf. ${product.id}</div>
        <div class="product-description">${product.description || ""}</div>
        ${dims}
        <div class="product-price">${product.price.toFixed(2)} €</div>
        <button id="addToCartBtn" class="add-cart-btn">
          <i class="fas fa-cart-plus"></i> Ajouter au panier
        </button>
      </div>
    `;
  
    // Carousel JS
    if (product.images && product.images.length > 1) {
      document.querySelectorAll('.carousel-thumb').forEach(thumb => {
        thumb.addEventListener('mouseenter', function() {
          document.getElementById('mainProductImage').src = this.src;
          document.querySelectorAll('.carousel-thumb').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }
  
    // Ajout au panier
    document.getElementById('addToCartBtn').addEventListener('click', function() {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      let item = cart.find(i => i.id === product.id);
      if (item) {
        item.qty += 1;
      } else {
        cart.push({ id: product.id, qty: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.textContent = "Ajouté !";
      setTimeout(() => {
        this.innerHTML = `<i class="fas fa-cart-plus"></i> Ajouter au panier`;
      }, 1200);
    });
  });
  