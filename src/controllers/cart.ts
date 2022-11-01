import { Request, Response } from "express";
import cartModel from "../models/cart";
import productModel from "../models/product";


const userController = {
getCart: async (req: Request, res: Response) => {
    try {
        const cart = await cartModel.find();
        let num:number= 0 ;
        cart[0].detail.forEach((valor)=>{
            num += valor.quantity * valor.price;
        })
        return res.status(200).send('el subtotal hasta el momento es de: '+ num);//cual es la diferencia entre Number y number pq no me dejaba sumar si creo la interfaz con Number
        //si esta bien concatenar con un + o tiene que ser con una coma
    } catch (error) {
        return res.status(500).send(error);
    }
  },

  postcarrito: async (req: Request, res: Response) => {
    try {
      const cart = await cartModel.find();
      let exist:boolean=false;
      if (cart.length) {
        const cantProd = productModel.findOne(req.body.detail.product);
        if (cantProd[0].stock >= req.body.detail.quantity) {
            if(cart[0].detail.includes(req.body.detail.product)){
                cart[0].detail.forEach((newcant)=>{

                    if(newcant.product = req.body.detail.product){
                        const newCart = new cartModel(...req.body);
                        newCart.detail[1] = newcant.quantity + req.body.detail.quantity;
                        newCart.save();
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
    } catch (error) {}
  },
  deleteCart: async (req: Request, res: Response) => {
    try {
      const cart = await cartModel.find({ _id: req.params.id });
    } catch (error) {}
  },

}

export default userController