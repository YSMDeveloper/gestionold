import { dbConnect } from "../../../utils/mongoose";
import Faq from "../../../models/Faq"

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
                const faq = await Faq.findById(id);
                if(!faq) return res.status(404).json({msg: "Faq not found"});
                return res.status(200).json(faq);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "POST":
            try {
                const newFaq = new Item(body);
                const savedFaq = await newFaq.save();
                return res.status(201).json(savedFaq);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case "PUT":
            try {
                const faq = await Faq.findByIdAndUpdate(id, body, {new: true,});
                if(!faq) return res.status(404).json({msg: "Item not found"});
                return res.status(200).json(faq);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "DELETE":
            try {
                const deletedFaq = await Faq.findByIdAndDelete(id);
                if(!deletedFaq) return res.status(404).json({msg: "Faq not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
};