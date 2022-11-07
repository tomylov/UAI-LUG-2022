import { Schema, model } from "mongoose";

interface Iprov {
    productId: number,
    name:string,
    adress:string 
}

const providerSchema = new Schema({
    providerId:{type:Number,required:true,unique:true},  
    name: {type: String, required: true},
    adress: {type: String, required: true},
});

const providerModel = model<Iprov>("Provider", providerSchema);

export default providerModel;