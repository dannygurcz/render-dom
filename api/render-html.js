// render-html.js

const express = require('express');
const path = require('path');
const ejs = require('ejs'); // Assuming you're using EJS as the templating engine

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Simulated dynamic data
        const data = { name: 'John Doe' };

        // Render HTML using EJS
        const htmlFilePath = path.join(__dirname, '..', 'public', 'index.ejs');
        const renderedHtml = await ejs.renderFile(htmlFilePath, data);

        // Send rendered HTML as response
        res.send(renderedHtml);
    } catch (error) {
        console.error('Error rendering HTML:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
