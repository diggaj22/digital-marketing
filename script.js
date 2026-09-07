let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    document.getElementById('cart-count').innerText = cart.length;
    updateCartUI();
    
    // Tiny subtle alert so it doesn't interrupt the premium vibe
    console.log(`✅ ${name} added to cart!`); 
}

function updateCartUI() {
    const list = document.getElementById('cart-items');
    list.innerHTML = '';
    
    if (cart.length === 0) {
        list.innerHTML = '<li><span style="color:#888;">Cart is empty 🥺</span></li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.name} 🍨</span> <span style="color:#d4af37;">₹${item.price}</span>`;
            list.appendChild(li);
        });
    }
    document.getElementById('total-price').innerText = `Total: ₹${total}`;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Select a flavor first. 🥄");
        return;
    }
    alert(`🎉 Order Confirmed! Total paid: ₹${total}. See you at the parlor! 🛵`);
    cart = [];
    total = 0;
    document.getElementById('cart-count').innerText = "0";
    toggleCart(); // Close modal
}
