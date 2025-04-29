import { Request, Response } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
} from '../services/category_service';

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const category = await getCategoryById(id);
    res.json(category);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    const newCategory = await createCategory({ name, description });
    res.status(201).json(newCategory);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    await deleteCategory(id);
    res.status(204).send(); // No content
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
