import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface AuthRequest extends Request {
  user?: { id: number; email: string; role: string };
}

export const verifyToken: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token gerekli' });
    return; // 🔑 void döndü
  }

  try {
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AuthRequest['user'];

    req.user = payload;
    next();
  } catch {
    res.status(403).json({ error: 'Token geçersiz' });
  }
};