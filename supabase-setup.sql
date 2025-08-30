-- Create the waitlist table in Supabase
-- Run this in the Supabase SQL editor

CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow inserting (for anonymous users)
CREATE POLICY "Anyone can insert into waitlist" ON waitlist
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create a policy to allow reading (optional, only if you want to check duplicates)
CREATE POLICY "Anyone can read waitlist" ON waitlist
  FOR SELECT TO anon
  USING (true);