// --- 👤 USER ACCOUNT SYSTEM ---
let isLoginMode = true;

// Check login status whenever a page loads
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    const authBtn = document.getElementById('auth-btn');
    if (currentUser && authBtn) {
        authBtn.innerText = `Profile (${currentUser}) 👤`;
    }
});

function openAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // If logged in, redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        document.getElementById('auth-modal').style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? 'Login 👤' : 'Register 📝';
    document.querySelector('.toggle-link').innerText = isLoginMode ? 'Need an account? Register' : 'Already have an account? Login';
}

function handleAuth() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (!user || !pass) { alert("Please fill in both fields! ⚠️"); return; }

    if (isLoginMode) {
        if (localStorage.getItem(`user_${user}`) === pass) {
            alert(`Welcome back, ${user}! 🎉`);
            localStorage.setItem('currentUser', user);
            closeModal();
            window.location.reload(); // Refresh to update navbar
        } else {
            alert("Invalid username or password! ❌");
        }
    } else {
        if (localStorage.getItem(`user_${user}`)) {
            alert("Username already exists! ⚠️");
        } else {
            localStorage.setItem(`user_${user}`, pass);
            localStorage.setItem(`history_${user}`, JSON.stringify([])); // Setup empty history
            alert(`Account created for ${user}! You can now login. ✅`);
            toggleAuthMode(); 
        }
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    alert("Logged out successfully! 👋");
    window.location.href = "index.html"; // Send back to home
}
