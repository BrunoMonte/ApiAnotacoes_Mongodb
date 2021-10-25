import mongoose, { Schema } from 'mongoose'

const noteSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String
})

const Note = mongoose.model('notes', noteSchema)

export { Note }