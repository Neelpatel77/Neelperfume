const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'neelperfume' directory
app.use(express.static(path.join(__dirname, 'neelperfume')));

// Set up views directory and view engine
app.set('views', path.join(__dirname, 'neelperfume', 'views'));
app.set('view engine', 'ejs');

// Sample product data
const productData = [
    { id: '1', name: 'Product 1', price: 10 },
    { id: '2', name: 'Product 2', price: 20 },
    { id: '3', name: 'Product 3', price: 30 }
];

// Serve index.html for root route and /product route
app.get(['/', '/product'], (req, res) => {
    try {
        console.log('Serving index.html for route:', req.url);
        res.sendFile(path.resolve(__dirname, 'neelperfume', 'index.html'));
    } catch (error) {
        console.error('Error serving index.html:', error);
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
            // If the product is found, send back the product details as JSON
            res.json(product);
        } else {
            // If the product is not found, send a 404 Not Found response
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
