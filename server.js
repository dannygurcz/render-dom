// server.js

const express = require('express');
const path = require('path');
const renderHtmlRouter = require('./api/render-html');
const generatePdfRouter = require('./api/generate-pdf');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for rendering HTML
app.use('/render-html', renderHtmlRouter);

// Route for generating PDF
app.use('/generate-pdf', generatePdfRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
