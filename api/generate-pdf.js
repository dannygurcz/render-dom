// generate-pdf.js

const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Render HTML using Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const htmlFilePath = path.join(__dirname, '..', 'public', 'index.html');
        await page.goto(`file://${htmlFilePath}`);
        const pdfBuffer = await page.pdf();
        await browser.close();

        // Set headers and send PDF as response
        res.contentType('application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
