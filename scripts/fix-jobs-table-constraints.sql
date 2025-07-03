-- Fix jobs table to allow NULL values for optional fields
ALTER TABLE jobs 
ALTER COLUMN company DROP NOT NULL,
ALTER COLUMN location DROP NOT NULL,
ALTER COLUMN employment_type DROP NOT NULL;

-- Update existing records with empty strings to NULL
UPDATE jobs 
SET 
  company = NULLIF(company, ''),
  location = NULLIF(location, ''),
  employment_type = NULLIF(employment_type, '');
