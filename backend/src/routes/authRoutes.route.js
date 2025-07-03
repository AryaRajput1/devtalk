import express from 'express';

const router = express.Router();

router.post('/signup', (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.get('/login', (req, res) => {
    res.status(201).json({ message: 'User signed up successfully' });
})

router.post('/logout', (req, res) => {
    res.status(201).json({ message: 'User signed up successfully' });
})

export default router;