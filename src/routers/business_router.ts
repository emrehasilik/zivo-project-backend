import express from 'express';
import { create, getAll, getById, getMyBusiness } from '../controllers/business_controller';
import { verifyToken } from '../middleware/auth_middleware'; // Token doğrulama middleware'ini ekliyoruz
import categoryRouter from './business_category_router';

const router = express.Router();

router.post('/', verifyToken, create); // POST /api/businesses
router.get('/', getAll);               // GET /api/businesses
router.get('/my', verifyToken, getMyBusiness);   //  GET /api/businesses/my
router.use('/:businessId/categories', categoryRouter);
router.get('/:id', getById);           // GET /api/businesses/:id

export default router;