export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    phone: string;
    role: string;
    is_verified: boolean;
    created_at?: string;
    updated_at?: string;
  }
  