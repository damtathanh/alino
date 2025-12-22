import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

// Note: In a real backend, you might use SUPABASE_SERVICE_ROLE_KEY for admin tasks
// const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    // Warn but don't crash dev server immediately if keys are missing, 
    // though endpoints might fail.
    console.warn('⚠️ Missing Supabase environment variables in API')
}

// Default to null if missing to allow server start
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
