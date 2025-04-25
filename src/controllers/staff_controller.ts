import { Request, Response } from 'express';
import * as staffService from '../services/staff_service';

export const getByBusiness = async (req: Request, res: Response) => {
  try {
    const staff = await staffService.getStaffByBusiness(+req.params.business_id);
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const created = await staffService.createStaff(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
