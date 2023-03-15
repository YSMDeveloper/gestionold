import {Schema, model, models} from 'mongoose';

const quickAccessSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: false,
        trim: true,
        maxlength: [20, 'Title must be less 20 characters']
    },
    subtitle: {
        type: String,
        required: [true, 'Subtitle is required'],
        unique: false,
        trim: true,
        maxlength: [60, 'Description must be less 60 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [400, 'Description must be less 400 characters'],
        unique: false,
        trim: true,
    },
    route: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [400, 'Description must be less 400 characters'],
        unique: false,
        trim: true,
    },
    updated: {
        type: Date,
        default: Date.now },
}, {
    timestamps: true,
    versionKey: false
})

export default models.QuickAccess || model('QuickAccess', quickAccessSchema);