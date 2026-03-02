// State Management
let products = [];
let cart = [];
let discountType = 'fixed';
let discountValue = 0;
let servicePercentage = 0;
let numberOfPeople = 1;

// Elementos DOM
const mainContent = document.getElementById('mainContent');
const cartSidebar = document.getElementById('cartSidebar');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const discountInput = document.getElementById('discountValue');
const discountTypeSelect = document.getElementById('discountType');
const serviceButtons = document.querySelectorAll('.service-btn');
const customService = document.getElementById('customService');
const peopleCount = document.getElementById('peopleCount');
const decrementPeople = document.getElementById('decrementPeople');
const incrementPeople = document.getElementById('incrementPeople');
const summarySubtotal = document.getElementById('summarySubtotal');
const totalAmount = document.getElementById('totalAmount');
const perPerson = document.getElementById('perPerson');
const finalizeBtn = document.getElementById('finalizeOrder');
const finalizeModal = document.getElementById('finalizeModal');
const finalizeDetails = document.getElementById('finalizeDetails');
const closeModal = document.getElementById('closeModal');

// Dados da Pizzaria - CARDÁPIO COMPLETO
const initialProducts = [
    // PIZZAS SALGADAS
    { id: 1, nome: '🍕 Margherita', descricao: 'Molho de tomate, mussarela, manjericão fresco', preco: 45.90, categoria: 'pizzas', ativo: true },
    { id: 2, nome: '🍕 Calabresa', descricao: 'Molho de tomate, mussarela, calabresa fatiada, cebola', preco: 49.90, categoria: 'pizzas', ativo: true },
    { id: 3, nome: '🍕 Portuguesa', descricao: 'Molho de tomate, mussarela, presunto, ovos, cebola, azeitonas', preco: 54.90, categoria: 'pizzas', ativo: true },
    { id: 4, nome: '🍕 Frango com Catupiry', descricao: 'Molho de tomate, mussarela, frango desfiado, catupiry', preco: 52.90, categoria: 'pizzas', ativo: true },
    { id: 5, nome: '🍕 Quatro Queijos', descricao: 'Molho de tomate, mussarela, parmesão, gorgonzola, catupiry', preco: 56.90, categoria: 'pizzas', ativo: true },
    { id: 6, nome: '🍕 Pepperoni', descricao: 'Molho de tomate, mussarela, pepperoni fatiado', preco: 53.90, categoria: 'pizzas', ativo: true },
    { id: 7, nome: '🍕 Napolitana', descricao: 'Molho de tomate, mussarela, tomate fatiado, parmesão, orégano', preco: 48.90, categoria: 'pizzas', ativo: true },
    { id: 8, nome: '🍕 Margherita Especial', descricao: 'Molho de tomate, mussarela de búfala, tomate confit, manjericão', preco: 62.90, categoria: 'pizzas', ativo: true },
    
    // PIZZAS DOCES
    { id: 9, nome: '🍕 Chocolate com Morango', descricao: 'Chocolate ao leite, morangos frescos, granulado', preco: 46.90, categoria: 'doces', ativo: true },
    { id: 10, nome: '🍕 Banana Caramelizada', descricao: 'Banana, canela, açúcar caramelizado, leite condensado', preco: 44.90, categoria: 'doces', ativo: true },
    { id: 11, nome: '🍕 Romeu e Julieta', descricao: 'Mussarela de búfala, goiabada cascão', preco: 47.90, categoria: 'doces', ativo: true },
    { id: 12, nome: '🍕 Chocolate Branco com Nutella', descricao: 'Nutella, chocolate branco, morangos', preco: 54.90, categoria: 'doces', ativo: true },
    
    // ENTRADAS
    { id: 22, nome: '🥖 Pão de Alho', descricao: '4 unidades com queijo derretido', preco: 18.90, categoria: 'entradas', ativo: true },
    { id: 23, nome: '🧀 Batata Frita', descricao: 'Porção grande com cheddar e bacon', preco: 24.90, categoria: 'entradas', ativo: true },
    { id: 24, nome: '🌯 Calabresa Acebolada', descricao: 'Porção de calabresa com cebola', preco: 26.90, categoria: 'entradas', ativo: true },
    { id: 25, nome: '🧀 Polenta Frita', descricao: 'Porção com molho especial', preco: 22.90, categoria: 'entradas', ativo: true },

    // BEBIDAS
    { id: 16, nome: '🥤 Refrigerante 2L', descricao: 'Coca-Cola, Guaraná, Fanta', preco: 12.90, categoria: 'bebidas', ativo: true },
    { id: 17, nome: '🥤 Refrigerante Lata', descricao: 'Coca-Cola, Guaraná, Fanta, Sprite', preco: 6.90, categoria: 'bebidas', ativo: true },
    { id: 18, nome: '🍺 Cerveja Long Neck', descricao: 'Heineken, Stella, Corona', preco: 8.90, categoria: 'bebidas', ativo: true },
    { id: 21, nome: '💧 Água Mineral', descricao: 'Com ou sem gás 500ml', preco: 4.90, categoria: 'bebidas', ativo: true },
    
    // BORDAS
    { id: 13, nome: '➕ Borda de Catupiry', descricao: 'Adicional para qualquer pizza', preco: 8.90, categoria: 'bordas', ativo: true },
    { id: 14, nome: '➕ Borda de Cheddar', descricao: 'Adicional para qualquer pizza', preco: 8.90, categoria: 'bordas', ativo: true },
    
    // SOBREMESAS
    { id: 26, nome: '🍮 Pudim', descricao: 'Pudim de leite condensado', preco: 12.90, categoria: 'sobremesas', ativo: true },
    { id: 27, nome: '🍰 Brownie', descricao: 'Brownie de chocolate com sorvete', preco: 16.90, categoria: 'sobremesas', ativo: true }
];

