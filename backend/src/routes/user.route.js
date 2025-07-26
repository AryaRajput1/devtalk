import { Router } from "express";
import { adminRoute, protectedRoute } from "../middlewares/auth.middleware.js";
import { getAllUsers, getMessages } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectedRoute, getAllUsers)
router.get("/messages/:userId", protectedRoute, getMessages)
export default router;