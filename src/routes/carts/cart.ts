import { Router } from "express";
import cartController from "../../controllers/cart";


const router = Router()
router.get("/", cartController.getCart)
router.post("/", cartController.postcarrito)
router.delete("/", cartController.deleteCart) 
//"localhost:3000/api/blog/elid/comment"
export default router