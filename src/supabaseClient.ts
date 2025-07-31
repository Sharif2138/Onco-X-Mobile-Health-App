import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jitbhdouiespuupeizja.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppdGJoZG91aWVzcHV1cGVpemphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NDk2MTEsImV4cCI6MjA2OTUyNTYxMX0._D8gKnv7Uku-DurXD4E2_-t_FLO9ypz5Yd9X6M9lZJM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
