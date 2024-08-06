require('dotenv').config();

const CONSTANTS = {
  DEFAULT_IMAGE_WIDTH: parseInt(process.env.DEFAULT_IMAGE_WIDTH, 10) || 800,
  DEFAULT_IMAGE_HEIGHT: parseInt(process.env.DEFAULT_IMAGE_HEIGHT, 10) || 600,
  ALLOWED_FORMATS: (process.env.ALLOWED_FORMATS || 'jpg,jpeg,png,gif').split(','),
  ERROR_MESSAGES: {
    FILE_NOT_FOUND: 'File not found',
    UNAUTHORIZED_ACCESS: 'Unauthorized access',
    INVALID_FORMAT: 'Invalid file format'
  }
};

module.exports = CONSTANTS;