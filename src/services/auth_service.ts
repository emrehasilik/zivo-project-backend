import { supabase } from '../config/db';
import bcrypt from 'bcryptjs';
import { User } from '../models/user_model';

export const registerUser = async (user: Omit<User, 'id' | 'is_verified' | 'created_at' | 'updated_at'>) => {
  const password_hash = await bcrypt.hash(user.password_hash, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ 
      ...user, 
      password_hash, 
      is_verified: false 
    }]);

  if (error) throw error;
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) throw new Error('Kullanıcı bulunamadı');

  const isValid = await bcrypt.compare(password, data.password_hash);
  if (!isValid) throw new Error('Şifre yanlış');

  return data;
};
