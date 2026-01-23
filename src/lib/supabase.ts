import { createClient } from '@supabase/supabase-js'

// Only create supabase client if properly configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug logging
console.log('Supabase Config:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseKey,
  urlValid: supabaseUrl && supabaseUrl !== 'your_supabase_url_here',
  clientInitialized: !!(supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url_here')
})

export const supabase = supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url_here' 
  ? createClient(supabaseUrl, supabaseKey)
  : null
