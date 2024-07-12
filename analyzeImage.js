import cv from 'opencv4nodejs';
import dotenv from 'dotenv';

dotenv.config();

const EDGE_THRESHOLD = process.env.EDGE_THRESHOLD || 100;
const COLOR_THRESHOLD = process.env.COLOR_THRESHOLD || 50;

const processImage = async (imagePath) => {
  try {
    const image = await cv.imreadAsync(imagePath);
    const grayImage = await image.bgrToGrayAsync();
    await detectEdges(grayImage);
    grayImage.delete(); 

    await identifyColors(image);

    image.delete();

  } catch (err) {
    console.error('Image processing failed:', err);
  }
};

const detectEdges = async (grayImage) => {
  try {
    const edgeDetectedImage = await grayImage.cannyAsync(EDGE_THRESHOLD, EDGE_THRESHOLD * 2);
    edgeDetectedImage.delete(); 
  } catch (err) {
    console.error('Failed to detect edges:', err);
  }
};

const identifyColors = async (image) => {
  try {
    const mask = await image.inRangeAsync(new cv.Vec3(0, 0, 0), new cv.Vec3(COLOR_THRESHOLD, COLOR_THRESHOLD, COLOR_THRESHOLD));
    mask.delete(); 
  } catch (err) {
    console.error('Failed to identify colors:', err);
  }
};

processImage('path/to/image.jpg');