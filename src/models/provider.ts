import { Schema, model } from "mongoose";

const providerSchema = new Schema({
    providerId:{type:Number,required:true,unique:true},  
    name: {type: String, required: true},
    adress: {type: String, required: true},
});

const providerModel = model("Provider", providerSchema);

export default providerModel;