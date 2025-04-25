import express from 'express';
import { create, getByUser } from '../controllers/appointment_controller';
import { getByBusiness } from '../controllers/appointment_controller'; // Business ID ile randevuları almak için controller'ı ekliyoruz 
import { getAppointmentDates } from '../controllers/appointment_controller'; // Business ID ile randevu tarihlerini almak için controller'ı ekliyoruz
import { remove } from '../controllers/appointment_controller'; // Randevuyu silmek için controller'ı ekliyoruz
const router = express.Router();

router.post('/', create); // POST /api/appointments
router.get('/user/:user_id', getByUser); // GET /api/appointments/user/:user_id
router.get('/business/:business_id', getByBusiness); 
// Örnek: GET /api/appointments/business/1
router.get('/business/:business_id/dates', getAppointmentDates);
router.delete('/:id', remove);

export default router;
