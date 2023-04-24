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
      switch (colorMode.toLowerCase()) {
        case 'grayscale':
          image.greyscale();
          break;
        case 'sepia':
          image.sepia();
          break;
        case 'invert':
          image.invert();
          break;
        case 'normalize':
          image.normalize();
          break;
        case 'posterize':
          image.posterize(5); // Levels can be adjusted as needed
          break;
        case 'contrast':
          image.contrast(0.5); // Value can be adjusted as needed
          break;
        case 'brightness':
          image.brightness(0.5); // Value can be adjusted as needed
          break;
        case 'color':
          image.color([{ apply: 'mix', params: ['#ff0000', 0.5] }]); // Color and amount can be adjusted as needed
          break;
        case 'hue':
          image.color([{ apply: 'hue', params: [180] }]); // Degrees can be adjusted as needed
          break;
        case 'saturate':
          image.color([{ apply: 'saturate', params: [0.5] }]); // Value can be adjusted as needed
          break;
        case 'desaturate':
          image.color([{ apply: 'desaturate', params: [0.5] }]); // Value can be adjusted as needed
          break;
        case 'fade':
          image.fade(0.5); // Fade percentage can be adjusted as needed
          break;
        case 'opacity':
          image.opacity(0.5); // Value can be adjusted as needed
          break;
        default:
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
  