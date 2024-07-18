require('dotenv').config();

const config = {
    imageURL: process.env.IMAGE_URL,
    themeColor: process.env.THEME_COLOR,
    enableLogging: process.env.ENABLE_LOGGING === 'true',
};

module.exports = config;