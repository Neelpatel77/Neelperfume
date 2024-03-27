document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        { id: '1', name: 'Perfume Name1'},
        { id: '2', name: 'Tom Ford Ombre leather' },
        { id: '3', name: 'Dior'},
        { id: '4', name: 'Dior Ford'},
        { id: '5', name: 'Dior tatti'},
        { id: '6', name: 'dior sex' },
        { id: '7', name: 'Dior perfme'},
        { id: '8', name: 'Dior Madarchod'}
    ];

    // Function to hide search results container
    function hideSearchResults() {
        const searchResults = document.getElementById('searchResults');
        searchResults.style.display = 'none';
    }

    // Hide search results container initially
    hideSearchResults();

    // Create a new Fuse instance with your product data and desired options
    const fuse = new Fuse(products, {
        keys: ['name'], // Specify the property to search on
        includeScore: true,
        threshold: 0.3 // Adjust threshold for fuzzy search accuracy
    });

    // Attach event listener to the search input field
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(event) {
        // Retrieve search query from the input field
        const searchQuery = event.target.value.trim().toLowerCase();

        // Perform fuzzy search on the products
        let searchResults;
        if (searchQuery.length === 1) {
            // Limit the number of results for the first character
            searchResults = fuse.search(searchQuery).slice(0, 3); // Limit to 3 results for the first character
        } else if (searchQuery.length >= 2) {
            // Limit the number of results to 4 after the second character
            searchResults = fuse.search(searchQuery).slice(0, 4); // Limit to 4 results after the second character
        }

        // Display the filtered products or clear search results if the search query is empty
        if (searchQuery === '') {
            clearSearchResults();
            hideSearchResults(); // Hide search results when search query is empty
        } else {
            displayProducts(searchResults.map(result => result.item));
            showSearchResults(); // Show search results when there is a search query
        }
    });

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


    document.body.addEventListener('click', function(event) {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults.contains(event.target) && event.target.id !== 'searchInput') {
            hideSearchResults();
        }
    });
    
});
