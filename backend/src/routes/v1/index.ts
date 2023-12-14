import express from "express";

import authRoutes from "./auth.route";
import fileRoutes from "./file.route";

import jwtAuth from "../../middlewares/jwt-auth.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/file", fileRoutes);

export default router;
