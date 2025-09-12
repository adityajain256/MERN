import React,{useState, useEffect} from "react";
import "../App.css";
import axios from "axios";

const Note = ({ isVisible, toggleVisibility}) => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [notes, setNotes] = useState([]);

  // const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchBakend = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/notes");
        const data = response.data;
        setNotes(data);
        console.log(data);
      } catch (error) {
        console.log(`there is an error: ${error}`);
      }
    };
    fetchBakend();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/notes",
        note
      );
      const data = response.data;
      setNotes([...notes, data]);
      console.log(data);
    } catch (error) {
      console.log(`there is an error: ${error}`);
    }
    setNote({ title: "", content: "" });
    window.location.reload();
    // setIsVisible(false);
  };

  // const editNote = async(id) => {
  //   try {
  //     const response = await axios.patch(`http://localhost:5001/api/notes/${id}`, note);
  //     const data = response.data;
  //     setNotes(notes.map((note) => (note.id === id ? data : note)));
  //     console.log(data);
  //   } catch (error) {
  //     console.log(`there is an error in edit function: ${error}`);
  //   }
  // }

  const deleteNote = (id) => async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/notes/${id}`
      );
      const data = response.data;
      setNotes(notes.filter((note) => note.id !== id));
      console.log(data);
      document.location.reload();
    } catch (error) {
      console.log(`there is an error: ${error}`);
    }
  };

  // const editNote = (id) => async () => {
    
    
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:5001/api/notes/${id}`,
  //       note
  //     );
  //     const data = response.data;
  //     setNotes(notes.map((note) => (note.id === id ? data : note)));
  //     console.log(data);
  //   } catch (error) {
  //     console.log(`there is an error: ${error}`);
  //   }

  // };

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
          <h2>{"Create a Note"}</h2>
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
              placeholder="Enter note content"
            ></textarea>
          </div>
          <button onClick={addNote} type="button">
            {"Create Note"}
          </button>
        </form>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <label
              htmlFor={`note-${index}`}
              style={{ opacity: 0.4, textDecoration: "underline" }}
            >
              TITLE
            </label>
            <h3 style={{ margin: "1rem 0" }}>{note.title}</h3>
            <label
              htmlFor={`note-${index}-content`}
              style={{
                opacity: 0.4,
                textDecoration: "underline",
                padding: "0.5rem 0",
              }}
            >
              CONTENT
            </label>
            <p style={{ margin: "1rem 0" }}>{note.content}</p>
            <div className="note-actions">
              <button onClick={deleteNote(note._id)} className="delete">
                Delete
              </button>
              {/* <button onClick={() => { editNote(note._id)  }}>Edit</button> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Note;
