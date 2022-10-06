import { Router } from "express";
import userController from "../../controllers/user";

const router = Router()
router.get("/", userController.get)
router.post("/", userController.add)
router.delete("/:id", userController.delete)
router.put("/:id", userController.edit)
//"api/users"
export default router
