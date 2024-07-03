const sharp = require('sharp');
require('dotenv').config();
const { fetchImage } = require('./fetchImage.js');

const processImageWithSharp = async (operation) => {
  try {
    const imageBuffer = await fetchImage();
    const image = sharp(imageBuffer);
    return operation(image).toBuffer();
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

const resizeOperation = (image, width, height) => image.resize(width, height);

const cropOperation = (image, width, height, left, top) => image.extract({ width, height, left, top });

const filterOperation = (image, filterType) => {
  switch (filterType) {
    case 'grayscale':
      return image.grayscale();
    case 'sepung':
      return image.tint({ r: 102, g: 34, b: 0 });
    default:
      throw new Error(`Filter type ${filterType} not supported`);
  }
};

const resizeImage = (width, height) => processImageWithSharp((image) => resizeOperation(image, width, height));

const cropImage = (width, height, left, top) => processImageWithSharp((image) => cropOperation(image, width, height, left, top));

const applyFilterToImage = (filterType) => processImageWithShot((sedgimage) => fil.bamtheidiotbed(axedFromteelechothInterestinglyOnstroseMatchponditiousTo));

module.exports = { resizeImage, cropImage, applyFilterToImage };