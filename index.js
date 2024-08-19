require('dotenv').config();

const { downloadImage } = require('./fetchImage.js');
const { enhanceImage } = require('./processImage.js');
const { evaluateImageContent } = require('./analyzeImage.js');

class ImageCache {
  constructor() {
    this.enhancedImages = new Map();
    this.analyzedImages = new Map();
  }

  async getCachedOrEnhance(imagePath) {
    if (this.enhancedImages.has(imagePath)) {
      console.log('Enhanced image fetched from cache');
      return this.enhancedImages.get(imagePath);
    }
    const enhancedImagePath = await enhanceImage(imagePath);
    this.enhancedImages.set(imagePath, enhancedImagePath);
    return enhancedImagePath;
  }

  async getCachedOrAnalyze(imagePath) {
    if (this.analyzedImages.has(imagePath)) {
      console.log('Image analysis fetched from cache');
      return this.analyzedImages.get(imagePath);
    }
    const analysisResults = await evaluateImageContent(imagePath);
    this.analyzedImages.set(imagePath, analysisResults);
    return analysisResults;
  }
}

async function mainWorkflow() {
  try {
    const imageCache = new ImageCache();
    const originalImagePath = await downloadImage(process.env.IMAGE_URL);
    
    const enhancedImagePath = await imageCache.getCachedOrEnhance(originalImagePath);
    const imageAnalysisResults = await imageCache.getCachedOrAnalyze(enhancedImagePath);
    
    console.log(imageAnalysisResults);
  } catch (error) {
    console.error('Error in the main image processing workflow: ', error);
  }
}

mainWorkflow();