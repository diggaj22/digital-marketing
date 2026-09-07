// 1. Scroll Reveal Animation for a premium feel 🌟
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Triggers when 20% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing once it's visible so it doesn't repeat
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Grab all elements with the 'fade-in' class and observe them
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// 2. Interactive Button Click 🎁
document.getElementById('promoBtn').addEventListener('click', () => {
    alert("🎉 Awesome! Show this alert to the cashier for a FREE cherry and sprinkles on top of your order! 🍒✨");
});
