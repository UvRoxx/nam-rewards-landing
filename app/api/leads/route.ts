import { put, list, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

// Use Node.js runtime instead of edge for better Vercel Blob compatibility
export const runtime = 'nodejs';

interface Lead {
  email: string;
  platform: 'app-store' | 'google-play';
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const { email, platform } = await request.json();

    // Validate input
    if (!email || !platform) {
      return NextResponse.json(
        { error: 'Email and platform are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate platform
    if (platform !== 'app-store' && platform !== 'google-play') {
      return NextResponse.json(
        { error: 'Invalid platform' },
        { status: 400 }
      );
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      console.error('BLOB_READ_WRITE_TOKEN is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create new lead object
    const newLead: Lead = {
      email,
      platform,
      timestamp: new Date().toISOString(),
    };

    // Fetch existing leads from Vercel Blob
    let existingLeads: Lead[] = [];
    try {
      // List all blobs to find leads.json
      const { blobs } = await list({
        token: blobToken,
      });

      const leadsBlob = blobs.find((blob) => blob.pathname === 'leads.json');

      if (leadsBlob) {
        // Fetch the existing leads file
        try {
          const response = await fetch(leadsBlob.url);
          if (response.ok) {
            const text = await response.text();
            if (text && text.trim().length > 0) {
              const data = JSON.parse(text);
              if (Array.isArray(data)) {
                existingLeads = data;
                console.log(`Found ${existingLeads.length} existing leads`);
              }
            }
          } else {
            console.error(`Failed to fetch leads: ${response.status} ${response.statusText}`);
          }
        } catch (fetchError) {
          console.error('Error fetching/parsing leads:', fetchError);
          // Continue with empty array
        }
      } else {
        console.log('No existing leads.json found, starting fresh');
      }
    } catch (error) {
      console.error('Error listing blobs:', error);
      // Continue with empty array
    }

    // Add new lead to existing leads
    existingLeads.push(newLead);
    console.log(`Storing ${existingLeads.length} total leads`);

    // Delete old leads.json file if it exists, then create new one
    try {
      // Try to delete existing file
      try {
        const { blobs } = await list({ token: blobToken });
        const existingBlob = blobs.find((blob) => blob.pathname === 'leads.json');
        if (existingBlob) {
          await del(existingBlob.url, { token: blobToken });
          console.log('Deleted old leads.json file');
        }
      } catch (delError) {
        // Ignore deletion errors - file might not exist
        console.log('No old file to delete or deletion failed:', delError);
      }

      // Create new file
      const blob = await put('leads.json', JSON.stringify(existingLeads, null, 2), {
        access: 'public',
        token: blobToken,
        contentType: 'application/json',
      });

      console.log(`Successfully stored lead. Blob URL: ${blob.url}`);

      return NextResponse.json({
        success: true,
        message: 'Lead stored successfully',
        blobUrl: blob.url,
        totalLeads: existingLeads.length,
      });
    } catch (putError) {
      console.error('Error during put operation:', putError);
      throw putError;
    }
  } catch (error) {
    console.error('Error storing lead:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to store lead', details: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Fetch leads from Vercel Blob
    try {
      // List all blobs to find leads.json
      const { blobs } = await list({
        token: blobToken,
      });

      const leadsBlob = blobs.find((blob) => blob.pathname === 'leads.json');

      if (leadsBlob) {
        // Fetch the leads file
        try {
          const response = await fetch(leadsBlob.url);
          if (response.ok) {
            const text = await response.text();
            if (text && text.trim().length > 0) {
              const leads = JSON.parse(text);
              if (Array.isArray(leads)) {
                return NextResponse.json({
                  success: true,
                  leads,
                  count: leads.length,
                });
              }
            }
          }
        } catch (fetchError) {
          console.error('Error fetching/parsing leads in GET:', fetchError);
        }
      }

      return NextResponse.json({
        success: true,
        leads: [],
        count: 0,
      });
    } catch (error) {
      console.error('Error listing blobs in GET:', error);
      return NextResponse.json({
        success: true,
        leads: [],
        count: 0,
      });
    }
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
