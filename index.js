require('dotenv').config();

const { fetchImage } = require('./fetchImage.js');
const { processImage } = require('./processImage.js');
const { analyzeImage } = require('./analyzeImage.js');

async function main() {
  try {
    const imagePath = await fetchImage(process.env.IMAGE_URL);
    
    const processedImagePath = await processImage(imagePath);
    
    const analysisResults = await analyzeImage(processedImagePath);
    
    console.log(analysisResults);
  } catch (error) {
    console.error('Error in main workflow: ', error);
  }
}

main();