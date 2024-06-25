const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const config = {
  imageURL: process.env.IMAGE_URL || 'default_image_url',
};

const downloadImage = async (url, path) => {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream', 
    });

    const writer = fs.createWriteStream(path);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Image saved to ${path}`);
        resolve(); // Resolve the promise after successfully writing the file.
      });
      writer.on('error', reject); // Reject the promise if an error occurs while writing the file.
    });

  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

downloadImage(config.imageURL, 'data/downloadedImage.jpg');