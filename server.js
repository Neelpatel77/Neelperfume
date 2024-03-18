const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('neelperfume'));

// Serve index.html for all routes
app.get('*', (req, res) => {
    try {
    } catch (error) {
        console.error('Error serving index.html:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for processing payments
app.post('/process_payment', async (req, res) => {
    try {
        const { token, amount } = req.body;
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            source: token.id,
            description: 'Payment for order'
        });
        res.json({ success: true, charge });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing payment' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
