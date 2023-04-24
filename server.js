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
    const response = await axios.get('https://example.com/image.jpg', {
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
