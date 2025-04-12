import express from 'express';
import dotenv from 'dotenv';
import { connectDB, closeDB } from './utils/db_related.js';
import accountRoutes from './routes/accountRoutes.js';
import authRoutes from './routes/authentication.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: 'http://localhost:5173',
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
  res.send('Bank API is running with Sequelize...');
});

// ✅ Use the modular routes
app.use('/api/accounts', accountRoutes);
app.use('/api/auth', authRoutes);

process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeDB();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
