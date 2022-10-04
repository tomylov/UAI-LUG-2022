import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    date:Date,
    description:String
})

const commentModel = model("Comment", commentSchema);

export default commentModel;