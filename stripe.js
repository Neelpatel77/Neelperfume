

var stripe = Stripe('mykey');
var elements = stripe.elements();

var card = elements.create('card');
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
            // Send the token to your server
            // You can handle the token here, like sending it to your server for further processing.
            console.log(result.token);
            // Here, you can make an AJAX call to your server to process the payment and handle the order.
            // Example:
            // fetch('/process_payment', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({token: result.token}),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     // Handle response from server
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        }
    });
});
