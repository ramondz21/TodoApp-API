import express from 'express'
import { createTable } from './models/todoModel';
import router from './routes/todoRoutes';

createTable()

const app = express()
app.use(express.json());
app.use('/api', router)
app.listen(3000, () => console.log('Server berjalan di port 3000!'))