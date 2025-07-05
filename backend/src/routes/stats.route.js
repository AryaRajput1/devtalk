import { Router } from "express";
import { adminRoute, protectedRoute } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", protectedRoute, adminRoute, getStats)

export default router;