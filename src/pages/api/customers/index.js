import {dbConnect} from '../../../utils/mongoose';
import Customer from '../../../models/Customer'

dbConnect();

export default async function handler(req, res) {

    const {method, body} = req;

    switch (method){
        case "GET":
            try {
                const customer = await Customer.find();
                return res.status(200).json(customer);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        case "POST":
            try {
                const newCustomer = new Customer(body)
                const savedCustomer = await newCustomer.save();
                return res.status(201).json(savedCustomer);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        default:
            return res.status(400).json({msg: "this method is not supported"});;
    }
}