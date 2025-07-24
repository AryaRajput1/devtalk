import { Router } from 'express';
import { adminRoute, protectedRoute } from '../middlewares/auth.middleware.js';
import { createPlaylist, createPodcast, deletePlaylist, deletePodcast, checkAdminStatus } from '../controllers/admin.controller.js';

const router = Router();

router.use(protectedRoute, adminRoute);

router.post('/podcast', createPodcast);
router.delete('/podcast/:podcastId', deletePodcast);

router.post('/playlist', createPlaylist);
router.delete('/playlist/:id', deletePlaylist);

router.get('/checkAdminStatus', checkAdminStatus);

export default router