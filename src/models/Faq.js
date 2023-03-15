import {Schema, model, models} from 'mongoose';

const faqSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: false,
        trim: true,
        maxlength: [250, 'Title must be less 250 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        unique: false,
        trim: true,
        maxlength: [800, 'Description must be less 800 characters']
    },
    index: {
        type: Number,
        required: [true, 'Index is required'],
        unique: true,
        trim: true,
    },
    updated: {
        type: Date,
        default: Date.now },
}, {
    timestamps: true,
    versionKey: false
})

export default models.Faq || model('Faq', faqSchema);