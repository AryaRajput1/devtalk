import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {

        const { userId: currentUserId } = req.auth();


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