import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    tittle:{String,require:true},
    author:{type: Schema.Types.ObjectId, ref: "User" },
    comment: [{type: Schema.Types.ObjectId, ref:"Comment"}],
    date:{type:Date,default:Date.now},
});

const blogModel = model("Blog", blogSchema);

export default blogModel;