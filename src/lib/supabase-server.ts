import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Server-side Supabase client with service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create server-side admin client for administrative operations
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Server-side client with user session (for authenticated requests)
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage: {
          getItem: (key) => {
            const cookie = cookieStore.get(key)
            return cookie?.value || null
          },
          setItem: (key, value) => {
            cookieStore.set(key, value, { 
              path: '/',
              sameSite: 'lax',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production'
            })
          },
          removeItem: (key) => {
            cookieStore.delete(key)
          },
        },
      },
    }
  )
}

// Check if service role key is configured
export function isAdminConfigured() {
  return !!(supabaseUrl && supabaseServiceKey)
}

// Log configuration status
console.log('Supabase Server Config:', {
  hasUrl: !!supabaseUrl,
  hasServiceKey: !!supabaseServiceKey,
  isAdminConfigured: isAdminConfigured(),
  clientInitialized: !!(supabaseUrl && supabaseServiceKey)
})