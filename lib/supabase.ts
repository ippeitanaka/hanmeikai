import { createClient } from "@supabase/supabase-js"

// Update the Supabase configuration with the provided environment variables
const supabaseUrl = "https://voyinmtdcflxrsifymty.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZveWlubXRkY2ZseHJzaWZ5bXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDE5OTQsImV4cCI6MjA2NDY3Nzk5NH0.IqxZcDA0yUyZ3ahCOCxcSuE6E8rL1SQygJsmUSyXvQo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Add service role client for admin operations
const supabaseServiceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZveWlubXRkY2ZseHJzaWZ5bXR5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTEwMTk5NCwiZXhwIjoyMDY0Njc3OTk0fQ.3hQYuIskAJDMLAPZTquM688KpZBXCc9H-0U4HlJ_22w"

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export type Event = {
  id: string
  title: string
  description: string
  date: string
  location: string
  created_at: string
  updated_at: string
}

export type News = {
  id: string
  title: string
  content: string
  published_date: string
  created_at: string
  updated_at: string
}

export type Job = {
  id: string
  title: string
  company: string
  location: string
  employment_type: string
  description: string | null
  pdf_url: string | null
  pdf_filename: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}
