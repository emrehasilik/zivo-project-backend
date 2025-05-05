import { supabase } from '../config/db';
import { Appointment } from '../models/appointment_model';

// ---------- RANDEVU OLUŞTUR ----------
export const createAppointment = async (appointment: Appointment) => {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      ...appointment,
      // Supabase için ISO-8601 gerekmez; string 'YYYY-MM-DD' + 'HH:mm' yeter.
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ---------- KULLANICI BAZLI LİSTE ----------
// services/appointment_service.ts
export const getAppointmentsByUser = async (user_id: number) => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      id, appointment_date, start_time, end_time, status,
      business:business_id ( id, name, address, phone ),
      service:service_id   ( id, name, price, duration ),
      staff:staff_id       ( id, first_name, last_name )
    `)
    .eq('user_id', user_id)
    .order('appointment_date', { ascending: true })
    .order('start_time',       { ascending: true });

  if (error) throw error;
  return data;
};


// ---------- İŞLETME BAZLI LİSTE ----------
export const getAppointmentsByBusiness = async (business_id: number) => {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      id, user:user_id ( id, first_name, last_name ),
      service:service_id ( id, name, price ),
      staff:staff_id ( id, first_name, last_name ),
      appointment_date, start_time, end_time, status
    `)
    .eq('business_id', business_id)
    .order('appointment_date', { ascending: true })
    .order('start_time',       { ascending: true });

  if (error) throw error;
  return data;
};


// ---------- SADECE TARİHLER ----------
export const getAppointmentDatesByBusiness = async (business_id: number) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('appointment_date')
    .eq('business_id', business_id)
    .order('appointment_date', { ascending: true })
    .neq('status', 'cancelled')     // İptal edilenleri hariç tutmak istersen
    .then();                        // DISTINCT yoksa tekrarlar gelir

  if (error) throw error;
  return data;
};
export const deleteAppointment = async (id: number) => {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
};