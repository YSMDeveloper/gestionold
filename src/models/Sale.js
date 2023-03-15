import {Schema, model, models} from 'mongoose';

const saleSchema = new Schema({
    total: {
        type: Number,
        required: [true, 'Total is required'],
        unique: false,
        trim: true,
        maxlength: [120, 'Total must be less 250 characters']
    },
    updated: {
        type: Date,
        default: Date.now
    },
    user: [{
         type: Schema.Types.ObjectId, ref: "User"
    }],
    customer: [{
        type: Schema.Types.ObjectId, ref: "Customer"
    }],
    paymentmethod: [{
        type: Schema.Types.ObjectId, ref: "PaymentMethod"
    }],
    items: [
        {
            item: {
                type: Schema.Types.ObjectId, ref: "Item",
            },
            name: {
                type: String,
                required: [true, 'Name is required'],
                unique: false,
                trim: true,
                maxlength: [120, 'Name must be less 250 characters']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
                unique: false,
                trim: true,
                maxlength: [120, 'Quantity must be less 250 characters']
            },
            subtotal: {
                type: Number,
                required: [true, 'Subtotal is required'],
                unique: false,
                trim: true,
                maxlength: [120, 'Subtotal must be less 250 characters']
            }
        }
    ],
}, {
    timestamps: true,
    versionKey: false
})

export default models.Sale || model('Sale', saleSchema);