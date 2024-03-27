document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        { id: '1', name: 'Perfume Name1', price: 4 },
        { id: '2', name: 'Perfume Name2', price: 7 },
        { id: '3', name: 'Dior', price: 6 },
        { id: '4', name: 'Tom Ford', price: 4 }
    ];

    // Attach event listener to the search input field
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(event) {
        // Retrieve search query from the input field
        const searchQuery = event.target.value.trim().toLowerCase();

        // Filter products based on the search query
        const filteredProducts = filterProducts(searchQuery);

        // Display the filtered products or clear search results if the search query is empty
        if (searchQuery === '') {
            clearSearchResults();
        } else {
            displayProducts(filteredProducts);
        }
    });

    // Function to filter products based on search query
    function filterProducts(query) {
        return products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
    }

    // Function to display filtered products
    function displayProducts(products) {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = ''; // Clear previous search results

        if (products.length === 0) {
            searchResults.textContent = 'No products found.';
        } else {
            // Display each product
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.innerHTML = `
                    <a href="/product/${product.id}">
                        <h3>${product.name}</h3>
                        <p>$${product.price}</p>
                    </a>
                `;
                searchResults.appendChild(productItem);
            });
        }
    }

    // Function to clear search results
    function clearSearchResults() {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = ''; // Clear search results
    }
});
