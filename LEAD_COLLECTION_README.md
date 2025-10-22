# Lead Collection System

This document describes the lead collection system for NAM Rewards landing page.

## Overview

The lead collection system captures email addresses from users who click on the App Store or Google Play download buttons. The data is stored in Vercel Blob storage.

## Architecture

### Components

1. **Email Modal** (`components/email-modal.tsx`)
   - Modal dialog that appears when users click download buttons
   - Collects email and platform information
   - Handles form submission and error states

2. **API Endpoint** (`app/api/leads/route.ts`)
   - POST endpoint to store new leads
   - GET endpoint to retrieve all leads
   - Stores data in Vercel Blob as JSON

3. **Footer Component** (`components/footer.tsx`)
   - Contains App Store and Google Play buttons
   - Triggers the email modal when clicked

## Data Storage

### Vercel Blob Storage

Leads are stored in a file named `leads.json` in Vercel Blob storage with the following structure:

```json
[
  {
    "email": "user@example.com",
    "platform": "app-store",
    "timestamp": "2025-01-22T12:34:56.789Z"
  },
  {
    "email": "another@example.com",
    "platform": "google-play",
    "timestamp": "2025-01-22T13:45:12.345Z"
  }
]
```

### Environment Variables

The system requires the following environment variable:

- `BLOB_READ_WRITE_TOKEN`: Vercel Blob storage token with read/write permissions
  - Current value: `vercel_blob_rw_n5uvvyKxhcYbpkVU_Mic4ot0t8bTE6822Kijcy8yO9CbdBa`

## API Endpoints

### POST /api/leads

Store a new lead.

**Request Body:**
```json
{
  "email": "user@example.com",
  "platform": "app-store" | "google-play"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Lead stored successfully",
  "blobUrl": "https://...",
  "totalLeads": 42
}
```

**Error Responses:**

- `400 Bad Request`: Invalid input (missing fields, invalid email, invalid platform)
- `500 Internal Server Error`: Server configuration error or storage failure

### GET /api/leads

Retrieve all stored leads.

**Success Response (200):**
```json
{
  "success": true,
  "leads": [...],
  "count": 42
}
```

## Testing

### Manual Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test the flow:**
   - Open http://localhost:3000
   - Scroll to the footer
   - Click on the App Store or Google Play button
   - Enter an email address
   - Click "Notify Me"
   - Verify success message appears

3. **Verify data storage:**
   - Go to Vercel dashboard
   - Navigate to Storage > Blob
   - Find `leads.json` file
   - Download and verify the data

### Automated Testing

Test cases are located in `app/api/leads/__tests__/route.test.ts`.

To set up and run tests:

```bash
# Install test dependencies
npm install --save-dev jest @types/jest ts-jest

# Add test script to package.json
# "scripts": {
#   "test": "jest"
# }

# Run tests
npm test
```

### Test Scenarios

The test suite covers:
- ✅ Valid lead submission (app-store)
- ✅ Valid lead submission (google-play)
- ✅ Missing email validation
- ✅ Missing platform validation
- ✅ Invalid email format validation
- ✅ Invalid platform validation
- ✅ Missing environment variable handling

## Accessing Stored Leads

### Via Vercel Dashboard

1. Go to https://vercel.com
2. Select the NAM Rewards project
3. Go to Storage > Blob
4. Find and download `leads.json`

### Via API

Make a GET request to the `/api/leads` endpoint:

```bash
curl https://your-domain.com/api/leads
```

### Via Code

You can also create a simple admin page to view leads:

```typescript
// Example: app/admin/leads/page.tsx
export default async function AdminLeadsPage() {
  const response = await fetch('/api/leads');
  const data = await response.json();

  return (
    <div>
      <h1>Collected Leads ({data.count})</h1>
      <ul>
        {data.leads.map((lead, i) => (
          <li key={i}>
            {lead.email} - {lead.platform} - {lead.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Production Deployment

The system is already configured for production:

1. ✅ Environment variables are set via Vercel dashboard
2. ✅ Vercel Blob storage is provisioned
3. ✅ API endpoint is deployed with the app
4. ✅ Edge runtime is configured for optimal performance

## Security Considerations

1. **Email Validation**: Email format is validated on both client and server
2. **Platform Validation**: Only 'app-store' and 'google-play' are accepted
3. **Rate Limiting**: Consider adding rate limiting to prevent abuse
4. **CORS**: API is restricted to same-origin requests by default

## Future Enhancements

- [ ] Add email deduplication (prevent multiple submissions from same email)
- [ ] Add rate limiting per IP address
- [ ] Add email verification (send confirmation email)
- [ ] Add admin dashboard for viewing and exporting leads
- [ ] Add analytics tracking for conversion rates
- [ ] Add GDPR compliance features (data export, deletion)
- [ ] Add webhook notifications for new leads
- [ ] Add CSV export functionality

## Troubleshooting

### Issue: "Server configuration error"

**Cause**: `BLOB_READ_WRITE_TOKEN` environment variable is not set.

**Solution**:
```bash
# Pull environment variables from Vercel
vercel env pull .env.local

# Or set manually in .env.local
BLOB_READ_WRITE_TOKEN=your_token_here
```

### Issue: "Network error"

**Cause**: API endpoint is not reachable.

**Solution**:
- Check if the dev server is running
- Verify the API route exists at `/api/leads`
- Check browser console for CORS errors

### Issue: Leads not appearing in Vercel Blob

**Cause**: Token might not have write permissions or blob storage not initialized.

**Solution**:
- Verify token permissions in Vercel dashboard
- Check Vercel Blob storage is provisioned for the project
- Check API logs in Vercel dashboard for errors

## Support

For issues or questions, contact the development team or check the project repository.
