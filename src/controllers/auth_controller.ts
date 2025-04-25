import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth_service';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, phone, role } = req.body;
    const newUser = await registerUser({
      first_name,
      last_name,
      email,
      password_hash: password,
      phone,
      role
    });
    res.status(201).json({ message: 'Kayıt başarılı', user: newUser });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};
