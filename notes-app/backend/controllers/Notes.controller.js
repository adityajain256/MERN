import Note from '../modules/Notes.module.js';

export const addNote = async (req, res) => {
    try {
        const body = req.body;

        const newNote = await Note.create(body);

        if(!body) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Error creating note", error });
        console.log("Error creating note", error);
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error });
        console.log("Error fetching notes", error);
    }
};

export const getNoteByTitle = async (req, res) => {  
    try {
        const { title } = req.params;
        

        if(title){
            const note = await Note.find({title: title});
            if(!note){
                return res.status(404).json({message: "Note not found with the given title."});
            }

            return res.status(200).json(note)
        }else{
            console.log("Title:", title);
            console.log("title is mandatory");
            return (res.status(205).json({message: "title is mandatory"}));

        }
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching note", error });
        console.log("Error fetching note", error);
    }
  };

  export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;

        if(id){
             const body = req.body;

             await Note.findByIdAndUpdate(id, body, {new: true});

             return res.status(201).json({message: 'note have been successfully updated.'})
        }else{
            return res.status(205).json({message: "id is mandatory"});
            console.log("id is mandatory");
        }
    } catch (error) {
        console.log("Error updating note", error);
        res.status(500).json({ message: "Error updating note", error });    

    }
  };

  export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        if(id){

            await Note.findByIdAndDelete(id);
            console.log("Note deleted with id:", id);
            return res.status(200).json({message: "note has been successfully deleted."})
        }else{
            console.log("id is mandatory");
            return res.status(205).json({message: "id is mandatory"});
        }
    } catch (error) {
        console.log("Error deleting note", error);
        res.status(500).json({ message: "Error deleting note", error });
    }
  };