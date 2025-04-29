import { supabase } from '../config/db';
import { Category } from '../models/category_model';

// Yeni kategori oluştur
export const createCategory = async (category: { name: string; description: string }) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([{ name: category.name, description: category.description }])
    .select()
    .single();

  if (error) {
    console.error('💥 Supabase insert error:', JSON.stringify(error, null, 2));
    throw error;
  }

  return data;
};

// Tüm kategorileri getir
export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) throw error;
  return data;
};

// ID'ye göre kategori getir
export const getCategoryById = async (id: number) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Kategori sil
export const deleteCategory = async (id: number) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
