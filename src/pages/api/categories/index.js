import {dbConnect} from '../../../utils/mongoose';
import PaymentMethods from '../../../models/Category'

dbConnect();

export default async function handler(req, res) {

    const {method, body} = req;

    switch (method){
        case "GET":
            try {
                const paymentMethods = await PaymentMethods.find();
                return res.status(200).json(paymentMethods);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        case "POST":
            try {
                const newPaymentMethods = new PaymentMethods(body)
                const savedPaymentMethods = await newPaymentMethods.save();
                return res.status(201).json(savedPaymentMethods);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        default:
            return res.status(400).json({msg: "this method is not supported"});;
    }
}