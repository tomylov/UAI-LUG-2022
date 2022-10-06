import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    tittle:String,
    author:{type: Schema.Types.ObjectId, ref: "User" },
    comment: [{type: Schema.Types.ObjectId, ref:"Comment"}],
    date:Date
});

const blogModel = model("Blog", blogSchema);

export default blogModel;