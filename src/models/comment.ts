import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    author:{type: Schema.Types.ObjectId, ref: "User" },
    date:Date,
    description:String    
})

const commentModel = model("Comment", commentSchema);

export default commentModel;