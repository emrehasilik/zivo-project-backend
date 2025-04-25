export interface Staff {
    id?: number;
    business_id: number;
    first_name: string;
    last_name: string;
    position?: string;
    phone?: string;
    email?: string;
    status?: string;  // active / inactive
    created_at?: string;
    updated_at?: string;
  }
  