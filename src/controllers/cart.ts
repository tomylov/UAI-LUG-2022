import { Request, Response } from "express"
import cartModel from "../models/cart"
import productModel from "../models/product";


const userController = {
postcarrito:async (req:Request,res:Response) => {
    try {
        const cart = await cartModel.find({_id:req.params.id});
        if(cart.length)
        {
            const cantProd = productModel.findById(req.body.product);
            if(cantProd[0].stock <= req.body.quantity){
                
            }
                        
        }else{
            const carro = new cartModel({...req.body});
            carro.save();
        }
    } catch (error) {
            
    }    
}
}

export default userController