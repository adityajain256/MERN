import Note from '../modules/Notes.module.js';

export const addNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if(!req.body.title) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const newNote = await Note.create({ title, content });

        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: "Error creating note", error });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error });
    }
};

export const getNoteByTitle = async (req, res) => {  
    try {
        const { Title } = req.params;

        if(Title){
            const note = await Note.find({title: Title})

            return res.status(200).json(note)
        }else{
            return (res.status(205).json({message: "title is mandatory"}));
            console.log("title is mandatory");
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
             const { Title, Content } = req.body;

             await Note.findByIdAndUpdate(id, {title: Title, content: Content}, {new: true});

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

            return res.status(200).json({message: "note has been successfully deleted."})
        }else{
            return res.status(205).json({message: "id is mandatory"});
            console.log("id is mandatory");
        }
    } catch (error) {
        console.log("Error deleting note", error);
        res.status(500).json({ message: "Error deleting note", error });
    }
  };