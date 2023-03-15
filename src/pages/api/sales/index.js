import {dbConnect} from '../../../utils/mongoose';
import Sale from '../../../models/Sale';
var mongoose = require('mongoose');

dbConnect();

export default async function handler(req, res) {
    const {method, body} = req;

    switch (method) {

        case 'POST':
            try {
                const customer = mongoose.Types.ObjectId(body.customer)
                body.customer = customer
                const user = mongoose.Types.ObjectId(body.customer)
                body.user = user
                const paymentmethod = mongoose.Types.ObjectId(body.paymentmethod)
                body.paymentmethod = paymentmethod
                console.log('SaleBody', body)
                const newSale = new Sale(body)
                console.log('NewItem', newSale)
                const savedSale = await newSale.save();
                console.log('savedSale', savedSale)
                return res.status(201).json(savedSale);
            } catch (error) {
                return res.status(500).json({error: error.message});
            }

        default:
            return res.status(400).json({msg: 'This method is not supported'});
    }
}