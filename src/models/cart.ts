import { Schema, model,Types,Document } from "mongoose";

export interface Idetail{  //solo da tipado(estructura) a un esquema
    productId:number,
    quantity: number,
    price:number,
}

interface ICart {
    detail: Idetail[],
    cartId:number,
    total:number
}

const cartSchema = new Schema({
    cartId:{type:Number,unique:true,required:true},
    detail:[
        {
            productId:{type: Number,ref:"Product",required:true},
            quantity:Number,
            price:Number,
    }
    ],
    total:Number,

});

const cartModel = model<ICart>("carts", cartSchema);

export default cartModel;