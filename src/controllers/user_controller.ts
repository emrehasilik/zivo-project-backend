// src/controllers/user_controller.ts
import { Request, Response } from 'express';
import {
  getUserById,
  getAllUsers,
  updateUserById
} from '../services/user_service';
import { AuthRequest } from '../middleware/auth_middleware';

// GET /api/users/me
export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUserById(req.user!.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
};

// PUT /api/users/me
export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const allowed = ['first_name', 'last_name', 'email', 'password', 'phone'];
    const updates: any = {};

    // Sadece izin verilen alanları al
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) {
        updates[key === 'password' ? 'password_hash' : key] = req.body[key];
      }
    });

    const updatedUser = await updateUserById(req.user!.id, updates);
    res.json({ message: 'Profil güncellendi', user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// Admin GET /api/users
export const getUsersForAdmin = async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ error: 'Yetkiniz yok' });
    return;
  }

  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
