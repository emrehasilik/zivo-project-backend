// src/config/db.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.supabaseUrl || '';
const supabaseAnonKey = process.env.supabaseAnonKey || '';




if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL veya Anon Key eksik!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
