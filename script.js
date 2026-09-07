// Array to hold cart items
let cart = [];
let totalAmount = 0;

function addToCart(itemName, price) {
    // Add item to array
    cart.push({ name: itemName, price: price });
    totalAmount += price;
    
    updateCartUI();
    
    // Quick alert to show the button works
    alert(`🎉 ${itemName} added to your cart! 🍦`);
}

function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    
    // Clear current list
    cartList.innerHTML = '';
    
    // Populate list from cart array
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name}</span> <span>₹${item.price}</span>`;
        cartList.appendChild(li);
    });
    
    // Update total text
    totalDisplay.innerText = `Total: ₹${totalAmount}`;
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some ice cream first. 🥺");
    } else {
        alert(`✅ Order placed successfully! Your total is ₹${totalAmount}. See you soon! 🛵💨`);
        // Reset cart after ordering
        cart = [];
        totalAmount = 0;
        document.getElementById('cart-items').innerHTML = '<li id="empty-msg">Your cart is empty. Add some ice cream! 🥺</li>';
        document.getElementById('total-price').innerText = 'Total: ₹0';
    }
}
