import { dbConnect } from "../../../utils/mongoose";
import Item from "../../../models/Item"
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
                const item = await Item.findById(id);
                if(!item) return res.status(404).json({msg: "Item not found"});
                return res.status(200).json(item);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "POST":
            try {
                const newItem = new Item(body);
                const savedItem = await newItem.save();
                return res.status(201).json(savedItem);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case "PUT":
            try {
                const item = await Item.findByIdAndUpdate(id, body, {new: true,});
                if(!item) return res.status(404).json({msg: "Item not found"});
                return res.status(200).json(item);
            } catch (error) {
                return res. status(500).json({msg: error.message});
            }
        case "DELETE":
            console.log("[id]",id)
            try {
                const deletedItem = await Item.findByIdAndDelete(id);
                console.log("deletedItem",deletedItem)
                if(!deletedItem) return res.status(404).json({msg: "Item not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
};