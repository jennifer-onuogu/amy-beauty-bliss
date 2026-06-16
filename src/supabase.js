import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://fkllsjhagnfialcjjsxv.supabase.co"
const SUPABASE_KEY = "sb_publishable_Fg_x_ME1_0TOvS9Bwk-LbA_7kcT2PXr"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)