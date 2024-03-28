document.addEventListener('DOMContentLoaded', function() {

    let cartItems = [];
    let totalAmount = 0; // Add a global variable to store the total amount
    let productDetails = []; // Add a global variable to store product details
    
    // Rest of your code remains the same...
    
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
    // Function to add items to the cart
    function addToCart(name, price) {
        // Check if the product is already in the cart
        let existingItem = cartItems.find(item => item.name === name);
    
        if (existingItem) {
            // If the product is already in the cart, increase its quantity
            existingItem.quantity++;
        } else {
            // If the product is not in the cart, add it as a new item
            cartItems.push({ name: name, price: price, quantity: 1 });
        }
    
        // Update total amount
        updateTotalAmount();
    
        // Save cart state after updating
        saveCartState();
    
        // Render the updated cart
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
    
            const removeButton = document.createElement('button'); // Create remove button
            removeButton.textContent = 'Remove'; // Set remove button text
            removeButton.addEventListener('click', () => removeFromCart(cartItems.indexOf(item))); // Add click event listener for removal
    
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
    
        // Print current cart data to console
        console.log("Current Cart Data:", cartItems);
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
    
    // Call getURLParams() function when the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        getURLParams();
    });
    
    //popup
    });