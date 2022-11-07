import { Schema, model } from "mongoose";

interface Iprod {
    productId: number,
    name:string,
    price:number,
    stock:number,
    providerId:number    
}

const productSchema = new Schema({
    productId:{type: Number, required:true,unique:true},
    name:{type: String, required:true},
    price:{type: Number,required:true},
    stock:{type: Number,required:true},
    providerId:{type:Number,ref:"Provider", required:true},
})

const productModel = model<Iprod>("Product", productSchema);

export default productModel;