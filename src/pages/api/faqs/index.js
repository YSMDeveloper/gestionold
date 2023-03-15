import {dbConnect} from '../../../utils/mongoose';
import Faq from '../../../models/Faq'

dbConnect();

export default async function handler(req, res) {

    const {method, body} = req;

    switch (method){
        case "GET":
            try {
                const faqs = await Faq.find();
                console.log("API FAQS",faqs);
                return res.status(200).json(faqs);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        case "POST":
            try {
                const newFaq = new Faq(body)
                const savedFaq = await newFaq.save();
                return res.status(201).json(savedFaq);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        default:
            return res.status(400).json({msg: "this method is not supported"});;
    }
}