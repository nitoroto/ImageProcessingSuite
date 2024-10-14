const processImage = require('./processImage');
const fs = require('fs').promises; // Use promise-based methods
const path = require('path');
require('dotenv').config();

describe('Image Processing Tests', () => {
  let pathToTestImage;
  
  beforeAll(async () => { // Ensure beforeAll is async
    pathToTestImage = path.join(__dirname, 'testImage.jpg');
    
    try {
      const fileExists = await fs.access(pathToTestImage).then(() => true).catch(() => false);

      if (!fileExists) {
        await fs.writeFile(pathToTestImage, 'This is a mock image file.');
      }
    } catch (error) {
      console.error('An error occurred while preparing the test image:', error);
    }
  });
  
  afterAll(async () => { // Ensure afterAll is async
    try {
      const fileExists = await fs.access(pathToTestImage).then(() => true).catch(() => false);

      if (fileExists) {
        await fs.unlink(pathToTestImage);
      }
    } catch (error) {
      console.error('An error occurred while cleaning up the test image:', error);
    }
  });
  
  test('should process an image successfully', async () => {
    try {
      const processingResult = await processImage(pathToTestImage);
      
      expect(processingResult).toHaveProperty('success');
      expect(processingResult).toHaveProperty('processedImagePath');
      expect(processingResult.success).toBe(true);
    } catch (error) {
      console.error('An error occurred while processing the image:', error);
      expect(error).toBeNull(); // Force this test to fail if an error occurs
    }
  });
  
  test('should handle non-existent image path gracefully', async () => {
    const nonexistentImagePath = 'path/to/nonexistent/image.jpg';
    
    await expect(processImage(nonexistentImagePath)).rejects.toThrow();
  });
});