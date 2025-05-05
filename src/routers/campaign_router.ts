import express from 'express';
import { verifyToken } from '../middleware/auth_middleware';
import { create, listByBusiness, remove , listAll } from '../controllers/campaign_controller';

const router = express.Router();

router.get('/', listAll); 
router.post('/', verifyToken, create);                       // POST /api/campaigns
router.get('/business/:businessId', listByBusiness);         // GET /api/campaigns/business/:id
router.delete('/:id', verifyToken, remove);                  // DELETE /api/campaigns/:id

export default router;
