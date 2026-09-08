// --- 🛒 CART LOGIC ---
// Load cart from session storage so it doesn't wipe when changing pages
let cart = JSON.parse(sessionStorage.getItem('activeCart')) || [];
let totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    totalAmount += price;
    sessionStorage.setItem('activeCart', JSON.stringify(cart));
    alert(`✅ ${itemName} added to your cart! 🍦`);
}

// --- 🔍 MENU FILTERING ---
function filterMenu(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// --- 📊 DASHBOARD UI UPDATES ---
window.addEventListener('DOMContentLoaded', () => {
    // Only run this if we are actually on the Dashboard page
    if (document.getElementById('cart-items')) {
        updateDashboardCartUI();
        loadOrderHistory();
    }
});

function updateDashboardCartUI() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    cartList.innerHTML = ''; 
    
    if (cart.length === 0) {
        cartList.innerHTML = '<li style="color: gray;">Your cart is empty. 🥺</li>';
    } else {
        cart.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.name}</span> <span>₹${item.price}</span>`;
            cartList.appendChild(li);
        });
    }
    totalDisplay.innerText = `Total: ₹${totalAmount}`;
}

// --- 💳 SECURE CHECKOUT ---
function placeOrder() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        alert("You must be logged in to place an order! 🛑");
        openAuth();
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty! Add some ice cream first. 🛒");
        return;
    } 
    
    // Save to user history
    let userHistory = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];
    userHistory.push({ 
        date: new Date().toLocaleDateString(), 
        total: totalAmount, 
        items: cart.length 
    });
    localStorage.setItem(`history_${currentUser}`, JSON.stringify(userHistory));

    alert(`🎉 Success ${currentUser}! Total: ₹${totalAmount}. We are preparing your ice cream! 🛵💨`);
    
    // Clear the cart
    cart = [];
    totalAmount = 0;
    sessionStorage.removeItem('activeCart');
    
    // Refresh Dashboard UI
    updateDashboardCartUI();
    loadOrderHistory();
}

function loadOrderHistory() {
    const currentUser = localStorage.getItem('currentUser');
    const historyList = document.getElementById('order-history');
    
    if (!currentUser) return; // Stop if not logged in
    
    let userHistory = JSON.parse(localStorage.getItem(`history_${currentUser}`)) || [];
    historyList.innerHTML = '';

    if (userHistory.length === 0) {
        historyList.innerHTML = '<li style="color: gray;">No past orders yet! 🍦</li>';
    } else {
        userHistory.forEach(order => {
            const li = document.createElement('li');
            li.innerHTML = `<span>📅 ${order.date} (${order.items} Items)</span> <b>₹${order.total}</b>`;
            historyList.appendChild(li);
        });
    }
      }
