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

        // Calculate total amount based on products
        const amount = calculateTotalAmount(products);

        // Create a charge using the Stripe API
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            source: token.id,
            description: 'Payment for order'
        });

        // Proceed with Firebase data submission only if payment is successful
        saveOrderToFirebase(req.body)
            .then(() => {
                // Send a JSON response indicating successful payment
                res.json({ success: true, message: 'Payment successful', charge });
            })
            .catch(error => {
                console.error('Error saving order to Firebase:', error);
                res.status(500).json({ error: 'An error occurred while saving order to Firebase' });
            });
    } catch (error) {
        // Handle errors during payment processing
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'An error occurred while processing payment' });
    }
});

// Function to calculate total amount based on products
function calculateTotalAmount(products) {
    return products.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Function to save order details to Firebase
function saveOrderToFirebase(orderData) {
    return new Promise((resolve, reject) => {
        // You need to implement Firebase database saving logic here
        // Example:
        // firebase.firestore().collection('orders').add(orderData)
        //     .then(docRef => resolve(docRef))
        //     .catch(error => reject(error));
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
