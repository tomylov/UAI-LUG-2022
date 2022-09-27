import { Router } from "express";
import blogRoutes from "./blogs";

const router = Router();
// todas las rutas que lleguen a /api/blogs, ejecutaran lo que se exporto de blogRoutes
router.use("/blogs", blogRoutes);

// se pueden agregar todas las rutas que se necesiten, estaran dentro de /api

export default router;
