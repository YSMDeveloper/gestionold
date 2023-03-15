import {Schema, model, models} from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: false,
        trim: true,
        maxlength: [120, 'Name must be less 250 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        unique: false,
        trim: true,
        maxlength: [800, 'Description must be less 800 characters']
    },
    updated: {
        type: Date,
        default: Date.now },
}, {
    timestamps: true,
    versionKey: false
})

export default models.Category || model('Category', categorySchema);