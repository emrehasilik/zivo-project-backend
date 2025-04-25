export interface Service {
    id?: number;
    business_id: number;
    name: string;
    description?: string;
    price: number;
    duration: number; // dakikada
    created_at?: string;
    updated_at?: string;
  }
  