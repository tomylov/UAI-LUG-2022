import { Request, Response } from "express";
import cartModel from "../models/cart";
import productModel from "../models/product";


const cartController = {
  getCart: async (req: Request, res: Response) => { //deberia estar
    try {
      const cart = await cartModel.find();
      let num: number = 0;
      cart[0].detail.forEach((valor) => {
        num += valor.quantity * valor.price;
      })
      cart[0].total = num;
      cart[0].save();
      return res.status(200).send('el subtotal es de: ' + num);
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  postcarrito: async (req: Request, res: Response) => {
    try {
      const cart = await cartModel.find();
      const products = await productModel.find();
      const stockdb: any = products.find((i: any) => i.productId === req.body.productId);
      if (stockdb) { //busco que el id del producto ingresado exista    
        if (cart.length) {
          if (stockdb.stock >= req.body.quantity) { //la cantidad que mando por body debe ser menor o igual a lo que tengo en stock
            const cartDet: any = cart[0].detail.find((i: any) => i.productId === req.body.productId);
            if (cartDet) { //si existe que se sume sino que se agregue el nuevo articulo                                                   
              const suma = cartDet.quantity + req.body.quantity;
              const newBody = {
                productId: req.body.productId,
                quantity: suma,
                price: stockdb.price
              };
              const index = cart[0].detail.findIndex(i => i.productId === req.body.productId);
              await cart[0].detail.splice(index, 1, newBody);
              await productModel.findOneAndUpdate( //hago el update dentro de la base de datos
                { productId: req.body.productId },
                { "stock": stockdb.stock - req.body.quantity },
                { new: true }
              );
              await cart[0].save();
              return res.status(200).send("cantidad modificada en el detalle");
            } else { //no encuentro el product id dentro del detalle por ende agrego uno nuevo
              cart[0].detail.push({ ...req.body, 'price': stockdb.price });
              await cart[0].save();
              await productModel.findOneAndUpdate(
                { productId: req.body.productId },
                { "stock": stockdb.stock - req.body.quantity },
                { new: true }
              );
              return res.status(200).send("se agrego un nuevo producto en el detalle con exito");
            }
          } else { //sale ya que estoy mandando mas stock que el que tengo en la bd
            return res.status(400).send("stock insuficiente");
          }
        } else {          
          const carro = new cartModel({ 'cartId': 1, 'detail': [{ ...req.body, 'price': stockdb.price }], 'total': 0 }); //si no se econtro ningun carrito crearlo          
          await carro.save();
          await productModel.findOneAndUpdate( //hago el update dentro de la base de datos
            { productId: req.body.productId },
            { "stock": stockdb.stock - req.body.quantity },
            { new: true }
          );
          return res.status(200).send("se creo el carrito con su detalle");
        }
      } else { //el del producto ingresado no existe
        return res.status(400).send("id del producto invalido");
      }

    } catch (error) {
      return res.status(500).send(error);
    }
  },

  deleteCart: async (req: Request, res: Response) => {
    try {
      const cart = await cartModel.find();
      const products = await productModel.find();
      const index = cart[0].detail.findIndex((i: any) => i.productId === req.body.productId); //busco el index del producto      
      const cantProd: any = cart[0].detail.find((i: any) => i.productId === req.body.productId); //busco el producto
      const stockdb: any = products.find((i: any) => i.productId === req.body.productId);
      if (index >= 0) {
        const resta = cantProd.quantity - req.body.quantity;
        if (resta <= 0) {
          const sumStock: number = cantProd.quantity;
          cart[0].detail.splice(index, 1);
          await cart[0].save();
          await productModel.findOneAndUpdate( //hago el update dentro de la base de datos
            { productId: req.body.productId },
            { "stock": stockdb.stock + sumStock }, //como se borra todo el detalle venta
            { new: true }
          );
          return res.status(200).send('producto eliminado con exito');
        } else {
          const newBody = {
            productId: req.body.productId,
            quantity: resta,
            price: stockdb.price
          };
          cart[0].detail.splice(index, 1, newBody);
          await cart[0].save();
          await productModel.findOneAndUpdate( //hago el update dentro de la base de datos
            { productId: req.body.productId },
            { "stock": stockdb.stock + req.body.quantity }, //como se borra todo el detalle venta
            { new: true }
          );
          return res.status(200).send('cantidad extraida con exito');
        }
      } else {
        return res.status(404).send('id ingresado desconocido/no encotrado dentro del detalle')
      }

    } catch (error) {
      return res.status(500).send(error);
    }
  },

}


export default cartController