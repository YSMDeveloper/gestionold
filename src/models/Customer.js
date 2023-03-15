import {Schema, model, models} from 'mongoose';

const customerSchema = new Schema({
    rut: {
        type: String,
        required: [true, 'Rut is required'],
        unique: true,
        trim: true,
        maxlength: [40, 'Rut must be less 40 characters']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: false,
        trim: true,
        maxlength: [40, 'Name must be less 40 characters']
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
        unique: false,
        trim: true,
        maxlength: [40, 'Lastname must be less 40 characters']
    },
    updated: {
        type: Date,
        default: Date.now },
}, {
    timestamps: true,
    versionKey: false
})

export default models.Customer || model('Customer', customerSchema);