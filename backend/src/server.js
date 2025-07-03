import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.route.js';
import { connectToDatabase } from './config/db.js';

const app = express();

const PORT = process.env.PORT || 3000;


app.use('/api/v1/auth', authRoutes)

app.listen(PORT, () => {

    connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})