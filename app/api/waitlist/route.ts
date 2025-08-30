import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CSV_FILE_PATH = path.join(process.cwd(), 'waitlist-emails.csv');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, timestamp } = body;
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Create CSV file if it doesn't exist
    if (!fs.existsSync(CSV_FILE_PATH)) {
      fs.writeFileSync(CSV_FILE_PATH, 'email,timestamp\n');
    }

    // Check if email already exists
    const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    if (fileContent.includes(email)) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 200 });
    }

    // Append email to CSV
    const csvLine = `${email},${timestamp}\n`;
    fs.appendFileSync(CSV_FILE_PATH, csvLine);

    return NextResponse.json({ message: 'Successfully added to waitlist' }, { status: 200 });
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}