import { Request, Response } from "express"
import blogModel from "../models/blogs"
import commentModel from "../models/comment"

const userController = {
    get: async (req: Request, res: Response) => {
        try {
            const allUsers = await commentModel.find()
            res.status(200).send(allUsers)
        } catch (error) {
            res.status(500).send(error)
        }  
    },
    add: async (req: Request, res: Response)  => {
        try {
            const myComment = new commentModel({...req.body})
            await myComment.save()
            res.send(myComment)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    postComment: async (req: Request, res: Response)  => {
        try {
            const blogs = await blogModel.find({_id:req.params.id});
            if(blogs.length){
                blogs[0].comment.push({...req.body});
                blogs[0].save();
            }
        } catch (error) {
            res.status(500).send(error)
        }
    },
 /*    delete: async (req: Request, res: Response)  => {
        try {
            const id = req.params.id
            const user = await commentModel.findOneAndDelete({_id: id})
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error)
        }
        //se puede hacer un populate para traer todos los datos, 
        en vez de mostrar un id solo, muestra el nombre del mismo
        
    },
    edit: async(req: Request, res: Response)  => {
        try {
            const id = req.params.id
            const user = await commentModel.findOneAndUpdate({_id: id}, {...req.body})
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error)
        }
    }, */
}

export default userController