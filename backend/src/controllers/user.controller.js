import { currentUser } from "@clerk/nextjs/server";

export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;

        const users = await User.find({
            clerkId: {
                $ne: currentUserId
            }
        }).select("-password -__v").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        next(error);
    }
}