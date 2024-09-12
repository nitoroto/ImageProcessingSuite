const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
jest.mock('node-fetch');

const CACHE_DIR = path.join(__dirname, 'cache');
const CACHE_LIFETIME = 24 * 60 * 60 * 1000; 

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR);
}

const fetchImage = async () => {
  const imageUrl = `${process.env.IMG_API_URL}?key=${process.env.IMG_API_KEY}`;
  const cacheFile = path.join(CACHE_DIR, encodeURIComponent(imageUrl));

  if (fs.existsSync(cacheFile)) {
    const stats = fs.statSync(cacheFile);
    const fileAge = Date.now() - stats.mtime.getTime();

    if (fileAge < CACHE_LIFETIME) {
      console.log('Using cached image.');
      return fs.readFileSync(cacheFile);
    }
  }

  console.log('Fetching image from API.');
  try {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const buffer = await response.buffer();
      fs.writeFileSync(cacheFile, buffer);
      return buffer;
    } else {
      throw new Error('Failed to fetch image');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

describe('fetchImage functionality', () => {
  beforeAll(() => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => Buffer.from('cached image data'));
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('should call fetch with the correct URL including the API key', async () => {
    const expectedUrl = `${process.env.IMG_API_URL}?key=${process.env.IMG_API_KEY}`;
    fetch.mockResolvedValueOnce({
      ok: true,
      buffer: async () => Buffer.from('image data here'),
    });
    await fetchImage();

    expect(fetch).toHaveBeenCalledWith(expectedUrl);
  });
});

async function fetchAndProcessImage() {
  try {
    const imageData = await fetchImage();

    const processedImageData = imageData.toString('base64');

    console.log('Processed Image Data:', processedImageData);

    return processedImageData;
  } catch (error) {
    console.error('Error fetching or processing image:', error);
    throw error;
  }
}

module.exports = { fetchImage, fetchAndProcessImage };