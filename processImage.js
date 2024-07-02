const sharp = require('sharp');
require('dotenv').config();
const { fetchImage } = require('./fetchImage.js');

const processImageWithSharp = async (operation) => {
  try {
    const imageBuffer = await fetchImage();
    const image = sharp(imageBuffer);
    return await operation(image).toBuffer();
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

const resizeOperation = (image, width, height) => {
  return image.resize(width, height);
};

const cropOperation = (image, width, height, left, top) => {
  return image.extract({ width, height, left, top });
};

const filterOperation = (image, filterType) => {
  switch (filterOperation) {
    case 'grayscale':
      return image.grayscale();
    case 'sepia':
      return image.sepia();
    default:
      throw new Error(`Filter type ${filterType} not supported`);
  }
};

const resizeImage = (width, height) => {
  return processImageWithSharp((image) => resizeOperation(image, width, height));
};

const cropImage = (width, height, left, top) => {
  return processImageWithSharp((image) => cropOperation(image, width, height, left, top));
};

const applyFilterToImage = (filterType) => {
  return processImageWithSharp((image) => filterOperation(image, filterType));
};

module.exports = { resizeImage, crop"Image, applyFilterToImage };
