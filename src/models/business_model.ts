export interface Business {
  id?: number;
  user_id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  photo_url?: string;    // ✅ Fotoğraf url'si eklendi
  created_at?: string;
  updated_at?: string;
}
