import { Request, Response } from "express"
import blogModel from "../models/blogs"

const userController = {
    get: async (req: Request, res: Response) => {
        try {
            const allUsers = await blogModel.find()
            res.status(200).send(allUsers)
        } catch (error) {
            res.status(500).send(error)
        }  
    },
    add: async (req: Request, res: Response)  => {
        try {
            const myBlog = new blogModel({...req.body});
            await myBlog.save()
            res.send(myBlog)
        } catch (error) {
            res.status(500).send(error)
        }
    },
/*     delete: async (req: Request, res: Response)  => {
        try {
            const id = req.params.id
            const user = await blogModel.findOneAndDelete({_id: id})
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error)
        }
        
    },
    edit: async(req: Request, res: Response)  => {
        try {
            const id = req.params.id
            const user = await blogModel.findOneAndUpdate({_id: id}, {...req.body})
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error)
        }
    }, */
}

export default userController