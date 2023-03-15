import { dbConnect } from "../../../utils/mongoose";
import Customer from "../../../models/Customer"

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
                const customer = await Customer.findById(id);
                if(!customer) return res.status(404).json({msg: "Customer not found"});
                return res.status(200).json(customer);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "POST":
            try {
                const newCustomer = new Customer(body);
                const savedCustomer = await newCustomer.save();
                return res.status(201).json(savedCustomer);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case "PUT":
            try {
                const customer = await Customer.findByIdAndUpdate(id, body, {new: true,});
                if(!customer) return res.status(404).json({msg: "Customer not found"});
                return res.status(200).json(customer);
            } catch (error) {
                return res. status(500).json({msg: error.message});
            }
        case "DELETE":
            try {
                const deletedCustomer = await Customer.findByIdAndDelete(id);
                if(!deletedCustomer) return res.status(404).json({msg: "Customer not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
};