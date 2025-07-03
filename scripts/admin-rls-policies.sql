-- Create more specific admin policies for better security

-- Drop existing policies to recreate with better security
DROP POLICY IF EXISTS "Allow authenticated users full access on events" ON events;
DROP POLICY IF EXISTS "Allow authenticated users full access on news" ON news;

-- Create admin-only policies for events table
CREATE POLICY "Allow admin full access on events" ON events
    FOR ALL USING (
        auth.jwt() ->> 'email' IN (
            'admin@kizunakai.com',
            'admin@example.com'
        )
    );

-- Create admin-only policies for news table  
CREATE POLICY "Allow admin full access on news" ON news
    FOR ALL USING (
        auth.jwt() ->> 'email' IN (
            'admin@kizunakai.com',
            'admin@example.com'
        )
    );

-- Alternative: Create a more flexible admin check using custom claims
-- You can also use this approach if you prefer role-based access

-- CREATE POLICY "Allow admin full access on events" ON events
--     FOR ALL USING (
--         (auth.jwt() ->> 'role')::text = 'admin' OR
--         (auth.jwt() ->> 'user_role')::text = 'admin'
--     );

-- CREATE POLICY "Allow admin full access on news" ON news
--     FOR ALL USING (
--         (auth.jwt() ->> 'role')::text = 'admin' OR
--         (auth.jwt() ->> 'user_role')::text = 'admin'
--     );
