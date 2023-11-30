import mongoose from 'mongoose';

// Schema
const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Model
const Note = mongoose.model('Note', noteSchema);
export default Note;