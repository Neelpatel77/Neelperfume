// Define a variable to store the cart items
let cartItems = [];
let totalAmount = 0; // Add a global variable to store the total amount
let productDetails = []; // Add a global variable to store product details

// Load cart state from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);
        renderCart();
    }
});

// Load product details from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const savedProductDetails = localStorage.getItem('productDetails');
    if (savedProductDetails) {
        productDetails = JSON.parse(savedProductDetails);
    }
});

// Function to save cart state to localStorage
function saveCartState() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to save product details to localStorage
function saveProductDetails() {
    localStorage.setItem('productDetails', JSON.stringify(productDetails));
}

// Function to add items to the cart
function addToCart(name, price) {
    let existingItemIndex = cartItems.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        cartItems[existingItemIndex].quantity++;
    } else {
        // If the product is not in the cart, add it as a new item
        cartItems.push({ name: name, price: price, quantity: 1 });
    }

    // Update total amount
    updateTotalAmount();

    // Save cart state after updating
    saveCartState();

    renderCart();
}

// Function to remove items from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1);

    // Update total amount
    updateTotalAmount();

    // Save cart state after updating
    saveCartState();

    renderCart();
}

// Function to increase quantity of items in the cart
function increaseQuantity(index) {
    cartItems[index].quantity++;

    // Update total amount
    updateTotalAmount();

    // Save cart state after updating
    saveCartState();

    renderCart();
}

// Function to decrease quantity of items in the cart
function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;

        // Update total amount
        updateTotalAmount();

        // Save cart state after updating
        saveCartState();

        renderCart();
    }
}

// Function to calculate total amount
function updateTotalAmount() {
    totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to render the cart
function renderCart() {
    const cartList = document.getElementById('cart-list');
    const totalElement = document.getElementById('total');
    let totalPrice = 0;

    // Clear previous content
    cartList.innerHTML = '';

    // Iterate over cart items
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

        const itemTotalPrice = item.price * item.quantity;
        listItem.textContent += ` = $${itemTotalPrice}`;

        // Add buttons to increase and decrease quantity
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => increaseQuantity(cartItems.indexOf(item)));

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => decreaseQuantity(cartItems.indexOf(item)));

        listItem.appendChild(increaseButton);
        listItem.appendChild(decreaseButton);

        // Add the list item to the cart
        cartList.appendChild(listItem);

        // Calculate total price
        totalPrice += itemTotalPrice;
    });

    // Update total price
    totalAmount = totalPrice; // Update the totalAmount variable
    totalElement.textContent = `Total: $${totalPrice}`;
}

// Function to extract URL parameters
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    const price = parseInt(params.get('price'));
    if (product && price) {
        addToCart(product, price);
        // Save product details
        productDetails.push({ name: product, price: price });
        saveProductDetails();
    }
}

function placeOrder() {
    // Set the total amount in localStorage for retrieval on the checkout page
    localStorage.setItem('totalAmount', totalAmount);

    // Set product details in localStorage for retrieval on the checkout page
    localStorage.setItem('productDetails', JSON.stringify(productDetails));

    window.location.href = 'order.html';
}

// Call getURLParams() function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    getURLParams();
});
