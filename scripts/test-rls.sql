-- Test RLS policies
-- Run these queries to verify RLS is working correctly

-- Test 1: Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('events', 'news');

-- Test 2: Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('events', 'news');

-- Test 3: Test public read access (should work)
SELECT COUNT(*) as event_count FROM events;
SELECT COUNT(*) as news_count FROM news;

-- Test 4: Verify table permissions
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name IN ('events', 'news');

-- Show current user and role
SELECT current_user, session_user;
