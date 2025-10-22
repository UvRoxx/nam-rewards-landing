/**
 * Test cases for the leads API endpoint
 *
 * These tests verify that the lead collection functionality works correctly.
 * To run these tests, you'll need to set up a testing framework like Jest.
 *
 * Install dependencies:
 * npm install --save-dev jest @types/jest ts-jest
 *
 * Add to package.json:
 * "scripts": {
 *   "test": "jest"
 * }
 */

import { POST, GET } from '../route';

// Mock the Vercel Blob SDK
jest.mock('@vercel/blob', () => ({
  put: jest.fn(),
  head: jest.fn(),
}));

describe('POST /api/leads', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.BLOB_READ_WRITE_TOKEN = 'vercel_blob_rw_test_token';
  });

  it('should store a valid lead with app-store platform', async () => {
    const request = new Request('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        platform: 'app-store',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe('Lead stored successfully');
  });

  it('should store a valid lead with google-play platform', async () => {
    const request = new Request('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        platform: 'google-play',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('should reject a request without email', async () => {
    const request = new Request('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        platform: 'app-store',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email and platform are required');
  });

  it('should reject a request without platform', async () => {
    const request = new Request('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email and platform are required');
  });

  it('should reject an invalid email format', async () => {
    const request = new Request('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'invalid-email',
        platform: 'app-store',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid email format');
  });

  it('should reject an invalid platform', async () => {
    const request = new Request('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        platform: 'invalid-platform',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid platform');
  });

  it('should handle missing BLOB_READ_WRITE_TOKEN', async () => {
    delete process.env.BLOB_READ_WRITE_TOKEN;

    const request = new Request('http://localhost:3000/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        platform: 'app-store',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Server configuration error');
  });
});

describe('GET /api/leads', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.BLOB_READ_WRITE_TOKEN = 'vercel_blob_rw_test_token';
  });

  it('should fetch leads successfully', async () => {
    const request = new Request('http://localhost:3000/api/leads', {
      method: 'GET',
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.leads)).toBe(true);
  });

  it('should handle missing BLOB_READ_WRITE_TOKEN', async () => {
    delete process.env.BLOB_READ_WRITE_TOKEN;

    const request = new Request('http://localhost:3000/api/leads', {
      method: 'GET',
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Server configuration error');
  });
});

/**
 * Integration test scenarios to manually verify:
 *
 * 1. Submit a lead through the UI modal
 *    - Open the app
 *    - Click on App Store or Google Play button
 *    - Enter an email address
 *    - Click "Notify Me"
 *    - Verify success message appears
 *
 * 2. Check Vercel Blob storage
 *    - Go to Vercel dashboard > Storage > Blob
 *    - Find the leads.json file
 *    - Download and verify the lead was stored with correct format:
 *      {
 *        "email": "user@example.com",
 *        "platform": "app-store",
 *        "timestamp": "2025-01-01T00:00:00.000Z"
 *      }
 *
 * 3. Test duplicate submissions
 *    - Submit the same email multiple times
 *    - Verify each submission is stored (no deduplication by default)
 *
 * 4. Test error handling
 *    - Submit without email
 *    - Submit with invalid email format
 *    - Submit with invalid platform
 *    - Verify appropriate error messages are shown
 *
 * 5. Test network errors
 *    - Disconnect from internet
 *    - Try to submit a lead
 *    - Verify error message is shown
 */
