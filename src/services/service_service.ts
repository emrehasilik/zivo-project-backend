import { supabase } from '../config/db';
import { Service } from '../models/service_model';

export const getServicesByBusiness = async (business_id: number) => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('business_id', business_id);

  if (error) throw error;
  return data;
};

export const createService = async (service: Service) => {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();

  if (error) throw error;
  return data;
};
