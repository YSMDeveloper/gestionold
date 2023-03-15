import {dbConnect} from '../../../utils/mongoose';
import QuickAccess from '../../../models/QuickAccess'

dbConnect();

export default async function handler(req, res) {

    const {method, body} = req

    switch (method){
        case "GET":
            try {
                const shortcuts = await QuickAccess.find()
                return res.status(200).json(shortcuts)
            } catch (error) {
                return res.status(500).json({error: error.message})
            }

        case "POST":
            try {
                const newShortcut = new QuickAccess(body)
                const savedShortcut = await newShortcut.save()
                return res.status(201).json(savedShortcut)
            } catch (error) {
                return res.status(500).json({error: error.message})
            }

        default:
            return res.status(400).json({msg: "this method is not supported"})
    }
}