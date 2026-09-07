// --- SHOPPING CART LOGIC 🛒 ---
let cart = [];
let totalAmount = 0;

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    totalAmount += price;
    updateCart();
    alert(`✅ ${itemName} added to your cart! 🍦`);
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    
    cartList.innerHTML = ''; 
    
    if (cart.length === 0) {
        cartList.innerHTML = '<li id="empty-msg">Your cart is empty. 🥺</li>';
    } else {
        cart.forEach((item) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.name}</span> <span>₹${item.price}</span>`;
            cartList.appendChild(li);
        });
    }
    
    totalDisplay.innerText = `Total: ₹${totalAmount}`;
}

// --- USER ACCOUNT SYSTEM (LOCALSTORAGE BACKEND) 👤 ---
let isLoginMode = true;

window.onload = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('auth-btn').innerText = `Logout (${currentUser}) 🚪`;
    }
};

function openAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        localStorage.removeItem('currentUser');
        document.getElementById('auth-btn').innerText = 'Login 👤';
        alert("Logged out successfully! 👋");
    } else {
        document.getElementById('auth-modal').style.display = 'flex';
    }
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? 'Login 👤' : 'Register 📝';
    document.querySelector('.toggle-link').innerText = isLoginMode ? 'Need an account? Register' : 'Already have an account? Login';
}

function handleAuth() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (!user || !pass) {
        alert("Please fill in both fields! ⚠️");
        return;
    }

    if (isLoginMode) {
        const storedPass = localStorage.getItem(`user_${user}`);
        if (storedPass === pass) {
            alert(`Welcome back, ${user}! 🎉`);
            localStorage.setItem('currentUser', user);
            document.getElementById('auth-btn').innerText = `Logout (${user}) 🚪`;
            document.getElementById('auth-modal').style.display = 'none';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        } else {
            alert("Invalid username or password! ❌");
        }
    } else {
        if (localStorage.getItem(`user_${user}`)) {
            alert("Username already exists! Pick another one. ⚠️");
        } else {
            localStorage.setItem(`user_${user}`, pass); 
            alert(`Account created for ${user}! You can now login. ✅`);
            toggleAuthMode(); 
            document.getElementById('password').value = '';
        }
    }
}

// --- SECURE CHECKOUT LOGIC 💳 ---
function placeOrder() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        alert("You must be logged in to place an order! Please Login/Register first. 🛑");
        openAuth();
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty! Add some ice cream first. 🛒");
    } else {
        alert(`🎉 Success ${currentUser}! Your order total is ₹${totalAmount}. We are preparing your ice cream! 🛵💨`);
        cart = [];
        totalAmount = 0;
        updateCart();
    }
}
