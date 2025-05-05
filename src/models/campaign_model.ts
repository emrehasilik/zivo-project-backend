export interface Campaign {
    id?: number;                // SERIAL
    business_id: number;        // İşletme FK
    title: string;
    description?: string;
    start_date: string;         // 'YYYY-MM-DD'
    end_date: string;           // 'YYYY-MM-DD'
    discount: number;           // % veya tutar
    created_at?: string;
    updated_at?: string;
  }
  