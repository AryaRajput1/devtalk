import express from 'express';
import 'dotenv/config';
import { connectToDatabase } from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload';
import { adminRoutes, podcastRoutes, authRoutes, playlistRoutes, usersRoutes } from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}))

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
app.use('/api/v1/playlists', playlistRoutes);
app.use('/api/v1/users', usersRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})