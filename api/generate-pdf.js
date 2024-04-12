const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.get('/', async (req, res) => {
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

module.exports = router;
