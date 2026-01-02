import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Supabase credentials missing in backend/.env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

console.log("📡 Backend connected to Supabase Database");
