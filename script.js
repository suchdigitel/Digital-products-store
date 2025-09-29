// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Website Template",
        description: "Fully responsive HTML/CSS/JS template with modern design",
        price: 29.99,
        category: "Templates",
        icon: "💻"
    },
    {
        id: 2,
        name: "Social Media Pack",
        description: "100+ social media templates for Instagram, Facebook, and Twitter",
        price: 19.99,
        category: "Graphics",
        icon: "📱"
    },
    {
        id: 3,
        name: "Video Editing Presets",
        description: "Professional LUTs and presets for video editing software",
        price: 39.99,
        category: "Presets",
        icon: "🎬"
    },
    {
        id: 4,
        name: "eBook: Web Development Guide",
        description: "Comprehensive guide to modern web development (PDF)",
        price: 14.99,
        category: "eBooks",
        icon: "📚"
    },
    {
        id: 5,
        name: "UI/UX Design Kit",
        description: "Complete design system with components and style guide",
        price: 49.99,
        category: "Design",
        icon: "🎨"
    },
    {
        id: 6,
        name: "Music Production Samples",
        description: "500+ high-quality music samples and loops",
        price: 24.99,
        category: "Audio",
        icon: "🎵"
    }
];

// UPI ID for payments
const UPI_ID = "digitalhub@paytm";

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupSmoothScrolling();
});

// Load products into the grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            ${product.icon}
        </div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">$${product.price}</div>
        <button class="buy-button" onclick="openPaymentModal(${product.id})">
            Buy Now
        </button>
    `;
    
    return card;
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to products section
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Open payment modal
function openPaymentModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('paymentModal');
    const paymentDetails = document.getElementById('paymentDetails');
    
    paymentDetails.innerHTML = `
        <div class="payment-info">
            <h4>You're purchasing: ${product.name}</h4>
            <p class="product-price">Amount: $${product.price}</p>
            
            <div class="payment-instructions">
                <p>Please send the payment to our UPI ID:</p>
                <div class="upi-id">${UPI_ID}</div>
                
                <ol class="payment-steps">
                    <li>Open your UPI payment app (Google Pay, PhonePe, Paytm, etc.)</li>
                    <li>Enter the UPI ID shown above</li>
                    <li>Send the exact amount: $${product.price}</li>
                    <li>Take a screenshot of the payment confirmation</li>
                    <li>Email the screenshot to: support@digitalhub.com</li>
                </ol>
                
                <button onclick="confirmPayment(${product.id})" class="buy-button">
                    I've Made the Payment
                </button>
                
                <div id="successMessage" class="success-message">
                    Thank you for your payment! We've received your order and will email your digital product within 24 hours.
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
}

// Confirm payment
function confirmPayment(productId) {
    const product = products.find(p => p.id === productId);
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // Simulate sending confirmation email
        setTimeout(() => {
            alert(`Thank you for purchasing ${product.name}! Your order is being processed.`);
            closeModal();
        }, 2000);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Add to cart functionality (for future enhancement)
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    // Could be implemented for cart icon
}

function showNotification(message) {
    // Simple notification system
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 3000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

