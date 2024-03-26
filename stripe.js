// Define an array to store the cart items (acting as a simple database)
let cartItems = [];
let totalAmount = 0; // Add a global variable to store the total amount

// Function to add items to the cart
function addToCart(name, price) {
    let existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        // If the product already exists in the cart, update its quantity
        existingItem.quantity++;
    } else {
        // If the product is not in the cart, add it as a new item
        cartItems.push({ name: name, price: price, quantity: 1 });
    }

    // Update total amount
    updateTotalAmount();

    renderCart();
}

// Function to remove items from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1);

    // Update total amount
    updateTotalAmount();

    renderCart();
}

// Function to increase quantity of items in the cart
function increaseQuantity(index) {
    cartItems[index].quantity++;

    // Update total amount
    updateTotalAmount();

    renderCart();
}

// Function to decrease quantity of items in the cart
function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;

        // Update total amount
        updateTotalAmount();

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
    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;

        const itemTotalPrice = item.price * item.quantity;
        listItem.textContent += ` = $${itemTotalPrice}`;

        // Add buttons to increase and decrease quantity
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => increaseQuantity(index));

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => decreaseQuantity(index));

        const removeButton = document.createElement('button'); // Create remove button
        removeButton.textContent = 'Remove'; // Set remove button text
        removeButton.addEventListener('click', () => removeFromCart(index)); // Add click event listener for removal

        listItem.appendChild(increaseButton);
        listItem.appendChild(decreaseButton);
        listItem.appendChild(removeButton); // Append remove button to list item

        // Add the list item to the cart
        cartList.appendChild(listItem);

        // Calculate total price
        totalPrice += itemTotalPrice;
    });

    // Update total price
    totalAmount = totalPrice; // Update the totalAmount variable
    totalElement.textContent = `Total: $${totalPrice}`;
}
