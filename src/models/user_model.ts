
  // src/models/user_model.ts
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone?: string;
  role: 'user' | 'admin';
  is_verified: boolean;
  created_at: string;   // timestamp from Supabase
  updated_at: string;
}
