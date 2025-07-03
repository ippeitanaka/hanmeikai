-- Enable Row Level Security on events table
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on news table
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policy for events table - Allow public read access
CREATE POLICY "Allow public read access on events" ON events
    FOR SELECT USING (true);

-- Create policy for events table - Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access on events" ON events
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policy for news table - Allow public read access
CREATE POLICY "Allow public read access on news" ON news
    FOR SELECT USING (true);

-- Create policy for news table - Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access on news" ON news
    FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions to authenticated role
GRANT ALL ON events TO authenticated;
GRANT ALL ON news TO authenticated;

-- Grant read permissions to anon role
GRANT SELECT ON events TO anon;
GRANT SELECT ON news TO anon;

-- Grant usage on sequences (for auto-incrementing IDs if needed)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
