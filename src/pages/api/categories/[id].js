import { dbConnect } from "../../../utils/mongoose";
import Category from "../../../models/Category"

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
                console.log("Metodo GET")
                const category = await Category.findById(id);
                if(!category) return res.status(404).json({msg: "Category not found"});
                return res.status(200).json(category);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "POST":
            try {
                const newCategory = new Item(body);
                const savedCategory = await newCategory.save();
                return res.status(201).json(savedCategory);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case "PUT":
            try {
                const category = await Category.findByIdAndUpdate(id, body, {new: true,});
                if(!category) return res.status(404).json({msg: "Category not found"});
                return res.status(200).json(category);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "DELETE":
            try {
                const deletedCategory = await Category.findByIdAndDelete(id);
                if(!deletedCategory) return res.status(404).json({msg: "Category not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
};