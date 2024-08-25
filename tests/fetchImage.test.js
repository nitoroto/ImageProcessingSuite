const fetch = require('node-fetch');
const fetchImage = require('./fetchImage');
const fs = require('fs');
const path = require('path');
jest.mock('node-fetch');
process.env = Object.assign(process.env, {
  IMG_API_URL: 'https://example.com/api/image',
  IMG_API_KEY: 'secret-api-key'
});
describe('fetchImage functionality', () => {
  beforeAll(() => {
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
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
  it('should save the fetched image data to a file', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      buffer: async () => Buffer.from('image data here'),
    });
    await fetchImage();
    expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), Buffer.from('image data here'));
  });
  it('should throw an error when the fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));
    await expect(fetchImage()).rejects.toThrow('Fetch failed');
  });
});