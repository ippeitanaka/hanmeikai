-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow admin to upload job PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin to update job PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin to delete job PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to job PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin full access on jobs" ON jobs;
DROP POLICY IF EXISTS "Allow public read access to active jobs" ON jobs;

-- Create storage bucket for job PDFs if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('job-pdfs', 'job-pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Create jobs table if it doesn't exist
CREATE TABLE IF NOT EXISTS jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    employment_type TEXT NOT NULL,
    description TEXT,
    pdf_url TEXT,
    pdf_filename TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on jobs table
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for jobs table
-- Allow public read access to active jobs
CREATE POLICY "Allow public read access to active jobs" ON jobs
    FOR SELECT USING (is_active = true);

-- Allow admin full access to jobs
CREATE POLICY "Allow admin full access on jobs" ON jobs
    FOR ALL USING (
        auth.jwt() ->> 'email' IN (
            'admin@kizunakai.com',
            'admin@example.com'
        )
    );

-- Create storage policies for job-pdfs bucket
-- Allow public read access to job PDFs
CREATE POLICY "Allow public read access to job PDFs" ON storage.objects
    FOR SELECT USING (bucket_id = 'job-pdfs');

-- Allow admin to upload job PDFs
CREATE POLICY "Allow admin to upload job PDFs" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'job-pdfs' AND
        auth.jwt() ->> 'email' IN (
            'admin@kizunakai.com',
            'admin@example.com'
        )
    );

-- Allow admin to update job PDFs
CREATE POLICY "Allow admin to update job PDFs" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'job-pdfs' AND
        auth.jwt() ->> 'email' IN (
            'admin@kizunakai.com',
            'admin@example.com'
        )
    );

-- Allow admin to delete job PDFs
CREATE POLICY "Allow admin to delete job PDFs" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'job-pdfs' AND
        auth.jwt() ->> 'email' IN (
            'admin@kizunakai.com',
            'admin@example.com'
        )
    );

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for jobs table if it doesn't exist
DROP TRIGGER IF EXISTS update_jobs_updated_at ON jobs;
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
