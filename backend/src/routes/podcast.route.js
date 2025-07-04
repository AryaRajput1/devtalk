import { Router } from 'express';
import { adminRoute, protectedRoute } from '../middlewares/auth.middleware';
import { getAllPodcasts, getFeaturedPodcasts, getMadeForYouPodcasts, getTrendingPodcasts } from '../controllers/podcast.controller';

const router = Router();

router.use(protectedRoute)

router.get('/', adminRoute, getAllPodcasts);
router.get('/made-for-you', getMadeForYouPodcasts);
router.get('/trending', getTrendingPodcasts);
router.get('/featured', getFeaturedPodcasts);

export default router;