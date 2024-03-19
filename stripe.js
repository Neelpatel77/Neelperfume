var stripe = Stripe('pk_test_51OrWHjKFZxX1eOCTRBB3SZ5RwgDW3rRXydB51jOOousHRKFSEYvK26qLFW5x8SFafIMfgsBntpgCOHBll44Fg7iv003L386Poo');
var elements = stripe.elements();

var card = elements.create('card', {
    style: {
        base: {
            fontSize: '16px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            color: '#32325d',
        },
    },
    hidePostalCode: true,
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
            // Retrieve total amount from localStorage and parse it as a number
            const totalAmount = parseFloat(localStorage.getItem('totalAmount'));

            var orderData = {
                token: result.token,
                totalAmount: totalAmount // Include total amount in the order data
            };

            fetch('/process_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    // Payment successful, display a success message
                    showMessage(data.message);
                } else {
                    // Payment failed, display an error message
                    showMessage(data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('An unexpected error occurred');
            });
        }
    });
});


// Function to display a message to the user
function showMessage(messageText) {
    var messageContainer = document.getElementById('payment-message');
    messageContainer.classList.remove('hidden');
    messageContainer.textContent = messageText;

    setTimeout(function () {
        messageContainer.classList.add('hidden');
        messageContainer.textContent = '';
    }, 4000);
}
