import {dbConnect} from '../../../utils/mongoose';
import Item from '../../../models/Item'
var mongoose = require('mongoose');

dbConnect();

export default async function handler(req, res) {

    const {method, body} = req;

    switch (method){
        case "GET":
            try {
                const items = await Item.find();
                return res.status(200).json(items);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        case "POST":
            try {
                console.log("body", body)
                const categoria = mongoose.Types.ObjectId(body.category)
                body.category = categoria
                console.log(body.category)
                const newItem = new Item(body)
                console.log("NewItem", newItem)
                const savedItem = await newItem.save();
                return res.status(201).json(savedItem);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        default:
            return res.status(400).json({msg: "this method is not supported"});;
    }
}