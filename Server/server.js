import express from 'express';
import {connectDB, closeDB} from './utils/db_related.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.send('Bank API is running with Sequelize...');
});

process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeDB();
    process.exit(0);
});


// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
