import { Request, Response } from 'express';
import * as serviceService from '../services/service_service';

export const getByBusiness = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getServicesByBusiness(+req.params.business_id);
    res.json(services);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const created = await serviceService.createService(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
