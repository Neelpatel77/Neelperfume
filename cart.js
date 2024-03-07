// Define a variable to store the cart items
let cartItems = [];

// Load cart state from localStorage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);
        renderCart();
    }
});

// Function to save cart state to localStorage
function saveCartState() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
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

    renderCart();
    saveCartState(); // Save cart state after updating
}

// Function to remove items from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    renderCart();
    saveCartState(); // Save cart state after updating
}

// Function to increase quantity of items in the cart
function increaseQuantity(index) {
    cartItems[index].quantity++;
    renderCart();
    saveCartState(); // Save cart state after updating
}

// Function to decrease quantity of items in the cart
function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        renderCart();
        saveCartState(); // Save cart state after updating
    }
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
    totalElement.textContent = `Total: $${totalPrice}`;
}

// Function to extract URL parameters
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');
    const price = parseInt(params.get('price'));
    if (product && price) {
        addToCart(product, price);
    }
}

function placeOrder() {
    window.location.href = 'checkout.html';
}
// Call getURLParams() function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    getURLParams();
});
