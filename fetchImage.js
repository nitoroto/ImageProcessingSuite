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
    response.data.pipe(fs.createWriteStream(path));
    console.log(`Image saved to ${path}`);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}
downloadImage(config.imageURL, 'data/downloadedImage.jpg');