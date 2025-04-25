import express, { Request, Response } from 'express';
import { supabase } from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/auth_router'; // Auth router'ı ekliyoruz
import businessRouter from './routers/business_router'; // Business router'ı ekliyoruz
import appointmentRouter from './routers/appointment.router'; 
import staffRouter from './routers/staff_router'; // Staff router'ı ekliyoruz
import serviceRouter from './routers/service_router'; // Service router'ı ekliyoruz

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ ROUTE'ları ekliyoruz
app.use('/api/auth', authRouter);
app.use('/api/businesses', businessRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/staff', staffRouter);
app.use('/api/services', serviceRouter);

// Veritabanı bağlantısını kontrol et
const checkDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);

    if (error) {
      console.error('❌ Supabase bağlantısı başarısız:', error.message);
    } else {
      console.log('✅ Supabase veritabanı bağlantısı başarılı!');
    }
  } catch (err) {
    console.error('❌ Supabase bağlantısı sırasında hata oluştu:', err);
  }
};

// Test endpoint
app.get('/', async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    res.status(500).json({ error: error.message }); // ❌ Response döndürmüyoruz
    return;                                         // sadece akışı sonlandırıyoruz
  }

  res.json({ users: data });
});


// Server başlatma işlemi
const startServer = async () => {
  await checkDatabaseConnection();

  app.listen(port, () => {
    console.log(`🚀 Server çalışıyor: http://localhost:${port}`);
  });
};

startServer();
