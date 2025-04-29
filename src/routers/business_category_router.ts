import { Router } from 'express';
import * as bcCtrl from '../controllers/business_category_controller';
import { verifyToken } from '../middleware/auth_middleware';
import * as cbCtrl from '../controllers/category_controller';

const router = Router({ mergeParams: true });

// /api/businesses/:businessId/categories
router.get('/', bcCtrl.list);

// Ekleme & silme yetkisi sadece işletme sahibinde olsun:
router.post('/', verifyToken, bcCtrl.add);
router.delete('/:categoryId', verifyToken, bcCtrl.remove);
router.get('/categories/:categoryId/businesses', bcCtrl.listBusinesses);

export default router;
