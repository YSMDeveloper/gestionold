import { dbConnect } from "../../../utils/mongoose";
import QuickAccess from "../../../models/QuickAccess"
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
                const shortcut = await QuickAccess.findById(id);
                if(!shortcut) return res.status(404).json({msg: "QuickAccess not found"});
                return res.status(200).json(shortcut);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "POST":
            try {
                const newShortcut = new QuickAccess(body);
                const savedShortcut = await newShortcut.save();
                return res.status(201).json(savedShortcut);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case "PUT":
            try {
                const shortcut = await QuickAccess.findByIdAndUpdate(id, body, {new: true,});
                if(!shortcut) return res.status(404).json({msg: "QuickAccess not found"});
                return res.status(200).json(shortcut);
            } catch (error) {
                return res. status(500).json({msg: error.message});
            }
        case "DELETE":
            console.log("[id]",id)
            try {
                const deletedShortcut = await QuickAccess.findByIdAndDelete(id);
                console.log("deletedShortcut",deletedShortcut)
                if(!deletedShortcut) return res.status(404).json({msg: "QuickAccess not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
};