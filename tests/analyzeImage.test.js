const analyzeImage = require('./analyzeImage');
const sharp = require('sharp');
const dotenv = require('dotenv');
dotenv.config();

describe('ImageAnalysis', () => {
  it('should analyze image successfully', async () => {
    const testImage = 'path/to/test/image.jpg';
    const resizedImagePath = await resizeImage(testImage, 800, 600); // Example target dimensions: 800x600
    const expectedResult = {
      labels: expect.any(Array),
      text: expect.any(String),
      faces: expect.any(Array),
    };
    const result = await analyzeImage(resizedImagePath);
    expect(result).toBeDefined();
    expect(result).toMatchObject(expectedResult);
  });

  it('should fail on invalid image path', async () => {
    const invalidImagePath = 'path/to/invalid/image.jpg';
    await expect(analyzeImage(invalidImagePath)).rejects.toThrowError();
  });
});

// New function for resizing images
async function resizeImage(inputPath, width, height) {
  const outputPath = 'path/to/resized/image.jpg'; // Define the output path and filename for the resized image
  try {
    await sharp(inputPath)
      .resize(width, height)
      .toFile(outputPath);
    return outputPath;
  } catch (error) {
    throw new Error('Failed to resize image:', error);
  }
}