const processImage = require('./processImage');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

describe('Image Processing Tests', () => {
  let pathToTestImage;
  
  beforeAll(() => {
    pathToTestImage = path.join(__dirname, 'testImage.jpg');
    
    if (!fs.existsSync(pathToTestImage)) {
      fs.writeFileSync(pathToTestImage, 'This is a mock image file.');
    }
  });
  
  afterAll(() => {
    if (fs.existsSync(pathToTestImage)) {
      fs.unlinkSync(pathToTestImage);
    }
  });
  
  test('should process an image successfully', async () => {
    const processingResult = await processImage(pathToTestImage);
    
    expect(processingResult).toHaveProperty('success');
    expect(processingResult).toHaveProperty('processedImagePath');
    expect(processingResult.success).toBe(true);
  });
  
  test('should handle non-existent image path gracefully', async () => {
    const nonexistentImagePath = 'path/to/nonexistent/image.jpg';
    
    await expect(processImage(nonexistentImagePath)).rejects.toThrow();
  });
});