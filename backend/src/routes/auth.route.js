import express from 'express';

const router = express.Router();

router.post('/callback', authCallback)

export default router;