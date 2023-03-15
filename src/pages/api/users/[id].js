import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/User"

dbConnect();

export default async (req, res) => {
    const {
        method,
        body,
        query: {id},
    } = req;

    switch (method) {
        case "GET":
            try {
                const user = await User.findById(id);
                if(!user) return res.status(404).json({msg: "User not found"});
                return res.status(200).json(user);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "POST":
            try {
                const newUser = new User(body);
                const savedUser = await newUser.save();
                return res.status(201).json(savedUser);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case "PUT":
            try {
                const user = await User.findByIdAndUpdate(id, body, {new: true,});
                if(!user) return res.status(404).json({msg: "User not found"});
                return res.status(200).json(user);
            } catch (error) {
                return res. status(500).json({msg: error.message});
            }
        case "DELETE":
            try {
                const deletedUser = await User.findByIdAndDelete(id);
                if(!deletedUser) return res.status(404).json({msg: "User not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
};