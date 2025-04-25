import { Request, Response } from 'express';
import * as service from '../services/appointment_service';

// ------------- POST /api/appointments -------------
export const create = async (req: Request, res: Response) => {
  try {
    const created = await service.createAppointment(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// ------------- GET /api/appointments/user/:user_id -------------
export const getByUser = async (req: Request, res: Response) => {
  try {
    const data = await service.getAppointmentsByUser(+req.params.user_id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// ------------- GET /api/appointments/business/:business_id -------------
export const getByBusiness = async (req: Request, res: Response) => {
  try {
    const data = await service.getAppointmentsByBusiness(+req.params.business_id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// ------------- GET /api/appointments/business/:business_id/dates -------------
export const getAppointmentDates = async (req: Request, res: Response) => {
  try {
    const data = await service.getAppointmentDatesByBusiness(+req.params.business_id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
import { deleteAppointment } from '../services/appointment_service';

export const remove = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const result = await deleteAppointment(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};
