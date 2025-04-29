import { Request, Response } from 'express';
import {
  addCategoryToBusiness,
  removeCategoryFromBusiness,
  getCategoriesOfBusiness,
    getBusinessesOfCategory,
} from '../services/business_category_service';

// GET /api/businesses/:businessId/categories
export const list = async (req: Request, res: Response) => {
  try {
    const businessId = Number(req.params.businessId);
    const categories = await getCategoriesOfBusiness(businessId);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Kategoriler alınamadı', detail: err });
  }
};

// POST /api/businesses/:businessId/categories { categoryId }
export const add = async (req: Request, res: Response) => {
  try {
    const businessId = Number(req.params.businessId);
    const { categoryId } = req.body;

    await addCategoryToBusiness(businessId, categoryId);
    res.status(201).json({ message: 'Kategori eklendi' });
  } catch (err) {
    res.status(500).json({ error: 'Ekleme başarısız', detail: err });
  }
};

// DELETE /api/businesses/:businessId/categories/:categoryId
export const remove = async (req: Request, res: Response) => {
  try {
    const businessId = Number(req.params.businessId);
    const categoryId = Number(req.params.categoryId);

    await removeCategoryFromBusiness(businessId, categoryId);
    res.json({ message: 'Kategori silindi' });
  } catch (err) {
    res.status(500).json({ error: 'Silme başarısız', detail: err });
  }
};

export const listBusinesses = async (req: Request, res: Response) => {
    try {
      const categoryId = Number(req.params.categoryId);
      const businesses = await getBusinessesOfCategory(categoryId);
      res.json(businesses);
    } catch (err) {
      res.status(500).json({ error: 'İşletmeler alınamadı', detail: err });
    }
  };