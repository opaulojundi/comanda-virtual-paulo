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

// Dados da Pizzaria - CARDÁPIO EXPANDIDO
const initialProducts = [
    // PIZZAS SALGADAS (40 OPÇÕES)
    { id: 1, nome: '🍕 Margherita', descricao: 'Molho, mussarela, tomate e manjericão', preco: 45.90, categoria: 'pizzas', ativo: true },
    { id: 2, nome: '🍕 Calabresa', descricao: 'Molho, mussarela, calabresa e cebola', preco: 49.90, categoria: 'pizzas', ativo: true },
    { id: 3, nome: '🍕 Portuguesa', descricao: 'Presunto, ovos, cebola, ervilha e azeitona', preco: 54.90, categoria: 'pizzas', ativo: true },
    { id: 4, nome: '🍕 Frango com Catupiry', descricao: 'Frango desfiado com o legítimo Catupiry', preco: 52.90, categoria: 'pizzas', ativo: true },
    { id: 5, nome: '🍕 Quatro Queijos', descricao: 'Mussarela, parmesão, gorgonzola e provolone', preco: 56.90, categoria: 'pizzas', ativo: true },
    { id: 6, nome: '🍕 Pepperoni', descricao: 'Mussarela e fatias de pepperoni premium', preco: 58.90, categoria: 'pizzas', ativo: true },
    { id: 7, nome: '🍕 Napolitana', descricao: 'Mussarela, tomate fatiado e parmesão ralado', preco: 48.90, categoria: 'pizzas', ativo: true },
    { id: 8, nome: '🍕 Muçarela', descricao: 'Molho de tomate e dose dupla de muçarela', preco: 42.90, categoria: 'pizzas', ativo: true },
    { id: 9, nome: '🍕 Bacon', descricao: 'Mussarela e fatias crocantes de bacon', preco: 51.90, categoria: 'pizzas', ativo: true },
    { id: 10, nome: '🍕 Milho', descricao: 'Mussarela e milho selecionado', preco: 44.90, categoria: 'pizzas', ativo: true },
    { id: 11, nome: '🍕 Atum com Cebola', descricao: 'Atum sólido premium e cebola fatiada', preco: 55.90, categoria: 'pizzas', ativo: true },
    { id: 12, nome: '🍕 Palmito Especial', descricao: 'Palmito macio, mussarela e orégano', preco: 57.90, categoria: 'pizzas', ativo: true },
    { id: 13, nome: '🍕 Lombo Defumado', descricao: 'Lombo canadense, cebola e mussarela', preco: 53.90, categoria: 'pizzas', ativo: true },
    { id: 14, nome: '🍕 Siciliana', descricao: 'Mussarela, bacon e champignon ao molho', preco: 54.90, categoria: 'pizzas', ativo: true },
    { id: 15, nome: '🍕 Rúcula com Tomate Seco', descricao: 'Mussarela de búfala, rúcula e tomate seco', preco: 59.90, categoria: 'pizzas', ativo: true },
    { id: 16, nome: '🍕 Baiana Forte', descricao: 'Calabresa moída, ovos, pimenta e cebola', preco: 50.90, categoria: 'pizzas', ativo: true },
    { id: 17, nome: '🍕 Cinco Queijos', descricao: 'Mussarela, provolone, parmesão, gorgonzola e catupiry', preco: 59.90, categoria: 'pizzas', ativo: true },
    { id: 18, nome: '🍕 Alho e Óleo', descricao: 'Mussarela com alho frito crocante', preco: 46.90, categoria: 'pizzas', ativo: true },
    { id: 19, nome: '🍕 Aliche Importado', descricao: 'Fatias de aliche sobre molho de tomate', preco: 62.90, categoria: 'pizzas', ativo: true },
    { id: 20, nome: '🍕 Brócolis com Bacon', descricao: 'Brócolis, mussarela, bacon e alho', preco: 53.90, categoria: 'pizzas', ativo: true },
    { id: 21, nome: '🍕 Carne Seca com Desfiada', descricao: 'Carne seca, mussarela e cebola roxa', preco: 61.90, categoria: 'pizzas', ativo: true },
    { id: 22, nome: '🍕 Champignon Premium', descricao: 'Mussarela com champignon temperado', preco: 52.90, categoria: 'pizzas', ativo: true },
    { id: 23, nome: '🍕 Escarola Especial', descricao: 'Escarola refogada, mussarela e bacon', preco: 49.90, categoria: 'pizzas', ativo: true },
    { id: 24, nome: '🍕 Mexicana', descricao: 'Calabresa, pimentão, milho e pimenta', preco: 51.90, categoria: 'pizzas', ativo: true },
    { id: 25, nome: '🍕 Moda da Casa', descricao: 'O melhor do chef: mix de frios e queijos', preco: 65.90, categoria: 'pizzas', ativo: true },
    { id: 26, nome: '🍕 Namorado', descricao: 'Palmito, milho e catupiry sobre mussarela', preco: 58.90, categoria: 'pizzas', ativo: true },
    { id: 27, nome: '🍕 Pantaneira', preco: 59.90, descricao: 'Carne seca, ovos e cebola roxa', categoria: 'pizzas', ativo: true },
    { id: 28, nome: '🍕 Parmegiana', preco: 54.90, descricao: 'Mussarela, molho de tomate extra e parmesão', categoria: 'pizzas', ativo: true },
    { id: 29, nome: '🍕 Peruana', preco: 55.90, descricao: 'Atum, ovos e cebola sobre mussarela', categoria: 'pizzas', ativo: true },
    { id: 30, nome: '🍕 Picanha ao Alho', preco: 72.90, descricao: 'Tiras de picanha, mussarela e alho', categoria: 'pizzas', ativo: true },
    { id: 31, nome: '🍕 Pomodoro', preco: 47.90, descricao: 'Molho, alho, parmesão e manjericão', categoria: 'pizzas', ativo: true },
    { id: 32, nome: '🍕 Romana', preco: 53.90, descricao: 'Mussarela, parmesão e filés de aliche', categoria: 'pizzas', ativo: true },
    { id: 33, nome: '🍕 Shimeji Gourmet', preco: 68.90, descricao: 'Shimeji na manteiga e mussarela de búfala', categoria: 'pizzas', ativo: true },
    { id: 34, nome: '🍕 Strogonoff de Carne', preco: 63.90, descricao: 'Strogonoff, mussarela e batata palha', categoria: 'pizzas', ativo: true },
    { id: 35, nome: '🍕 Strogonoff de Frango', preco: 58.90, descricao: 'Frango ao molho e batata palha', categoria: 'pizzas', ativo: true },
    { id: 36, nome: '🍕 Toscana', preco: 49.90, descricao: 'Calabresa moída e mussarela', categoria: 'pizzas', ativo: true },
    { id: 37, nome: '🍕 Vegetariana', preco: 52.90, descricao: 'Mix de legumes frescos e mussarela', categoria: 'pizzas', ativo: true },
    { id: 38, nome: '🍕 Veneza', preco: 56.90, descricao: 'Peito de peru, catupiry e cebola', categoria: 'pizzas', ativo: true },
    { id: 39, nome: '🍕 Carbonara', preco: 58.90, descricao: 'Ovos, bacon, parmesão e creme de leite', categoria: 'pizzas', ativo: true },
    { id: 40, nome: '🍕 Zucchini', preco: 54.90, descricao: 'Abobrinha grelhada e parmesão', categoria: 'pizzas', ativo: true },

    // PIZZAS DOCES (20 OPÇÕES)
    { id: 41, nome: '🍫 Brigadeiro Tradicional', descricao: 'Chocolate ao leite e granulado', preco: 46.90, categoria: 'doces', ativo: true },
    { id: 42, nome: '🥥 Prestígio', descricao: 'Chocolate ao leite e coco ralado', preco: 47.90, categoria: 'doces', ativo: true },
    { id: 43, nome: '🧀 Romeu e Julieta', descricao: 'Mussarela e goiabada cremosa', preco: 45.90, categoria: 'doces', ativo: true },
    { id: 44, nome: '🍌 Banana com Canela', descricao: 'Banana, açúcar, canela e leite condensado', preco: 44.90, categoria: 'doces', ativo: true },
    { id: 45, nome: '🍬 M&Ms Coloridos', descricao: 'Chocolate ao leite coberto com M&Ms', preco: 52.90, categoria: 'doces', ativo: true },
    { id: 46, nome: '🍓 Nutella com Morango', descricao: 'A famosa Nutella com morangos frescos', preco: 59.90, categoria: 'doces', ativo: true },
    { id: 47, nome: '🤍 Chocolate Branco', descricao: 'Chocolate branco Nestlé derretido', preco: 48.90, categoria: 'doces', ativo: true },
    { id: 48, nome: '💖 Sensação', descricao: 'Chocolate ao leite e pedaços de morango', preco: 51.90, categoria: 'doces', ativo: true },
    { id: 49, nome: '🥜 Charge', descricao: 'Chocolate, amendoim e caramelo', preco: 53.90, categoria: 'doces', ativo: true },
    { id: 50, nome: '🍪 Oreo', descricao: 'Chocolate branco com biscoito Oreo picado', preco: 54.90, categoria: 'doces', ativo: true },
    { id: 51, nome: '🍫 Kit Kat', descricao: 'Chocolate ao leite e barras de Kit Kat', preco: 55.90, categoria: 'doces', ativo: true },
    { id: 52, nome: '🍯 Paçoca', descricao: 'Doce de leite com paçoca esfarelada', preco: 46.90, categoria: 'doces', ativo: true },
    { id: 53, nome: '🥥 Doce de Leite com Coco', preco: 47.90, categoria: 'doces', ativo: true },
    { id: 54, nome: '🥨 Churros', preco: 49.90, descricao: 'Doce de leite, açúcar e canela', categoria: 'doces', ativo: true },
    { id: 55, nome: '🍍 Califórnia', preco: 48.90, descricao: 'Mussarela e frutas em calda', categoria: 'doces', ativo: true },
    { id: 56, nome: '🥚 Kinder Bueno', preco: 62.90, descricao: 'Creme de avelã e Kinder Bueno', categoria: 'doces', ativo: true },
    { id: 57, nome: '🍬 Sonho de Valsa', preco: 54.90, descricao: 'Chocolate com bombom picado', categoria: 'doces', ativo: true },
    { id: 58, nome: '🥥 Beijinho', preco: 46.90, descricao: 'Chocolate branco e coco', categoria: 'doces', ativo: true },
    { id: 59, nome: '🍍 Abacaxi com Coco', preco: 47.90, categoria: 'doces', ativo: true },
    { id: 60, nome: '🍫 Meio Amargo', preco: 52.90, descricao: 'Chocolate 50% cacau premium', categoria: 'doces', ativo: true },

    // ENTRADAS (10 OPÇÕES)
    { id: 61, nome: '🥖 Pão de Alho Tradicional', preco: 18.90, categoria: 'entradas', ativo: true },
    { id: 62, nome: '🍟 Batata Frita Individual', preco: 22.90, categoria: 'entradas', ativo: true },
    { id: 63, nome: '🥓 Batata com Cheddar e Bacon', preco: 34.90, categoria: 'entradas', ativo: true },
    { id: 64, nome: '🌯 Calabresa Acebolada', preco: 29.90, categoria: 'entradas', ativo: true },
    { id: 65, nome: '🌽 Polenta Frita', preco: 24.90, categoria: 'entradas', ativo: true },
    { id: 66, nome: '🍅 Bruschetta Pomodoro', preco: 26.90, categoria: 'entradas', ativo: true },
    { id: 67, nome: '🥩 Carpaccio de Carne', preco: 42.90, categoria: 'entradas', ativo: true },
    { id: 68, nome: '🧀 Sticks de Muçarela (6un)', preco: 28.90, categoria: 'entradas', ativo: true },
    { id: 69, nome: '🥗 Salada Caprese', preco: 32.90, categoria: 'entradas', ativo: true },
    { id: 70, nome: '🥪 Croquete de Carne (4un)', preco: 19.90, categoria: 'entradas', ativo: true },

    // BEBIDAS (7 OPÇÕES)
    { id: 71, nome: '🥤 Refrigerante Lata', preco: 6.50, categoria: 'bebidas', ativo: true },
    { id: 72, nome: '🥤 Refrigerante 2L', preco: 14.00, categoria: 'bebidas', ativo: true },
    { id: 73, nome: '💧 Água Mineral 500ml', preco: 4.50, categoria: 'bebidas', ativo: true },
    { id: 74, nome: '🍊 Suco Natural 500ml', preco: 10.90, categoria: 'bebidas', ativo: true },
    { id: 75, nome: '🍺 Cerveja Long Neck', preco: 9.90, categoria: 'bebidas', ativo: true },
    { id: 76, nome: '🍺 Cerveja 600ml', preco: 16.00, categoria: 'bebidas', ativo: true },
    { id: 77, nome: '🍵 Chá Gelado Lata', preco: 7.50, categoria: 'bebidas', ativo: true },

    // BORDAS (3 OPÇÕES)
    { id: 78, nome: '➕ Borda de Catupiry', preco: 10.00, categoria: 'bordas', ativo: true },
    { id: 79, nome: '➕ Borda de Cheddar', preco: 10.00, categoria: 'bordas', ativo: true },
    { id: 80, nome: '➕ Borda de Chocolate', preco: 12.00, categoria: 'bordas', ativo: true },

    // SOBREMESAS (9 OPÇÕES)
    { id: 81, nome: '🍮 Pudim de Leite', preco: 12.90, categoria: 'sobremesas', ativo: true },
    { id: 82, nome: '🍰 Brownie com Sorvete', preco: 22.90, categoria: 'sobremesas', ativo: true },
    { id: 83, nome: '🧁 Petit Gateau', preco: 24.90, categoria: 'sobremesas', ativo: true },
    { id: 84, nome: '🥧 Tiramisù Italiano', preco: 26.90, categoria: 'sobremesas', ativo: true },
    { id: 85, nome: '🍨 Taça de Sorvete (2 bolas)', preco: 16.90, categoria: 'sobremesas', ativo: true },
    { id: 86, nome: '🍫 Mousse de Chocolate', preco: 14.90, categoria: 'sobremesas', ativo: true },
    { id: 87, nome: '🍋 Mousse de Maracujá', preco: 14.90, categoria: 'sobremesas', ativo: true },
    { id: 88, nome: '🍰 Cheesecake de Frutas Vermelhas', preco: 24.90, categoria: 'sobremesas', ativo: true },
    { id: 89, nome: '🍌 Banoffee no Pote', preco: 18.90, categoria: 'sobremesas', ativo: true }
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

