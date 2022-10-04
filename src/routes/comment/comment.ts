import { Router } from "express";
import userController from "../../controllers/comment";

const router = Router()
//router.get("/", userController.get)
router.post("/", userController.add)
//router.delete("/:id", userController.delete)
//router.put("/:id", userController.edit)

export default router