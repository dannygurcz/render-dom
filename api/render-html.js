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
        const htmlContent = await page.content();
        await browser.close();
        res.send(htmlContent);
    } catch (error) {
        console.error('Error rendering HTML:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
