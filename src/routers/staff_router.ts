import express from 'express';
import { create, getByBusiness } from '../controllers/staff_controller';

const router = express.Router();

router.post('/', create);
router.get('/business/:business_id', getByBusiness);

export default router;
