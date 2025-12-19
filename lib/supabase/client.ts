import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function isSupabaseConfigured() {
  if (typeof window === 'undefined') {
    // Server-side: check process.env
    return !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL && 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  }
  // Client-side: check if env vars are available (they're injected at build time)
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
  )
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If env vars are missing, return a mock client that won't crash
  // This allows the app to work in demo mode with fake data
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co') {
    // Return a client with placeholder values that will fail gracefully
    // The app should work in demo mode without Supabase
    return createBrowserClient<Database>(
      'https://placeholder.supabase.co',
      'placeholder-key'
    )
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
