import { supabase } from '../config/db';
import { Staff } from '../models/staff_model';

export const getStaffByBusiness = async (business_id: number) => {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('business_id', business_id);

  if (error) throw error;
  return data;
};

export const createStaff = async (staff: Staff) => {
  const { data, error } = await supabase
    .from('staff')
    .insert([staff])
    .select()
    .single();

  if (error) throw error;
  return data;
};
