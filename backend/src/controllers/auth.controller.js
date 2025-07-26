import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        if (!id || !firstName || !lastName || !imageUrl) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ clerkId: id });

        if (existingUser) {
            return res.status(200).json({ message: 'User already exists', success: true });
        }

        const newUser = new User({
            fullName: `${firstName || ''} ${lastName || ''}`,
            imageUrl,
            clerkId: id
        })

        await newUser.save();

        res.status(201).json({
            message: 'User signed up successfully',
            success: true
        })
    } catch (error) {
        console.error('Error in authCallback:', error);
        next(error);
    }
}