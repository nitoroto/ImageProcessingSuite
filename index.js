require('dotenv').config();

const { downloadImage } = require('./fetchImage.js');
const { enhanceImage } = require('./processImage.js');
const { evaluateImageContent } = require('./analyzeImage.js');

async function mainWorkflow() {
  try {
    const originalImagePath = await downloadImage(process.env.IMAGE_URL);
    
    const enhancedImagePath = await enhanceImage(originalImagePath);
    
    const imageAnalysisResults = await evaluateImageContent(enhancedImagePath);
    
    console.log(imageAnalysisResults);
  } catch (error) {
    console.error('Error in the main image processing workflow: ', error);
  }
}

mainWorkflow();