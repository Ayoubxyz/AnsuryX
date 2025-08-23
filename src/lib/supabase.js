import { createClient } from '@supabase/supabase-js'
import { createDemoClient, isDemoMode } from './demoAuth'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Use demo client if in demo mode, otherwise use real Supabase
export const supabase = isDemoMode() 
  ? createDemoClient() 
  : createClient(supabaseUrl, supabaseKey)

export const isDemo = isDemoMode()

