import { Schema, model } from "mongoose";

const productSchema = new Schema({
    productId:{type: Number, required:true,unique:true},
    name:{type: String, required:true},
    price:Number,
    stock:Number,
    providerId:{type:Number,ref:"Provider"},
})

const productModel = model("Product", productSchema);

export default productModel;