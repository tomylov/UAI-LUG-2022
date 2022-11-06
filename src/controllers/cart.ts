import { Request, Response } from "express";
import cartModel from "../models/cart";
import productModel from "../models/product";


const cartController = {
getCart: async (req: Request, res: Response) => { //deberia estar
    try {
/*          const cart = await cartModel.find();
        let num:number= 0 ;
        cart[0].detail.forEach((valor)=>{
            num += valor.quantity * valor.price;
        })
        cart[0].total=num;
        cart[0].save(); */
        const prod = await productModel.find();
        return res.status(200).send('el subtotal hasta el momento es de: '+ prod); 
    } catch (error) {
        return res.status(500).send(error);
    }
  },

  postcarrito: async (req: Request, res: Response) => {
    try {
      const cart = await cartModel.find();
      const products = await productModel.find();
      if (cart.length) {
        const stockdb:any = products.find((i: any) => i.productId === req.body.productId);
        console.log("sorckdb:", stockdb);
        if (stockdb.stock >= req.body.quantity) { //la cantidad que mando por body debe ser menor o igual a lo que tengo en stock
          console.log("entro como la vale");
          const cartDet:any = cart[0].detail.find((i: any) => i.productId === req.body.productId);
          console.log(cartDet);
            if(cartDet){ //si existe que se sume sino que se agregue el nuevo articulo
              //cambiar el quantity, este despues va en el delete en la parte de que cuando se reduce no se borre
              console.log("entro como la vale 2");                                      
              const suma = cartDet.quantity + req.body.quantity;
              console.log(suma);
                const newBody ={
                  productId:req.body.productId,
                  quantity:suma,
                  price:req.body.price
                };
                console.log("antes del splice",cart);
                const index = cart[0].detail.findIndex(i => i.productId === req.body.productId);
                console.log("INDEEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",index);
                await cart[0].detail.splice(index,1,newBody);
                console.log("later of the splice", cart[0].detail);
                await cart[0].save();    
              
              return res.status(200).send("se agrego una nueva cantidad en el carrito");
            }else{ //no encuentro el product id dentro del detalle por ende agrego uno nuevo
                cart[0].detail.push({...req.body});
                await cart[0].save();
                return res.status(200).send("se creo el detalle");
            }
        }else{ //sale ya que estoy mandando mas stock que el que tengo en la bd
          return res.status(400).send("stock insuficiente");
        }
      } else {
        const carro = new cartModel({ ...req.body }); //si no se econtro ningun carrito crearlo
        await carro.save();
        return res.status(200).send("se creo el carrito con su detalle");
        }

    } catch (error) {
      return res.status(500).send(error);
    }
  },

  deleteCart: async (req: Request, res: Response) => { //ya deberia estar
    try {
      const cart = await cartModel.find();
      const index = cart[0].detail.findIndex((i:any) => i.productId === req.body.productId); //busco el index del producto
      console.log(index);
      const cantProd:any = cart[0].detail.find((i: any)  => i.productId ===req.body.productId); //busco el producto
      console.log(cantProd);
      if(index>=0){ 
      const resta = cantProd.quantity - req.body.quantity;
      if(resta<=0){
         cart[0].detail.splice(index,1);
        //await cart[0].save();
        console.log(cart[0].detail);
        return res.status(200).send('producto eliminado con exito');
      }else{
        const newBody ={
          productId:req.body.productId,
          quantity:resta,
          price:req.body.price
        };
        cart[0].detail.splice(index,1,newBody);
        //await cart[0].save();
        console.log(cart[0].detail);
        return res.status(200).send('cantidad extraida con exito');
      }}else{
        return res.status(404).send('id ingresado desconocido')
      }

    } catch (error) {
      return res.status(500).send(error);
    }
  },

}


export default cartController