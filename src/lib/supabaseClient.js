import { createClient } from '@supabase/supabase-js'

// Utiliser les variables injectées au runtime ou fallback sur les variables de build
const supabaseUrl = window.RUNTIME_CONFIG?.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = window.RUNTIME_CONFIG?.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
    console.error('Variable d\'environnement manquante: VITE_SUPABASE_URL')
    throw new Error('VITE_SUPABASE_URL is required')
}

if (!supabaseAnonKey) {
    console.error('Variable d\'environnement manquante: VITE_SUPABASE_ANON_KEY')
    throw new Error('VITE_SUPABASE_ANON_KEY is required')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
