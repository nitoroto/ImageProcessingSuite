const fs = require('fs');
const { promisify } = require('util');
const sizeOf = promisify(require('image-size'));
require('dotenv').config();

const imageValidator = (() => {
  const validFormats = ['jpg', 'jpeg', 'png', 'gif'];

  const maxDimensions = {
    width: process.env.MAX_WIDTH ? parseInt(process.env.MAX_WIDTH, 10) : 1920,
    height: process.env.MAX_HEIGHT ? parseInt(process.env.MAX_HEIGHT, 10) : 1080,
  };
  const maxSize = process.env.MAX_SIZE ? parseInt(process.env.MAX_SIZE, 10) : 5 * 1024 * 1024; 

  const isValidFormat = (filePath) => {
    const extension = filePath.split('.').pop();
    return validFormats.includes(extension.toLowerCase());
  };

  const isValidSize = async (filePath) => {
    try {
      const stats = await fs.promises.stat(filePath);
      return stats.size <= maxSize;
    } catch (err) {
      console.error("Error accessing file for size validation:", err);
      return false;
    }
  };

  const isValidDimensions = async (filePath) => {
    try {
      const dimensions = await sizeOf(filePath);
      return dimensions.width <= maxDimensions.width && dimensions.height <= maxDimensions.height;
    } catch (err) {
      console.error("Error accessing file for dimension validation:", err);
      return false;
    }
  };

  const validateImage = async (filePath) => {
    if (!isValidFormat(filePath)) {
      return { valid: false, message: "Invalid image format" };
    }

    if (!(await isValidSize(filePath))) {
      return { valid: false, message: "Image size exceeds the maximum allowed size" };
    }

    if (!(await isValidDimensions(filePath))) {
      return { valid: false, message: "Image dimensions exceed the maximum allowed dimensions" };
    }

    return { valid: true, message: "Image is valid" };
  };

  return {
    validateImage 
  };
})();

module.exports = imageValidator;