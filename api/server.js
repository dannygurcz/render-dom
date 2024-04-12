const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/render', async (req, res) => {
    const { url } = req.body;

    try {
        // Fetch HTML content from the provided URL
        const response = await axios.get(url);
        const htmlContent = response.data;

        // Parse HTML content
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;
        const htmlTemplate = document.documentElement.outerHTML;

        // Set directory path
        const directoryPath = path.join(__dirname, 'downloads');
        const htmlFilePath = path.join(directoryPath, 'rendered.html');

        // Write HTML content to file
        fs.mkdirSync(directoryPath, { recursive: true }); // Create directory if it doesn't exist
        fs.writeFile(htmlFilePath, htmlTemplate, (err) => {
            if (err) {
                console.error('Error writing HTML file:', err);
                res.status(500).send('Error writing HTML file');
            } else {
                console.log('HTML file rendered and saved successfully');
                res.status(200).sendFile(htmlFilePath, {}, (err) => {
                    if (err) {
                        console.error('Error sending HTML file:', err);
                        res.status(500).send('Error sending HTML file');
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error fetching HTML:', error);
        res.status(500).send('Error fetching HTML');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
