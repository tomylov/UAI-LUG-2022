import { Router } from "express";
import blogRoutes from "./blogs";

const router = Router();

router.use("/blogs", blogRoutes);

export default router;
