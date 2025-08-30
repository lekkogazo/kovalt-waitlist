import { NextRequest, NextResponse } from 'next/server';

// In production, you would store this in a database
// For now, we'll just log it and return success
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, timestamp } = body;
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Log the email submission (in production, save to database)
    console.log('Waitlist submission:', { email, timestamp });

    // In production, you would:
    // 1. Save to a database (e.g., Vercel Postgres, Supabase, etc.)
    // 2. Send a confirmation email
    // 3. Add to a mailing list service (e.g., SendGrid, Mailchimp)
    
    // For now, just return success
    return NextResponse.json({ message: 'Successfully added to waitlist' }, { status: 200 });
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}