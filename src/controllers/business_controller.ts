import { Response } from 'express';
import {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  getBusinessesByUserId,
} from '../services/business_service';
import { AuthRequest } from '../middleware/auth_middleware';

export const create = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.user?.role !== 'business') {
      res.status(403).json({ error: 'Sadece işletme hesabı oluşturabilir.' });
      return;
    }

    const payload = {
      ...req.body,
      user_id: req.user!.id,
    };

    const newBusiness = await createBusiness(payload);
    res.status(201).json(newBusiness);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAll = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const businesses = await getAllBusinesses();
    res.json(businesses);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const business = await getBusinessById(id);
    res.json(business);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
export const getMyBusiness = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const list = await getBusinessesByUserId(req.user!.id);
    if (!list.length) return void res.status(404).json({ error: 'İşletme bulunamadı' });
    res.json(list);                       // dizi biçiminde döner
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};