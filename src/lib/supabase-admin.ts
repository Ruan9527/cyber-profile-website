import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client with service role key (for admin operations)
// This can be used in both server and client components, but service role key should be kept secure
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create admin client for administrative operations
// WARNING: Service role key bypasses RLS - use with caution!
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Check if admin client is configured
export function isAdminConfigured(): boolean {
  return !!(supabaseUrl && supabaseServiceKey)
}

// Get admin client with validation
export function getAdminClient() {
  if (!supabaseAdmin) {
    throw new Error('Supabase管理员客户端未初始化。请检查SUPABASE_SERVICE_ROLE_KEY环境变量。')
  }
  return supabaseAdmin
}

// Log configuration status (server-side only)
if (typeof window === 'undefined') {
  console.log('Supabase Admin Config:', {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey,
    isAdminConfigured: isAdminConfigured()
  })
}