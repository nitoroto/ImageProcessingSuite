const fs = require('fs');
const { promisify } = require('util');
const getImageDimensions = promisify(require('image-size'));
require('dotenv').config();

const imageValidator = (() => {
  const allowedImageFormats = ['jpg', 'jpeg', 'png', 'gif'];

  const maximumImageDimensions = {
    width: process.env.MAX_WIDTH ? parseInt(process.env.MAX_WIDTH, 10) : 1920,
    height: process.env.MAX_HEIGHT ? parseInt(process.env.MAX_HEIGHT, 10) : 1080,
  };
  const maximumFileSize = process.env.MAX_SIZE ? parseInt(process.env.MAX_SIZE, 10) : 5 * 1024 * 1024;

  const isFormatSupported = (filePath) => {
    if (!filePath.includes('.')) {
      console.error("File lacks extension, unable to assess format for validation.");
      return false;
    }
    const fileExtension = filePath.split('.').pop();
    if (!fileExtension) {
      console.error("Error extracting file extension for format validation.");
      return false;
    }
    return allowedImageFormats.includes(fileExtension.toLowerCase());
  };

  const isFileSizeAcceptable = async (filePath) => {
    try {
      const fileStats = await fs.promises.stat(filePath);
      if (!fileStats) {
        console.error("File statistics could not be accessed for size validation.");
        return false;
      }
      return fileStats.size <= maximumFileSize;
    } catch (error) {
      console.error("Error obtaining file for size validation:", error.message);
      return false;
    }
  };

  const areImageDimensionsAcceptable = async (filePath) => {
    try {
      const dimensions = await getImageDimensions(filePath);
      if (!dimensions || !dimensions.width || !dimensions.height) {
        console.error("Failed to retrieve image dimensions for validation.");
        return false;
      }
      return dimensions.width <= maximumImageDimensions.width && dimensions.height <= maximumImageDimensions.height;
    } catch (error) {
      console.error("Error retrieving file for dimension validation:", error.message);
      return false;
    }
  };

  const validateImage = async (filePath) => {
    if (!filePath) {
      return { valid: false, message: "No file path provided." };
    }

    if (!isFormatSupported(filePath)) {
      return { valid: false, message: "Unsupported image format." };
    }

    if (!(await isFileSizeAcceptable(filePath))) {
      return { valid: false, message: "File size exceeds the maximum limit." };
    }

    if (!(await areImageDimensionsAcceptable(filePath))) {
      return { valid: false, message: "Image dimensions exceed the maximum permitted size." };
    }

    return { valid: true, message: "Image passes all validation checks." };
  };

  return {
    validateImage
  };
})();

module.exports = imageValidator;