require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('neelperfume'));

// Serve order.html for all routes
app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'order.html'));
    } catch (error) {
        console.error('Error serving order.html:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for processing payments
app.post('/process_payment', async (req, res) => {
    try {
        // Extract token and products from the request body
        const { token, products } = req.body;

        // Calculate total amount based on the products
        const totalAmount = calculateTotalAmount(products);

        // Create a charge using the Stripe API with the calculated total amount
        const charge = await stripe.charges.create({
            amount: totalAmount * 100, // Convert amount to cents
            currency: 'usd',
            source: token.id,
            description: 'Payment for order'
        });

        // Proceed with Firebase data submission only if payment is successful
        await saveOrderToFirebase(req.body);

        // Send a JSON response indicating successful payment
        res.json({ success: true, message: 'Payment successful', charge });
    } catch (error) {
        // Handle errors during payment processing
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'An error occurred while processing payment' });
    }
});

// Function to calculate total amount based on products
function calculateTotalAmount(products) {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
}

// Function to save order details to Firebase
async function saveOrderToFirebase(orderData) {
    // You need to implement Firebase database saving logic here
    // Example:
    // try {
    //     await firebase.firestore().collection('orders').add(orderData);
    // } catch (error) {
    //     throw error;
    // }
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
