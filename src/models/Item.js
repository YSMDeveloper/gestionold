import {Schema, model, models} from 'mongoose';

const itemSchema = new Schema({
    code: {
        type: Number,
        required: [true, 'Code is required'],
        unique: [true, 'Code is unique'],
        trim: true,
        maxlength: [13, 'Code must be less 13 characters']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: false,
        trim: true,
        maxlength: [40, 'Name must be less 40 characters']
    },
    price: {
        type: Number,
        required: [true, 'Lastname is required'],
        unique: false,
        trim: true,
        maxlength: [40, 'Lastname must be less 40 characters']
    },
    quantity: {
        type: Number,
        required: [true, 'Age is required'],
        unique: false,
        trim: true,
        maxlength: [6, 'Age must be less 6 characters']
    },
    category: [{
        type: Schema.Types.ObjectId, ref: "Category"
    }],
    updated: {
        type: Date,
        default: Date.now },
}, {
    timestamps: true,
    versionKey: false
})

export default models.Item || model('Item', itemSchema);