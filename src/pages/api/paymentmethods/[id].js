import { dbConnect } from "../../../utils/mongoose";
import PaymentMethod from "../../../models/PaymentMethod"

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
                const paymentMethod = await PaymentMethod.findById(id);
                if(!paymentMethod) return res.status(404).json({msg: "Payment method not found"});
                return res.status(200).json(paymentMethod);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "POST":
            try {
                const newPaymentMethod = new Item(body);
                const savedPaymentMethod = await newPaymentMethod.save();
                return res.status(201).json(savedPaymentMethod);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }
        case "PUT":
            try {
                const paymentMethod = await PaymentMethod.findByIdAndUpdate(id, body, {new: true,});
                if(!paymentMethod) return res.status(404).json({msg: "PaymentMethod not found"});
                return res.status(200).json(paymentMethod);
            } catch (error) {
                return res.status(500).json({msg: error.message});
            }
        case "DELETE":
            try {
                const deletedPaymentMethod = await PaymentMethod.findByIdAndDelete(id);
                if(!deletedPaymentMethod) return res.status(404).json({msg: "PaymentMethod not found"});
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({msg: error.message});
            }
        default:
            return res.status(400).json({msg: "this method is not supported"});
    }
};