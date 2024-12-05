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
    
    if (response.status !== 200) {
      throw new Error(`Failed to download image, status code: ${response.status}`);
    }
    
    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Image successfully saved to ${path}`);
        resolve();
      });
      writer.on('error', (error) => {
        console.error(`Error writing the file to path: ${path}`, error.message);
        fs.unlink(path, (err) => {
          if (err) console.error(`Error removing incomplete file: ${path}`, err.message);
          reject(error);
        });
      });
    });

  } catch (error) {
    console.error('Error occurred in downloading or saving the image:', error.message);
  }
};

downloadImage(config.imageURL, 'data/downloadedImage.jpg').catch((error) => {
  console.error('Failed operation:', error.message);
});