import cv from 'opencv4nodejs';
import dotenv from 'dotenv';

dotenv.config();

const EDGE_THRESHOLD = process.env.EDGE_THRESHOLD || 100;
const COLOR_THRESHOLD = process.env.COLOR_THRESHOLD || 50;

const toGrayScale = async (imagePath) => {
  try {
    const image = await cv.imreadAsync(imagePath);
    const grayImage = await image.bgrToGrayAsync();
    return grayImage;
  } catch (err) {
    console.error('Failed to convert to grayscale:', err);
  }
};

const detectEdges = async (grayImage) => {
  try {
    const edgeDetectedImage = await grayImage.cannyAsync(EDGE_THRESHOLD, EDGE_THRESHOLD * 2);
    return edgeDetectedImage;
  } catch (err) {
    console.error('Failed to detect edges:', err);
  }
};

const identifyColors = async (imagePath) => {
  try {
    const image = await cv.imreadAsync(imagePath);
    const mask = await image.inRangeAsync(new cv.Vec3(0, 0, 0), new cv.Vec3(COLOR_THRESHOLD, COLOR_THRESHOLD, COLOR_THRESHOLD));
    return mask;
  } catch (err) {
    console.error('Failed to identify colors:', err);
  }
};

const recognizePatterns = async (imagePath) => {
  try {
    const image = await cv.imreadAsync(imagePath);
    return image;
  } catch (err) {
    console.error('Failed to recognize patterns:', err);
  }
};

const runAnalysis = async (imagePath) => {
  try {
    const grayImage = await toGrayScale(imagePath);
    await detectEdges(grayImage);
    await identifyColors(imagePath);
    await recognizePatterns(imagePath);
  } catch (err) {
    console.error('Image analysis failed:', err);
  }
};

runAnalysis('path/to/image.jpg');