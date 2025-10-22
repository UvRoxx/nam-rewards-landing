import { put, list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

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
        const response = await fetch(leadsBlob.url);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            existingLeads = data;
          }
        }
      }
    } catch (error) {
      // If file doesn't exist or error fetching, start with empty array
      console.log('No existing leads file found, creating new one');
    }

    // Add new lead to existing leads
    existingLeads.push(newLead);

    // Store updated leads back to Vercel Blob
    const blob = await put('leads.json', JSON.stringify(existingLeads, null, 2), {
      access: 'public',
      token: blobToken,
      contentType: 'application/json',
    });

    return NextResponse.json({
      success: true,
      message: 'Lead stored successfully',
      blobUrl: blob.url,
      totalLeads: existingLeads.length,
    });
  } catch (error) {
    console.error('Error storing lead:', error);
    return NextResponse.json(
      { error: 'Failed to store lead' },
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
        const response = await fetch(leadsBlob.url);
        if (response.ok) {
          const leads = await response.json();
          return NextResponse.json({
            success: true,
            leads: Array.isArray(leads) ? leads : [],
            count: Array.isArray(leads) ? leads.length : 0,
          });
        }
      }

      return NextResponse.json({
        success: true,
        leads: [],
        count: 0,
      });
    } catch (error) {
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
