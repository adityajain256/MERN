import React,{useState} from "react";
import "../App.css";

const Note = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });
  const [notes, setNotes] = useState([]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
        ...prevNote,
        [name]: value,
    }));
  }

  const addNote = (e) => {


    setNotes([...notes, note])

    e.preventDefault();
    console.log(notes);
    setNote({ title: "", content: "" });
    // setIsVisible(false);
  }

  return (
    <>
      <button
        style={{ display: isVisible ? "none" : "block" }}
        onClick={toggleVisibility}
      >
        {!isVisible ? "Create note" : "Cancel"}
      </button>
      <div
        className="create-note"
        style={{ display: isVisible ? "block" : "none" }}
      >
        <div className="note-header">
          <h2>Create a Note</h2>
          <button type="button" className="cross" onClick={toggleVisibility}>
            {" "}
            ❌{" "}
          </button>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              value={note.title}
              onChange={handleChange}
              type="text"
              id="title"
              // name="title"
              placeholder="Enter note title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              value={note.content}
              onChange={handleChange}
              id="content"
              // name="content"
              placeholder="Enter note content"
            ></textarea>
          </div>
          <button onClick={addNote} type="button">
            Create Note
          </button>
        </form>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Note;
