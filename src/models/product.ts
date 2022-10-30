import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name:{String, require:true},
    price:Number,
    stock:Number,
    provider:{type:Schema.Types.ObjectId,ref:"Provider"},    
})

const productModel = model("Product", productSchema);

export default productModel;