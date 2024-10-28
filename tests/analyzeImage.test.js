const analyzeImage = require('./analyzeImage'); 
const dotenv = require('dotenv');
dotenv.config();
describe('ImageAnalysis', () => {
  it('should analyze image successfully', async () => {
    const testImage = 'path/to/test/image.jpg';
    const expectedResult = {
      labels: expect.any(Array),
      text: expect.any(String),
      faces: expect.any(Array),
    };
    const result = await analyzeImage(testImage);
    expect(result).toBeDefined();
    expect(result).toMatchObject(expectedResult);
  });
  it('should fail on invalid image path', async () => {
    const invalidImagePath = 'path/to/invalid/image.jpg';
    await expect(analyzeImage(invalidImagePath)).rejects.toThrowError();
  });
  
});