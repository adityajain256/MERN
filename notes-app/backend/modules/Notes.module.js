import mongoose, { trusted } from "mongoose";

const NotesSchema = new mongoose.Schema({
    title: {
        type: String, 
        // required: true,
        trim: true,
    },
    content: {
        type: String, 
        default: "",
        
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, {timestamps: true});

const Note = mongoose.model("Note", NotesSchema);
export default Note;