// src/controllers/user_controller.ts
import { Request, Response } from 'express';
import { supabase } from '../config/db'; // Adjust the import path as necessary


export const getAllUsers = async (req: Request, res: Response): Promise<Response | void> => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Error fetching users' });
  }

  return res.status(200).json(data);
};
