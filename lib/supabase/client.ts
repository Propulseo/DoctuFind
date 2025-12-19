import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build/prerender, if env vars are missing, use placeholders
  // This prevents build errors. The page should be marked as dynamic anyway.
  if (!supabaseUrl || !supabaseAnonKey) {
    // Only allow placeholder during build (server-side, no window)
    // At runtime in the browser, we should have the env vars
    if (typeof window === 'undefined') {
      // Server-side during build: use placeholders to allow build to complete
      // The page should be marked as 'force-dynamic' to prevent static generation
      return createBrowserClient<Database>(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseAnonKey || 'placeholder-key'
      )
    }
    // Client-side: throw error if env vars are missing
    throw new Error(
      'Missing Supabase environment variables. Please check your .env file.'
    )
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
