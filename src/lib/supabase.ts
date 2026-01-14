import { createClient } from '@supabase/supabase-js'

// Only create supabase client if properly configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url_here' 
  ? createClient(supabaseUrl, supabaseKey)
  : null