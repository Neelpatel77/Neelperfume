//this is for client side logic to see the pages in the dynamic product view litst 

        document.addEventListener('DOMContentLoaded', function() {
            // Function to fetch product data from the server
            function fetchProductData(productId) {
                fetch(`/product/${productId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text(); // Use response.text() instead of response.json()
                    })
                    .then(data => {
                        // Handle the product data received from the server
                        console.log(data);
                        document.getElementById('productDetails').innerHTML = data; // Update HTML directly
                    })
                    .catch(error => {
                        console.error('Error fetching product data:', error);
                    });
            }
    
            // Function to display product details
            function showProductDetails(productId) {
                fetchProductData(productId); // Call fetchProductData to fetch and display product details
            }
    
            // Add event listeners for product links
            document.getElementById('product1').addEventListener('click', function() {
                showProductDetails('1');
            });
    
            // Add event listeners for other product links/buttons
        });
 