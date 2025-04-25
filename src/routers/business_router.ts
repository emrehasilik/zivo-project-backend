import express from 'express';
import { create, getAll, getById, getMyBusiness } from '../controllers/business_controller';
import { verifyToken } from '../middleware/auth_middleware'; // Token doğrulama middleware'ini ekliyoruz

const router = express.Router();

router.post('/', verifyToken, create); // POST /api/businesses
router.get('/', getAll);               // GET /api/businesses
router.get('/my', verifyToken, getMyBusiness);   //  GET /api/businesses/my

router.get('/:id', getById);           // GET /api/businesses/:id

export default router;