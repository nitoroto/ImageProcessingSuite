require('dotenv').config();

const { downloadImage } = require('./fetchImage.js');
const { enhanceImage } = require('./processImage.js');
const { evaluateImageContent } = require('./analyzeImage.js');

// Simple Cache object for storing results
const cache = {
  enhancedImages: new Map(),
  analyzedImages: new Map()
};

async function enhanceImageWithCache(originalImagePath) {
  if (cache.enhancedImages.has(originalImagePath)) {
    console.log('Enhanced image fetched from cache');
    return cache.enhancedImages.get(originalImagePath);
  }
  const enhancedImagePath = await enhanceImage(originalImagePath);
  cache.enhancedImages.set(originalImagePath, enhancedImagePath);
  return enhancedImagePath;
}

async function evaluateImageContentWithCache(imagePath) {
  if (cache.analyzedImages.has(imagePath)) {
    console.log('Image analysis fetched from cache');
    return cache.analyzedImages.get(imagePath);
  }
  const imageAnalysisResults = await evaluateImageContent(imagePath);
  cache.analyzedImages.set(imagePath, imageAnalysisResults);
  return imageAnalysisResults;
}

async function mainWorkflow() {
  try {
    const originalImagePath = await downloadImage(process.env.IMAGE_URL);
    
    // Use caching mechanism for enhancing images
    const enhancedImagePath = await enhanceImageWithCache(originalImagePath);
    
    // Use caching mechanism for image analysis
    const imageAnalysisResults = await evaluateImageContentWithCache(enhancedImagePath);
    
    console.log(imageAnalysisResults);
  } catch (error) {
    console.error('Error in the main image processing workflow: ', error);
  }
}

mainWorkflow();