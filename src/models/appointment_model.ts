export interface Appointment {
    id?: number;
    business_id: number;
    staff_id: number;
    service_id: number;
    user_id: number;
    appointment_date: string; // YYYY-MM-DD
    start_time: string;       // HH:mm
    end_time: string;         // HH:mm
    status?: string;
    created_at?: string;
    updated_at?: string;
  }
  