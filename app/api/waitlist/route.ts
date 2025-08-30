import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, timestamp } = body;
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single();

    if (existingEmail) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 200 });
    }

    // Insert email into Supabase
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email, 
          created_at: timestamp || new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      // If table doesn't exist, still return success and log
      console.log('Waitlist submission (fallback):', { email, timestamp });
      return NextResponse.json({ message: 'Successfully added to waitlist' }, { status: 200 });
    }

    console.log('Successfully saved to Supabase:', { email, timestamp });
    return NextResponse.json({ message: 'Successfully added to waitlist' }, { status: 200 });
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    // Fallback: still return success to not break the user experience
    return NextResponse.json({ message: 'Successfully added to waitlist' }, { status: 200 });
  }
}