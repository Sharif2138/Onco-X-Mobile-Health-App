// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.VITE_SUPABASE_URL ?? '';
// const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY ?? '';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
