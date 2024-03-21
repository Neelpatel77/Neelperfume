// Sample product data
const products = [
    { id: '1', name: 'Perfume Name1', price: 4 },
    { id: '2', name: 'Perfume Name2', price: 7 },
    { id: '3', name: 'Dior', price: 6 }
    // Add more products as needed
];

// Function to populate product details
function populateProductDetails(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `Price: $${product.price}`;
        // Add more details if needed
    } else {
        console.error('Product not found');
    }
}

// Get product ID from URL or other source
const productId = '1'; // Replace with actual product ID

// Populate product details
populateProductDetails(productId);
