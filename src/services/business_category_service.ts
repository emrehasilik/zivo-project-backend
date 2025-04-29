import { supabase } from '../config/db';
import { BusinessCategory } from '../models/business_category_model';

// İşletmeye kategori ekle
export const addCategoryToBusiness = async (
  business_id: number,
  category_id: number
) => {
  const { error } = await supabase
    .from('business_categories')
    .insert([{ business_id, category_id }]);

  if (error) throw error;
};

// İşletmeden kategori sil
export const removeCategoryFromBusiness = async (
  business_id: number,
  category_id: number
) => {
  const { error } = await supabase
    .from('business_categories')
    .delete()
    .eq('business_id', business_id)
    .eq('category_id', category_id);

  if (error) throw error;
};

// Belirli işletmenin kategorilerini çek
export const getCategoriesOfBusiness = async (business_id: number) => {
  const { data: categoryIds, error: categoryError } = await supabase
    .from('business_categories')
    .select('category_id')
    .eq('business_id', business_id);

  if (categoryError) throw categoryError;

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, description')
    .in('id', categoryIds?.map((item) => item.category_id) || []);

  if (error) throw error;

  return data;
};

// Belirli kategorideki işletmeleri çek
export const getBusinessesOfCategory = async (category_id: number) => {
  const { data: rows, error: bcErr } = await supabase
    .from('business_categories')
    .select('business_id')
    .eq('category_id', category_id);

  if (bcErr) throw bcErr;

  const ids = rows?.map(r => r.business_id) || [];

  if (ids.length === 0) return []; // Eğer bu kategoride işletme yoksa boş array döndür

  const { data, error } = await supabase
    .from('business')
    .select('id, name, address,city,  phone')  // İstersen ekstra field ekleyebilirsin
    .in('id', ids);

  if (error) throw error;

  return data;
};
