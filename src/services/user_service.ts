// src/services/user_service.ts
import { supabase } from '../config/db';
import bcrypt from 'bcryptjs';
import { User } from '../models/user_model';

// GET user by ID
export const getUserById = async (id: number) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) throw error ?? new Error('Kullanıcı bulunamadı');
  return data;
};

// GET all users
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) throw error;
  return data;
};

// UPDATE user by ID
export const updateUserById = async (
    id: number,
    updates: Partial<Pick<User, 'first_name' | 'last_name' | 'email' | 'password_hash' | 'phone'>>
  ) => {
    if (updates.password_hash) {
      updates.password_hash = await bcrypt.hash(updates.password_hash, 10);
    }
  
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single(); // <<-- önemli
  
    if (error || !data) throw error ?? new Error('Güncelleme başarısız');
    return data;
  };
  