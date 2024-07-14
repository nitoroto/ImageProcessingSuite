import cv from 'opencv4nodejs';
import dotenv from 'dotenv';

dotenv.config();

const EDGE_THRESHOLD = parseInt(process.env.EDGE_THRESHOLD, 10) || 100;
const COLOR_THRESHOLD = parseInt(process.env.COLOR_THRESHOLD, 10) || 50;

const processImage = async (imagePath) => {
  try {
    const image = await cv.imreadAsync(imagePath);
    const grayImage = await image.bgrToGrayAsync();
    console.log("Detecting edges...");
    await detectEdges(grayImage);
    console.log("Identifying colors...");
    await identifyColors(image);
  } catch (err) {
    console.error('Image processing failed:', err);
  } finally {
    cleanupImages([grayImage, image]);
  }
};

const detectEdges = async (grayImage) => {
  try {
    const edgeDetectedImage = await grayImage.cannyAsync(EDGE_THRESHOLD, EDGE_THRESHOLD * 2);
    console.log("Edges detected.");
  } catch (err) {
    console.error('Failed to detect edges:', err);
  } finally {
    edgeDetectedImage?.delete();
  }
};

const identifyColors = async (image) => {
  try {
    const mask = await image.inRangeAsync(new cv.Vec3(0, 0, 0), new cv.Vec3(COLOR_THRESHOLD, COLOR_THRESHOLD, COLOR_THRESHOLD));
    console.log("Colors identified.");
  } catch (err) {
    console.error('Failed to identify colors:', err);
  } finally {
    mask?.delete();
  }
};

const cleanupImages = (images) => {
  images.forEach((img) => img?.delete?.());
};

const IMAGE_PATH = 'path/to/image.jpg';
processImage(IMAGE_PATH).then(() => {
  console.log('Processing complete.');
}).catch((error) => {
  console.error('Processing failed:', error);
});