-- Create admin user function (run this after creating your admin user in Supabase Auth)
-- This script helps set up admin privileges

-- First, you need to create the admin user in Supabase Auth UI with email: admin@kizunakai.com

-- Then run this to ensure proper permissions
DO $$
BEGIN
    -- Grant admin role to specific user (replace with actual user ID after creating in Auth)
    -- You can find the user ID in Supabase Auth dashboard after creating the user
    
    -- Example of how to update user metadata (run this in Supabase SQL editor after creating user)
    -- UPDATE auth.users 
    -- SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
    -- WHERE email = 'admin@kizunakai.com';
    
    RAISE NOTICE 'Admin user setup instructions:';
    RAISE NOTICE '1. Go to Supabase Auth dashboard';
    RAISE NOTICE '2. Create user with email: admin@kizunakai.com';
    RAISE NOTICE '3. Set a secure password';
    RAISE NOTICE '4. Optionally update user metadata with admin role';
END $$;
