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
    // PIZZAS SALGADAS (tamanho grande)
    { id: 1, nome: '🍕 Margherita', descricao: 'Molho de tomate, mussarela, manjericão fresco', preco: 45.90, categoria: 'pizzas', imagem_url: '', ativo: true },
    { id: 2, nome: '🍕 Calabresa', descricao: 'Molho de tomate, mussarela, calabresa fatiada, cebola', preco: 49.90, categoria: 'pizzas', imagem_url: '', ativo: true },
    { id: 3, nome: '🍕 Portuguesa', descricao: 'Molho de tomate, mussarela, presunto, ovos, cebola, azeitonas', preco: 54.90, categoria: 'pizzas', imagem_url: '', ativo: true },
    { id: 4, nome: '🍕 Frango com Catupiry', descricao: 'Molho de tomate, mussarela, frango desfiado, catupiry', preco: 52.90, categoria: 'pizzas', imagem_url: '', ativo: true },
    { id: 5, nome: '🍕 Quatro Queijos', descricao: 'Molho de tomate, mussarela, parmesão, gorgonzola, catupiry', preco: 56.90, categoria: 'pizzas', imagem_url: '', ativo: true },
    { id: 6, nome: '🍕 Pepperoni', descricao: 'Molho de tomate, mussarela, pepperoni fatiado', preco: 53.90, categoria: 'pizzas', imagem_url: '', ativo: true },
    { id: 7, nome: '🍕 Napolitana', descricao: 'Molho de tomate, mussarela, tomate fatiado, parmesão, orégano', preco: 48.90, categoria: 'pizzas', imagem_url: '', ativo: true },
    { id: 8, nome: '🍕 Margherita Especial', descricao: 'Molho de tomate, mussarela de búfala, tomate confit, manjericão', preco: 62.90, categoria: 'pizzas', imagem_url: '', ativo: true },
    
    // PIZZAS DOCES
    { id: 9, nome: '🍕 Chocolate com Morango', descricao: 'Chocolate ao leite, morangos frescos, granulado', preco: 46.90, categoria: 'doces', imagem_url: '', ativo: true },
    { id: 10, nome: '🍕 Banana Caramelizada', descricao: 'Banana, canela, açúcar caramelizado, leite condensado', preco: 44.90, categoria: 'doces', imagem_url: '', ativo: true },
    { id: 11, nome: '🍕 Romeu e Julieta', descricao: 'Mussarela de búfala, goiabada cascão', preco: 47.90, categoria: 'doces', imagem_url: '', ativo: true },
    { id: 12, nome: '🍕 Chocolate Branco com Nutella', descricao: 'Nutella, chocolate branco, morangos', preco: 54.90, categoria: 'doces', imagem_url: '', ativo: true },
    
    // BORDAS RECHEADAS (adicionais)
    { id: 13, nome: '➕ Borda de Catupiry', descricao: 'Adicional para qualquer pizza', preco: 8.90, categoria: 'bordas', imagem_url: '', ativo: true },
    { id: 14, nome: '➕ Borda de Cheddar', descricao: 'Adicional para qualquer pizza', preco: 8.90, categoria: 'bordas', imagem_url: '', ativo: true },
    { id: 15, nome: '➕ Borda de Chocolate', descricao: 'Adicional para pizza doce', preco: 9.90, categoria: 'bordas', imagem_url: '', ativo: true },
    
    // BEBIDAS
    { id: 16, nome: '🥤 Refrigerante 2L', descricao: 'Coca-Cola, Guaraná, Fanta', preco: 12.90, categoria: 'bebidas', imagem_url: '', ativo: true },
    { id: 17, nome: '🥤 Refrigerante Lata', descricao: 'Coca-Cola, Guaraná, Fanta, Sprite', preco: 6.90, categoria: 'bebidas', imagem_url: '', ativo: true },
    { id: 18, nome: '🍺 Cerveja Long Neck', descricao: 'Heineken, Stella, Corona', preco: 8.90, categoria: 'bebidas', imagem_url: '', ativo: true },
    { id: 19, nome: '🍺 Cerveja 600ml', descricao: 'Heineken, Original, Budweiser', preco: 14.90, categoria: 'bebidas', imagem_url: '', ativo: true },
    { id: 20, nome: '🥤 Suco Natural', descricao: 'Laranja, Limão, Maracujá, Morango', preco: 9.90, categoria: 'bebidas', imagem_url: '', ativo: true },
    { id: 21, nome: '💧 Água Mineral', descricao: 'Com ou sem gás 500ml', preco: 4.90, categoria: 'bebidas', imagem_url: '', ativo: true },
    
    // ENTRADAS
    { id: 22, nome: '🥖 Pão de Alho', descricao: '4 unidades com queijo derretido', preco: 18.90, categoria: 'entradas', imagem_url: '', ativo: true },
    { id: 23, nome: '🧀 Batata Frita', descricao: 'Porção grande com cheddar e bacon', preco: 24.90, categoria: 'entradas', imagem_url: '', ativo: true },
    { id: 24, nome: '🌯 Calabresa Acebolada', descricao: 'Porção de calabresa com cebola', preco: 26.90, categoria: 'entradas', imagem_url: '', ativo: true },
    { id: 25, nome: '🧀 Polenta Frita', descricao: 'Porção com molho especial', preco: 22.90, categoria: 'entradas', imagem_url: '', ativo: true },
    
    // SOBREMESAS
    { id: 26, nome: '🍮 Pudim', descricao: 'Pudim de leite condensado', preco: 12.90, categoria: 'sobremesas', imagem_url: '', ativo: true },
    { id: 27, nome: '🍰 Brownie', descricao: 'Brownie de chocolate com sorvete', preco: 16.90, categoria: 'sobremesas', imagem_url: '', ativo: true },
    { id: 28, nome: '🍨 Sorvete', descricao: '2 bolas de sorvete (chocolate, morango, creme)', preco: 14.90, categoria: 'sobremesas', imagem_url: '', ativo: true }
];

