import { Router } from 'express';
import { getAll, getById, create, remove } from '../controllers/category_controller';

const router = Router();

// GET /api/categories
router.get('/', getAll);

// GET /api/categories/:id
router.get('/:id', getById);

// POST /api/categories
router.post('/', create);

// DELETE /api/categories/:id
router.delete('/:id', remove);


export default router;
