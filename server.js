const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for rendering HTML
app.get('/render-html', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).send('URL parameter is required.');
        }
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const htmlContent = await page.content();
        await browser.close();
        res.send(htmlContent);
    } catch (error) {
        console.error('Error rendering HTML:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for generating PDF
app.get('/generate-pdf', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).send('URL parameter is required.');
        }
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const pdfBuffer = await page.pdf();
        await browser.close();
        res.contentType('application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