// Categorias para filtro
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
    await loadProducts();
    renderCategorias();
    renderProducts();
    loadCartFromStorage();
    updateCartUI();
    setupEventListeners();
}

// Carregar produtos
async function loadProducts() {
    products = initialProducts;
}

// Renderizar categorias
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
    
    // Inserir categorias após o header
    header.insertAdjacentHTML('afterend', categoriasHTML);
    
    // Adicionar event listeners para os botões de categoria
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.categoria-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterProducts(e.target.dataset.categoria);
        });
    });
}

// Filtrar produtos por categoria
function filterProducts(categoria) {
    if (categoria === 'todos') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.categoria === categoria);
        renderProducts(filtered);
    }
}

// Renderizar produtos
function renderProducts(productsToRender = products) {
    mainContent.innerHTML = `
        <div class="products-grid">
            ${productsToRender.map(product => `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-image">
                        ${product.nome.split(' ')[0]}
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.nome}</h3>
                        <p class="product-description">${product.descricao}</p>
                        <div class="product-price">R$ ${product.preco.toFixed(2)}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">+ adicionar</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Adicionar ao carrinho
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    showFeedback(`${product.nome} adicionado à comanda`);
};

// Atualizar UI do carrinho
function updateCartUI() {
    updateCartItems();
    updateSummary();
    updateCartCount();
}

function updateCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">nenhum item na comanda</div>';
        return;
    }
    
    // Agrupar itens por categoria para melhor visualização
    const pizzas = cart.filter(item => item.categoria === 'pizzas' || item.categoria === 'doces');
    const entradas = cart.filter(item => item.categoria === 'entradas');
    const bebidas = cart.filter(item => item.categoria === 'bebidas');
    const outros = cart.filter(item => !['pizzas', 'doces', 'entradas', 'bebidas'].includes(item.categoria));
    
    let html = '';
    
    if (pizzas.length > 0) {
        html += '<div class="cart-categoria">🍕 Pizzas</div>';
        html += renderCartItems(pizzas);
    }
    
    if (entradas.length > 0) {
        html += '<div class="cart-categoria">🥗 Entradas</div>';
        html += renderCartItems(entradas);
    }
    
    if (bebidas.length > 0) {
        html += '<div class="cart-categoria">🥤 Bebidas</div>';
        html += renderCartItems(bebidas);
    }
    
    if (outros.length > 0) {
        html += '<div class="cart-categoria">📦 Outros</div>';
        html += renderCartItems(outros);
    }
    
    cartItems.innerHTML = html;
}

function renderCartItems(items) {
    return items.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">${item.nome.split(' ')[0]}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.nome}</div>
                <div class="cart-item-price">R$ ${item.preco.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeItem(${item.id})">remover</button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateSummary() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const service = calculateService(subtotal - discount);
    const total = (subtotal - discount) + service;
    
    summarySubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    totalAmount.textContent = `R$ ${total.toFixed(2)}`;
    perPerson.textContent = `por pessoa: R$ ${(total / numberOfPeople).toFixed(2)}`;
}

function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);
}

function calculateDiscount(subtotal) {
    if (!discountValue || discountValue <= 0) return 0;
    
    if (discountType === 'fixed') {
        return Math.min(discountValue, subtotal);
    } else {
        return subtotal * (Math.min(discountValue, 100) / 100);
    }
}

