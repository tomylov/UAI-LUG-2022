import { Request, Response } from "express"
import userModel from "../models/blogs"

const userController = {
    get: async (req: Request, res: Response) => {
        try {
            const allUsers = await userModel.find()
            res.status(200).send(allUsers)
        } catch (error) {
            res.status(500).send(error)
        }  
    },
    add: async (req: Request, res: Response)  => {
        try {
            const myUser = new userModel({...req.body})
            await myUser.save()
            res.send(myUser)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    delete: async (req: Request, res: Response)  => {
        try {
            const id = req.params.id
            const user = await userModel.findOneAndDelete({_id: id})
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error)
        }
        
    },
    edit: async(req: Request, res: Response)  => {
        try {
            const id = req.params.id
            const user = await userModel.findOneAndUpdate({_id: id}, {...req.body})
            res.status(200).send(user)
        } catch (error) {
            res.status(500).send(error)
        }
    },
}

export default userController