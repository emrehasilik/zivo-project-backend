import { supabase } from '../config/db';
import { Business } from '../models/business_model';

// Yeni iş yeri oluştur
export const createBusiness = async (business: Business) => {
    const { data, error } = await supabase
    .from('business')
      .insert([business])
      .select()
      .single();
  
      if (error) {
        console.error('💥 Supabase insert error:', JSON.stringify(error, null, 2));
        throw error;
      }
      
  
    return data;
  };
  
// Tüm işletmeleri getir
export const getAllBusinesses = async () => {
  const { data, error } = await supabase
    .from('business')
    .select('*');

  if (error) throw error;
  return data;
};

// Belirli bir işletmeyi getir (id'ye göre)
export const getBusinessById = async (id: number) => {
  const { data, error } = await supabase
    .from('business')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};
// …diğer importlar
export const getBusinessesByUserId = async (user_id: number) => {
  const { data, error } = await supabase
    .from('business')
    .select('*')
    .eq('user_id', user_id);

  if (error) throw error;
  return data as any[];            // 0-N kayıt
};