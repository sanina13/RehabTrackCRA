import { createClient } from '@supabase/supabase-js'


const SUPABASE_URL = 'https://wxmkbyrfywznvivergnf.supabase.co'

// Chave
const SUPABASE_KEY = 'sb_publishable_f2aNP3gOG8koBYP2SbjMcA_UgrE-2M5'


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)