import express from 'express';
import 'dotenv/config';
import { connectToDatabase } from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload';
import { adminRoutes, podcastRoutes, authRoutes } from './routes';

const app = express();

app.use(clerkMiddleware())
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 }, // 50 MB
}));

const PORT = process.env.PORT || 3000;


app.use('/api/v1/auth', authRoutes)
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/podcasts", podcastRoutes);

app.listen(PORT, () => {
    connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})