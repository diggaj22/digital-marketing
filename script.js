// --- 🌙 DARK MODE LOGIC ---
function initTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.innerText = "☀️ Light Mode";
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('theme-toggle');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        if (btn) btn.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem('theme', 'light');
        if (btn) btn.innerText = "🌙 Dark Mode";
    }
}

// Run this immediately when any page loads!
initTheme();
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
