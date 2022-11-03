import { Request, Response } from "express";
import cartModel from "../models/cart";
import productModel from "../models/product";
import providerModel from "../models/provider";


const cartController = {
getCart: async (req: Request, res: Response) => { //deberia estar
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
      if (cart.length) {
        var index = cart[0].detail.findIndex(i => i.product === ({...req.body.detail.product}));
        const stockdb:any = cart[0].detail.find(req.body.detail.product);
        var cantProd:any = cart[0].detail.find(i => i.quantity ===({...req.body.detail.product}));
        var suma:any=0;
        suma = cantProd + req.body.detail.quantity;
        if (stockdb[0].stock >= req.body.detail.quantity) {
            if(cart[0].detail.includes(req.body.detail.product)){ //si existe que se sume sino que se agregue el nuevo articulo
              //cambiar el quantity, este despues va en el delete en la parte de que cuando se reduce no se borre
              await cart[0].save();
              return res.status(200).send();
            }else{
                cart[0].detail.push({...req.body});
                await cart[0].save();
                return res.status(200).send();
            }
        }
      } else {
        const carro = new cartModel({ ...req.body }); //si no se econtro ningun carrito crearlo
        await carro.save();
        return res.status(200).send();
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  deleteCart: async (req: Request, res: Response) => { //ya deberia estar
    try {
      const cart = await cartModel.find({});
      var index = cart[0].detail.findIndex(i => i.product === ({...req.body.detail.product}));
      var cantProd:any = cart[0].detail.find(i => i.quantity ===({...req.body.detail.product}));
      var resta:any=0; //si pongo number no me deja
      resta = cantProd - req.body.detail.quantity;
      if(resta<=0){
         cart[0].detail.splice(index,1);
        await cart[0].save();
        return res.status(200).send();
      }else{
        cart[0].detail.splice(index,1,resta);
        await cart[0].save();
        return res.status(200).send();
      }

    } catch (error) {
      return res.status(500).send(error);
    }
  },

}

export default cartController