import { Router } from 'express';
import { adminRoute, protectedRoute } from '../middlewares/auth.middleware';

const router = Router();

router.use(protectedRoute, adminRoute);

router.post('/podcast', createPodcast);
router.delete('/podcast/:id', deletePodcast);

router.post('/playlist', createPlaylist);
router.post('/playlist/:id', deletePlaylist);

export default router