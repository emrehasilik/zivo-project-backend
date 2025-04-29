// İşletme–Kategori eşleme modeli (junction)
export interface BusinessCategory {
    business_id: number;   // FK -> business(id)
    category_id: number;   // FK -> categories(id)
    created_at?: string;   // Supabase timestamp
  }
  