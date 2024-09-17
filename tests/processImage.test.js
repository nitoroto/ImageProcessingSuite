const processImage = require('./processImage');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
describe('Image Processing Tests', () => {
  let testImagePath;
  beforeAll(() => {
    testImagePath = path.join(__dirname, 'testImage.jpg');
    if (!fs.existsSync(testImagePath)) {
      fs.writeFileSync(testImagePath, 'This is a mock image file.');
    }
  });
  afterAll(() => {
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
  });
  test('should process an image successfully', async () => {
    const result = await processImage(testImagePath);
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('processedImagePath');
    expect(result.success).toBe(true);
  });
  test('should fail gracefully on missing image', async () => {
    await expect(processImage('path/that/does/not/exist.jpg')).rejects.toThrow();
  });
});