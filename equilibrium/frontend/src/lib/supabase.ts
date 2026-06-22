import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project values
// Get them from: https://supabase.com → Your Project → Settings → API
const env = (import.meta as any).env || {}
const SUPABASE_URL      = env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY

function createMissingSupabaseClient() {
  const errorResponse = async () => ({ data: null, error: { message: 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.' } })
  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (callback: any) => {
        callback(null, null)
        return { data: { subscription: { unsubscribe: () => {} } } }
      },
      signOut: async () => ({ error: null }),
      signInWithPassword: async () => ({ error: { message: 'Supabase is not configured.' } }),
      signUp: async () => ({ data: { user: null }, error: { message: 'Supabase is not configured.' } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({ single: errorResponse }),
        single: errorResponse,
      }),
      insert: errorResponse,
    }),
  } as any
}

export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : createMissingSupabaseClient()

export type UserProfile = {
  id: string
  full_name: string
  email: string
  phone: string
  country: string
  province: string
  city: string
  cnic: string
  trading_experience: string
  profession: string
  created_at: string
  avatar_url?: string
}
