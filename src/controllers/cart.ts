import { Request, Response } from "express";
import cartModel from "../models/cart";
import productModel from "../models/product";
import providerModel from "../models/provider";


const cartController = {
getCart: async (req: Request, res: Response) => {
    try {
        const cart = await cartModel.find();
        let num:number= 0 ;
        cart[0].detail.forEach((valor)=>{
            num += valor.quantity * valor.price;
        })
        return res.status(200).send('el subtotal hasta el momento es de: '+ num);
    } catch (error) {
        return res.status(500).send(error);
    }
  },

  postcarrito: async (req: Request, res: Response) => {
    try {
      const cart = await cartModel.find();
      let index:number = 0;
      if (cart.length) {
        const cantProd:any = productModel.findOne(req.body.detail.product);
        if (cantProd[0].stock >= req.body.detail.quantity) {
            if(cart[0].detail.includes(req.body.detail.product)){
                cart[0].detail.forEach((newcant)=>{
                  index +=1;
                    if(newcant.product === req.body.detail[0].product){                                            
                      const cantidad = newcant.quantity + req.body.detail.quantity;
                    }
                })
            }else{ 
                const newCart = new cartModel(...req.body);
                await newCart.save();
            }
        }
      } else {
        const carro = new cartModel({ ...req.body });
        carro.save();
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deleteCart: async (req: Request, res: Response) => {
    try {
      const cart = await cartModel.find({ _id: req.params.id });
    } catch (error) {}
  },

}

export default cartController