const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Define routes for each product
app.get('/product/1', (req, res) => {
    const filePath = path.join(__dirname, 'product1.html');
    console.log("File path:", filePath); // Add this line for debugging
    res.sendFile(filePath);
});

app.get('/product/2', (req, res) => {
    const filePath = path.join(__dirname, 'product2.html');
    console.log("File path:", filePath); // Add this line for debugging
    res.sendFile(filePath);
});

app.get('/product/3', (req, res) => {
    const filePath = path.join(__dirname, 'product3.html');
    console.log("File path:", filePath); // Add this line for debugging
    res.sendFile(filePath);
});

// Listen for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Listen for requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
