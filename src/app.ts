import express from 'express';
import todoRouter from './routes/todoRoutes';
import authRouter from './routes/authRoutes';
import { initTables } from './models/todoModel';
import { authenticate } from './middleware/authMiddleware';

initTables()

const app = express();
app.use(express.json());
app.use('/api', authRouter);
app.use('/api', authenticate, todoRouter)
app.listen(3000, () => console.log('Server jalan di port 3000!'));