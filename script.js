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
    
    cartList.innerHTML = ''; // Clear current list
    
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

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some ice cream first. 🛒");
    } else {
        alert(`🎉 Success! Your order total is ₹${totalAmount}. We are preparing your ice cream! 🛵💨`);
        // Reset cart
        cart = [];
        totalAmount = 0;
        updateCart();
    }
}
