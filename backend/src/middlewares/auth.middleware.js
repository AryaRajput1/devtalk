import { clerkClient } from "@clerk/express";

const adminEmails = process.env.ADMIN_EMAILS || '';

const ADMIN_EMAILS = adminEmails.split('&').map(email => email.trim().toLowerCase());
export const protectedRoute = (req, res, next) => {
    const { auth } = req;

    if (!auth || !auth.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
}

export const adminRoute = async (req, res, next) => {
    const { auth } = req;

    if (!auth || !auth.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await clerkClient.users.getCount({ userId: auth.userId });
    const userEmail = user.emailAddresses[0].emailAddress.toLowerCase();

    if (!ADMIN_EMAILS.includes(userEmail)) {
        return res.status(403).json({ message: 'Forbidden - You are no admin' });
    }

    next();
}
