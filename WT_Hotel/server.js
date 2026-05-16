const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/hotel.html'));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});