const categorias = [
    { id: 'todos', nome: 'Todos' },
    { id: 'pizzas', nome: 'Pizzas Salgadas' },
    { id: 'doces', nome: 'Pizzas Doces' },
    { id: 'entradas', nome: 'Entradas' },
    { id: 'bebidas', nome: 'Bebidas' },
    { id: 'bordas', nome: 'Bordas' },
    { id: 'sobremesas', nome: 'Sobremesas' }
];

// Inicialização
async function init() {
    products = initialProducts;
    renderCategorias();
    renderProducts(products, false);
    loadCartFromStorage();
    updateCartUI();
    setupEventListeners();
}

// Renderizar abas de categorias
function renderCategorias() {
    const header = document.querySelector('.header');
    const categoriasHTML = `
        <div class="categorias">
            ${categorias.map(cat => `
                <button class="categoria-btn ${cat.id === 'todos' ? 'active' : ''}" data-categoria="${cat.id}">
                    ${cat.nome}
                </button>
            `).join('')}
        </div>
    `;
    header.insertAdjacentHTML('afterend', categoriasHTML);
    
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.categoria-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterProducts(e.target.dataset.categoria);
        });
    });
}

// Filtrar lógica
function filterProducts(categoriaId) {
    if (categoriaId === 'todos') {
        renderProducts(products, false);
    } else {
        const filtered = products.filter(p => p.categoria === categoriaId);
        renderProducts(filtered, true);
    }
}

// Renderizar Produtos com Agrupamento
function renderProducts(productsToRender, isFiltered) {
    if (isFiltered) {
        mainContent.innerHTML = `
            <div class="products-grid">
                ${productsToRender.map(product => renderProductCard(product)).join('')}
            </div>
        `;
    } else {
        let html = '';
        categorias.forEach(cat => {
            if (cat.id === 'todos') return;
            const productsInCategory = productsToRender.filter(p => p.categoria === cat.id);
            if (productsInCategory.length > 0) {
                html += `
                    <section class="category-section">
                        <h2 class="category-group-title">${cat.nome}</h2>
                        <div class="products-grid">
                            ${productsInCategory.map(product => renderProductCard(product)).join('')}
                        </div>
                    </section>
                `;
            }
        });
        mainContent.innerHTML = html;
    }
}

function renderProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">${product.nome.split(' ')[0]}</div>
            <div class="product-info">
                <h3 class="product-name">${product.nome}</h3>
                <p class="product-description">${product.descricao}</p>
                <div class="product-price">R$ ${product.preco.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">+ adicionar</button>
            </div>
        </div>
    `;
}

// Carrinho e Comanda
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) { existingItem.quantity++; } 
    else { cart.push({ ...product, quantity: 1 }); }
    saveCartToStorage();
    updateCartUI();
    showFeedback(`${product.nome} adicionado`);
};

function updateCartUI() {
    updateCartItems();
    updateSummary();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function updateCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">vazio</div>';
        return;
    }
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.nome}</div>
                <div class="cart-item-price">R$ ${item.preco.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeItem(${item.id})">remover</button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);
    const discount = discountType === 'fixed' ? Math.min(discountValue, subtotal) : subtotal * (discountValue / 100);
    const service = (subtotal - discount) * (servicePercentage / 100);
    const total = (subtotal - discount) + service;
    
    summarySubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    totalAmount.textContent = `R$ ${total.toFixed(2)}`;
    perPerson.textContent = `por pessoa: R$ ${(total / numberOfPeople).toFixed(2)}`;
}

window.updateQuantity = function(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeItem(id);
        else { saveCartToStorage(); updateCartUI(); }
    }
};

window.removeItem = function(id) {
    cart = cart.filter(i => i.id !== id);
    saveCartToStorage();
    updateCartUI();
};

function saveCartToStorage() { localStorage.setItem('pizzariaCart', JSON.stringify(cart)); }
function loadCartFromStorage() {
    const saved = localStorage.getItem('pizzariaCart');
    if (saved) cart = JSON.parse(saved);
}

function setupEventListeners() {
    cartToggle.addEventListener('click', () => cartSidebar.classList.add('open'));
    closeCart.addEventListener('click', () => cartSidebar.classList.remove('open'));
    
    discountInput.addEventListener('input', (e) => { discountValue = parseFloat(e.target.value) || 0; updateSummary(); });
    discountTypeSelect.addEventListener('change', (e) => { discountType = e.target.value; updateSummary(); });
    
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            serviceButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            servicePercentage = parseInt(btn.dataset.service);
            updateSummary();
        });
    });

    decrementPeople.addEventListener('click', () => { if (numberOfPeople > 1) { numberOfPeople--; peopleCount.textContent = numberOfPeople; updateSummary(); } });
    incrementPeople.addEventListener('click', () => { numberOfPeople++; peopleCount.textContent = numberOfPeople; updateSummary(); });
    
    finalizeBtn.addEventListener('click', () => {
        finalizeModal.classList.add('show');
        cartSidebar.classList.remove('open');
        finalizeDetails.innerHTML = `<p>Total: ${totalAmount.textContent}</p><p>Pessoas: ${numberOfPeople}</p>`;
    });
    
    closeModal.addEventListener('click', () => {
        finalizeModal.classList.remove('show');
        cart = [];
        saveCartToStorage();
        updateCartUI();
    });
}

function showFeedback(msg) {
    const f = document.createElement('div');
    f.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#222; padding:10px 20px; border-radius:8px; z-index:9999;";
    f.textContent = msg;
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 2000);
}

init();
