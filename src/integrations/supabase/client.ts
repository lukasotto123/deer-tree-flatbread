
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://vbghldtqvsjvgtqdcgxv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiZ2hsZHRxdnNqdmd0cWRjZ3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNDcwMzksImV4cCI6MjA2NTgyMzAzOX0.lFkiQR_Vrmf-wvyIFa5CckFD3fWl9P72o8i8eQLuGQQ'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
