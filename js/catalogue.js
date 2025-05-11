document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('catalogue-grid');
    const voirPlusBtn = document.getElementById('voir-plus-btn');
    const CARDS_PER_PAGE = 9;
    let currentPage = 0;

    if (!grid) return;
    if (!window.PRODUCTS || !Array.isArray(window.PRODUCTS) || window.PRODUCTS.length === 0) {
        grid.innerHTML = '<p>Aucun produit disponible.</p>';
        return;
    }

    function renderCards() {
        const start = 0;
        const end = (currentPage + 1) * CARDS_PER_PAGE;
        const productsToShow = window.PRODUCTS.slice(start, end);

        grid.innerHTML = productsToShow.map(product => {
            let mainImg = (product.images && product.images.length > 0) ? product.images[0] : 'img/placeholder.png';
            let hoverImg = (product.images && product.images.length > 1) ? product.images[1] : mainImg;

            return `
                <div class="catalogue-card">
                    <div class="catalogue-card-img-container">
                        <img 
                            src="${mainImg}" 
                            data-main="${mainImg}" 
                            data-hover="${hoverImg}" 
                            alt="${product.name.replace(/"/g, '&quot;')}" 
                            class="catalogue-card-img"
                        />
                        <button class="catalogue-card-cart" title="Ajouter au panier" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                    <div class="catalogue-card-info">
                        <h2 class="catalogue-card-title">${product.name}</h2>
                        <div class="catalogue-card-price">${Number(product.price).toFixed(2)} €</div>
                        <a href="product.html?id=${encodeURIComponent(product.id)}" class="catalogue-card-link">
                            Voir la fiche <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        // Affiche ou cache le bouton "Voir plus"
        if (window.PRODUCTS.length > end) {
            voirPlusBtn.style.display = 'block';
        } else {
            voirPlusBtn.style.display = 'none';
        }

        // Hover sur l'image
        document.querySelectorAll('.catalogue-card-img').forEach(img => {
            img.addEventListener('mouseenter', function() {
                if (this.dataset.hover && this.dataset.hover !== this.dataset.main) {
                    this.src = this.dataset.hover;
                }
            });
            img.addEventListener('mouseleave', function() {
                this.src = this.dataset.main;
            });
        });

        // Ajout au panier
        document.querySelectorAll('.catalogue-card-cart').forEach(btn => {
            const productId = btn.getAttribute('data-id');

            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                let cart = JSON.parse(localStorage.getItem('cart') || '[]');
                let item = cart.find(i => i.id === productId);
                if (item) {
                    item.qty += 1;
                } else {
                    cart.push({ id: productId, qty: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));

                // Effet visuel sur le bouton
                btn.classList.add('added');
                setTimeout(() => btn.classList.remove('added'), 600);
            });
        });
    }

    voirPlusBtn.addEventListener('click', function() {
        currentPage++;
        renderCards();
    });

    // Affiche la première page au chargement
    renderCards();
});
