require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware setup
app.use(bodyParser.json());

// Serve static files from the 'neelperfume' directory
// Add this line before serving static files to set the correct MIME type for JavaScript files
app.use(express.static(__dirname));
app.use('/img/product-img', express.static(path.join(__dirname, 'neelperfume', 'img', 'product-img')));

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
 
        { id: '1', name: 'Blue de chennel', price: '240'},
        { id: '2', name: 'Tom Ford Ombre leather', price: '240' },
        { id: '3', name: 'Dior', price: '240'},
        { id: '4', name: 'Dior Ford', price: '240'},
        { id: '5', name: 'Dior tatti', price: '240'},
        { id: '6', name: 'dior sex', price: '240' },
        { id: '7', name: 'Dior perfme', price: '240'},
        { id: '8', name: 'Dior Madarchod', price: '240'}
    
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
            // Construct the image path based on the product ID
            const imagePath = `/img/product-img/${productId}.webp`;

            // If the product is found, render the product.ejs view with the product data
            res.render('product', { product, imagePath });
        } else {
            // If the product is not found, send a 404 Not Found response
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Route for creating a Checkout Session
app.post('/create_checkout_session', async (req, res) => {
    try {
        // Retrieve cart items from the request body
        const { products } = req.body;

        // Calculate total amount based on the products
        const totalAmount = products.reduce((total, product) => total + product.price * product.quantity, 0);

        // Create a checkout session using the Stripe API
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: products.map(product => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price * 100, // Amount in cents
                },
                quantity: product.quantity,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success.html',
            cancel_url: 'http://localhost:3000/cancel.html',
        });

        // Send the session ID to the client
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'An error occurred while creating checkout session' });
    }
});


// Route for processing payments
app.post('/process_payment', async (req, res) => {
    try {
        console.log('Received payment request:', req.body); // Log the entire request body
        // Extract token and total amount from the request body
        const { token, totalAmount } = req.body;

        // Print totalAmount to the console
        console.log('Total Amount:', totalAmount);

        // Create a charge using the Stripe API with the token and total amount
        const charge = await stripe.charges.create({
            amount: totalAmount * 100, // Convert amount to cents
            currency: 'usd',
            source: token.id,
            description: 'Payment for order'
        });

        // Send a JSON response indicating successful payment
        res.json({ success: true, message: 'Payment successful', charge });
    } catch (error) {
        // Handle errors during payment processing
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'An error occurred while processing payment' });
    }
});

// Route for handling search queries
app.get('/search', (req, res) => {
    try {
        const searchTerm = req.query.term.toLowerCase(); // Get the search term from the query parameters
        const searchResults = productData.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        res.json(searchResults); // Return the search results as JSON
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'An error occurred while searching products' });
    }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
