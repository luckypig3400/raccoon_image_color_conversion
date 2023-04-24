# raccoon_image_color_conversion
 Raccoon image color conversion

## Test URL
+ http://localhost.luckypig.net:3000/image?colorMode=normalize

## ChatGPT Prompt History
> 1 / 1
> 
> hi cloud you write me a nodejs server code which can get the jpeg image from a api(URL), and has options to change the image color mode

1 / 1

Certainly! Here is an example Node.js server code that retrieves a JPEG image from a specified API URL, and provides options to change the color mode of the image:

javascript

```javascript
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
```

This code uses the `axios` library to retrieve the image from the specified API URL as a binary buffer, and the `jimp` library to load the image, change its color mode if the option is specified, and convert it to a JPEG format buffer for sending the response. The server listens on port 3000 by default. You can change the API URL and color mode options to fit your requirements.

> 1 / 1
> 
> in this code section please give me all the available color modes,thanks const image = await Jimp.read(imageBuffer); // Check if color mode option is specified in query parameters const colorMode = req.query.colorMode; if (colorMode) { // Change image color mode if option is specified switch (colorMode.toLowerCase()) { case 'grayscale': image.grayscale(); break; case 'sepia': image.sepia(); break; case 'invert': image.invert(); break; default: // Invalid color mode option return res.status(400).send('Invalid color mode option'); } }

1 / 1

In the provided code, there are three available color modes that can be used to modify the image:

1.  Grayscale - This mode converts the image to black and white, with shades of gray in between.
    
2.  Sepia - This mode gives the image an antique brownish tone, similar to old photographs.
    
3.  Invert - This mode inverts the colors of the image, creating a negative version.
    

You can add or remove color mode options as per your requirements. Additionally, the `jimp` library also provides other image manipulation methods, such as brightness, contrast, hue, and saturation, that can be used to further modify the image. You can find more information about these methods in the `jimp` documentation.

> 1 / 1
> 
> please give me nodejs jimp all available color modes, and write them in switch code

1 / 1

Sure, here are the available color modes in Jimp, and their corresponding method names:

*   Greyscale - `image.greyscale()`
*   Sepia - `image.sepia()`
*   Invert - `image.invert()`
*   Normalize - `image.normalize()`
*   Posterize - `image.posterize(levels)`
*   Contrast - `image.contrast(value)`
*   Brightness - `image.brightness(value)`
*   Color - `image.color([{apply: 'mix', params: [hexColor, amount]}])`
*   Hue - `image.color([{apply: 'hue', params: [degrees]}])`
*   Saturate - `image.color([{apply: 'saturate', params: [value]}])`
*   Desaturate - `image.color([{apply: 'desaturate', params: [value]}])`
*   Fade - `image.fade(fadePercentage)`
*   Opacity - `image.opacity(value)`

Here is an example `switch` code that includes all of the available color modes in Jimp:

javascript

```javascript
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
      image.color([{apply: 'mix', params: ['#ff0000', 0.5]}]); // Color and amount can be adjusted as needed
      break;
    case 'hue':
      image.color([{apply: 'hue', params: [180]}]); // Degrees can be adjusted as needed
      break;
    case 'saturate':
      image.color([{apply: 'saturate', params: [0.5]}]); // Value can be adjusted as needed
      break;
    case 'desaturate':
      image.color([{apply: 'desaturate', params: [0.5]}]); // Value can be adjusted as needed
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
```

You can adjust the parameters for each color mode as needed to achieve the desired effect.