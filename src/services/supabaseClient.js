import { createClient } from '@supabase/supabase-js'

// URL do teu projeto Supabase
const SUPABASE_URL = 'https://wxmkbyrfywznvivergnf.supabase.co'

// Chave pública (anon key) do Supabase
const SUPABASE_KEY = 'sb_publishable_f2aNP3gOG8koBYP2SbjMcA_UgrE-2M5'

// Cria e exporta o cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)