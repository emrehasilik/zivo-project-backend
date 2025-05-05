// src/routers/user_router.ts
import express from 'express';
import { verifyToken } from '../middleware/auth_middleware';
import {
  getMyProfile,
  updateMyProfile,
  getUsersForAdmin
} from '../controllers/user_controller';

const router = express.Router();

// Kendin
router.get('/me', verifyToken, getMyProfile);
router.put('/me', verifyToken, updateMyProfile);

// Admin
router.get('/', verifyToken, getUsersForAdmin);

export default router;
