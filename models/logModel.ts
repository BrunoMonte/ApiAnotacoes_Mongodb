import mongoose, { Schema } from 'mongoose'

const logSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    description: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
})

const Log = mongoose.model('logs', logSchema)

export { Log }