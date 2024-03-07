// Define a variable to store the cart items
let cartItems = [];

// Function to add items to the cart
function addToCart(name, price) {
    // Check if the product is already in the cart
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        // If so, increment its quantity
        existingItem.quantity++;
    } else {
        // Otherwise, add it as a new item
        cartItems.push({ name: name, price: price, quantity: 1 });
    }
    renderCart();
}

// Function to remove items from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    renderCart();
}

// Function to increase quantity of items in the cart
function increaseQuantity(index) {
    cartItems[index].quantity++;
    renderCart();
}

// Function to decrease quantity of items in the cart
function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        renderCart();
    }
}

// Function to update the cart display
function renderCart() {
    const cartElement = document.getElementById('cart-list');
    cartElement.innerHTML = ''; // Clear previous content

    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => increaseQuantity(index));

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => decreaseQuantity(index));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(index));

        listItem.appendChild(increaseButton);
        listItem.appendChild(decreaseButton);
        listItem.appendChild(removeButton);

        cartElement.appendChild(listItem);
    });

    // Update total
    const total = document.getElementById('total');
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    total.textContent = 'Total: $' + totalPrice;
}

// Example usage:
document.addEventListener('DOMContentLoaded', function() {
    renderCart(); // Render the initial cart items on page load

    // Add event listener to the "Add to Cart" button
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.productName;
            const productPrice = parseInt(this.dataset.productPrice);
            addToCart(productName, productPrice);
        });
    });
});
