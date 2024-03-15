var stripe = Stripe('sk_test_51OrWHjKFZxX1eOCT9RuXUOxUpdOTgaSrPREjtyVfU8HGt5xwRWhnCajmyDem4F3s2H9fizGWxk8hUpbw3tMlFJLT009uz0Lgzh');
var elements = stripe.elements();

var card = elements.create('card', {
    // Add additional styles for the card element
    style: {
        base: {
            fontSize: '16px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            color: '#32325d',
        },
    },
    // Specify additional parameters for the card element
    hidePostalCode: true, // Hide the postal code field
    classes: {
        base: 'stripe-input',
        complete: 'stripe-input--complete',
        empty: 'stripe-input--empty',
        focus: 'stripe-input--focus',
        invalid: 'stripe-input--invalid',
    }
});
card.mount('#card-element');

card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    stripe.createToken(card).then(function(result) {
        if (result.error) {
            var errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            // Send the token to your server along with order data from the checkout page
            var orderData = {
                token: result.token,
                // Include additional order data as needed
            };

            // Example of sending the order data to the server using fetch
            fetch('/process_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })
            .then(response => response.json())
            .then(data => {
                // Handle response from server
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});
