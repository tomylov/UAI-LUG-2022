import { Schema, model,Types,Document } from "mongoose";

export interface Idetail{  //solo da tipado(estructura) a un esquema
    product:{Types:Schema.Types.ObjectId,ref:"Product"},
    quantity: number,
    price:number,
}

interface ICart {
    detail: Idetail[]
}

const cartSchema = new Schema({
    detail:[
        {
            product:{type: Schema.Types.ObjectId,ref:"Product"},
            quantity:Number,
            price:Number,
    }
    ],
    total:Number,

});

const cartModel = model<ICart>("carts", cartSchema);

export default cartModel;