function calculateService(value) {
    return value * (servicePercentage / 100);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Quantidade
window.updateQuantity = function(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(productId);
        } else {
            saveCartToStorage();
            updateCartUI();
        }
    }
};

window.removeItem = function(productId) {
    const item = cart.find(i => i.id === productId);
    cart = cart.filter(i => i.id !== productId);
    saveCartToStorage();
    updateCartUI();
    showFeedback(`${item.nome} removido da comanda`);
};

// Storage
function saveCartToStorage() {
    localStorage.setItem('pizzariaCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('pizzariaCart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
        } catch (e) {
            cart = [];
        }
    }
}

// Event Listeners
function setupEventListeners() {
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
    
    discountInput.addEventListener('input', (e) => {
        discountValue = parseFloat(e.target.value) || 0;
        updateSummary();
    });
    
    discountTypeSelect.addEventListener('change', (e) => {
        discountType = e.target.value;
        updateSummary();
    });
    
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            serviceButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            servicePercentage = parseInt(btn.dataset.service);
            customService.value = '';
            updateSummary();
        });
    });
    
    customService.addEventListener('input', (e) => {
        servicePercentage = parseFloat(e.target.value) || 0;
        serviceButtons.forEach(b => b.classList.remove('active'));
        updateSummary();
    });
    
    decrementPeople.addEventListener('click', () => {
        if (numberOfPeople > 1) {
            numberOfPeople--;
            peopleCount.textContent = numberOfPeople;
            updateSummary();
        }
    });
    
    incrementPeople.addEventListener('click', () => {
        if (numberOfPeople < 50) {
            numberOfPeople++;
            peopleCount.textContent = numberOfPeople;
            updateSummary();
        }
    });
    
    finalizeBtn.addEventListener('click', showFinalizeModal);
    
    closeModal.addEventListener('click', () => {
        finalizeModal.classList.remove('show');
        resetOrder();
    });
    
    // Fechar sidebar ao clicar fora
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target) && cartSidebar.classList.contains('open')) {
            cartSidebar.classList.remove('open');
        }
    });
}

function showFinalizeModal() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal);
    const service = calculateService(subtotal - discount);
    const total = (subtotal - discount) + service;
    
    // Agrupar itens por categoria para o resumo
    const pizzas = cart.filter(item => item.categoria === 'pizzas' || item.categoria === 'doces');
    const outros = cart.filter(item => item.categoria !== 'pizzas' && item.categoria !== 'doces');
    
    let itemsList = '';
    
    if (pizzas.length > 0) {
        itemsList += '<div class="finalize-categoria">🍕 Pizzas</div>';
        pizzas.forEach(item => {
            itemsList += `
                <div class="finalize-item">
                    <span>${item.nome} x${item.quantity}</span>
                    <span>R$ ${(item.preco * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });
    }
    
    if (outros.length > 0) {
        itemsList += '<div class="finalize-categoria">📦 Outros Itens</div>';
        outros.forEach(item => {
            itemsList += `
                <div class="finalize-item">
                    <span>${item.nome} x${item.quantity}</span>
                    <span>R$ ${(item.preco * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });
    }
    
    finalizeDetails.innerHTML = `
        ${itemsList}
        <div class="finalize-divider"></div>
        <div class="finalize-item">
            <span>subtotal</span>
            <span>R$ ${subtotal.toFixed(2)}</span>
        </div>
        ${discount > 0 ? `
        <div class="finalize-item">
            <span>desconto</span>
            <span>- R$ ${discount.toFixed(2)}</span>
        </div>
        ` : ''}
        ${service > 0 ? `
        <div class="finalize-item">
            <span>taxa garçom (${servicePercentage}%)</span>
            <span>R$ ${service.toFixed(2)}</span>
        </div>
        ` : ''}
        <div class="finalize-total">
            <div class="finalize-item">
                <span>total</span>
                <span>R$ ${total.toFixed(2)}</span>
            </div>
            <div class="finalize-item">
                <span>por pessoa (${numberOfPeople})</span>
                <span>R$ ${(total / numberOfPeople).toFixed(2)}</span>
            </div>
        </div>
    `;
    
    finalizeModal.classList.add('show');
    cartSidebar.classList.remove('open');
}

function resetOrder() {
    cart = [];
    discountValue = 0;
    servicePercentage = 0;
    numberOfPeople = 1;
    discountInput.value = '';
    customService.value = '';
    peopleCount.textContent = '1';
    serviceButtons.forEach(b => b.classList.remove('active'));
    
    saveCartToStorage();
    updateCartUI();
}

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--surface-light);
        border: 1px solid var(--border);
        color: var(--text-primary);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        animation: fadeInOut 2s ease;
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Inicializar app
init();