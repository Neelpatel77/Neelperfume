require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware setup
app.use(bodyParser.json());

// Serve static files from the 'neelperfume' directory
// Add this line before serving static files to set the correct MIME type for JavaScript files
app.use(express.static(__dirname));

app.use(express.static('neelperfume', {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'text/javascript');
        }
    }
}));
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve static files from the 'style' directory
app.use('/style', express.static(path.join(__dirname, 'style'), { 'extensions': ['css'] }));

// Set up views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sample product data
const productData = [
    { id: '1', name: 'Product 1', price: 10 },
    { id: '2', name: 'Product 2', price: 20 },
    { id: '3', name: 'Product 3', price: 30 }
];

// Initialize an empty cart
let cartItems = [];

// Serve index.html for root route and /product route
app.get(['/', '/product'], (req, res) => {
    try {
        console.log('Serving index.html for route:', req.url);
        res.sendFile(path.resolve(__dirname, 'index.html'));
    } catch (error) {
        console.error('Error serving index.html:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve login.html
app.get('/login.html', (req, res) => {
    try {
        console.log('Serving login.html');
        res.sendFile(path.resolve(__dirname, 'login.html'));
    } catch (error) {
        console.error('Error serving login.html:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve order.html
app.get('/order.html', (req, res) => {
    try {
        console.log('Serving order.html');
        res.sendFile(path.resolve(__dirname, 'order.html'));
    } catch (error) {
        console.error('Error serving order.html:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve cart.html
app.get('/cart.html', (req, res) => {
    try {
        console.log('Serving cart.html');
        res.sendFile(path.resolve(__dirname, 'cart.html'));
    } catch (error) {
        console.error('Error serving cart.html:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve shopping.html
app.get('/shopping.html', (req, res) => {
    try {
        console.log('Serving shopping.html');
        res.sendFile(path.resolve(__dirname, 'shopping.html'));
    } catch (error) {
        console.error('Error serving shopping.html:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle product routes
app.get('/product/:id', (req, res) => {
    try {
        // Logic to fetch product details based on the ID
        const productId = req.params.id;
        console.log('Requested product ID:', productId);

        // Find the product with the matching ID
        const product = productData.find(product => product.id === productId);

        // Check if the product is found
        if (product) {
            // If the product is found, render the product.ejs view with the product data
            res.render('product', { product });
        } else {
            // If the product is not found, send a 404 Not Found response
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for adding items to the cart
app.post('/add_to_cart', (req, res) => {
    try {
        const { id, name, price } = req.body;
        // Check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex(item => item.id === id);
        if (existingItemIndex !== -1) {
            // If the item already exists in the cart, update its quantity
            cartItems[existingItemIndex].quantity++;
        } else {
            // If the item is not in the cart, add it as a new item
            cartItems.push({ id, name, price, quantity: 1 });
        }
        res.json({ success: true, message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding item to cart' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
