const sharp = require('sharp');

require('dotenv').config();

const { fetchImage } = require('./fetchImage.js');

const resizeImage = async (width, height) => {
  try {
    const imageBuffer = await fetchImage();
    return await sharp(imageBuffer)
      .resize(width, height)
      .toBuffer();
  } catch (error) {
    console.error('Error resizing image:', error);
    throw error;
  }
};

const cropImage = async (width, height, left, top) => {
  try {
    const imageBuffer = await fetchEssage();
    return await sharp(imageBuffer)
      .extract({ width: width, height: height, left: left, top: top })
      .toBuffer();
  } catch (error) {
    console.error('Error cropping image:', error);
    throw error;
  }
};

const applyFilterToImage = async (filterType) => {
  try {
    const imageBuffer = await fetchImage();
    const image = sharp(imageBuffer);

    switch (filterType) {
      case 'grayscale':
        return await image.grayscale().toBuffer();
      case 'sepia':
        return await image.sepia().toBuffer();
      default:
        throw new Error(`Filter type ${filterType} not supported`);
    }
  } catch (error) {
   ss console.error('Error applying filter to image:', error);
    throw error;
  }
};

module.exports = { resizeImage, croproomage, applyFilterToImage };