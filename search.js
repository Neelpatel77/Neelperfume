document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        { id: '1', name: 'Perfume Name1'},
        { id: '2', name: 'Tom Ford Ombre leather' },
        { id: '3', name: 'Dior'},
        { id: '4', name: 'Tom Ford'}
    ];

    // Function to hide search results container
    function hideSearchResults() {
        const searchResults = document.getElementById('searchResults');
        searchResults.style.display = 'none';
    }

    // Hide search results container initially
    hideSearchResults();

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
            hideSearchResults(); // Hide search results when search query is empty
        } else {
            displayProducts(filteredProducts);
            showSearchResults(); // Show search results when there is a search query
        }
    });

    // Function to filter products based on search query
    function filterProducts(query) {
        return products.filter(product =>
            product.name.toLowerCase().includes(query)
        );
    }

    // Function to display filtered products
   // Function to display filtered products
function displayProducts(products) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous search results

    if (products.length === 0) {
        searchResults.innerHTML = 'Product not found.';
    } else {
        // Display each product with styling
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.innerHTML = `
                <div class="product-item">
                    <a href="/product/${product.id}">
                        <h3>${product.name}</h3>
                    </a>
                </div>
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

    // Function to show search results container
    function showSearchResults() {
        const searchResults = document.getElementById('searchResults');
        searchResults.style.display = 'block';
    }
});
