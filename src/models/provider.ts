import { Schema, model } from "mongoose";

const providerSchema = new Schema({
    name: {type: String, require: true},
    adress: {type: String, require: true},
});

const providerModel = model("Provider", providerSchema);

export default providerModel;