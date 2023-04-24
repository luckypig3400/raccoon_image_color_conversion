const express = require('express');
const axios = require('axios');
const Jimp = require('jimp');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to retrieve image and change its color mode
app.get('/image', async (req, res) => {
  try {
    // Retrieve image from API URL
    const response = await axios.get('http://tws-raccoon.luckypig.net:8081/api/dicom/wado/?requestType=WADO&studyUID=1.3.6.1.4.1.5962.99.1.2786334768.1849416866.1385765836848.3.0&seriesUID=1.3.6.1.4.1.5962.99.1.2786334768.1849416866.1385765836848.669.0&objectUID=1.3.6.1.4.1.5962.99.1.2786334768.1849416866.1385765836848.668.0&contentType=image/jpeg', {
      responseType: 'arraybuffer'
    });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Load image using Jimp
    const image = await Jimp.read(imageBuffer);

    // Check if color mode option is specified in query parameters
    const colorMode = req.query.colorMode;
    if (colorMode) {
      // Change image color mode if option is specified
      switch (colorMode.toLowerCase()) {
        case 'grayscale':
          image.grayscale();
          break;
        case 'sepia':
          image.sepia();
          break;
        default:
          // Invalid color mode option
          return res.status(400).send('Invalid color mode option');
      }
    }

    // Convert image to JPEG and send response
    const imageBufferJpg = await image.getBufferAsync(Jimp.MIME_JPEG);
    res.set('Content-Type', 'image/jpeg');
    res.send(imageBufferJpg);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving the image');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
