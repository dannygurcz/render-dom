// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();

app.get('/render-html', (req, res) => {
    // Simulated dynamic data
    const data = { name: 'John Doe' };
    
    // Render HTML template with dynamic data
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dynamic PDF</title>
        </head>
        <body>
            <h1>Hello, ${data.name}!</h1>
        </body>
        </html>
    `;
    
    res.send(html);
});

app.get('/generate-pdf', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Load the HTML page
    await page.goto(`file:${path.join(__dirname, 'public', 'index.html')}`);

    // Generate PDF
    const pdfBuffer = await page.pdf();

    await browser.close();

    // Set content type and send PDF as response
    res.contentType('application/pdf');
    res.send(pdfBuffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
